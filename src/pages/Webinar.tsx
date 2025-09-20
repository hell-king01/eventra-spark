import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { EventListingsSection } from "@/components/sections/EventListingsSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { Footer } from "@/components/layout/Footer";

const Webinar = () => {
  const webinarEvents = [
    {
      id: 1,
      title: "Future of Web Development",
      date: "2024-03-22",
      description: "Explore emerging trends and technologies shaping the future of web development.",
      featured: true,
    },
    {
      id: 2,
      title: "Scaling Startup Technology",
      date: "2024-03-28",
      description: "Learn how to build and scale technology infrastructure for growing startups.",
      featured: false,
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices",
      date: "2024-04-03",
      description: "Essential security practices every developer should know and implement.",
      featured: false,
    },
    {
      id: 4,
      title: "Data Science in 2024",
      date: "2024-04-10",
      description: "Latest trends and tools in data science and analytics.",
      featured: true,
    },
  ];

  const benefits = [
    {
      title: "Expert Speakers",
      description: "Learn from industry leaders and renowned experts",
      icon: "🎤",
    },
    {
      title: "Interactive Q&A",
      description: "Ask questions and get real-time answers from speakers",
      icon: "❓",
    },
    {
      title: "Free Access",
      description: "Join from anywhere in the world at no cost",
      icon: "🌍",
    },
    {
      title: "Recordings",
      description: "Access recorded sessions for future reference",
      icon: "📹",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <Header title="Webinars" category="webinar" />
      <EventListingsSection events={webinarEvents} category="webinar" />
      <FeaturedSection events={webinarEvents.filter(e => e.featured)} />
      <WhyJoinSection benefits={benefits} title="Why Join Our Webinars?" />
      <Footer />
    </motion.div>
  );
};

export default Webinar;