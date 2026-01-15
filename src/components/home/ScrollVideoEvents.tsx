import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { FileText, Cpu, Map, Zap, Wrench, Brain } from "lucide-react";
import { useFramePreloader } from "@/hooks/useFramePreloader";

// ========== EASY ADJUSTMENTS ==========
const CONFIG = {
  circleRadius: 180,       // Radius for circular button layout
  circleRadiusMobile: 120, // Radius on mobile
};
// ======================================

const iconMap: { [key: string]: any } = {
  FileText, Cpu, Map, Zap, Wrench, Brain,
};

const ScrollVideoEvents = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { images, isLoaded, totalFrames } = useFramePreloader();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Draw frame based on scroll position
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate current frame (0 to totalFrames-1)
      const frameIndex = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      );

      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Maintain aspect ratio
        const scale = Math.max(
          canvas.width / img.naturalWidth,
          canvas.height / img.naturalHeight
        );
        const x = (canvas.width - img.naturalWidth * scale) / 2;
        const y = (canvas.height - img.naturalHeight * scale) / 2;
        
        ctx.drawImage(
          img,
          x, y,
          img.naturalWidth * scale,
          img.naturalHeight * scale
        );
      }

      // Show buttons when near the end
      setShowButtons(progress > 0.85);
    });

    return () => unsubscribe();
  }, [isLoaded, images, scrollYProgress, totalFrames]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = isMobile ? CONFIG.circleRadiusMobile : CONFIG.circleRadius;

  return (
    <section id="events" ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas for video frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />

        {/* Title - visible at start */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Six Unique Universes
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 tracking-wide">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scroll to explore the multiverse
          </p>
        </motion.div>

        {/* Circular event buttons - visible at end */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButtons ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ pointerEvents: showButtons ? "auto" : "none" }}
        >
          <div 
            className="relative"
            style={{ 
              width: (radius * 2) + 150, 
              height: (radius * 2) + 150 
            }}
          >
            {events.map((event, index) => {
              const Icon = iconMap[event.icon];
              const angle = (index / events.length) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={showButtons ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  <Link to={`/events/${event.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card p-3 md:p-4 rounded-full neon-border-green hover:neon-border-purple transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-1 md:gap-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-secondary transition-colors" />
                        </div>
                        <span className="text-[10px] md:text-xs font-cyber text-center text-foreground group-hover:text-primary transition-colors whitespace-nowrap max-w-[60px] md:max-w-[80px] truncate">
                          {event.title.split(' ')[0]}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Center text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showButtons ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <h3 className="font-heading text-xl md:text-2xl font-bold text-primary text-glow-green">
                ENTER
              </h3>
              <p className="text-xs text-muted-foreground">
                Your Universe
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Fallback if frames not loaded */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading experience...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollVideoEvents;
