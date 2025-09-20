import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Hardcoded credentials for demo
    if (username === "admin" && password === "admin123") {
      // Generate simple session token
      const token = btoa(`admin:${Date.now()}`);
      localStorage.setItem("admin_token", token);
      
      toast.success("Welcome back, Admin!");
      navigate("/admin/participants");
    } else {
      toast.error("Invalid credentials. Try admin / admin123");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 glass-card border-primary/20 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground">
              Secure portal for event management
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="glow-input bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="glow-input bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full glow-button h-12 text-lg font-semibold"
              >
                {isLoading ? "Authenticating..." : "Access Dashboard"}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-border/20 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Demo credentials: <span className="text-primary">admin</span> / <span className="text-primary">admin123</span>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;