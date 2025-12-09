import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Grid, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { villaDetails } from '../constants/villaDetails';
import { useNavigate } from 'react-router-dom';
import PhoneVerificationPopup from './PhoneVerificationPopup';

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
      
      // Calculate zoom percentage (inverse of distance, no limits)
      // Using logarithmic scale for better representation across wide range
      const zoomPercent = Math.max(0, Math.min(500, (1 / distance) * 10));
      
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
 * 3D Marker Component
 * Proper location pin icon (teardrop shape) - renders on top, always visible
 */
function VillaMarker({ position, villaId, onClick, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const villa = villaDetails[villaId];
  
  if (!villa) return null;
  
  // Always red color for visibility - darker red when selected/hovered
  const pinColor = isSelected ? '#dc2626' : (hovered ? '#ef4444' : '#ef4444');
  const emissiveColor = isSelected ? '#dc2626' : (hovered ? '#ef4444' : '#ef4444');
  
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
  };
  
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(villaId);
  };
  
  return (
    <group position={position} renderOrder={1000}>
      {/* Location Icon using HTML/SVG - Proper location pin icon */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: 'auto' }}
        zIndexRange={[1000, 0]}
      >
        <div
          onMouseEnter={handlePointerOver}
          onMouseLeave={handlePointerOut}
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            transform: hovered || isSelected ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease',
            filter: isSelected ? 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.8))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        >
          {/* Location Pin Icon SVG */}
          <svg
            width="40"
            height="50"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Black outline */}
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20C24 5.373 18.627 0 12 0z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1"
            />
            {/* Red body */}
            <path
              d="M12 1C5.925 1 1 5.925 1 12c0 7.25 11 18.5 11 18.5s11-11.25 11-18.5C23 5.925 18.075 1 12 1z"
              fill={pinColor}
            />
            {/* White circle in center */}
            <circle cx="12" cy="12" r="4" fill="#ffffff" />
          </svg>
        </div>
      </Html>
      
      {/* Clickable area for better interaction */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[2.0, 16, 16]} />
        <meshStandardMaterial 
          transparent
          opacity={0}
          visible={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Villa Modal Component
 * Displays villa details with image on left and data on right
 */
function VillaModal({ villaId, isOpen, onClose }) {
  const villa = villaDetails[villaId];
  const navigate = useNavigate();
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  
  if (!isOpen || !villa) return null;
  
  const handleViewFullDetails = () => {
    // Check if phone is verified in localStorage
    const verified = localStorage.getItem("phoneVerified");
    
    if (verified !== "true") {
      // Show phone popup if not verified
      setShowPhonePopup(true);
      return;
    }
    
    // If verified, navigate to villa detail page
    onClose(); // Close modal first
    navigate(`/villa/${villaId}`);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  
  const handlePhoneSuccess = () => {
    // Close the modal and navigate after phone verification
    onClose();
    navigate(`/villa/${villaId}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => {
        // Don't close if phone popup is open
        if (!showPhonePopup) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex-shrink-0">
          <img
            src={villa.hero.image}
            alt={villa.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        
        {/* Right side - Data */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{villa.name}</h2>
              <p className="text-lg text-gray-600 italic">{villa.tagline}</p>
            </div>
            
            {/* Price and Size */}
            <div className="flex flex-wrap gap-4 py-3 border-y border-gray-200">
              <div>
                <span className="text-sm text-gray-500">Price</span>
                <p className="text-xl font-bold text-gray-900">{villa.price}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Built-up Area</span>
                <p className="text-xl font-bold text-gray-900">{villa.sqft}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Plot Size</span>
                <p className="text-xl font-bold text-gray-900">{villa.plotSize}</p>
              </div>
            </div>
            
            {/* Overview */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{villa.overview.title}</h3>
              <p className="text-gray-700 leading-relaxed">{villa.overview.description}</p>
            </div>
            
            {/* Highlights */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {villa.overview.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            
            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-600">Bedrooms:</span> <span className="font-semibold">{villa.specifications.bedrooms}</span></div>
                <div><span className="text-gray-600">Bathrooms:</span> <span className="font-semibold">{villa.specifications.bathrooms}</span></div>
                <div><span className="text-gray-600">Floors:</span> <span className="font-semibold">{villa.specifications.floors}</span></div>
                <div><span className="text-gray-600">Parking:</span> <span className="font-semibold">{villa.specifications.parking}</span></div>
                <div><span className="text-gray-600">Balconies:</span> <span className="font-semibold">{villa.specifications.balconies}</span></div>
                <div><span className="text-gray-600">Ceiling:</span> <span className="font-semibold">{villa.specifications.ceiling}</span></div>
              </div>
            </div>
            
            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {villa.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-semibold text-gray-900">{feature.title}:</span>
                    <span className="text-gray-700 ml-2">{feature.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* View Full Details Button */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={handleViewFullDetails}
                className="w-full bg-dark-brown hover:bg-mid-brown text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phone Verification Popup - Reusable Component */}
      <PhoneVerificationPopup
        isOpen={showPhonePopup}
        onClose={() => setShowPhonePopup(false)}
        onSuccess={handlePhoneSuccess}
        pendingVillaId={villaId}
      />
    </div>
  );
}

/**
 * Component to disable Ctrl+drag in OrbitControls
 * Runs inside Canvas to have access to controls
 */
function DisableCtrlDrag({ controlsRef }) {
  const [ctrlPressed, setCtrlPressed] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        setCtrlPressed(true);
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        setCtrlPressed(false);
        // Delay re-enable to ensure mouse events are cleared
        setTimeout(() => {
          if (controlsRef.current && !e.ctrlKey && !e.metaKey) {
            controlsRef.current.enabled = true;
          }
        }, 100);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [controlsRef]);
  
  // Continuously disable controls if Ctrl is pressed
  useFrame(() => {
    if (!controlsRef.current) return;
    
    if (ctrlPressed) {
      if (controlsRef.current.enabled) {
        controlsRef.current.enabled = false;
      }
    }
  });
  
  return null;
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
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controlsRef = useRef();
  
  // Villa marker positions - Fixed positions on TOP of rooftops
  // Y position must be HIGH above the buildings to be visible on top
  // Camera is at Y=21.8, so buildings are below that
  // Using Y=20+ to ensure pins are clearly on top of rooftops
  const villaMarkers = [
    { id: 'the-grove', position: [8, 20, 8] },        // Y=20 for rooftop (on top)
    { id: 'the-estate', position: [-8, 20, -8] },     // Y=20 for rooftop (on top)
    { id: 'the-courtyard', position: [0, 20, -10] },   // Y=20 for rooftop (on top)
  ];
  
  const handleMarkerClick = (villaId) => {
    setSelectedVilla(villaId);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVilla(null);
  };
  
  useEffect(() => {
    // Preload the model
    useGLTF.preload(modelUrl);
    
    return () => {
      // Cleanup
      useGLTF.clear(modelUrl);
    };
  }, [modelUrl]);
  
  // Disable Ctrl+drag functionality completely
  useEffect(() => {
    if (!controlsRef.current) return;
    
    const controls = controlsRef.current;
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // Store original mouse button configuration
    const originalMouseButtons = controls.mouseButtons;
    
    // Completely disable Ctrl+drag by modifying mouse button handling
    // In OrbitControls, Ctrl+LEFT mouse button triggers pan
    // We'll override this behavior
    
    // Override the getMouseAction method if it exists
    const originalGetMouseAction = controls.getMouseAction;
    if (originalGetMouseAction) {
      controls.getMouseAction = function(event) {
        // If Ctrl is pressed, return null to disable action
        if (event.ctrlKey || event.metaKey) {
          return null;
        }
        return originalGetMouseAction.call(this, event);
      };
    }
    
    // Also intercept at the DOM level with highest priority
    const handleMouseDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Force stop any drag operation
        if (controls) {
          controls.enabled = false;
          // Reset camera position if it was moved
          controls.update();
          setTimeout(() => {
            if (controls) {
              controls.enabled = true;
            }
          }, 50);
        }
        return false;
      }
    };
    
    const handleMouseMove = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.buttons > 0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // Force stop drag
        if (controls) {
          controls.enabled = false;
          controls.update();
          setTimeout(() => {
            if (controls) {
              controls.enabled = true;
            }
          }, 10);
        }
        return false;
      }
    };
    
    // Disable controls when Ctrl is pressed
    const handleKeyDown = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        if (controls) {
          controls.enabled = false;
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        // Small delay to ensure mouse events are cleared
        setTimeout(() => {
          if (controls && !e.ctrlKey && !e.metaKey) {
            controls.enabled = true;
          }
        }, 10);
      }
    };
    
    // Add event listeners with highest priority (capture phase, non-passive)
    canvas.addEventListener('mousedown', handleMouseDown, { capture: true, passive: false });
    canvas.addEventListener('mousemove', handleMouseMove, { capture: true, passive: false });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    
    return () => {
      // Restore original methods
      if (originalGetMouseAction) {
        controls.getMouseAction = originalGetMouseAction;
      }
      if (originalMouseButtons) {
        controls.mouseButtons = originalMouseButtons;
      }
      canvas.removeEventListener('mousedown', handleMouseDown, { capture: true });
      canvas.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
    };
  }, [stats.loaded, controlsRef.current]); // Run after canvas and controls are ready
  
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
          near={0.0001}
          far={10000}
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
          minDistance={30}
          maxDistance={50}
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
        
        {/* Disable Ctrl+drag */}
        <DisableCtrlDrag controlsRef={controlsRef} />
        
        {/* Villa Markers - Red location pins on rooftops - Hide when modal is open */}
        {!isModalOpen && villaMarkers.map((marker) => {
          const villa = villaDetails[marker.id];
          if (!villa) {
            console.warn(`Villa marker skipped - villa not found: ${marker.id}`);
            return null;
          }
          return (
            <VillaMarker
              key={marker.id}
              position={marker.position}
              villaId={marker.id}
              onClick={handleMarkerClick}
              isSelected={selectedVilla === marker.id}
            />
          );
        })}
      </Canvas>
      
      {/* Villa Modal */}
      <VillaModal
        villaId={selectedVilla}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

// Preload the model for better performance
useGLTF.preload('/street.glb');

