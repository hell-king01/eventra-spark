import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryCardsSection } from "@/components/sections/CategoryCardsSection";
import { QuickHighlightsSection } from "@/components/sections/QuickHighlightsSection";
import { MissionVisionSection } from "@/components/sections/MissionVisionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Footer } from "@/components/layout/Footer";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <HeroSection />
      <CategoryCardsSection />
      <QuickHighlightsSection />
      <MissionVisionSection />
      <AboutSection />
      <Footer />
    </motion.div>
  );
};

export default Home;