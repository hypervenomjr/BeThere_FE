import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventCard, Event } from "@/components/EventCard";
import { PlusCircle, Calendar, Users, TrendingUp, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-events.jpg";

interface HomePageProps {
  userRole: 'guest' | 'organizer' | null;
  onNavigate: (path: string) => void;
  onRSVP?: (eventId: string, status: 'confirmed' | 'declined') => void;
  onViewDetails?: (eventId: string) => void;
}

export const HomePage = ({ userRole, onNavigate, onRSVP, onViewDetails }: HomePageProps) => {
  // Mock data - replace with real API calls
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations and networking opportunities.',
      date: '2024-03-15',
      time: '09:00 AM',
      venue: 'Convention Center Downtown',
      isPublic: true,
      allowPlusOnes: true,
      maxGuests: 500,
      currentGuests: 287,
      organizerName: 'TechCorp Events',
      rsvpStatus: userRole === 'guest' ? 'confirmed' : undefined,
      budget: userRole === 'organizer' ? { total: 25000, spent: 18500 } : undefined
    },
    {
      id: '2',
      title: 'Summer BBQ Party',
      description: 'Join us for a fun summer BBQ with friends, family, and great food!',
      date: '2024-07-20',
      time: '05:00 PM',
      venue: 'Central Park Pavilion',
      isPublic: false,
      allowPlusOnes: true,
      currentGuests: 45,
      organizerName: 'Sarah Johnson',
      rsvpStatus: userRole === 'guest' ? 'pending' : undefined,
      budget: userRole === 'organizer' ? { total: 800, spent: 450 } : undefined
    },
    {
      id: '3',
      title: 'Wedding Reception',
      description: 'Celebrating the union of two beautiful souls. Dinner and dancing to follow.',
      date: '2024-06-08',
      time: '06:30 PM',
      venue: 'Grand Ballroom Hotel',
      isPublic: false,
      allowPlusOnes: false,
      maxGuests: 150,
      currentGuests: 142,
      organizerName: 'Emma & Michael',
      rsvpStatus: userRole === 'guest' ? 'confirmed' : undefined,
      budget: userRole === 'organizer' ? { total: 15000, spent: 12800 } : undefined
    }
  ];

  const upcomingEvents = mockEvents.slice(0, 3);
  const myEvents = userRole === 'guest' 
    ? mockEvents.filter(e => e.rsvpStatus === 'confirmed' || e.rsvpStatus === 'pending')
    : mockEvents;

  if (!userRole) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
              Be<span className="text-secondary">There</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-in slide-in-from-bottom duration-1000 delay-300">
              Create unforgettable events and connect with people who matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-1000 delay-500">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => onNavigate('/login')}
                className="text-lg"
              >
                <Calendar size={24} />
                Start Creating Events
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => onNavigate('/events/public')}
                className="text-lg border-white text-white hover:bg-white hover:text-primary"
              >
                <MapPin size={24} />
                Explore Public Events
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose BeThere?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-primary transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Easy Event Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create beautiful events in minutes with our intuitive interface and powerful tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-primary transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Smart Guest Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage RSVPs, send invitations, and track attendance with QR codes.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-primary transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Real-time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track your event's success with detailed analytics and insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          {userRole === 'organizer' 
            ? 'Manage your events and track their success.' 
            : 'Your upcoming events and invitations await.'}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {userRole === 'organizer' ? (
          <>
            <Card className="p-6 hover:shadow-primary transition-all hover:scale-105 cursor-pointer" onClick={() => onNavigate('/events/create')}>
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Create</p>
                  <p className="text-2xl font-bold">New Event</p>
                </div>
                <PlusCircle className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold">{myEvents.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                  <p className="text-2xl font-bold">{myEvents.reduce((sum, e) => sum + e.currentGuests, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-6 hover:shadow-primary transition-all hover:scale-105 cursor-pointer" onClick={() => onNavigate('/myevents')}>
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Events</p>
                  <p className="text-2xl font-bold">{myEvents.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-primary transition-all hover:scale-105 cursor-pointer" onClick={() => onNavigate('/events/public')}>
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Discover</p>
                  <p className="text-2xl font-bold">Events</p>
                </div>
                <MapPin className="h-8 w-8 text-secondary" />
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-primary transition-all hover:scale-105 cursor-pointer" onClick={() => onNavigate('/qr')}>
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Quick</p>
                  <p className="text-2xl font-bold">Check-in</p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="flex items-center justify-between p-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">{myEvents.filter(e => e.rsvpStatus === 'confirmed').length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent/Upcoming Events */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {userRole === 'organizer' ? 'Recent Events' : 'Upcoming Events'}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => onNavigate(userRole === 'organizer' ? '/events' : '/myevents')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant={userRole}
              onRSVP={onRSVP}
              onViewDetails={onViewDetails}
              onEdit={(id) => onNavigate(`/events/${id}/edit`)}
              onViewGuests={(id) => onNavigate(`/events/${id}/guests`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};