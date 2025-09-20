import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { EventListingsSection } from "@/components/sections/EventListingsSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { WhyJoinSection } from "@/components/sections/WhyJoinSection";
import { Footer } from "@/components/layout/Footer";

const Workshop = () => {
  const workshopEvents = [
    {
      id: 1,
      title: "React Mastery Workshop",
      date: "2024-03-15",
      description: "Master advanced React patterns and hooks in this intensive hands-on workshop.",
      featured: true,
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      date: "2024-03-20",
      description: "Learn the core principles of user interface and experience design.",
      featured: false,
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      date: "2024-03-25",
      description: "Build scalable backend applications with Node.js and Express.",
      featured: false,
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      date: "2024-04-01",
      description: "Introduction to machine learning concepts and practical applications.",
      featured: true,
    },
  ];

  const benefits = [
    {
      title: "Hands-on Learning",
      description: "Interactive coding sessions with expert mentors",
      icon: "💻",
    },
    {
      title: "Real Projects",
      description: "Work on industry-relevant projects and build your portfolio",
      icon: "🚀",
    },
    {
      title: "Networking",
      description: "Connect with like-minded developers and industry professionals",
      icon: "🤝",
    },
    {
      title: "Certification",
      description: "Receive certificates of completion for your resume",
      icon: "🏆",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <Header title="Workshops" category="workshop" />
      <EventListingsSection events={workshopEvents} category="workshop" />
      <FeaturedSection events={workshopEvents.filter(e => e.featured)} />
      <WhyJoinSection benefits={benefits} title="Why Join Our Workshops?" />
      <Footer />
    </motion.div>
  );
};

export default Workshop;