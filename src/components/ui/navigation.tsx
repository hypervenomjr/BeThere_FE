import { Button } from "@/components/ui/button";
import { Calendar, Users, QrCode, PlusCircle, BarChart3, Settings, LogOut } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  userRole: 'guest' | 'organizer' | null;
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const Navigation = ({ userRole, currentPath, onNavigate, onLogout }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const guestNavItems = [
    { path: "/", label: "Home", icon: Calendar },
    { path: "/myevents", label: "My Events", icon: Users },
    { path: "/events/public", label: "Browse Events", icon: Calendar },
    { path: "/qr", label: "My QR", icon: QrCode },
  ];

  const organizerNavItems = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/events/create", label: "Create Event", icon: PlusCircle },
    { path: "/events", label: "My Events", icon: Calendar },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const navItems = userRole === 'organizer' ? organizerNavItems : guestNavItems;

  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate("/")}
              className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              BeThere
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <Icon size={16} />
                  {item.label}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-foreground transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-foreground mt-1 transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-foreground mt-1 transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onNavigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-2"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};