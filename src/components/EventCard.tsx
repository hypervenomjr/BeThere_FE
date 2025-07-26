import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  isPublic: boolean;
  allowPlusOnes: boolean;
  maxGuests?: number;
  currentGuests: number;
  organizerName: string;
  rsvpStatus?: 'confirmed' | 'declined' | 'pending';
  budget?: {
    total: number;
    spent: number;
  };
}

interface EventCardProps {
  event: Event;
  variant?: 'guest' | 'organizer' | 'public';
  onRSVP?: (eventId: string, status: 'confirmed' | 'declined') => void;
  onViewDetails?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onViewGuests?: (eventId: string) => void;
}

export const EventCard = ({ 
  event, 
  variant = 'public', 
  onRSVP, 
  onViewDetails, 
  onEdit, 
  onViewGuests 
}: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRSVPStatusIcon = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-success" />;
      case 'declined':
        return <XCircle size={16} className="text-destructive" />;
      case 'pending':
        return <AlertCircle size={16} className="text-warning" />;
      default:
        return null;
    }
  };

  const getRSVPStatusBadge = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="group hover:shadow-primary transition-all duration-300 hover:scale-[1.02] bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {event.title}
          </CardTitle>
          <div className="flex gap-2">
            {!event.isPublic && (
              <Badge variant="outline" className="text-xs">Private</Badge>
            )}
            {variant === 'guest' && getRSVPStatusBadge(event.rsvpStatus)}
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          <span>{formatDate(event.date)}</span>
          <Clock size={16} className="ml-2" />
          <span>{event.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span className="truncate">{event.venue}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={16} />
          <span>
            {event.currentGuests} 
            {event.maxGuests && ` / ${event.maxGuests}`} guests
          </span>
          {variant === 'guest' && getRSVPStatusIcon(event.rsvpStatus)}
        </div>

        {variant === 'organizer' && event.budget && (
          <div className="text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Budget</span>
              <span>${event.budget.spent} / ${event.budget.total}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((event.budget.spent / event.budget.total) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {variant !== 'guest' && (
          <p className="text-xs text-muted-foreground">by {event.organizerName}</p>
        )}
      </CardContent>

      <CardFooter className="pt-4 flex gap-2">
        {variant === 'guest' && onRSVP && event.rsvpStatus === 'pending' && (
          <>
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => onRSVP(event.id, 'confirmed')}
              className="flex-1"
            >
              Accept
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onRSVP(event.id, 'declined')}
              className="flex-1"
            >
              Decline
            </Button>
          </>
        )}

        {variant === 'organizer' && (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewGuests?.(event.id)}
              className="flex-1"
            >
              <Users size={16} />
              Guests
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit?.(event.id)}
              className="flex-1"
            >
              Edit
            </Button>
          </>
        )}

        {(variant === 'public' || (variant === 'guest' && event.rsvpStatus === 'confirmed')) && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onViewDetails?.(event.id)}
            className="flex-1"
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};