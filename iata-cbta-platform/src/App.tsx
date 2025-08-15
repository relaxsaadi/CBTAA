import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  Plane, 
  Shield, 
  BookOpen,
  Menu,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useState } from "react";
import TrainingCatalog from "./components/TrainingCatalog";
import SessionCalendar from "./components/SessionCalendar";
import AboutPage from "./components/AboutPage";
import BlogPage from "./components/BlogPage";
import ContactPage from "./components/ContactPage";
import StudentPortal from "./components/StudentPortal";
import AdminPanel from "./components/AdminPanel";
import LoginPage from "./components/LoginPage";

type PageType = 'home' | 'formations' | 'calendar' | 'about' | 'blog' | 'contact' | 'login' | 'student-portal' | 'admin-panel';
type UserType = 'guest' | 'student' | 'admin';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
}

const cbताFunctions = [
  { id: "7.1", title: "Shippers", description: "Formation pour les expéditeurs de marchandises dangereuses" },
  { id: "7.2", title: "Packers", description: "Emballage sécurisé des marchandises dangereuses" },
  { id: "7.3", title: "Freight Forwarders", description: "Transitaires et agents de fret" },
  { id: "7.4", title: "Ground Handling", description: "Agents de handling au sol" },
  { id: "7.5", title: "Cargo Acceptance", description: "Acceptation des marchandises dangereuses" },
  { id: "7.6", title: "Load Planning", description: "Planification du chargement" },
  { id: "7.7", title: "Cabin Crew", description: "Personnel naviguant commercial" },
  { id: "7.8", title: "Flight Crew", description: "Personnel naviguant technique" },
  { id: "7.9", title: "Load Control", description: "Contrôle de chargement" },
  { id: "7.10", title: "Security Screeners", description: "Agents de sûreté" }
];

const nextSessions = [
  { function: "7.1 Shippers", date: "15 Mars 2025", type: "Formation initiale", places: 8 },
  { function: "7.4 Ground Handling", date: "22 Mars 2025", type: "Recyclage", places: 12 },
  { function: "7.5 Cargo Acceptance", date: "05 Avril 2025", type: "Formation initiale", places: 6 },
];

