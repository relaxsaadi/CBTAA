import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  FileText,
  Building,
  User
} from "lucide-react";

interface AdminStats {
  totalStudents: number;
  activeTrainings: number;
  upcomingSessions: number;
  certificatesIssued: number;
  pendingRegistrations: number;
  expiringSoon: number;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'pending';
  trainingsCompleted: number;
  lastActivity: string;
}

interface SessionManagement {
  id: string;
  functionId: string;
  functionTitle: string;
  date: string;
  instructor: string;
  location: string;
  maxCapacity: number;
  currentEnrollment: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

const mockStats: AdminStats = {
  totalStudents: 1247,
  activeTrainings: 23,
  upcomingSessions: 15,
  certificatesIssued: 892,
  pendingRegistrations: 8,
  expiringSoon: 34
};

const mockStudents: Student[] = [
  {
    id: "student-001",
    firstName: "Pierre",
    lastName: "Martin",
    email: "pierre.martin@exemple.fr",
    company: "Air France Cargo",
    registrationDate: "2024-01-15",
    status: "active",
    trainingsCompleted: 3,
    lastActivity: "2025-01-10"
  },
  {
    id: "student-002",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@logistique.fr",
    company: "DHL Express",
    registrationDate: "2024-02-20",
    status: "active",
    trainingsCompleted: 1,
    lastActivity: "2025-01-08"
  },
  {
    id: "student-003",
    firstName: "Jean",
    lastName: "Durand",
    email: "j.durand@transitaire.com",
    company: "Geodis",
    registrationDate: "2025-01-12",
    status: "pending",
    trainingsCompleted: 0,
    lastActivity: "2025-01-12"
  }
];

const mockSessions: SessionManagement[] = [
  {
    id: "session-001",
    functionId: "7.1",
    functionTitle: "Shippers",
    date: "2025-03-15",
    instructor: "Marie Dubois",
    location: "Paris - Centre de formation",
    maxCapacity: 12,
    currentEnrollment: 8,
    status: "scheduled"
  },
  {
    id: "session-002",
    functionId: "7.4",
    functionTitle: "Ground Handling",
    date: "2025-03-22",
    instructor: "Michel Rousseau",
    location: "Paris CDG",
    maxCapacity: 20,
    currentEnrollment: 20,
    status: "scheduled"
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-screen-xl py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
              <p className="text-muted-foreground">Gérez votre centre de formation CBTA</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle session
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="students">Étudiants</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Étudiants total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
                  <p className="text-xs text-green-600">+12% ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Formations actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeTrainings}</div>
                  <p className="text-xs text-muted-foreground">En cours</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Sessions à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.upcomingSessions}</div>
                  <p className="text-xs text-muted-foreground">Ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Certificats émis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.certificatesIssued}</div>
                  <p className="text-xs text-green-600">+5% ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    En attente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.pendingRegistrations}</div>
                  <p className="text-xs text-yellow-600">À traiter</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Expire bientôt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.expiringSoon}</div>
                  <p className="text-xs text-red-600">Certificats</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium">Formation 7.1 terminée</div>
                      <div className="text-sm text-muted-foreground">Pierre Martin - Air France Cargo</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Il y a 2h</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium">Nouvelle inscription</div>
                      <div className="text-sm text-muted-foreground">Jean Durand - Geodis</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Il y a 4h</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div className="flex-1">
                      <div className="font-medium">Session programmée</div>
                      <div className="text-sm text-muted-foreground">7.4 Ground Handling - 22 Mars</div>
                    </div>
                    <div className="text-xs text-muted-foreground">Hier</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions requises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <div className="font-medium">8 inscriptions en attente</div>
                      <div className="text-sm text-muted-foreground">Validation requise</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Traiter
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <div className="font-medium">34 certificats expirant</div>
                      <div className="text-sm text-muted-foreground">Contacter pour recyclage</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Voir la liste
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un étudiant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un étudiant
              </Button>
            </div>

            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {student.firstName[0]}{student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student.email} • {student.company}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>Inscrit le {formatDate(student.registrationDate)}</span>
                            <span>•</span>
                            <span>{student.trainingsCompleted} formations terminées</span>
                            <span>•</span>
                            <span>Dernière activité: {formatDate(student.lastActivity)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(student.status)}>
                          {student.status === 'active' ? 'Actif' :
                           student.status === 'inactive' ? 'Inactif' : 'En attente'}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            Voir profil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Sessions</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle session
              </Button>
            </div>

            <div className="space-y-4">
              {mockSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary">{session.functionId}</Badge>
                          <div className="font-medium">{session.functionTitle}</div>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status === 'scheduled' ? 'Programmée' : session.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>📅 {formatDate(session.date)} • 👨‍🏫 {session.instructor}</div>
                          <div>📍 {session.location}</div>
                          <div>👥 {session.currentEnrollment}/{session.maxCapacity} participants</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Participants
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Rapports
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion du contenu</CardTitle>
                  <p className="text-muted-foreground">Gérez les supports de formation et les ressources</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Ajouter un document PDF
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Ajouter une vidéo
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Créer un quiz
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier le contenu du site
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Articles de blog</CardTitle>
                  <p className="text-muted-foreground">Publiez des actualités et guides pratiques</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouvel article
                  </Button>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Articles récents:</div>
                    <div className="text-sm text-muted-foreground">
                      • IATA DGR 66ème édition: Les principales modifications
                    </div>
                    <div className="text-sm text-muted-foreground">
                      • Guide complet: Transport des batteries lithium
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration générale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nom du centre</label>
                    <Input defaultValue="CBTA Formation" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email de contact</label>
                    <Input defaultValue="contact@cbta-formation.fr" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Téléphone</label>
                    <Input defaultValue="+33 1 23 45 67 89" />
                  </div>
                  <Button>Sauvegarder</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Nouvelles inscriptions</span>
                    <Button variant="outline" size="sm">Activé</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Certificats expirant</span>
                    <Button variant="outline" size="sm">Activé</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sessions complètes</span>
                    <Button variant="outline" size="sm">Activé</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}