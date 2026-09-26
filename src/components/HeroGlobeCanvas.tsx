import React, { useEffect, useRef } from 'react';

interface HeroGlobeCanvasProps {
  className?: string;
  isDark?: boolean;
}

interface HubNode {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

export const HeroGlobeCanvas: React.FC<HeroGlobeCanvasProps> = ({ className, isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse drag interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationY = 0.2;
    let rotationX = 0.3;
    let autoRotationSpeed = 0.003;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        rotationY += deltaX * 0.005;
        rotationX += deltaY * 0.005;
        // Clamp X rotation to avoid flipping upside down
        rotationX = Math.max(-1.2, Math.min(1.2, rotationX));
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Major global historic internet hubs
    const hubs: HubNode[] = [
      { name: 'UCLA / Silicon Valley', lat: 34.05, lng: -118.25, color: '#06b6d4' },
      { name: 'CERN Geneva', lat: 46.23, lng: 6.05, color: '#ec4899' },
      { name: 'Cambridge / London', lat: 51.5, lng: -0.12, color: '#3b82f6' },
      { name: 'Tokyo Node', lat: 35.67, lng: 139.65, color: '#10b981' },
      { name: 'Washington / Pentagon', lat: 38.87, lng: -77.05, color: '#8b5cf6' },
      { name: 'Singapore Fiber Hub', lat: 1.35, lng: 103.81, color: '#f59e0b' },
      { name: 'Sydney Pacific Hub', lat: -33.86, lng: 151.2, color: '#06b6d4' },
      { name: 'Frankfurt DE-CIX', lat: 50.11, lng: 8.68, color: '#3b82f6' },
      { name: 'São Paulo Exchange', lat: -23.55, lng: -46.63, color: '#10b981' }
    ];

    // Background stars / ambient particles
    const starCount = 65;
    const stars: { x: number; y: number; size: number; alpha: number; pulseSpeed: number }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    // Packet pulses traveling along arcs
    interface ArcPulse {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }
    const pulses: ArcPulse[] = [
      { fromIdx: 0, toIdx: 1, progress: 0.1, speed: 0.005, color: '#06b6d4' },
      { fromIdx: 1, toIdx: 2, progress: 0.4, speed: 0.006, color: '#ec4899' },
      { fromIdx: 0, toIdx: 3, progress: 0.7, speed: 0.004, color: '#3b82f6' },
      { fromIdx: 1, toIdx: 7, progress: 0.2, speed: 0.007, color: '#10b981' },
      { fromIdx: 3, toIdx: 5, progress: 0.5, speed: 0.005, color: '#f59e0b' },
      { fromIdx: 5, toIdx: 6, progress: 0.8, speed: 0.006, color: '#06b6d4' },
      { fromIdx: 4, toIdx: 0, progress: 0.3, speed: 0.008, color: '#8b5cf6' }
    ];

    const to3D = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return { x, y, z };
    };

    const rotate3D = (p: { x: number; y: number; z: number }, rotX: number, rotY: number) => {
      // Rotate around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    let step = 0;

    const render = () => {
      step++;
      if (!isDragging) {
        rotationY += autoRotationSpeed;
      }

      ctx.clearRect(0, 0, width, height);

      // Render ambient background stars
      stars.forEach((s) => {
        const pulse = Math.sin(step * s.pulseSpeed) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(165, 180, 252, ${s.alpha * pulse})`
          : `rgba(99, 102, 241, ${s.alpha * 0.4 * pulse})`;
        ctx.fill();
      });

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.36;

      // Glow behind the globe
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        globeRadius * 0.2,
        centerX,
        centerY,
        globeRadius * 1.35
      );
      if (isDark) {
        radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        radialGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
        radialGlow.addColorStop(1, 'rgba(6, 8, 20, 0)');
      } else {
        radialGlow.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
        radialGlow.addColorStop(0.7, 'rgba(99, 102, 241, 0.04)');
        radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Outer globe boundary halo
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw latitude circles
      const latSteps = [-60, -30, 0, 30, 60];
      latSteps.forEach((lat) => {
        ctx.beginPath();
        let first = true;
        for (let lng = 0; lng <= 360; lng += 8) {
          const pt3d = to3D(lat, lng, globeRadius);
          const rotated = rotate3D(pt3d, rotationX, rotationY);
          const screenX = centerX + rotated.x;
          const screenY = centerY + rotated.y;

          if (rotated.z > -globeRadius * 0.3) {
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(14, 165, 233, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw longitude circles
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 6) {
          const pt3d = to3D(lat, lng, globeRadius);
          const rotated = rotate3D(pt3d, rotationX, rotationY);
          const screenX = centerX + rotated.x;
          const screenY = centerY + rotated.y;

          if (rotated.z > -globeRadius * 0.3) {
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.14)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw Arcs between hubs
      const hubPoints = hubs.map((hub) => {
        const pt3d = to3D(hub.lat, hub.lng, globeRadius);
        const rotated = rotate3D(pt3d, rotationX, rotationY);
        return {
          ...hub,
          screenX: centerX + rotated.x,
          screenY: centerY + rotated.y,
          z: rotated.z
        };
      });

      // Connections between select hubs
      const connections: [number, number][] = [
        [0, 1], // US West -> CERN
        [1, 2], // CERN -> UK
        [0, 3], // US West -> Tokyo
        [1, 7], // CERN -> Frankfurt
        [3, 5], // Tokyo -> Singapore
        [5, 6], // Singapore -> Sydney
        [4, 0], // Washington -> West Coast
        [4, 8], // Washington -> Brazil
        [7, 3]  // Europe -> Asia
      ];

      connections.forEach(([i1, i2]) => {
        const p1 = hubPoints[i1];
        const p2 = hubPoints[i2];
        if (!p1 || !p2) return;

        // Draw arc if at least one node is partially facing the viewer
        if (p1.z > -globeRadius * 0.5 || p2.z > -globeRadius * 0.5) {
          ctx.beginPath();
          ctx.moveTo(p1.screenX, p1.screenY);

          // Control point pulled out for 3D curvature arc
          const midX = (p1.screenX + p2.screenX) / 2;
          const midY = (p1.screenY + p2.screenY) / 2;
          const dist = Math.hypot(p2.screenX - p1.screenX, p2.screenY - p1.screenY);
          const arcLift = Math.min(50, dist * 0.2);

          ctx.quadraticCurveTo(midX, midY - arcLift, p2.screenX, p2.screenY);
          ctx.strokeStyle = isDark ? 'rgba(6, 182, 212, 0.35)' : 'rgba(14, 165, 233, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // Update and draw traveling data packet pulses
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
        }

        const p1 = hubPoints[pulse.fromIdx];
        const p2 = hubPoints[pulse.toIdx];
        if (!p1 || !p2) return;

        const t = pulse.progress;
        const midX = (p1.screenX + p2.screenX) / 2;
        const midY = (p1.screenY + p2.screenY) / 2;
        const dist = Math.hypot(p2.screenX - p1.screenX, p2.screenY - p1.screenY);
        const arcLift = Math.min(50, dist * 0.2);

        // Quadratic Bezier interpolation
        const invT = 1 - t;
        const pulseX = invT * invT * p1.screenX + 2 * invT * t * midX + t * t * p2.screenX;
        const pulseY = invT * invT * p1.screenY + 2 * invT * t * (midY - arcLift) + t * t * p2.screenY;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Hub Nodes
      hubPoints.forEach((node) => {
        const isFacing = node.z > 0;
        const alpha = isFacing ? 1 : Math.max(0.15, (node.z + globeRadius) / globeRadius);

        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, isFacing ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isFacing ? 12 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Glowing outer pulse ring on front-facing hubs
        if (isFacing) {
          const pulseR = 5 + Math.sin(step * 0.08) * 3;
          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Label
          ctx.font = '10px "Space Grotesk", monospace';
          ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
          ctx.fillText(node.name, node.screenX + 8, node.screenY + 3);
        }
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDark]);

  return (
    <div className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className || ''}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-3 right-4 pointer-events-none text-[11px] font-mono tracking-wider opacity-60 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>INTERACTIVE ROTATING 3D GLOBAL NETWORK (DRAG TO ROTATE)</span>
      </div>
    </div>
  );
};
