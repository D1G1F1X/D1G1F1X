"use client"

import type React from "react"
import { Suspense, useState, useMemo, useRef } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import {
  OrbitControls,
  Text3D,
  Environment,
  Html,
  Center,
  Torus,
  Box,
  Sphere,
  Cylinder,
  Cone,
  Dodecahedron,
  Octahedron,
  TorusKnot,
} from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

import { numoNumberDefinitions } from "@/data/numo-definitions" // Updated path
import type { NumoNumberData } from "@/data/numo-definitions" // Updated path

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Flame, Droplets, Wind, Mountain, Sparkles, Sun, Moon, OrbitIcon, Info, XIcon, RefreshCw } from "lucide-react"

const numberData: NumoNumberData[] = numoNumberDefinitions // Use the new data

interface NumberShapeProps {
  numDef: NumoNumberData
  position: [number, number, number]
  onSelect: (num: NumoNumberData) => void
  isSelected: boolean
  isCompared: boolean
  isOverlayTarget: boolean // Is this the number whose pair is shown in overlay?
  isFaded: boolean // For compare mode, to fade out non-selected/non-compared numbers
  isHovered: boolean
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void
}

const ShapeVisual: React.FC<{
  numDef: NumoNumberData
  isSelected: boolean
  isCompared: boolean
  isHovered: boolean
  isOverlayTarget: boolean
}> = ({ numDef, isSelected, isCompared, isHovered, isOverlayTarget }) => {
  const groupRef = useRef<THREE.Group>(null!)
  const baseScale = 0.8

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
      let targetScale = baseScale
      if (isSelected || isCompared || isOverlayTarget) {
        targetScale = baseScale * 1.3
      } else if (isHovered) {
        targetScale = baseScale * 1.15
      }
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const color = useMemo(() => {
    const el = numDef.individualElementalPowerName?.toLowerCase()
    if (el === "fire") return new THREE.Color("#FF6B6B") // Fiery Red
    if (el === "water") return new THREE.Color("#60A5FA") // Calm Blue
    if (el === "air") return new THREE.Color("#93C5FD") // Sky Blue
    if (el === "earth") return new THREE.Color("#84CC16") // Earthy Green
    if (el === "spirit") return new THREE.Color("#A78BFA") // Mystical Purple
    return new THREE.Color("#E5E7EB") // Default Grey
  }, [numDef.individualElementalPowerName])

  const material = (
    <meshStandardMaterial
      color={color}
      emissive={isHovered || isSelected || isCompared || isOverlayTarget ? color : "#000000"}
      emissiveIntensity={isHovered || isSelected || isCompared || isOverlayTarget ? 0.6 : 0}
      roughness={0.4}
      metalness={0.1}
      transparent
      opacity={0.95}
    />
  )

  // Define geometries based on numDef.shapeType and "HiddenMysteries" visual descriptions
  let geometryComponent
  switch (numDef.shapeType) {
    case "sphere": // 0 - Circle of endless potential
      geometryComponent = <Sphere args={[0.7, 32, 32]}>{material}</Sphere>
      break
    case "line": // 1 - Vertical line of manifestation
      geometryComponent = <Cylinder args={[0.1, 0.1, 1.5, 16]}>{material}</Cylinder> // Tall, thin cylinder
      break
    case "mirroredCurve": // 2 & 5 - 2 curves, 5 is mirrored 2 + line
      // For simplicity, using Torus for 2, Dodecahedron for 5 (as before)
      // A more accurate representation would require custom geometry or combining shapes.
      if (numDef.number === 2) geometryComponent = <Torus args={[0.6, 0.2, 16, 32]}>{material}</Torus>
      else geometryComponent = <Dodecahedron args={[0.7]}>{material}</Dodecahedron> // 5 - action, freedom
      break
    case "halfEight": // 3 - Geometrically half of 8
      // Representing as two stacked, open tori segments or a stylized '3'
      geometryComponent = (
        <group>
          <Torus args={[0.4, 0.15, 16, 100, Math.PI * 1.5]} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            {material}
          </Torus>
          <Torus
            args={[0.4, 0.15, 16, 100, Math.PI * 1.5]}
            position={[0, -0.3, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          >
            {material}
          </Torus>
        </group>
      )
      break
    case "cube": // 4 - Stability, right angles, straight lines
      geometryComponent = <Box args={[1, 1, 1]}>{material}</Box>
      break
    case "octahedron": // 6 - Nurturing, could be represented by a more complex spiral or a stable form like octahedron
      // Using Octahedron for now, as spirals are complex. "HiddenMysteries" says 6 spirals inward.
      geometryComponent = <Octahedron args={[0.7]}>{material}</Octahedron>
      break
    case "torusKnotComplex": // 7 - Spiritual insight, complex path. "HiddenMysteries" says built from right angles/lines like 4, but points up.
      // This is a placeholder, a more accurate 7 would be custom.
      geometryComponent = (
        <Cone args={[0.5, 1.2, 7]} rotation={[0, 0, Math.PI]}>
          {material}
        </Cone>
      ) // Pointing up
      break
    case "torusKnotSimple": // 8 - Infinity, balance. "HiddenMysteries" says 3 is half of 8.
      geometryComponent = <TorusKnot args={[0.6, 0.18, 100, 16, 2, 3]}>{material}</TorusKnot>
      break
    // case 'spiralOut': // 9 - Completion, wisdom. "HiddenMysteries" says 9 spirals outward, rotational symmetry with 6.
    //   // Placeholder, as spirals are complex.
    //   geometryComponent = <Sphere args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]}>{material}</Sphere>; // Half sphere pointing up
    //   break;
    default: // Fallback for 5, 9, or unassigned shapeTypes
      if (numDef.number === 5) geometryComponent = <Dodecahedron args={[0.7]}>{material}</Dodecahedron>
      else if (numDef.number === 9)
        geometryComponent = (
          <Torus args={[0.7, 0.25, 16, 100, Math.PI * 1.8]} rotation={[Math.PI / 2, 0, 0]}>
            {material}
          </Torus>
        ) // Almost complete circle
      else geometryComponent = <Sphere args={[0.5, 16, 16]}>{material}</Sphere>
  }

  return (
    <group ref={groupRef}>
      <Center>{geometryComponent}</Center>
    </group>
  )
}

const NumberShape: React.FC<NumberShapeProps> = ({
  numDef,
  position,
  onSelect,
  isSelected,
  isCompared,
  isOverlayTarget,
  isFaded,
  isHovered,
  onPointerOver,
  onPointerOut,
}) => {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (textRef.current && state.camera) {
      textRef.current.quaternion.copy(state.camera.quaternion)
    }
  })

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(numDef)
      }}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      visible={!isFaded} // Hide if faded
    >
      <ShapeVisual
        numDef={numDef}
        isSelected={isSelected}
        isCompared={isCompared}
        isHovered={isHovered}
        isOverlayTarget={isOverlayTarget}
      />
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={0.4}
        height={0.05}
        curveSegments={8}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={3}
        position={[0, 1.1, 0]} // Adjust Y based on shape size
      >
        {numDef.number.toString()}
        <meshStandardMaterial
          color={isSelected || isCompared || isOverlayTarget ? "#FFFFFF" : "#D1D5DB"}
          emissive={isSelected || isCompared || isOverlayTarget ? "#FFFFFF" : "#D1D5DB"}
          emissiveIntensity={0.4}
        />
      </Text3D>
    </group>
  )
}

