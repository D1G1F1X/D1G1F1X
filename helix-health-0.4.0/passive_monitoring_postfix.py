#!/usr/bin/env python3
from pathlib import Path

ROOT = Path('/tmp/helix/helix-health-bridge')


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


manifest = ROOT / 'wear/src/main/AndroidManifest.xml'
ms = read(manifest)
ms = ms.replace('    <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />\n', '')
ms = ms.replace('    <uses-permission android:name="android.permission.WAKE_LOCK" />\n', '')
service_decl = '''        <service\n            android:name=".PassiveHeartRateService"\n            android:exported="true"\n            android:permission="com.google.android.wearable.healthservices.permission.PASSIVE_DATA_BINDING" />\n'''
if 'android:name=".PassiveHeartRateService"' not in ms:
    ms = ms.replace('        <meta-data android:name="com.google.android.wearable.standalone" android:value="false" />', service_decl + '        <meta-data android:name="com.google.android.wearable.standalone" android:value="false" />')
write(manifest, ms)

service = ROOT / 'wear/src/main/java/com/lumenhelix/healthbridge/wear/PassiveHeartRateService.kt'
write(service, r'''package com.lumenhelix.healthbridge.wear

import android.os.Build
import androidx.health.services.client.PassiveListenerService
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.Wearable

class PassiveHeartRateService : PassiveListenerService() {
    override fun onNewDataPointsReceived(dataPoints: DataPointContainer) {
        val latest = dataPoints.getData(DataType.HEART_RATE_BPM).lastOrNull() ?: return
        publishLatest(latest.value)
    }

    private fun publishLatest(bpm: Double) {
        val request = PutDataMapRequest.create(PATH).apply {
            dataMap.putString("type", "heart_rate")
            dataMap.putDouble("bpm", bpm)
            dataMap.putString("source", "wear_health_services_passive")
            dataMap.putString("model", Build.MODEL)
            dataMap.putLong("time_ms", System.currentTimeMillis())
        }.asPutDataRequest().setUrgent()
        Wearable.getDataClient(this).putDataItem(request)
    }

    companion object {
        const val PATH = "/helix/vitals/latest"
    }
}
''')

