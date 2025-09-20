import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Home, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [participantData, setParticipantData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setVerificationState('error');
      setErrorMessage('Invalid verification link. No token provided.');
      return;
    }

    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      // First, check if the token exists and is not expired
      const { data: pendingRegistration, error: fetchError } = await supabase
        .from('pending_registrations')
        .select('*')
        .eq('verification_token', token)
        .single();

      if (fetchError || !pendingRegistration) {
        setVerificationState('error');
        setErrorMessage('Invalid or expired verification token.');
        return;
      }

      // Check if token is expired
      const now = new Date();
      const expiresAt = new Date(pendingRegistration.expires_at);
      
      if (now > expiresAt) {
        // Clean up expired token
        await supabase
          .from('pending_registrations')
          .delete()
          .eq('verification_token', token);
          
        setVerificationState('expired');
        return;
      }

      // Check if user is already registered for this event
      const { data: existingParticipant } = await supabase
        .from('participants')
        .select('*')
        .eq('email', pendingRegistration.email)
        .eq('event_name', pendingRegistration.event_name)
        .single();

      if (existingParticipant) {
        // Clean up pending registration
        await supabase
          .from('pending_registrations')
          .delete()
          .eq('verification_token', token);
          
        setVerificationState('error');
        setErrorMessage('You are already registered for this event.');
        return;
      }

      // Move from pending_registrations to participants
      const { error: insertError } = await supabase
        .from('participants')
        .insert([
          {
            name: pendingRegistration.name,
            email: pendingRegistration.email,
            event_name: pendingRegistration.event_name,
            event_category: pendingRegistration.event_category,
          }
        ]);

      if (insertError) {
        console.error('Error moving to participants:', insertError);
        setVerificationState('error');
        setErrorMessage('Failed to complete registration. Please try again.');
        return;
      }

      // Delete from pending_registrations
      await supabase
        .from('pending_registrations')
        .delete()
        .eq('verification_token', token);

      // Success!
      setParticipantData(pendingRegistration);
      setVerificationState('success');
      toast.success('Email verified! Registration completed successfully.');
      
      // Confetti effect
      createConfetti();

    } catch (error) {
      console.error('Verification error:', error);
      setVerificationState('error');
      setErrorMessage('An unexpected error occurred during verification.');
    }
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

  const renderContent = () => {
    switch (verificationState) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Loader2 className="w-8 h-8 text-background" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-4">Verifying Your Email</h1>
            <p className="text-muted-foreground">Please wait while we verify your registration...</p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold mb-4 gradient-text"
            >
              Registration Completed! 🎉
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 mb-6"
            >
              <p className="text-muted-foreground">
                Welcome aboard, <strong>{participantData?.name}</strong>!
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>Event:</strong> {participantData?.event_name}</p>
                <p><strong>Category:</strong> {participantData?.event_category}</p>
                <p><strong>Email:</strong> {participantData?.email}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3 text-sm text-muted-foreground mb-6"
            >
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Email verified successfully</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Registration confirmed</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Event details will be sent soon</span>
              </div>
            </motion.div>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-button flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Return to Home</span>
              </motion.button>
            </Link>
          </motion.div>
        );

      case 'expired':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold mb-4 text-yellow-400">Link Expired</h1>
            <p className="text-muted-foreground mb-6">
              This verification link has expired. Verification links are valid for 24 hours only.
            </p>

            <div className="space-y-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-button w-full"
                >
                  Register Again
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-button-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Return to Home</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        );

      case 'error':
      default:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold mb-4 text-red-400">Verification Failed</h1>
            <p className="text-muted-foreground mb-6">{errorMessage}</p>

            <div className="space-y-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-button w-full"
                >
                  Try Registration Again
                </motion.button>
              </Link>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-button-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Return to Home</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {renderContent()}
    </div>
  );
};

export default EmailVerification;