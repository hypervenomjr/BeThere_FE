"use client";
import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { MyEventsPage } from "@/pages/MyEventsPage";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [userRole, setUserRole] = useState<'guest' | 'organizer' | null>(null);
  const [currentPath, setCurrentPath] = useState("/");

  const handleLogin = (role: 'guest' | 'organizer') => {
    setUserRole(role);
    setCurrentPath("/");
    toast({
      title: "Welcome to BeThere!",
      description: `You're now logged in as ${role === 'organizer' ? 'an organizer' : 'a guest'}.`,
    });
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPath("/");
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleRSVP = (eventId: string, status: 'confirmed' | 'declined') => {
    toast({
      title: `RSVP ${status}`,
      description: `Your RSVP has been ${status} for the event.`,
    });
  };

  const handleViewDetails = (eventId: string) => {
    toast({
      title: "Event Details",
      description: "Opening event details...",
    });
  };

  if (!userRole && currentPath !== "/login") {
    return <HomePage userRole={null} onNavigate={handleNavigate} />;
  }

  if (currentPath === "/login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {userRole && (
        <Navigation
          userRole={userRole}
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
      
      <main>
        {currentPath === "/" && (
          <HomePage
            userRole={userRole}
            onNavigate={handleNavigate}
            onRSVP={handleRSVP}
            onViewDetails={handleViewDetails}
          />
        )}
        {currentPath === "/myevents" && (
          <MyEventsPage
            onRSVP={handleRSVP}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