wear_main = ROOT / 'wear/src/main/java/com/lumenhelix/healthbridge/wear/WearMainActivity.kt'
write(wear_main, r'''package com.lumenhelix.healthbridge.wear

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.health.services.client.HealthServices
import androidx.health.services.client.MeasureCallback
import androidx.health.services.client.getCapabilities
import androidx.health.services.client.setPassiveListenerService
import androidx.health.services.client.unregisterMeasureCallback
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.DataTypeAvailability
import androidx.health.services.client.data.DeltaDataType
import androidx.health.services.client.data.PassiveListenerConfig
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.wearable.Wearable
import kotlinx.coroutines.launch
import org.json.JSONObject

class WearMainActivity : AppCompatActivity() {
    private lateinit var hrText: TextView
    private lateinit var statusText: TextView
    private lateinit var liveButton: Button
    private var measuring = false
    private var liveSupported = false
    private var passiveSupported = false

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { result ->
        if (result.values.all { it }) {
            lifecycleScope.launch {
                registerPassiveMonitoring()
                startMeasure()
            }
        } else {
            statusText.text = "Heart sensor permission required"
        }
    }

    private val healthServices by lazy { HealthServices.getClient(this) }
    private val measureClient by lazy { healthServices.measureClient }
    private val passiveClient by lazy { healthServices.passiveMonitoringClient }

    private val callback = object : MeasureCallback {
        override fun onAvailabilityChanged(dataType: DeltaDataType<*, *>, availability: Availability) {
            if (availability is DataTypeAvailability) statusText.text = "Heart sensor: $availability"
        }

        override fun onDataReceived(data: DataPointContainer) {
            val latest = data.getData(DataType.HEART_RATE_BPM).lastOrNull() ?: return
            val bpm = latest.value
            hrText.text = "${bpm.toInt()} bpm"
            statusText.text = "Live • linked to phone"
            sendVital(bpm, "wear_health_services_live")
        }

        override fun onRegistered() { statusText.text = "Live heart sensor connected" }

        override fun onRegistrationFailed(throwable: Throwable) {
            statusText.text = "Sensor error: ${throwable.javaClass.simpleName}"
            measuring = false
            liveButton.text = "Start live telemetry"
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_wear_main)
        hrText = findViewById(R.id.hrText)
        statusText = findViewById(R.id.statusText)
        liveButton = findViewById(R.id.liveButton)
        findViewById<Button>(R.id.testButton).setOnClickListener { sendHello("link_test") }
        liveButton.setOnClickListener { if (measuring) stopMeasure() else ensurePermissionsAndStart() }
        sendHello("hello")
        checkCapabilitiesAndArmPassive()
    }

    private fun hasHeartPermission(): Boolean = if (Build.VERSION.SDK_INT >= 36) {
        ContextCompat.checkSelfPermission(this, "android.permission.health.READ_HEART_RATE") == PackageManager.PERMISSION_GRANTED
    } else {
        ContextCompat.checkSelfPermission(this, Manifest.permission.BODY_SENSORS) == PackageManager.PERMISSION_GRANTED
    }

    private fun ensurePermissionsAndStart() {
        if (!liveSupported && !passiveSupported) {
            statusText.text = "Heart-rate capability not available"
            return
        }
        val needed = mutableListOf<String>()
        if (!hasHeartPermission()) {
            needed += if (Build.VERSION.SDK_INT >= 36) "android.permission.health.READ_HEART_RATE" else Manifest.permission.BODY_SENSORS
        }
        if (needed.isEmpty()) {
            lifecycleScope.launch {
                registerPassiveMonitoring()
                if (liveSupported) startMeasure()
            }
        } else {
            permissionLauncher.launch(needed.toTypedArray())
        }
    }

    private fun checkCapabilitiesAndArmPassive() {
        lifecycleScope.launch {
            runCatching { measureClient.getCapabilities() }
                .onSuccess { caps -> liveSupported = DataType.HEART_RATE_BPM in caps.supportedDataTypesMeasure }
                .onFailure { liveSupported = false }

            runCatching { passiveClient.getCapabilities() }
                .onSuccess { caps -> passiveSupported = DataType.HEART_RATE_BPM in caps.supportedDataTypesPassiveMonitoring }
                .onFailure { passiveSupported = false }

            statusText.text = when {
                liveSupported && passiveSupported -> "Live + background heart sensor ready"
                liveSupported -> "Live heart sensor ready"
                passiveSupported -> "Background heart sensor ready"
                else -> "Heart-rate measurement unavailable"
            }

            if (passiveSupported && hasHeartPermission()) registerPassiveMonitoring()
        }
    }

    private suspend fun registerPassiveMonitoring() {
        if (!passiveSupported || !hasHeartPermission()) return
        val config = PassiveListenerConfig.builder()
            .setDataTypes(setOf(DataType.HEART_RATE_BPM))
            .build()
        runCatching {
            passiveClient.setPassiveListenerService(PassiveHeartRateService::class.java, config)
        }.onSuccess {
            if (!measuring) statusText.text = "Background heart telemetry armed"
        }.onFailure {
            statusText.text = "Background telemetry error: ${it.javaClass.simpleName}"
        }
    }

    private fun startMeasure() {
        if (measuring || !liveSupported) return
        measuring = true
        liveButton.text = "Stop live telemetry"
        measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, callback)
    }

    private fun stopMeasure() {
        if (!measuring) return
        measuring = false
        liveButton.text = "Start live telemetry"
        statusText.text = if (passiveSupported) "Background heart telemetry armed" else "Live telemetry stopped"
        lifecycleScope.launch {
            runCatching { measureClient.unregisterMeasureCallback(DataType.HEART_RATE_BPM, callback) }
        }
    }

    private fun sendVital(bpm: Double, source: String) {
        send(JSONObject().put("type", "heart_rate").put("bpm", bpm).put("source", source)
            .put("model", Build.MODEL).put("time_ms", System.currentTimeMillis()).toString().toByteArray())
    }

    private fun sendHello(type: String) {
        send(JSONObject().put("type", type).put("model", Build.MODEL)
            .put("time_ms", System.currentTimeMillis()).toString().toByteArray())
        if (type == "link_test") statusText.text = "Testing phone link…"
    }

    private fun send(payload: ByteArray) {
        Wearable.getNodeClient(this).connectedNodes.addOnSuccessListener { nodes ->
            nodes.forEach { node -> Wearable.getMessageClient(this).sendMessage(node.id, "/helix/vitals", payload) }
            if (nodes.isEmpty()) statusText.text = "Phone not connected"
        }
    }

    override fun onStop() {
        if (measuring) stopMeasure()
        super.onStop()
    }
}
''')

