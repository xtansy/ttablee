import styles from "./styles.module.scss";

import React, { useEffect, useRef, useState } from "react";
import { type ParticleState } from "./types";

const PARTICLE_COUNT = 50;

const createInitialParticles = (): ParticleState[] => {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const size = Math.random() * 3 + 1;
    return {
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size,
      opacity: Math.random() * 0.5 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
    };
  });
};

export const Particles: React.FC = () => {
  const [particles, setParticles] = useState<ParticleState[]>(
    createInitialParticles
  );
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          if (newX > window.innerWidth) newX = 0;
          else if (newX < 0) newX = window.innerWidth;

          if (newY > window.innerHeight) newY = 0;
          else if (newY < 0) newY = window.innerHeight;

          return { ...p, x: newX, y: newY };
        })
      );

      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: Math.min(p.x, window.innerWidth),
          y: Math.min(p.y, window.innerHeight),
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.particlesContainer}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
