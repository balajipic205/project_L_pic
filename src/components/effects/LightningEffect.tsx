import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Lightning {
  id: number;
  x: number;
  delay: number;
}

const LightningEffect = () => {
  const [lightnings, setLightnings] = useState<Lightning[]>([]);

  useEffect(() => {
    const createLightning = () => {
      const id = Date.now();
      const x = Math.random() * 100;
      const delay = Math.random() * 0.5;

      setLightnings((prev) => [...prev, { id, x, delay }]);

      // Remove lightning after animation
      setTimeout(() => {
        setLightnings((prev) => prev.filter((l) => l.id !== id));
      }, 1500);
    };

    // Random lightning strikes
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createLightning();
      }
    }, 3000);

    // Initial lightning
    setTimeout(createLightning, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={lightning.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: lightning.delay,
              times: [0, 0.1, 0.2, 0.3, 1],
            }}
            className="absolute top-0"
            style={{ left: `${lightning.x}%` }}
          >
            {/* Main lightning bolt */}
            <svg
              width="100"
              height="600"
              viewBox="0 0 100 600"
              className="opacity-80"
            >
              <defs>
                <filter id={`glow-${lightning.id}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id={`lightning-gradient-${lightning.id}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(136 100% 50%)" stopOpacity="1" />
                  <stop offset="50%" stopColor="hsl(136 100% 60%)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(136 100% 50%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Lightning path */}
              <motion.path
                d={generateLightningPath()}
                stroke={`url(#lightning-gradient-${lightning.id})`}
                strokeWidth="2"
                fill="none"
                filter={`url(#glow-${lightning.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              
              {/* Thinner bright core */}
              <motion.path
                d={generateLightningPath()}
                stroke="hsl(136 100% 80%)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.15 }}
              />
            </svg>

            {/* Glow effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-96 opacity-30"
              style={{
                background: "radial-gradient(ellipse at center, hsl(136 100% 50% / 0.4) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient flash effect */}
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={`flash-${lightning.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.3, delay: lightning.delay }}
            className="absolute inset-0 bg-primary/5"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Generate random lightning bolt path
const generateLightningPath = (): string => {
  let path = "M 50 0";
  let x = 50;
  let y = 0;
  const segments = 12 + Math.floor(Math.random() * 8);

  for (let i = 0; i < segments; i++) {
    const newX = x + (Math.random() - 0.5) * 40;
    const newY = y + 30 + Math.random() * 30;
    path += ` L ${Math.max(10, Math.min(90, newX))} ${newY}`;
    x = newX;
    y = newY;

    // Occasional branch
    if (Math.random() > 0.7 && i > 2 && i < segments - 2) {
      const branchX = x + (Math.random() - 0.5) * 60;
      const branchY = y + 40 + Math.random() * 40;
      path += ` M ${x} ${y} L ${branchX} ${branchY} M ${x} ${y}`;
    }
  }

  return path;
};

export default LightningEffect;
