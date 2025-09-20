import { motion } from "framer-motion";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  category?: string;
  showBreadcrumb?: boolean;
}

export const Header = ({ title, category, showBreadcrumb }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-neon-blue hover:text-neon-purple transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">EVENTRA</span>
            </Link>
            
            {showBreadcrumb && (
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Home className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                <span>Registration</span>
              </nav>
            )}
          </div>
          
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold gradient-text"
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </motion.header>
  );
};