const getElementIcon = (element?: string) => {
  // ... (same as previous)
  switch (element?.toLowerCase()) {
    case "fire":
      return <Flame className="h-4 w-4 text-red-400" />
    case "water":
      return <Droplets className="h-4 w-4 text-blue-400" />
    case "air":
      return <Wind className="h-4 w-4 text-sky-400" />
    case "earth":
      return <Mountain className="h-4 w-4 text-green-400" />
    case "spirit":
      return <Sparkles className="h-4 w-4 text-purple-400" />
    default:
      return <Info className="h-4 w-4 text-gray-400" />
  }
}

const getPlanetIcon = (planet?: string) => {
  // ... (same as previous)
  switch (planet?.toLowerCase()) {
    case "pluto":
      return <OrbitIcon className="h-4 w-4 text-indigo-400" /> // Pluto is often associated with transformation
    case "the sun":
    case "sun":
      return <Sun className="h-4 w-4 text-yellow-400" />
    case "the moon":
    case "moon":
      return <Moon className="h-4 w-4 text-slate-400" />
    case "mercury":
      return <OrbitIcon className="h-4 w-4 text-gray-400" /> // Mercury
    case "venus":
      return <OrbitIcon className="h-4 w-4 text-pink-400" /> // Venus
    case "mars":
      return <OrbitIcon className="h-4 w-4 text-red-600" /> // Mars
    case "jupiter":
      return <OrbitIcon className="h-4 w-4 text-orange-400" /> // Jupiter
    case "saturn":
      return <OrbitIcon className="h-4 w-4 text-yellow-600" /> // Saturn
    case "uranus":
      return <OrbitIcon className="h-4 w-4 text-cyan-400" /> // Uranus
    case "neptune":
      return <OrbitIcon className="h-4 w-4 text-blue-600" /> // Neptune
    default:
      return <OrbitIcon className="h-4 w-4 text-purple-400" />
  }
}

