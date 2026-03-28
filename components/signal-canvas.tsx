"use client";

import { useEffect, useRef } from "react";

type SignalCanvasProps = {
  progress: number;
};

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function blendColor(progress: number) {
  const teal = [36, 244, 208];
  const red = [255, 84, 84];

  return {
    stroke: `rgba(${Math.round(mix(teal[0], red[0], progress))}, ${Math.round(mix(teal[1], red[1], progress))}, ${Math.round(mix(teal[2], red[2], progress))}, 0.26)`,
    node: `rgba(${Math.round(mix(212, 255, progress))}, ${Math.round(mix(255, 191, progress))}, ${Math.round(mix(246, 191, progress))}, 0.9)`,
    glow: `rgba(${Math.round(mix(32, 255, progress))}, ${Math.round(mix(205, 89, progress))}, ${Math.round(mix(179, 89, progress))}, 0.15)`,
  };
}

export function SignalCanvas({ progress }: SignalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: NodePoint[] = [];

    const initialiseNodes = () => {
      const count = width < 768 ? 22 : 42;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.8 + 1.1,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      initialiseNodes();
    };

    const draw = () => {
      const colors = blendColor(progressRef.current);

      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.18, height * 0.12, 0, width * 0.18, height * 0.12, width * 0.42);
      glow.addColorStop(0, colors.glow);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      if (!reducedMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }

      const threshold = width < 768 ? 110 : 155;

      for (let index = 0; index < nodes.length; index += 1) {
        const source = nodes[index];

        for (let inner = index + 1; inner < nodes.length; inner += 1) {
          const target = nodes[inner];
          const dx = source.x - target.x;
          const dy = source.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > threshold) {
            continue;
          }

          context.strokeStyle = colors.stroke.replace("0.26", `${((threshold - distance) / threshold) * 0.32}`);
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(source.x, source.y);
          context.lineTo(target.x, target.y);
          context.stroke();
        }
      }

      for (const node of nodes) {
        context.fillStyle = colors.node;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="signal-canvas" />;
}
