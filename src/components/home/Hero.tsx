import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

// Easy to change hero images - just update these imports
import heroBack from "@/assets/hero-multiverse.jpg";
import heroFront from "@/assets/event-expo.jpg";

// ========== EASY ADJUSTMENTS ==========
const CURSOR_RADIUS = 120; // Adjust cursor reveal radius here (in pixels)
// ======================================

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorColor, setCursorColor] = useState<'green' | 'purple'>('green');
  const [isLoaded, setIsLoaded] = useState(false);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const targetDate = new Date("2026-03-15T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Interactive element detection for cursor color change
  useEffect(() => {
    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive');
      
      setCursorColor(isInteractive ? 'purple' : 'green');
    };

    window.addEventListener('mouseover', checkInteractive);
    return () => window.removeEventListener('mouseover', checkInteractive);
  }, []);

  // Mouse tracking for cursor reveal
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      const front = frontRef.current;
      const cursor = cursorRef.current;
      
      if (!hero || !front || !cursor) return;

      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update mask position using CSS custom properties
      front.style.setProperty("--x", `${x}px`);
      front.style.setProperty("--y", `${y}px`);

      // Update custom cursor position
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("opacity-0");
        cursorRef.current.classList.add("opacity-100");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("opacity-100");
        cursorRef.current.classList.add("opacity-0");
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", handleMouseEnter);
      hero.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseenter", handleMouseEnter);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  return (
    <>
      {/* Custom Cursor - Shows outside hero too for color changes */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 liquid-cursor`}
          style={{
            width: CURSOR_RADIUS * 2,
            height: CURSOR_RADIUS * 2,
            background: cursorColor === 'green' 
              ? "radial-gradient(circle, hsl(136 100% 50% / 0.3) 0%, hsl(136 100% 50% / 0.1) 40%, transparent 70%)"
              : "radial-gradient(circle, hsl(280 99% 54% / 0.3) 0%, hsl(280 99% 54% / 0.1) 40%, transparent 70%)",
            boxShadow: cursorColor === 'green'
              ? "0 0 30px hsl(136 100% 50% / 0.4)"
              : "0 0 30px hsl(280 99% 54% / 0.4)",
          }}
        />
      )}

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden cursor-none"
      >
        {/* Back Image (revealed on hover) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBack})` }}
        />

        {/* Front Image (with mask) */}
        <div
          ref={frontRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-[mask-position] duration-75"
          style={{
            backgroundImage: `url(${heroFront})`,
            maskImage: `radial-gradient(circle ${CURSOR_RADIUS}px at var(--x, -200px) var(--y, -200px), transparent 0%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${CURSOR_RADIUS}px at var(--x, -200px) var(--y, -200px), transparent 0%, black 100%)`,
          }}
        />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Logo */}
          <motion.img
            src={logo}
            alt="UPAGRAHA Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-32 md:w-40 md:h-40 mb-6 object-contain"
          />

          {/* Department */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-cyber text-xs tracking-[0.3em] text-primary/80 mb-4"
          >
            Electronics & Communication Engineering
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-primary text-glow-green">UPAGRAHA</span>
            <span className="text-secondary">'26</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            National Level Technical Symposium
          </motion.p>

          {/* Date & Location */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-cyber text-xs tracking-wider text-primary/70 mb-10"
          >
            MARCH 2026 • SVCE, CHENNAI
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-4 md:gap-6 mb-8"
          >
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Mins" },
              { value: timeLeft.seconds, label: "Secs" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card px-3 py-2 md:px-4 md:py-3 neon-border-green"
              >
                <div className="text-xl md:text-2xl font-bold text-primary font-cyber">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/events"
              className="interactive px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-[0_0_20px_hsl(136_100%_50%/0.5)] transition-all duration-300 font-cyber text-sm"
            >
              Register Now
            </Link>
            <Link
              to="/events"
              className="interactive px-8 py-3 border border-primary/50 text-primary font-bold rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300 font-cyber text-sm"
            >
              Explore Events
            </Link>
          </motion.div>

          {/* Mobile touch hint */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2"
            >
              <p className="text-xs text-muted-foreground">
                View on desktop for interactive effect
              </p>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cyber text-[10px] text-muted-foreground tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
