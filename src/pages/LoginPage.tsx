import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (role: 'guest' | 'organizer') => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (role: 'guest' | 'organizer') => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      onLogin(role);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-soft to-secondary-soft p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Welcome to BeThere
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose how you'd like to experience events
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Guest Login */}
          <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Join as Guest</CardTitle>
              <Badge variant="outline" className="w-fit mx-auto">Perfect for attendees</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">
                Discover events, RSVP to invitations, and enjoy seamless check-ins with QR codes.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-primary" />
                  <span>Browse and discover public events</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-primary" />
                  <span>Manage your event invitations</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={16} className="text-primary" />
                  <span>Quick QR code check-ins</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={() => handleGoogleLogin('guest')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Organizer Login */}
          <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-warning rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Join as Organizer</CardTitle>
              <Badge className="w-fit mx-auto bg-secondary text-secondary-foreground">Perfect for hosts</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">
                Create memorable events, manage guests, and track success with powerful analytics.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-secondary" />
                  <span>Create and manage unlimited events</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-secondary" />
                  <span>Advanced guest management tools</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap size={16} className="text-secondary" />
                  <span>Real-time analytics and insights</span>
                </div>
              </div>

              <Button 
                variant="secondary"
                className="w-full mt-6" 
                size="lg"
                onClick={() => handleGoogleLogin('organizer')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};