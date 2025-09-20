import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Footer } from "@/components/layout/Footer";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <Header title="Registration" showBreadcrumb />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold gradient-text">
              Join The Experience
            </h1>
            <p className="text-xl text-muted-foreground">
              Register for premium events and take your skills to the next level.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                  <span className="text-neon-blue">✓</span>
                </div>
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                  <span className="text-neon-purple">✓</span>
                </div>
                <span>Premium content access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-pink/20 flex items-center justify-center">
                  <span className="text-neon-pink">✓</span>
                </div>
                <span>Networking opportunities</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <RegistrationForm 
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Registration;