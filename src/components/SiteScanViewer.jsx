import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Grid, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Camera Stats Component
 * Displays real-time camera position, zoom, and angles
 */
function CameraStats({ onUpdate, controlsRef }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (controlsRef.current && camera) {
      const controls = controlsRef.current;
      const distance = camera.position.distanceTo(controls.target);
      
      // Calculate zoom percentage (inverse of distance, normalized)
      const minDist = 0.25;
      const maxDist = 0.5;
      const zoomPercent = ((maxDist - distance) / (maxDist - minDist)) * 100;
      
      // Calculate angles
      const vec = new THREE.Vector3();
      vec.subVectors(camera.position, controls.target);
      
      // Azimuthal angle (horizontal rotation) in degrees
      const azimuthal = Math.atan2(vec.x, vec.z) * (180 / Math.PI);
      
      // Polar angle (vertical rotation) in degrees
      // Clamp value to [-1, 1] to prevent NaN from floating point precision errors
      const cosValue = Math.max(-1, Math.min(1, vec.y / distance));
      const polar = Math.acos(cosValue) * (180 / Math.PI);
      
      onUpdate({
        zoom: Math.max(0, Math.min(100, zoomPercent)),
        distance: distance,
        azimuthal: azimuthal,
        polar: polar
      });
    }
  });
  
  return null;
}

/**
 * SiteScan Model Component
 * Loads and displays the photogrammetry site scan GLB model
 */
function SiteScanModel({ url, autoRotate }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const [bbox, setBbox] = useState(null);
  
  useEffect(() => {
    if (scene) {
      // Calculate bounding box for proper camera positioning
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      console.log('Model bounds:', { center, size });
      setBbox({ center, size });
      
      // Center the model
      scene.position.set(-center.x, -center.y, -center.z);
      
      // Scale down if model is too large
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 50) {
        const scale = 50 / maxDim;
        scene.scale.set(scale, scale, scale);
        console.log('Scaled model by:', scale);
      }
      
      // Optimize materials
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Ensure materials are properly set up
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);
  
  useFrame(() => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1}
    />
  );
}

/**
 * Loading Fallback Component
 */
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4a90e2" wireframe />
    </mesh>
  );
}

/**
 * Scene Lighting Setup
 */
function SceneLighting() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light (sun) */}
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      
      {/* Fill lights */}
      <directionalLight position={[-30, 20, -30]} intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.3} />
      
      {/* Hemisphere light for realistic outdoor lighting */}
      <hemisphereLight
        color="#87CEEB"  // Sky color
        groundColor="#8B7355"  // Ground color
        intensity={0.4}
      />
    </>
  );
}

/**
 * Main SiteScan Viewer Component
 */
export default function SiteScanViewer({ 
  modelUrl = '/street.glb',
  showGrid = true,
  autoRotate = false,
  enableZoom = true,
  className = ''
}) {
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ loaded: false });
  const [cameraStats, setCameraStats] = useState({
    zoom: 0,
    distance: 0,
    azimuthal: 0,
    polar: 0
  });
  const controlsRef = useRef();
  
  useEffect(() => {
    // Preload the model
    useGLTF.preload(modelUrl);
    
    return () => {
      // Cleanup
      useGLTF.clear(modelUrl);
    };
  }, [modelUrl]);
  
  const handleError = (error) => {
    console.error('Error loading 3D model:', error);
    setError(error.message);
  };
  
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Info Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
        <h3 className="font-bold text-lg mb-1">3D Building Viewer</h3>
        <p className="text-sm opacity-80">
          {error ? '❌ Error loading model' : stats.loaded ? '✅ Model loaded' : '⏳ Loading...'}
        </p>
        <div className="text-xs mt-2 opacity-60">
          <p>🖱️ Left drag: Rotate</p>
          <p>🖱️ Right drag: Pan</p>
          <p>🖱️ Scroll: Zoom</p>
        </div>
      </div>
      
      {/* Controls Panel */}
      <div className="absolute top-4 right-4 z-10 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm text-xs">
        <p>Format: GLB</p>
        <p>Size: 3.9 MB</p>
        <p>Type: City Scene</p>
      </div>
      
      {/* Camera Stats Panel */}
      <div className="absolute bottom-24 right-4 z-10 bg-black/80 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
        <h4 className="font-bold text-sm mb-2 text-blue-400">Camera Info</h4>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Zoom:</span>
            <span className="text-green-400 font-bold">{cameraStats.zoom.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Distance:</span>
            <span className="text-white">{cameraStats.distance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Azimuth:</span>
            <span className="text-yellow-400">{cameraStats.azimuthal.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Polar:</span>
            <span className="text-yellow-400">{cameraStats.polar.toFixed(1)}°</span>
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-red-900/20">
          <div className="bg-red-600 text-white px-6 py-4 rounded-lg max-w-md">
            <h4 className="font-bold mb-2">Failed to load model</h4>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          setStats({ loaded: true });
        }}
      >
        {/* Camera */}
        <PerspectiveCamera 
          makeDefault 
          position={[11.2, 21.8, 0.2]} 
          fov={90}
          near={0.1}
          far={5000}
        />
        
        {/* Lighting */}
        <SceneLighting />
        
        {/* Environment Map for reflections */}
        <Environment preset="sunset" />
        
        {/* Main Model */}
        <Suspense fallback={<LoadingFallback />}>
          <SiteScanModel 
            url={modelUrl} 
            autoRotate={autoRotate}
          />
        </Suspense>
        
        {/* Ground Grid */}
        {showGrid && (
          <Grid
            args={[100, 100]}
            cellSize={5}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={25}
            sectionThickness={1}
            sectionColor="#9ca3af"
            fadeDistance={200}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={false}
            position={[0, -1, 0]}
          />
        )}
        
        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          panSpeed={0.8}
          minDistance={0.25}
          maxDistance={0.5}
          minPolarAngle={20 * (Math.PI / 180)}
          maxPolarAngle={45 * (Math.PI / 180)}
          enableZoom={enableZoom}
          enablePan={true}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
          target={[0, 0, 0]}
        />
        
        {/* Camera Stats Tracker */}
        <CameraStats onUpdate={setCameraStats} controlsRef={controlsRef} />
      </Canvas>
    </div>
  );
}

// Preload the model for better performance
useGLTF.preload('/street.glb');