listener = ROOT / 'app/src/main/java/com/lumenhelix/healthbridge/wearlink/WearVitalListenerService.kt'
write(listener, r'''package com.lumenhelix.healthbridge.wearlink

import com.google.android.gms.wearable.DataEvent
import com.google.android.gms.wearable.DataEventBuffer
import com.google.android.gms.wearable.DataMapItem
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService
import com.lumenhelix.healthbridge.data.BridgePrefs
import org.json.JSONObject

class WearVitalListenerService : WearableListenerService() {
    override fun onMessageReceived(messageEvent: MessageEvent) {
        if (messageEvent.path != MESSAGE_PATH) return
        val payload = runCatching { JSONObject(String(messageEvent.data, Charsets.UTF_8)) }.getOrNull() ?: return
        applyPayload(payload)
    }

    override fun onDataChanged(dataEvents: DataEventBuffer) {
        dataEvents.forEach { event ->
            if (event.type != DataEvent.TYPE_CHANGED || event.dataItem.uri.path != DATA_PATH) return@forEach
            val map = DataMapItem.fromDataItem(event.dataItem).dataMap
            val payload = JSONObject()
                .put("type", map.getString("type") ?: "heart_rate")
                .put("bpm", map.getDouble("bpm"))
                .put("source", map.getString("source") ?: "wear_health_services_passive")
                .put("model", map.getString("model"))
                .put("time_ms", map.getLong("time_ms"))
            applyPayload(payload)
        }
    }

    private fun applyPayload(payload: JSONObject) {
        when (payload.optString("type")) {
            "heart_rate" -> {
                val bpm = payload.optDouble("bpm", Double.NaN)
                if (!bpm.isNaN()) {
                    BridgePrefs.setLiveHeartRate(
                        this,
                        bpm,
                        payload.optLong("time_ms", System.currentTimeMillis()),
                        payload.optString("source", "watch")
                    )
                    BridgePrefs.markWatchLink(this, payload.optString("model", null))
                }
            }
            "link_test", "hello" -> BridgePrefs.markWatchLink(this, payload.optString("model", null))
        }
        sendBroadcast(android.content.Intent(ACTION_VITAL_UPDATE).setPackage(packageName))
    }

    companion object {
        const val ACTION_VITAL_UPDATE = "com.lumenhelix.healthbridge.VITAL_UPDATE"
        private const val MESSAGE_PATH = "/helix/vitals"
        private const val DATA_PATH = "/helix/vitals/latest"
    }
}
''')

assert 'PassiveHeartRateService' in read(manifest)
assert 'PASSIVE_DATA_BINDING' in read(manifest)
assert 'ACTIVITY_RECOGNITION' not in read(manifest)
assert 'WAKE_LOCK' not in read(manifest)
assert 'setPassiveListenerService' in read(wear_main)
assert 'supportedDataTypesPassiveMonitoring' in read(wear_main)
assert 'PutDataMapRequest' in read(service)
assert 'onDataChanged' in read(listener)
print('HELIX_PASSIVE_MONITORING_POSTFIX=PASS')
