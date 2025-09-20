import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  featured: boolean;
}

interface EventListingsSectionProps {
  events: Event[];
  category: string;
}

export const EventListingsSection = ({ events, category }: EventListingsSectionProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upcoming <span className="gradient-text capitalize">{category}s</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing {category}s designed to enhance your skills and expand your network.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              {event.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-sm text-neon-blue mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-blue transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {event.description}
                </p>

                <Link to="/register" state={{ event: event.title, category }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-xl font-semibold text-background flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-neon-blue/20 transition-all duration-300"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};