import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, Award } from "lucide-react";

export const QuickHighlightsSection = () => {
  const highlights = [
    {
      icon: CheckCircle,
      title: "Seamless Registration",
      description: "Quick and easy signup process",
    },
    {
      icon: Clock,
      title: "Instant Confirmations",
      description: "Get confirmed immediately after registration",
    },
    {
      icon: Users,
      title: "Curated Events",
      description: "Hand-picked quality events by experts",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn certificates for completed events",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">EVENTRA</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            We make event discovery and registration effortless
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal scrollable container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 w-80 glass-card p-6 group cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple p-3 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-full h-full text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-neon-blue transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-neon-blue/50"
          >
            <div className="text-2xl">→</div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};