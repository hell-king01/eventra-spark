import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export const MissionVisionSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan p-3">
                <Target className="w-full h-full text-background" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize access to premium learning experiences and create a thriving community where technology enthusiasts can connect, learn, and grow together.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-neon-blue" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Inclusive Learning</h4>
                  <p className="text-muted-foreground text-sm">Making quality education accessible to everyone</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-neon-purple" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community Building</h4>
                  <p className="text-muted-foreground text-sm">Fostering connections between learners and industry experts</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink p-3">
                <Eye className="w-full h-full text-background" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To become the global platform of choice for premium tech events, where innovation meets education and dreams become reality through collaborative learning.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-neon-pink/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-neon-pink" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Global Reach</h4>
                  <p className="text-muted-foreground text-sm">Connecting learners worldwide through technology</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Innovation Hub</h4>
                  <p className="text-muted-foreground text-sm">Driving technological advancement through education</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};