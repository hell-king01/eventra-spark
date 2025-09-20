import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { EventListingsSection } from "@/components/sections/EventListingsSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { Footer } from "@/components/layout/Footer";

const Hackathon = () => {
  const hackathonEvents = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "2024-03-18",
      description: "48-hour hackathon focused on building AI-powered solutions for real-world problems.",
      featured: true,
    },
    {
      id: 2,
      title: "Fintech Disruption Hack",
      date: "2024-04-05",
      description: "Revolutionize financial services with blockchain and digital payment solutions.",
      featured: false,
    },
    {
      id: 3,
      title: "Climate Tech Challenge",
      date: "2024-04-12",
      description: "Develop sustainable technology solutions to combat climate change.",
      featured: true,
    },
    {
      id: 4,
      title: "Gaming Jam Weekend",
      date: "2024-04-20",
      description: "Create innovative games using cutting-edge technologies and frameworks.",
      featured: false,
    },
  ];

  const benefits = [
    {
      title: "Prize Pool",
      description: "Compete for cash prizes and exciting rewards",
      icon: "💰",
    },
    {
      title: "Mentorship",
      description: "Get guidance from industry experts and successful entrepreneurs",
      icon: "👨‍🏫",
    },
    {
      title: "Innovation",
      description: "Push the boundaries of technology and create groundbreaking solutions",
      icon: "⚡",
    },
    {
      title: "Career Boost",
      description: "Showcase your skills to potential employers and investors",
      icon: "📈",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <Header title="Hackathons" category="hackathon" />
      <EventListingsSection events={hackathonEvents} category="hackathon" />
      <FeaturedSection events={hackathonEvents.filter(e => e.featured)} />
      <WhyJoinSection benefits={benefits} title="Why Join Our Hackathons?" />
      <Footer />
    </motion.div>
  );
};

export default Hackathon;