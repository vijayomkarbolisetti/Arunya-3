import { useState } from 'react';
import SiteScanViewer from '../components/SiteScanViewer';

/**
 * Site Scan Demo Page
 * Demonstrates the ODM photogrammetry to React Three Fiber pipeline
 */
export default function SiteScanPage() {
  const [autoRotate, setAutoRotate] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              3D Building Viewer
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Interactive 3D City Scene with React Three Fiber
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Auto Rotate
            </label>
            
            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Show Grid
            </label>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>
      
      {/* 3D Viewer */}
      <div className="w-full h-full pt-20">
        <SiteScanViewer
          modelUrl="/street.glb"
          showGrid={showGrid}
          autoRotate={autoRotate}
          enableZoom={true}
          className="w-full h-full"
        />
      </div>
      
      {/* Footer Info */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md border-t border-white/10 px-6 py-3">
        <div className="container mx-auto flex items-center justify-between text-sm text-white/70">
          <div>
            <span className="font-semibold text-white">Model:</span> City Scene GLB
          </div>
          <div>
            <span className="font-semibold text-white">Tech:</span> Three.js · React Three Fiber · Drei
          </div>
        </div>
      </footer>
    </div>
  );
}

