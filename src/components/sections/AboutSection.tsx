import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AboutSection = () => {
  const [counts, setCounts] = useState({
    events: 0,
    participants: 0,
    countries: 0,
    satisfaction: 0,
  });

  const finalCounts = {
    events: 50,
    participants: 500,
    countries: 15,
    satisfaction: 98,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts({
        events: Math.floor(finalCounts.events * progress),
        participants: Math.floor(finalCounts.participants * progress),
        countries: Math.floor(finalCounts.countries * progress),
        satisfaction: Math.floor(finalCounts.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(finalCounts);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      number: counts.events,
      label: "Events Organized",
      suffix: "+",
      color: "text-neon-blue",
    },
    {
      number: counts.participants,
      label: "Happy Participants",
      suffix: "+",
      color: "text-neon-purple",
    },
    {
      number: counts.countries,
      label: "Countries Reached",
      suffix: "+",
      color: "text-neon-pink",
    },
    {
      number: counts.satisfaction,
      label: "Satisfaction Rate",
      suffix: "%",
      color: "text-neon-cyan",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="gradient-text">EVENTRA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            EVENTRA is more than just an event platform—it's a gateway to transformation. We believe in the power of 
            learning to change lives and shape the future. Our carefully curated events bring together the brightest 
            minds in technology to share knowledge, inspire innovation, and build lasting connections.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center glass-card p-6 group hover:scale-105 transition-transform duration-300"
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:animate-pulse`}>
                {stat.number}{stat.suffix}
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">
            Experience the <span className="gradient-text">Future</span> of Learning
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl border border-border/50 hover:border-neon-blue/30 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-semibold mb-2">Cutting-Edge Content</h4>
              <p className="text-muted-foreground text-sm">
                Stay ahead with the latest trends and technologies
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border/50 hover:border-neon-purple/30 transition-colors">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className="font-semibold mb-2">Expert Mentorship</h4>
              <p className="text-muted-foreground text-sm">
                Learn from industry leaders and successful entrepreneurs
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border/50 hover:border-neon-pink/30 transition-colors">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="font-semibold mb-2">Global Community</h4>
              <p className="text-muted-foreground text-sm">
                Connect with peers from around the world
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};