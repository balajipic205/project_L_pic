import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, FileText, Bot, Cpu, Radio, Zap, LayoutGrid } from "lucide-react";

const specs = [
  { icon: Settings, name: "WORKSHOP_MODULES", description: "Hands-on Technical Training", status: "ACTIVE" },
  { icon: FileText, name: "PAPER_PRESENTATIONS", description: "Research & Innovation Platform", status: "ACTIVE" },
  { icon: Bot, name: "ROBOTICS_LAB", description: "Autonomous Systems Division", status: "ACTIVE" },
  { icon: Cpu, name: "EMBEDDED_SYSTEMS", description: "IoT & Microcontroller Hub", status: "ACTIVE" },
  { icon: Radio, name: "SIGNAL_PROCESSING", description: "Communication Systems Core", status: "STANDBY" },
  { icon: Zap, name: "POWER_ELECTRONICS", description: "Energy Systems Module", status: "ACTIVE" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary/60" />
              <span className="text-primary font-cyber text-sm uppercase tracking-[0.3em]">
                Electronics Department
              </span>
              <div className="h-px w-8 bg-primary/60" />
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-wide">
                THE
              </h2>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary tracking-wide">
                CORE
              </h2>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-wide">
                MISSION
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Electronics Department stands at the forefront of technological innovation, 
                bridging the gap between theoretical excellence and practical engineering mastery.
              </p>
              <p>
                Our commitment to{" "}
                <span className="text-primary font-semibold">hardware excellence</span>{" "}
                drives every initiative—from precision circuit design to cutting-edge embedded systems. 
                We cultivate engineers who don't just understand technology; they{" "}
                <span className="text-primary font-semibold">shape its future</span>.
              </p>
              <p>
                Through rigorous training, collaborative research, and industry partnerships, 
                we forge the next generation of innovators ready to tackle global challenges with{" "}
                <span className="text-primary font-semibold">technical precision</span>{" "}
                and creative vision.
              </p>
            </div>
          </motion.div>

          {/* Right Side - System Specs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 border border-primary/30"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-cyber text-primary text-sm tracking-wider">SYSTEM_SPECS</span>
              </div>
              <span className="text-muted-foreground text-xs font-cyber">v2.0.26</span>
            </div>

            {/* Specs List */}
            <div className="space-y-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <spec.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-cyber text-sm text-primary">{spec.name}</div>
                    <div className="text-xs text-muted-foreground">{spec.description}</div>
                  </div>
                  <span 
                    className={`text-xs font-cyber px-2 py-1 rounded ${
                      spec.status === "ACTIVE" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    {spec.status}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Animated Spaceship */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 2, -2, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                {/* Spaceship Body */}
                <div className="relative w-32 h-16">
                  {/* Main Body */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-full transform skew-x-12" />
                  
                  {/* Cockpit */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-5 bg-secondary/60 rounded-full" />
                  
                  {/* Wings */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[20px] border-r-primary/50 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[20px] border-l-primary/50 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent" />
                  
                  {/* Engine Glow */}
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-primary/60 rounded-full blur-md"
                  />
                  
                  {/* Exhaust Trail */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-primary/40 to-transparent rounded-full blur-sm"
                  />
                </div>
                
                {/* Particle Effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, 30, 60],
                      opacity: [0.8, 0.4, 0],
                      scale: [1, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                    style={{ left: `calc(50% + ${(i - 1) * 10}px)` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