export default function InteractiveNumberShapeExplorer() {
  const [selectedNumberDef, setSelectedNumberDef] = useState<NumoNumberData | null>(null)
  const [compareNumberDef, setCompareNumberDef] = useState<NumoNumberData | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showPairOverlay, setShowPairOverlay] = useState(false)
  const [isCompareMode, setIsCompareMode] = useState(false)
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)

  const controlsRef = useRef<any>()

  const handleSelectNumber = (numDef: NumoNumberData) => {
    if (isCompareMode) {
      if (!selectedNumberDef || selectedNumberDef.number === numDef.number) {
        setSelectedNumberDef(numDef)
        setCompareNumberDef(null) // Clear compare if selecting primary again or first time
        setIsPopupOpen(true)
      } else if (selectedNumberDef.number !== numDef.number) {
        setCompareNumberDef(numDef)
        setIsPopupOpen(true) // Open popup when second compare number is selected
      }
    } else {
      setSelectedNumberDef(numDef)
      setCompareNumberDef(null)
      setIsPopupOpen(true)
    }
  }

  const clearSelection = () => {
    setSelectedNumberDef(null)
    setCompareNumberDef(null)
    setIsPopupOpen(false)
    setShowPairOverlay(false)
  }

  const toggleCompareModeHandler = () => {
    const newCompareMode = !isCompareMode
    setIsCompareMode(newCompareMode)
    if (!newCompareMode) {
      // If turning compare mode OFF
      setCompareNumberDef(null)
      // If only one number was selected, keep it as the main selectedNumberDef
    } else {
      // If turning compare mode ON and only one number is selected, it remains selectedNumberDef
      // User then needs to pick a second number for compareNumberDef
      if (selectedNumberDef && !compareNumberDef) {
        // Potentially do nothing, or prompt user to select another
      }
    }
  }

  const resetCamera = () => controlsRef.current?.reset()

  const positions = useMemo(() => {
    const R = 3.8 // Radius of the circle
    return numberData.map((nd, i) => {
      const angle = (i / numberData.length) * 2 * Math.PI + Math.PI / 2 // Start from top
      if (isCompareMode && selectedNumberDef && compareNumberDef) {
        if (nd.number === selectedNumberDef.number) return [-1.8, 0, 0] as [number, number, number]
        if (nd.number === compareNumberDef.number) return [1.8, 0, 0] as [number, number, number]
        return [Math.cos(angle) * R * 3, 0, Math.sin(angle) * R * 3] as [number, number, number] // Push others far away
      }
      if (isCompareMode && selectedNumberDef && nd.number === selectedNumberDef.number) {
        return [0, 0, 0] as [number, number, number] // Center selected number if only one in compare mode
      }
      return [Math.cos(angle) * R, 0, Math.sin(angle) * R] as [number, number, number]
    })
  }, [isCompareMode, selectedNumberDef, compareNumberDef])

  const currentPopupData = isCompareMode && compareNumberDef ? compareNumberDef : selectedNumberDef
  const primaryDisplayData = selectedNumberDef // Always show selected as primary in UI

  const pairedNumberForOverlay = primaryDisplayData
    ? numberData.find((n) => n.number === primaryDisplayData.pairedWith)
    : null

  return (
    <Card className="w-full bg-slate-900/70 border-slate-800 shadow-2xl relative overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-4">
        <CardTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Interactive Number Shape Explorer
        </CardTitle>
        <p className="text-xs text-slate-400">
          Explore the symbolic shapes and numerological insights of numbers 0-9. Click a shape or button.
        </p>
      </CardHeader>
      <CardContent className="p-0 md:p-2 flex flex-col lg:flex-row gap-2 h-[700px] md:h-[800px]">
        {/* Controls Panel */}
        <div className="w-full lg:w-64 p-3 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3 lg:h-full overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-medium text-purple-300">Select Number:</h3>
          <div className="grid grid-cols-5 gap-1.5">
            {numberData.map((numDef) => (
              <Button
                key={numDef.number}
                variant={
                  selectedNumberDef?.number === numDef.number || compareNumberDef?.number === numDef.number
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleSelectNumber(numDef)}
                className={`text-xs transition-all w-full aspect-square
                  ${
                    selectedNumberDef?.number === numDef.number
                      ? "bg-purple-600 text-white ring-2 ring-purple-400"
                      : compareNumberDef?.number === numDef.number
                        ? "bg-pink-600 text-white ring-2 ring-pink-400"
                        : "border-slate-600 hover:bg-slate-700"
                  }`}
              >
                {numDef.number}
              </Button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="compare-mode-switch" className="text-xs text-slate-300">
                Compare Mode
              </Label>
              <Switch
                id="compare-mode-switch"
                checked={isCompareMode}
                onCheckedChange={toggleCompareModeHandler}
                className="[&>span]:bg-pink-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="overlay-switch" className="text-xs text-slate-300">
                Paired Info Overlay
              </Label>
              <Switch
                id="overlay-switch"
                checked={showPairOverlay}
                onCheckedChange={setShowPairOverlay}
                disabled={!primaryDisplayData}
              />
            </div>
            <Button
              onClick={resetCamera}
              variant="outline"
              size="sm"
              className="w-full text-xs border-slate-600 hover:bg-slate-700"
            >
              <RefreshCw className="w-3 h-3 mr-1.5" /> Reset View
            </Button>
            {(selectedNumberDef || compareNumberDef) && (
              <Button onClick={clearSelection} variant="destructive" size="sm" className="w-full text-xs">
                <XIcon className="w-3 h-3 mr-1.5" /> Clear Selection
              </Button>
            )}
          </div>

          {/* Primary Selected Number Info (Brief) */}
          {primaryDisplayData && (
            <div className="mt-2 pt-2 border-t border-slate-700/50 text-xs">
              <h4 className="font-medium text-purple-300 mb-1">
                Selected:{" "}
                <span className="text-white">
                  {primaryDisplayData.number} - {primaryDisplayData.title}
                </span>
              </h4>
              {isCompareMode && compareNumberDef && (
                <h4 className="font-medium text-pink-400 mb-1">
                  Comparing with:{" "}
                  <span className="text-white">
                    {compareNumberDef.number} - {compareNumberDef.title}
                  </span>
                </h4>
              )}
              <p className="text-slate-400">{primaryDisplayData.description.substring(0, 100)}...</p>
              <Button
                variant="link"
                size="sm"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs mt-1"
                onClick={() => setIsPopupOpen(true)}
              >
                View Full Details{" "}
                {isCompareMode && compareNumberDef
                  ? `for ${compareNumberDef.number}`
                  : primaryDisplayData
                    ? `for ${primaryDisplayData.number}`
                    : ""}
              </Button>
            </div>
          )}
        </div>

        {/* 3D Canvas */}
        <div className="flex-1 h-[350px] lg:h-full bg-slate-950 rounded-lg border border-slate-700 relative">
          <Canvas
            camera={{ position: [0, 2, isCompareMode && selectedNumberDef && compareNumberDef ? 8 : 6], fov: 50 }}
          >
            <Suspense
              fallback={
                <Html center>
                  <span className="text-slate-400">Loading 3D Shapes...</span>
                </Html>
              }
            >
              <ambientLight intensity={0.8} />
              <Environment preset="night" />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#503075" />

              {numberData.map((numDef, i) => (
                <NumberShape
                  key={numDef.number}
                  numDef={numDef}
                  position={positions[i]}
                  onSelect={handleSelectNumber}
                  isSelected={selectedNumberDef?.number === numDef.number}
                  isCompared={compareNumberDef?.number === numDef.number}
                  isOverlayTarget={showPairOverlay && primaryDisplayData?.pairedWith === numDef.number}
                  isFaded={
                    isCompareMode &&
                    selectedNumberDef &&
                    compareNumberDef &&
                    numDef.number !== selectedNumberDef.number &&
                    numDef.number !== compareNumberDef.number
                  }
                  isHovered={hoveredNumber === numDef.number}
                  onPointerOver={(e) => {
                    e.stopPropagation()
                    setHoveredNumber(numDef.number)
                  }}
                  onPointerOut={() => setHoveredNumber(null)}
                />
              ))}
              <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.05}
                minDistance={isCompareMode && selectedNumberDef && compareNumberDef ? 3 : 2}
                maxDistance={15}
              />
            </Suspense>
          </Canvas>
          {/* Paired Info Overlay */}
          <AnimatePresence>
            {showPairOverlay && primaryDisplayData && pairedNumberForOverlay && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute top-2 right-2 bottom-2 w-56 md:w-64 bg-slate-800/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-3 shadow-lg overflow-y-auto scrollbar-thin"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-semibold text-purple-300">
                    Paired with: {primaryDisplayData.pairedWith} - {pairedNumberForOverlay.title}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white"
                    onClick={() => setShowPairOverlay(false)}
                  >
                    <XIcon size={14} />
                  </Button>
                </div>
                <div className="text-xs space-y-1.5 text-slate-400">
                  <p>
                    <strong className="text-slate-300">Pair Name:</strong> {primaryDisplayData.pairName}
                  </p>
                  <p>
                    <strong className="text-slate-300">Pair Theme:</strong> {primaryDisplayData.pairDescription}
                  </p>
                  <p className="flex items-center gap-1">
                    <strong className="text-slate-300">Element:</strong>{" "}
                    {getElementIcon(pairedNumberForOverlay.individualElementalPowerName)}{" "}
                    {pairedNumberForOverlay.individualElementalPowerName}
                  </p>
                  <p className="mt-1 text-xxs italic">{pairedNumberForOverlay.description.substring(0, 150)}...</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xxs mt-1"
                    onClick={() => {
                      setSelectedNumberDef(pairedNumberForOverlay) // Set the paired number as selected
                      setCompareNumberDef(null) // Clear comparison
                      setIsCompareMode(false) // Exit compare mode
                      setIsPopupOpen(true) // Open its details
                      setShowPairOverlay(false) // Close overlay
                    }}
                  >
                    Explore {pairedNumberForOverlay.number} in Detail
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      {/* Popup Dialog for Number Details */}
      <Dialog
        open={isPopupOpen}
        onOpenChange={(open) => {
          if (!open) clearSelection()
          else setIsPopupOpen(true)
        }}
      >
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-slate-200 max-h-[90vh]">
          <ScrollArea className="max-h-[80vh] pr-4">
            {currentPopupData && (
              <>
                <DialogHeader className="mb-3">
                  <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
                    <span className="text-4xl mr-3">{currentPopupData.number}</span> {currentPopupData.title}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400 text-sm">
                    {currentPopupData.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="bg-slate-800/70 p-2 rounded-md border border-slate-700">
                    <h5 className="font-medium text-purple-300 mb-1">Elemental Power</h5>
                    <p className="flex items-center gap-1.5">
                      {getElementIcon(currentPopupData.individualElementalPowerName)}{" "}
                      {currentPopupData.individualElementalPowerName}
                    </p>
                    <p className="text-slate-400 mt-0.5 text-xxs">{currentPopupData.elementalPowerDescription}</p>
                  </div>
                  <div className="bg-slate-800/70 p-2 rounded-md border border-slate-700">
                    <h5 className="font-medium text-purple-300 mb-1">Planetary Ruler</h5>
                    <p className="flex items-center gap-1.5">
                      {getPlanetIcon(currentPopupData.planetaryRulerName)} {currentPopupData.planetaryRulerName}
                    </p>
                    <p className="text-slate-400 mt-0.5 text-xxs">{currentPopupData.planetaryRulerDescription}</p>
                  </div>
                </div>

                <Tabs defaultValue="numerology" className="w-full text-xs">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 h-8">
                    <TabsTrigger value="numerology" className="text-xxs h-6">
                      Numerology
                    </TabsTrigger>
                    <TabsTrigger value="symbolism" className="text-xxs h-6">
                      Symbolism
                    </TabsTrigger>
                    <TabsTrigger value="pairing" className="text-xxs h-6">
                      NUMO Pairing
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="numerology"
                    className="mt-2 p-2 bg-slate-800/50 rounded-md border border-slate-700"
                  >
                    <h5 className="font-medium text-purple-300 mb-1">Numerology Meaning</h5>
                    <p className="text-slate-300 leading-relaxed">{currentPopupData.numerologyMeaning}</p>
                    <div className="mt-1.5">
                      <h5 className="font-medium text-purple-300 mb-0.5">Keywords:</h5>
                      <div className="flex flex-wrap gap-1">
                        {currentPopupData.keywords.map((kw) => (
                          <Badge key={kw} variant="secondary" className="text-xxs bg-slate-700 text-slate-300">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="symbolism"
                    className="mt-2 p-2 bg-slate-800/50 rounded-md border border-slate-700"
                  >
                    <h5 className="font-medium text-purple-300 mb-1">Visual & Geometric Symbolism</h5>
                    <p className="text-slate-300 leading-relaxed">{currentPopupData.visualSymbolism}</p>
                    <p className="mt-1.5 text-slate-400 text-xxs">
                      The 3D shape in the explorer aims to capture some of these symbolic aspects.
                    </p>
                  </TabsContent>
                  <TabsContent value="pairing" className="mt-2 p-2 bg-slate-800/50 rounded-md border border-slate-700">
                    <h5 className="font-medium text-purple-300 mb-1">NUMO System Pairing</h5>
                    <p className="text-slate-300">
                      Paired with: <strong className="text-white">{currentPopupData.pairedWith}</strong>
                    </p>
                    <p className="text-slate-300">
                      Pair Name: <strong className="text-white">{currentPopupData.pairName}</strong>
                    </p>
                    <p className="text-slate-300 mt-1 leading-relaxed">{currentPopupData.pairDescription}</p>
                    <p className="mt-1.5 text-slate-400 text-xxs">
                      This pairing is fundamental to the NUMO Oracle's symmetrical system.
                    </p>
                  </TabsContent>
                </Tabs>

                {isCompareMode &&
                  selectedNumberDef &&
                  compareNumberDef &&
                  selectedNumberDef.number !== compareNumberDef.number && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <h4 className="text-md font-semibold text-pink-400 mb-1.5">
                        Comparison: {selectedNumberDef.number} vs {compareNumberDef.number}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {/* Basic comparison logic - can be expanded */}
                        Comparing <strong className="text-slate-200">{selectedNumberDef.title}</strong> (Element:{" "}
                        {selectedNumberDef.individualElementalPowerName}) with{" "}
                        <strong className="text-slate-200">{compareNumberDef.title}</strong> (Element:{" "}
                        {compareNumberDef.individualElementalPowerName}). Consider how their energies and keywords might
                        interact or complement each other.
                        {selectedNumberDef.pairedWith === compareNumberDef.number &&
                          ` These numbers form the NUMO pair: "${selectedNumberDef.pairName}".`}
                      </p>
                    </div>
                  )}
              </>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
