import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Handshake, Users, Trophy, Megaphone } from "lucide-react";

const whySponsorReasons = [
  { icon: Users, title: "500+ Participants", description: "Direct access to top engineering talent" },
  { icon: Trophy, title: "Brand Visibility", description: "Premium placement across all events" },
  { icon: Megaphone, title: "Industry Connect", description: "Network with future innovators" },
  { icon: Sparkles, title: "Innovation Hub", description: "Associate with cutting-edge projects" },
];

const SponsorsPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Partners & Sponsors
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-wide">
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Why Sponsor Section */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Handshake className="w-8 h-8 text-primary" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold">
                Why Sponsor UPAGRAHA'26?
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {whySponsorReasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-cyber text-sm text-primary mb-1">{reason.title}</h4>
                  <p className="text-xs text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join us in powering the next generation of tech innovators. Partner with ECE Symposium 
                and connect with brilliant minds shaping the future of electronics and communication.
              </p>
              <Link to="/sponsors">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:opacity-90 transition-opacity group"
                >
                  <span>View Sponsorship Tiers</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsPreview;
