import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { sponsors } from "@/data/events";
import { Sparkles, Building2, Crown, Award, Medal, Star } from "lucide-react";

const tierConfig = {
  platinum: {
    icon: Crown,
    colors: {
      bg: "from-gray-200/20 to-gray-400/20",
      border: "border-gray-300/50",
      text: "text-gray-300",
      glow: "shadow-gray-300/20",
    },
    benefits: ["Logo on main stage", "Prime booth location", "Speaking opportunity", "Social media features"],
  },
  gold: {
    icon: Award,
    colors: {
      bg: "from-yellow-500/20 to-amber-500/20",
      border: "border-yellow-500/50",
      text: "text-yellow-500",
      glow: "shadow-yellow-500/20",
    },
    benefits: ["Logo on banners", "Booth space", "Mention in ceremonies", "Website feature"],
  },
  silver: {
    icon: Medal,
    colors: {
      bg: "from-gray-400/20 to-gray-500/20",
      border: "border-gray-400/50",
      text: "text-gray-400",
      glow: "shadow-gray-400/20",
    },
    benefits: ["Logo on materials", "Small booth", "Social mentions"],
  },
  bronze: {
    icon: Star,
    colors: {
      bg: "from-amber-700/20 to-orange-600/20",
      border: "border-amber-700/50",
      text: "text-amber-600",
      glow: "shadow-amber-600/20",
    },
    benefits: ["Logo on website", "Thank you mention"],
  },
};

const Sponsors = () => {
  const platinumSponsors = sponsors.filter(s => s.tier === "platinum");
  const goldSponsors = sponsors.filter(s => s.tier === "gold");
  const silverSponsors = sponsors.filter(s => s.tier === "silver");
  const bronzeSponsors = sponsors.filter(s => s.tier === "bronze");

  const TierCard = ({ tier, sponsors: tierSponsors }: { tier: keyof typeof tierConfig; sponsors: typeof sponsors }) => {
    const config = tierConfig[tier];
    const TierIcon = config.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`glass-card p-6 md:p-8 bg-gradient-to-br ${config.colors.bg} border ${config.colors.border} hover:${config.colors.glow} transition-shadow duration-300`}
      >
        {/* Tier Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.colors.bg} flex items-center justify-center`}
          >
            <TierIcon className={`w-6 h-6 ${config.colors.text}`} />
          </motion.div>
          <div>
            <h3 className={`font-heading text-xl font-bold capitalize ${config.colors.text}`}>
              {tier} Tier
            </h3>
            <p className="text-xs text-muted-foreground">{tierSponsors.length} sponsors</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-6 space-y-2">
          {config.benefits.map((benefit, idx) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${config.colors.text} bg-current`} />
              <span className="text-muted-foreground">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Sponsors List */}
        <div className="grid gap-3">
          {tierSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.colors.bg} flex items-center justify-center`}>
                <Building2 className={`w-5 h-5 ${config.colors.text}`} />
              </div>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Sponsorship Tiers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Partner with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              UPAGRAHA'26
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
          >
            Choose your tier and join the multiverse of innovation. Every partnership helps us 
            create unforgettable experiences for the next generation of engineers.
          </motion.p>

          {/* Animated Particles */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{ y: [-20, 20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full"
            animate={{ y: [20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {platinumSponsors.length > 0 && <TierCard tier="platinum" sponsors={platinumSponsors} />}
            {goldSponsors.length > 0 && <TierCard tier="gold" sponsors={goldSponsors} />}
            {silverSponsors.length > 0 && <TierCard tier="silver" sponsors={silverSponsors} />}
            {bronzeSponsors.length > 0 && <TierCard tier="bronze" sponsors={bronzeSponsors} />}
          </div>

          {/* Become a Sponsor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Partner?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join us in powering the next generation of tech innovators. Contact us to discuss 
              custom sponsorship packages tailored to your brand.
            </p>
            <motion.a
              href="mailto:sponsors@ecesymposium.edu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
