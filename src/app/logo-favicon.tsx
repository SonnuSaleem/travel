'use client';

import { useEffect, useRef, useState } from 'react';
import StandaloneLogo from '@/components/StandaloneLogo';
import Image from 'next/image';

export default function LogoFavicon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoSizes, setLogoSizes] = useState({
    favicon16: '',
    favicon32: '',
    favicon64: '',
    favicon128: '',
    favicon256: '',
    appleTouch: '',
  });
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Generate the logos once on client side
  useEffect(() => {
    const renderLogoToCanvas = async (size: number): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve('');
          return;
        }
        
        // Draw a circular background
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
        ctx.fillStyle = '#2A2A42';
        ctx.fill();
        
        // Create a thin white border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = size / 100;
        ctx.stroke();
        
        // Load the tree image
        const treeImg = document.createElement('img');
        treeImg.crossOrigin = 'anonymous';
        treeImg.onload = () => {
          // Calculate tree dimensions (60% of canvas size)
          const treeSize = Math.round(size * 0.6);
          const treeX = (size - treeSize) / 2;
          const treeY = (size - treeSize) / 3;
          
          // Draw the tree in the center
          ctx.drawImage(treeImg, treeX, treeY, treeSize, treeSize);
          
          // Only add text for sizes 32px and larger
          if (size >= 32) {
            // Add "SF" text at the bottom
            const fontSize = Math.max(size * 0.15, 10);
            ctx.font = `300 ${fontSize}px Oswald, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SF', size/2, size * 0.75);
          }
          
          resolve(canvas.toDataURL('image/png'));
        };
        
        treeImg.onerror = () => {
          console.error('Error loading tree image');
          resolve('');
        };
        
        treeImg.src = '/tree.png';
      });
    };

    async function generateLogos() {
      try {
        const favicon16 = await renderLogoToCanvas(16);
        const favicon32 = await renderLogoToCanvas(32);
        const favicon64 = await renderLogoToCanvas(64);
        const favicon128 = await renderLogoToCanvas(128);
        const favicon256 = await renderLogoToCanvas(256);
        const appleTouch = await renderLogoToCanvas(180);
        
        setLogoSizes({
          favicon16,
          favicon32,
          favicon64,
          favicon128,
          favicon256,
          appleTouch,
        });
        
        setLoaded(true);
      } catch (error) {
        console.error('Error generating logos:', error);
      }
    }

    generateLogos();
  }, []);

  const copyInstructions = () => {
    const instructions = `
// Add these lines to your layout.tsx file inside the <head> section:

<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
    `;
    
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-light p-8">
      <h1 className="text-2xl font-bold text-light mb-6">Logo & Favicon Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-light mb-4">Logo Preview</h2>
          <div className="bg-dark p-8 rounded-lg flex items-center justify-center">
            <StandaloneLogo size={200} animated={true} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-light mb-4">Favicon Sizes</h2>
          {!loaded ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <img src={logoSizes.favicon16} alt="Favicon 16x16" className="border border-dark" />
                <span className="text-light-dark text-sm mt-1">16x16</span>
                <a href={logoSizes.favicon16} download="favicon-16x16.png" className="text-primary text-xs mt-1">Download</a>
              </div>
              <div className="flex flex-col items-center">
                <img src={logoSizes.favicon32} alt="Favicon 32x32" className="border border-dark" />
                <span className="text-light-dark text-sm mt-1">32x32</span>
                <a href={logoSizes.favicon32} download="favicon-32x32.png" className="text-primary text-xs mt-1">Download</a>
              </div>
              <div className="flex flex-col items-center">
                <img src={logoSizes.favicon64} alt="Favicon 64x64" className="border border-dark" />
                <span className="text-light-dark text-sm mt-1">64x64</span>
                <a href={logoSizes.favicon64} download="favicon-64x64.png" className="text-primary text-xs mt-1">Download</a>
              </div>
              <div className="flex flex-col items-center">
                <img src={logoSizes.favicon128} alt="Favicon 128x128" className="border border-dark" style={{ width: '64px', height: 'auto' }} />
                <span className="text-light-dark text-sm mt-1">128x128</span>
                <a href={logoSizes.favicon128} download="favicon-128x128.png" className="text-primary text-xs mt-1">Download</a>
              </div>
              <div className="flex flex-col items-center">
                <img src={logoSizes.favicon256} alt="Favicon 256x256" className="border border-dark" style={{ width: '64px', height: 'auto' }} />
                <span className="text-light-dark text-sm mt-1">256x256</span>
                <a href={logoSizes.favicon256} download="favicon-256x256.png" className="text-primary text-xs mt-1">Download</a>
              </div>
              <div className="flex flex-col items-center">
                <img src={logoSizes.appleTouch} alt="Apple Touch" className="border border-dark" style={{ width: '64px', height: 'auto' }} />
                <span className="text-light-dark text-sm mt-1">180x180</span>
                <a href={logoSizes.appleTouch} download="apple-touch-icon.png" className="text-primary text-xs mt-1">Download</a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-light mb-4">Instructions</h2>
        <div className="bg-dark p-4 rounded-lg">
          <p className="text-light-dark mb-4">
            1. Download all favicon sizes and place them in your <code className="bg-dark-light px-1 py-0.5 rounded">public</code> folder.
          </p>
          <p className="text-light-dark mb-4">
            2. Add the following code to your <code className="bg-dark-light px-1 py-0.5 rounded">layout.tsx</code> file in the <code className="bg-dark-light px-1 py-0.5 rounded">&lt;head&gt;</code> section:
          </p>
          <pre className="bg-dark-light p-4 rounded-lg text-light overflow-x-auto text-sm">
{`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`}
          </pre>
          <button 
            className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded"
            onClick={copyInstructions}
          >
            {copied ? 'Copied!' : 'Copy Instructions'}
          </button>
        </div>
      </div>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
} 