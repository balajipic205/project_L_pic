import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

// ========== EASY ADJUSTMENTS ==========
export const HERO_CURSOR_RADIUS = 100; // Radius of the reveal circle in pixels
// ======================================

// Hero images - easy to change
import heroBack from "@/assets/TVA.svg";
import heroFront from "@/assets/space-hel.svg";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Countdown timer - TARGET DATE: 19th Feb 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const targetDate = new Date("2026-02-19T00:00:00").getTime();

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

  // Mouse tracking for cursor reveal and custom cursor
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

      // Update mask position
      front.style.setProperty("--x", `${x}px`);
      front.style.setProperty("--y", `${y}px`);

      // Update custom cursor position
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

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

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Custom Cursor - Green gemstone with reveal radius indicator */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: '-100px',
            top: '-100px',
          }}
        >
          {/* Green gemstone center */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 16,
              height: 16,
              background: "radial-gradient(circle at 30% 30%, hsl(136 100% 70%), hsl(136 100% 50%) 50%, hsl(136 100% 30%))",
              boxShadow: "0 0 15px hsl(136 100% 50% / 0.8), 0 0 30px hsl(136 100% 50% / 0.5), inset 0 0 5px hsl(136 100% 80%)",
            }}
          />
        </div>
      )}

      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen overflow-hidden cursor-none"
      >
        {/* Back Image (revealed on hover) - This is what shows THROUGH the cursor hole */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBack})` }}
        />

        {/* Front Image (with mask hole) - Fade effect on edges */}
        <div
          ref={frontRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroFront})`,
            maskImage: `radial-gradient(circle ${HERO_CURSOR_RADIUS}px at var(--x, -200px) var(--y, -200px), transparent 0%, transparent 60%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.7) 85%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${HERO_CURSOR_RADIUS}px at var(--x, -200px) var(--y, -200px), transparent 0%, transparent 60%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.7) 85%, black 100%)`,
          }}
        />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Logo - Main visual element replacing UPAGRAHA text */}
          <motion.img
            src={logo}
            alt="UPAGRAHA Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-6 object-contain drop-shadow-[0_0_30px_hsl(136_100%_50%/0.5)]"
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            National Level Technical Symposium
          </motion.p>

          {/* Date & Location */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-cyber text-xs tracking-wider text-primary/70 mb-10"
          >
            19TH FEBRUARY 2026 • SVCE, CHENNAI
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
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
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollToSection('events')}
              className="interactive px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-[0_0_20px_hsl(136_100%_50%/0.5)] transition-all duration-300 font-cyber text-sm"
            >
              Register Now
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="interactive px-8 py-3 border border-primary/50 text-primary font-bold rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300 font-cyber text-sm"
            >
              Explore Events
            </button>
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
          transition={{ delay: 1 }}
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