function HomePage({ onNavigate, userType }: { onNavigate: (page: PageType) => void; userType: UserType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plane className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="text-xl font-bold">CBTA Formation</div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium" role="navigation" aria-label="Navigation principale">
            <button onClick={() => onNavigate('formations')} className="transition-colors hover:text-foreground/80">Formations</button>
            <button onClick={() => onNavigate('calendar')} className="transition-colors hover:text-foreground/80">Calendrier</button>
            <button onClick={() => onNavigate('about')} className="transition-colors hover:text-foreground/80">À propos</button>
            <button onClick={() => onNavigate('blog')} className="transition-colors hover:text-foreground/80">Actualités</button>
            <button onClick={() => onNavigate('contact')} className="transition-colors hover:text-foreground/80">Contact</button>
            <Button variant="outline" size="sm" onClick={() => onNavigate('login')}>
              {userType === 'guest' ? 'Espace Client' : 'Mon Espace'}
            </Button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu de navigation mobile"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border" id="mobile-menu">
          <div className="container py-4 space-y-4">
            <button onClick={() => onNavigate('formations')} className="block py-2 text-left w-full">Formations</button>
            <button onClick={() => onNavigate('calendar')} className="block py-2 text-left w-full">Calendrier</button>
            <button onClick={() => onNavigate('about')} className="block py-2 text-left w-full">À propos</button>
            <button onClick={() => onNavigate('blog')} className="block py-2 text-left w-full">Actualités</button>
            <button onClick={() => onNavigate('contact')} className="block py-2 text-left w-full">Contact</button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('login')}>
              {userType === 'guest' ? 'Espace Client' : 'Mon Espace'}
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-background to-background py-20 md:py-32">
        <div className="container max-w-screen-xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Badge className="px-4 py-2 text-sm">
                <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                Centre de Formation Agréé IATA
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Formation IATA CBTA
              <span className="block text-primary">Marchandises Dangereuses</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
              Centre de formation agréé spécialisé dans les réglementations IATA sur les marchandises dangereuses aériennes. 
              Formations certifiantes pour tous les professionnels du transport aérien.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group" onClick={() => onNavigate('formations')}>
                Consulter le catalogue
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('calendar')}>
                <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                Voir le calendrier
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20" aria-labelledby="value-props-title">
        <div className="container max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 id="value-props-title" className="mb-4 text-3xl font-bold">Pourquoi nous choisir ?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Notre expertise reconnue et notre approche pédagogique garantissent une formation de qualité
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>Certification Officielle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Centre agréé IATA avec certification reconnue internationalement. Audit-ready selon les standards DGAC.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>Formateurs Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Équipe de formateurs qualifiés avec expérience terrain dans le transport aérien de marchandises dangereuses.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>Approche Personnalisée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Formations adaptées à votre secteur d'activité avec supports pédagogiques actualisés selon les dernières réglementations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CBTA Functions */}
      <section id="formations" className="bg-muted/30 py-20">
        <div className="container max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Fonctions CBTA</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Formations spécialisées pour toutes les fonctions CBTA de 7.1 à 7.10
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cbताFunctions.map((func) => (
              <Card key={func.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{func.id}</Badge>
                  </div>
                  <CardTitle className="text-lg">{func.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{func.description}</p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('formations')}>
                    Voir les sessions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Sessions Preview */}
      <section id="calendrier" className="py-20">
        <div className="container max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Prochaines Sessions</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Inscrivez-vous dès maintenant aux formations à venir
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {nextSessions.map((session, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{session.function}</CardTitle>
                  <Badge variant={session.type === 'Formation initiale' ? 'default' : 'secondary'}>
                    {session.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      {session.date}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      {session.places} places disponibles
                    </div>
                    <Button className="w-full" onClick={() => onNavigate('calendar')}>
                      S'inscrire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('calendar')}>
              Voir toutes les sessions
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container max-w-screen-xl py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Plane className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="font-bold">CBTA Formation</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Centre de formation agréé IATA spécialisé dans les marchandises dangereuses aériennes.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Formations</h4>
              <ul className="space-y-2 text-sm" role="list">
                <li><button onClick={() => onNavigate('formations')} className="text-muted-foreground hover:text-foreground">Catalogue complet</button></li>
                <li><button onClick={() => onNavigate('formations')} className="text-muted-foreground hover:text-foreground">Formation initiale</button></li>
                <li><button onClick={() => onNavigate('formations')} className="text-muted-foreground hover:text-foreground">Recyclage</button></li>
                <li><button onClick={() => onNavigate('contact')} className="text-muted-foreground hover:text-foreground">Formation intra-entreprise</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Entreprise</h4>
              <ul className="space-y-2 text-sm" role="list">
                <li><button onClick={() => onNavigate('about')} className="text-muted-foreground hover:text-foreground">À propos</button></li>
                <li><button onClick={() => onNavigate('about')} className="text-muted-foreground hover:text-foreground">Notre équipe</button></li>
                <li><button onClick={() => onNavigate('about')} className="text-muted-foreground hover:text-foreground">Certifications</button></li>
                <li><button onClick={() => onNavigate('blog')} className="text-muted-foreground hover:text-foreground">Actualités</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <address className="space-y-2 text-sm not-italic">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  <a href="tel:+33123456789" className="text-muted-foreground hover:text-foreground">+33 1 23 45 67 89</a>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  <a href="mailto:contact@cbta-formation.fr" className="text-muted-foreground hover:text-foreground">contact@cbta-formation.fr</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span className="text-muted-foreground">Paris, France</span>
                </div>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CBTA Formation. Tous droits réservés. | Centre agréé IATA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [userType, setUserType] = useState<UserType>('guest');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (type: 'student' | 'admin', data: UserData) => {
    setUserType(type);
    setUserData(data);
    
    // Redirect based on user type
    if (type === 'admin') {
      setCurrentPage('admin-panel');
    } else {
      setCurrentPage('student-portal');
    }
  };

  const handleLogout = () => {
    setUserType('guest');
    setUserData(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    // If user is logged in as admin, show admin panel
    if (userType === 'admin') {
      return <AdminPanel />;
    }
    
    // If user is logged in as student, check current page
    if (userType === 'student' && currentPage === 'student-portal') {
      return <StudentPortal />;
    }
    
    // Handle other pages based on current page
    switch (currentPage) {
      case 'formations':
        return <TrainingCatalog />;
      case 'calendar':
        return <SessionCalendar />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        // If already logged in, redirect to appropriate dashboard
        if (userType === 'student') {
          return <StudentPortal />;
        } else {
          return (
            <LoginPage 
              onLogin={handleLogin} 
              onBack={() => handleNavigation('home')} 
            />
          );
        }
      case 'student-portal':
        if (userType === 'student') {
          return <StudentPortal />;
        } else {
          // Redirect to login if not authenticated
          return (
            <LoginPage 
              onLogin={handleLogin} 
              onBack={() => handleNavigation('home')} 
            />
          );
        }
      case 'admin-panel':
        // Redirect to login if not authenticated as admin
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onBack={() => handleNavigation('home')} 
          />
        );
      default:
        return <HomePage onNavigate={handleNavigation} userType={userType} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}
