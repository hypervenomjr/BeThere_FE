import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard, Event } from "@/components/EventCard";
import { Search, Filter, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface MyEventsPageProps {
  onRSVP: (eventId: string, status: 'confirmed' | 'declined') => void;
  onViewDetails: (eventId: string) => void;
}

export const MyEventsPage = ({ onRSVP, onViewDetails }: MyEventsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
      rsvpStatus: 'confirmed'
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
      rsvpStatus: 'pending'
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
      rsvpStatus: 'confirmed'
    },
    {
      id: '4',
      title: 'Book Club Meeting',
      description: 'Monthly discussion of "The Great Gatsby" - bring your insights and questions!',
      date: '2024-04-10',
      time: '07:00 PM',
      venue: 'Community Library',
      isPublic: false,
      allowPlusOnes: false,
      currentGuests: 12,
      organizerName: 'Reading Circle',
      rsvpStatus: 'declined'
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || event.rsvpStatus === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getTabCount = (status: string) => {
    if (status === "all") return mockEvents.length;
    return mockEvents.filter(e => e.rsvpStatus === status).length;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-success" />;
      case 'pending':
        return <AlertCircle size={16} className="text-warning" />;
      case 'declined':
        return <XCircle size={16} className="text-destructive" />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Events</h1>
        <p className="text-muted-foreground">
          Manage your event invitations and track your RSVPs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search events, venues, or organizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            {getStatusIcon("all")}
            All
            <Badge variant="outline" className="ml-1">
              {getTabCount("all")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="flex items-center gap-2">
            {getStatusIcon("confirmed")}
            Confirmed
            <Badge variant="outline" className="ml-1">
              {getTabCount("confirmed")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            {getStatusIcon("pending")}
            Pending
            <Badge variant="outline" className="ml-1">
              {getTabCount("pending")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="declined" className="flex items-center gap-2">
            {getStatusIcon("declined")}
            Declined
            <Badge variant="outline" className="ml-1">
              {getTabCount("declined")}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="guest"
                  onRSVP={onRSVP}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? "No events found" : `No ${activeTab === "all" ? "" : activeTab} events`}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms" 
                  : activeTab === "all" 
                    ? "You haven't been invited to any events yet"
                    : `You don't have any ${activeTab} event invitations`
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => window.location.href = "/events/public"}>
                  Discover Public Events
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};