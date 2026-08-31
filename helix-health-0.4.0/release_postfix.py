#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path('/tmp/helix/helix-health-bridge')

def read(p): return p.read_text(encoding='utf-8')
def write(p, s): p.write_text(s, encoding='utf-8')

app_gradle = ROOT / 'app/build.gradle.kts'
s = read(app_gradle)
s = re.sub(r'\n\s*implementation\("com\.flyfishxu:kadb:[^"]+"\)', '', s)
write(app_gradle, s)

installer = ROOT / 'app/src/main/java/com/lumenhelix/healthbridge/wearlink/WatchInstaller.kt'
if installer.exists(): installer.unlink()

setup = ROOT / 'app/src/main/java/com/lumenhelix/healthbridge/WatchSetupActivity.kt'
write(setup, r'''package com.lumenhelix.healthbridge

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.lumenhelix.healthbridge.databinding.ActivityWatchSetupBinding

class WatchSetupActivity : AppCompatActivity() {
    private lateinit var binding: ActivityWatchSetupBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWatchSetupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.pairButton.text = "Watch install information"
        binding.installButton.text = "Private RC install information"
        binding.pairButton.setOnClickListener {
            binding.setupStatus.text = "HELIX Health v1 uses the supported Wear OS delivery model: phone and watch apps share the same package and signing identity. Production delivery uses Google Play device targeting."
        }
        binding.installButton.setOnClickListener {
            binding.setupStatus.text = "Private release candidates include a separately signed Watch APK for explicit installation on the test watch. The health app stores no wireless-debugging credential."
        }
    }
}
''')

wear_gradle = ROOT / 'wear/build.gradle.kts'
s = read(wear_gradle)
s = re.sub(r'\n\s*implementation\("com\.google\.guava:listenablefuture:[^"]+"\)', '', s)
write(wear_gradle, s)

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
import androidx.health.services.client.unregisterMeasureCallback
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.DataTypeAvailability
import androidx.health.services.client.data.DeltaDataType
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.wearable.Wearable
import kotlinx.coroutines.launch
import org.json.JSONObject

class WearMainActivity : AppCompatActivity() {
    private lateinit var hrText: TextView
    private lateinit var statusText: TextView
    private lateinit var liveButton: Button
    private var measuring = false
    private var supported = false

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { result ->
        if (result.values.all { it }) startMeasure()
        else statusText.text = "Heart sensor permission required"
    }

    private val measureClient by lazy { HealthServices.getClient(this).measureClient }

    private val callback = object : MeasureCallback {
        override fun onAvailabilityChanged(dataType: DeltaDataType<*, *>, availability: Availability) {
            if (availability is DataTypeAvailability) statusText.text = "Heart sensor: $availability"
        }

        override fun onDataReceived(data: DataPointContainer) {
            val latest = data.getData(DataType.HEART_RATE_BPM).lastOrNull() ?: return
            val bpm = latest.value
            hrText.text = "${bpm.toInt()} bpm"
            statusText.text = "Live • linked to phone"
            sendVital(bpm, "wear_health_services")
        }

        override fun onRegistered() { statusText.text = "Heart sensor connected" }

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
        checkCapability()
    }

    private fun ensurePermissionsAndStart() {
        if (!supported) {
            statusText.text = "Live heart-rate capability not available"
            return
        }
        val needed = mutableListOf<String>()
        if (Build.VERSION.SDK_INT >= 36 && ContextCompat.checkSelfPermission(this, "android.permission.health.READ_HEART_RATE") != PackageManager.PERMISSION_GRANTED) {
            needed += "android.permission.health.READ_HEART_RATE"
        }
        if (Build.VERSION.SDK_INT < 36 && ContextCompat.checkSelfPermission(this, Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            needed += Manifest.permission.BODY_SENSORS
        }
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED) {
            needed += Manifest.permission.ACTIVITY_RECOGNITION
        }
        if (needed.isEmpty()) startMeasure() else permissionLauncher.launch(needed.toTypedArray())
    }

    private fun checkCapability() {
        lifecycleScope.launch {
            runCatching { measureClient.getCapabilities() }
                .onSuccess { caps ->
                    supported = DataType.HEART_RATE_BPM in caps.supportedDataTypesMeasure
                    statusText.text = if (supported) "Watch sensor ready" else "Live heart-rate measurement unavailable"
                }
                .onFailure {
                    supported = false
                    statusText.text = "Health Services unavailable: ${it.javaClass.simpleName}"
                }
        }
    }

    private fun startMeasure() {
        if (measuring) return
        measuring = true
        liveButton.text = "Stop live telemetry"
        measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, callback)
    }

    private fun stopMeasure() {
        if (!measuring) return
        measuring = false
        liveButton.text = "Start live telemetry"
        statusText.text = "Telemetry stopped"
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

assert 'com.flyfishxu:kadb' not in read(app_gradle)
assert not installer.exists()
assert 'WatchInstaller.' not in read(setup)
assert 'measureClient.getCapabilities()' in read(wear_main)
assert 'unregisterMeasureCallbackAsync' not in read(wear_main)
print('HELIX_RELEASE_POSTFIX=PASS')
