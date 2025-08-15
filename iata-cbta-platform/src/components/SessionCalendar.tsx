import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Users, 
  Clock,
  Euro,
  User
} from "lucide-react";

interface TrainingSession {
  id: string;
  functionId: string;
  functionTitle: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  instructor: string;
  availableSpots: number;
  maxSpots: number;
  type: 'initial' | 'recurrent';
  price: number;
  status: 'available' | 'full' | 'cancelled';
}

const sessionsData: TrainingSession[] = [
  {
    id: "session-001",
    functionId: "7.1",
    functionTitle: "Shippers",
    date: "2025-03-15",
    time: "09:00",
    endTime: "17:00",
    location: "Paris - Centre de formation",
    instructor: "Marie Dubois",
    availableSpots: 8,
    maxSpots: 12,
    type: "initial",
    price: 890,
    status: "available"
  },
  {
    id: "session-002",
    functionId: "7.4",
    functionTitle: "Ground Handling",
    date: "2025-03-22",
    time: "09:00",
    endTime: "17:00",
    location: "Paris CDG - Salle de formation",
    instructor: "Michel Rousseau",
    availableSpots: 0,
    maxSpots: 20,
    type: "recurrent",
    price: 480,
    status: "full"
  },
  {
    id: "session-003",
    functionId: "7.2",
    functionTitle: "Packers",
    date: "2025-03-25",
    time: "09:00",
    endTime: "15:30",
    location: "Paris - Centre de formation",
    instructor: "Pierre Lambert",
    availableSpots: 6,
    maxSpots: 8,
    type: "initial",
    price: 750,
    status: "available"
  },
  {
    id: "session-004",
    functionId: "7.3",
    functionTitle: "Freight Forwarders",
    date: "2025-04-02",
    time: "09:00",
    endTime: "17:00",
    location: "Marseille - Centre régional",
    instructor: "Sophie Moreau",
    availableSpots: 10,
    maxSpots: 15,
    type: "initial",
    price: 920,
    status: "available"
  },
  {
    id: "session-005",
    functionId: "7.5",
    functionTitle: "Cargo Acceptance",
    date: "2025-04-05",
    time: "09:00",
    endTime: "17:00",
    location: "Paris - Centre de formation",
    instructor: "François Dubois",
    availableSpots: 6,
    maxSpots: 12,
    type: "initial",
    price: 950,
    status: "available"
  },
  {
    id: "session-006",
    functionId: "7.1",
    functionTitle: "Shippers",
    date: "2025-04-10",
    time: "09:00",
    endTime: "17:00",
    location: "Lyon - Centre régional",
    instructor: "Jean Martin",
    availableSpots: 5,
    maxSpots: 10,
    type: "recurrent",
    price: 690,
    status: "available"
  },
  {
    id: "session-007",
    functionId: "7.4",
    functionTitle: "Ground Handling",
    date: "2025-04-15",
    time: "09:00",
    endTime: "17:00",
    location: "Nice - Aéroport",
    instructor: "Anne Leclerc",
    availableSpots: 8,
    maxSpots: 15,
    type: "initial",
    price: 680,
    status: "available"
  },
  {
    id: "session-008",
    functionId: "7.2",
    functionTitle: "Packers",
    date: "2025-04-22",
    time: "09:00",
    endTime: "15:30",
    location: "Paris - Centre de formation",
    instructor: "Pierre Lambert",
    availableSpots: 4,
    maxSpots: 8,
    type: "recurrent",
    price: 550,
    status: "available"
  }
];

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function SessionCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFunction, setSelectedFunction] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);

  const filteredSessions = sessionsData.filter(session => {
    const matchesFunction = selectedFunction === "all" || session.functionId === selectedFunction;
    const matchesLocation = selectedLocation === "all" || session.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesFunction && matchesLocation;
  });

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredSessions.filter(session => session.date === dateStr);
  };

  const generateCalendarDays = (): (Date | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeekday = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0
    
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  if (selectedSession) {
    return (
      <div className="min-h-screen bg-background">
        {/* Session Detail Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container max-w-screen-xl py-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSession(null)}
              className="mb-4"
            >
              ← Retour au calendrier
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {selectedSession.functionId}
              </Badge>
              <h1 className="text-3xl font-bold">{selectedSession.functionTitle}</h1>
              <Badge variant={selectedSession.type === 'initial' ? 'default' : 'outline'}>
                {selectedSession.type === 'initial' ? 'Formation initiale' : 'Recyclage'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="container max-w-screen-xl py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Session Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Détails de la session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Date</div>
                          <div className="text-muted-foreground">{formatDate(selectedSession.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Horaires</div>
                          <div className="text-muted-foreground">{selectedSession.time} - {selectedSession.endTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Lieu</div>
                          <div className="text-muted-foreground">{selectedSession.location}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Formateur</div>
                          <div className="text-muted-foreground">{selectedSession.instructor}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Places disponibles</div>
                          <div className="text-muted-foreground">{selectedSession.availableSpots}/{selectedSession.maxSpots}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Euro className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Tarif</div>
                          <div className="text-muted-foreground">{selectedSession.price}€ HT</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedSession.status === 'available' && selectedSession.availableSpots > 0 && (
                    <div className="border-t border-border pt-6">
                      <div className="flex gap-4">
                        <Button size="lg" className="flex-1">
                          Réserver cette session
                        </Button>
                        <Button variant="outline" size="lg">
                          Demander un devis groupe
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedSession.status === 'full' && (
                    <div className="border-t border-border pt-6">
                      <div className="rounded-lg bg-muted p-4 text-center">
                        <p className="font-medium">Session complète</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Cette session affiche complet. Contactez-nous pour être informé des prochaines dates.
                        </p>
                        <Button variant="outline" className="mt-3">
                          Être notifié des prochaines sessions
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations pratiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Programme de la formation</h4>
                    <p className="text-sm text-muted-foreground">
                      Consultez le programme détaillé et les objectifs pédagogiques de cette formation.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Télécharger le programme
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Prérequis</h4>
                    <p className="text-sm text-muted-foreground">
                      Vérifiez que vous remplissez les conditions d'accès à cette formation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Notre équipe est disponible pour vous accompagner dans votre inscription.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Nous appeler
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Envoyer un email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-screen-xl py-12">
          <h1 className="mb-4 text-4xl font-bold">Calendrier des Sessions</h1>
          <p className="max-w-2xl text-muted-foreground">
            Consultez toutes nos sessions de formation disponibles et réservez votre place en quelques clics.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl py-12">
        {/* Filters and Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <Select value={selectedFunction} onValueChange={setSelectedFunction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Fonction CBTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les fonctions</SelectItem>
                <SelectItem value="7.1">7.1 - Shippers</SelectItem>
                <SelectItem value="7.2">7.2 - Packers</SelectItem>
                <SelectItem value="7.3">7.3 - Freight Forwarders</SelectItem>
                <SelectItem value="7.4">7.4 - Ground Handling</SelectItem>
                <SelectItem value="7.5">7.5 - Cargo Acceptance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lieu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les lieux</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
                <SelectItem value="nice">Nice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              onClick={() => setViewMode('calendar')}
            >
              Calendrier
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
            >
              Liste
            </Button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          /* Calendar View */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekdays.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-24" />;
                  }
                  
                  const sessions = getSessionsForDate(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`min-h-24 border border-border rounded-lg p-1 ${isToday ? 'bg-primary/5 border-primary/20' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {sessions.slice(0, 2).map(session => (
                          <button
                            key={session.id}
                            onClick={() => setSelectedSession(session)}
                            className="w-full text-left"
                          >
                            <div className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
                              session.status === 'full' ? 'bg-muted text-muted-foreground' :
                              session.type === 'initial' ? 'bg-primary/10 text-primary' : 'bg-secondary/50 text-secondary-foreground'
                            }`}>
                              {session.functionId} {session.functionTitle}
                            </div>
                          </button>
                        ))}
                        {sessions.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{sessions.length - 2} autre{sessions.length > 3 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredSessions.map(session => (
              <Card key={session.id} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">{session.functionId}</Badge>
                        <h3 className="text-lg font-semibold">{session.functionTitle}</h3>
                        <Badge variant={session.type === 'initial' ? 'default' : 'outline'}>
                          {session.type === 'initial' ? 'Formation initiale' : 'Recyclage'}
                        </Badge>
                        {session.status === 'full' && (
                          <Badge variant="destructive">Complet</Badge>
                        )}
                      </div>
                      <div className="grid gap-2 md:grid-cols-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {formatDate(session.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {session.time} - {session.endTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {session.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:items-end">
                      <div className="text-right">
                        <div className="font-semibold">{session.price}€ HT</div>
                        <div className="text-sm text-muted-foreground">
                          {session.availableSpots}/{session.maxSpots} places
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setSelectedSession(session)}>
                          Détails
                        </Button>
                        <Button disabled={session.status === 'full'}>
                          {session.status === 'full' ? 'Complet' : 'Réserver'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}