import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Sparkles, User, Mail, Calendar } from "lucide-react";

interface RegistrationFormProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}

export const RegistrationForm = ({ isSubmitted, setIsSubmitted }: RegistrationFormProps) => {
  const location = useLocation();
  const { event, category } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: event || "",
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.event.trim()) {
      newErrors.event = "Please select an event";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for errors
      Object.keys(errors).forEach(field => {
        const element = document.getElementById(field);
        if (element) {
          element.classList.add('animate-bounce');
          setTimeout(() => element.classList.remove('animate-bounce'), 500);
        }
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Confetti effect
    createConfetti();
  };

  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed w-2 h-2 bg-neon-pink rounded-full z-50 pointer-events-none';
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);
      
      confetti.animate([
        { transform: `translate(-50%, -50%) rotate(0deg) translateY(0px)`, opacity: 1 },
        { transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) translateY(${-100 - Math.random() * 100}px)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => confetti.remove();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-background" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join the Experience</h2>
              <p className="text-muted-foreground">Register for your next adventure</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all duration-300"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all duration-300"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Event
                </label>
                <input
                  id="event"
                  type="text"
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none transition-all duration-300"
                  placeholder="Event name"
                />
                {category && (
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    Category: {category}
                  </p>
                )}
                {errors.event && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.event}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-4 rounded-xl font-semibold text-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    <span>Registering...</span>
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold mb-4 gradient-text"
            >
              Registration Successful! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mb-6"
            >
              Welcome aboard! You'll receive a confirmation email shortly with all the event details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Confirmation email sent</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Calendar invite attached</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Access to exclusive content</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};