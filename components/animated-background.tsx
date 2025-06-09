"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          x:
            particle.x > window.innerWidth
              ? 0
              : particle.x < 0
              ? window.innerWidth
              : particle.x,
          y:
            particle.y > window.innerHeight
              ? 0
              : particle.y < 0
              ? window.innerHeight
              : particle.y,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    const resizeHandler = () => createParticles();

    window.addEventListener("resize", resizeHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Radial gradients for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
}
