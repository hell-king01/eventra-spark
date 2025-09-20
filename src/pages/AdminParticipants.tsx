import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Users, Calendar, Mail } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  email: string;
  event_name: string;
  event_category: string;
  registration_date: string;
}

const AdminParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchParticipants();
  }, [navigate]);

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from("participants")
        .select("*")
        .order("registration_date", { ascending: false });

      if (error) {
        console.error("Error fetching participants:", error);
        toast.error("Failed to load participants");
        return;
      }

      setParticipants(data || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while loading data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Workshop":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Hackathon":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Webinar":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const stats = {
    total: participants.length,
    workshops: participants.filter(p => p.event_category === "Workshop").length,
    hackathons: participants.filter(p => p.event_category === "Hackathon").length,
    webinars: participants.filter(p => p.event_category === "Webinar").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 border-primary/20 text-primary hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 glass-card border-primary/20">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card border-blue-500/20">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Workshops</p>
                <p className="text-2xl font-bold text-blue-400">{stats.workshops}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card border-purple-500/20">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Hackathons</p>
                <p className="text-2xl font-bold text-purple-400">{stats.hackathons}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card border-green-500/20">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Webinars</p>
                <p className="text-2xl font-bold text-green-400">{stats.webinars}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Participants Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-primary/20">
            <div className="p-6 border-b border-border/20">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary" />
                <span>Event Participants</span>
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/20">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">Event</TableHead>
                    <TableHead className="text-muted-foreground">Category</TableHead>
                    <TableHead className="text-muted-foreground">Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <motion.tr
                      key={participant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="border-border/20 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium text-foreground">
                        {participant.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {participant.email}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {participant.event_name}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(participant.event_category)}>
                          {participant.event_category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(participant.registration_date)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
              
              {participants.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No participants registered yet.</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminParticipants;