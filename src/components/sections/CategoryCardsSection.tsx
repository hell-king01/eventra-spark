import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Zap, Video } from "lucide-react";

export const CategoryCardsSection = () => {
  const categories = [
    {
      title: "Workshops",
      description: "Hands-on learning experiences with industry experts. Build real projects and enhance your skills.",
      icon: Code,
      link: "/workshop",
      gradient: "from-neon-blue to-neon-cyan",
      delay: 0,
    },
    {
      title: "Hackathons",
      description: "Intensive coding competitions. Solve real-world problems and compete for amazing prizes.",
      icon: Zap,
      link: "/hackathon",
      gradient: "from-neon-purple to-neon-pink",
      delay: 0.2,
    },
    {
      title: "Webinars",
      description: "Online seminars with industry leaders. Learn the latest trends and technologies.",
      icon: Video,
      link: "/webinar",
      gradient: "from-neon-pink to-neon-purple",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover events tailored to your interests and skill level. Each category offers unique opportunities to grow and connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: category.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link to={category.link}>
                <div className="glass-card p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:border-neon-blue/30">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="w-full h-full text-background" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-blue transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center text-neon-blue font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Explore Events</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/20 rounded-xl transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};