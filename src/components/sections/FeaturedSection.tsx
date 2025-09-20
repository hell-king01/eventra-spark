import { motion } from "framer-motion";
import { Star, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  featured: boolean;
}

interface FeaturedSectionProps {
  events: Event[];
}

export const FeaturedSection = ({ events }: FeaturedSectionProps) => {
  if (events.length === 0) return null;

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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-neon-pink" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="gradient-text">Events</span>
            </h2>
            <Star className="w-6 h-6 text-neon-pink" />
          </div>
          <p className="text-lg text-muted-foreground">
            Don't miss these highlighted events curated especially for you
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 w-80 glass-card p-6 group relative"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Neon border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neon-pink/30 transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-neon-cyan">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="px-2 py-1 bg-neon-pink/20 text-neon-pink rounded-full text-xs font-semibold">
                      HOT
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-pink transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <Link to="/register" state={{ event: event.title }}>
                    <button className="w-full bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-lg font-semibold text-background flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-neon-pink/20 transition-all duration-300 text-sm">
                      <span>Quick Register</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-neon-pink/50"
          >
            <div className="text-2xl">→</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};