import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  Download, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  Bell,
  LogOut,
  BarChart
} from "lucide-react";

interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  registrationDate: string;
  avatar?: string;
}

interface Training {
  id: string;
  functionId: string;
  functionTitle: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'expired';
  startDate: string;
  completionDate?: string;
  progress: number;
  instructor: string;
  location: string;
  certificateId?: string;
  expiryDate?: string;
  score?: number;
}

interface Certificate {
  id: string;
  functionId: string;
  functionTitle: string;
  issueDate: string;
  expiryDate: string;
  score: number;
  status: 'active' | 'expiring-soon' | 'expired';
  downloadUrl: string;
}

interface Material {
  id: string;
  trainingId: string;
  title: string;
  type: 'pdf' | 'video' | 'quiz' | 'presentation';
  size: string;
  uploadDate: string;
  downloadUrl: string;
  required: boolean;
  completed: boolean;
}

const mockStudent: StudentData = {
  id: "student-001",
  firstName: "Pierre",
  lastName: "Martin",
  email: "pierre.martin@exemple.fr",
  company: "Air France Cargo",
  registrationDate: "2024-01-15",
};

const mockTrainings: Training[] = [
  {
    id: "training-001",
    functionId: "7.1",
    functionTitle: "Shippers",
    status: "completed",
    startDate: "2024-03-15",
    completionDate: "2024-03-17",
    progress: 100,
    instructor: "Marie Dubois",
    location: "Paris - Centre de formation",
    certificateId: "cert-001",
    expiryDate: "2026-03-17",
    score: 95
  },
  {
    id: "training-002",
    functionId: "7.4",
    functionTitle: "Ground Handling",
    status: "in-progress",
    startDate: "2025-03-22",
    progress: 65,
    instructor: "Michel Rousseau",
    location: "Paris CDG"
  },
  {
    id: "training-003",
    functionId: "7.5",
    functionTitle: "Cargo Acceptance",
    status: "upcoming",
    startDate: "2025-04-05",
    progress: 0,
    instructor: "François Dubois",
    location: "Paris - Centre de formation"
  }
];

const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    functionId: "7.1",
    functionTitle: "Shippers",
    issueDate: "2024-03-17",
    expiryDate: "2026-03-17",
    score: 95,
    status: "active",
    downloadUrl: "/certificates/cert-001.pdf"
  },
  {
    id: "cert-002",
    functionId: "7.3",
    functionTitle: "Freight Forwarders",
    issueDate: "2023-06-10",
    expiryDate: "2025-06-10",
    score: 88,
    status: "expiring-soon",
    downloadUrl: "/certificates/cert-002.pdf"
  }
];

const mockMaterials: Material[] = [
  {
    id: "mat-001",
    trainingId: "training-002",
    title: "Manuel IATA DGR 66ème édition - Chapitre 7.4",
    type: "pdf",
    size: "12.3 MB",
    uploadDate: "2025-03-20",
    downloadUrl: "/materials/dgr-7.4-manual.pdf",
    required: true,
    completed: true
  },
  {
    id: "mat-002",
    trainingId: "training-002",
    title: "Vidéo : Procédures de handling au sol",
    type: "video",
    size: "145 MB",
    uploadDate: "2025-03-20",
    downloadUrl: "/materials/handling-procedures.mp4",
    required: true,
    completed: false
  },
  {
    id: "mat-003",
    trainingId: "training-002",
    title: "Quiz d'évaluation intermédiaire",
    type: "quiz",
    size: "-",
    uploadDate: "2025-03-21",
    downloadUrl: "/quiz/handling-quiz-1",
    required: true,
    completed: true
  }
];

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expiring-soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Play className="h-4 w-4" />;
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'video':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'quiz':
        return <BarChart className="h-4 w-4 text-green-600" />;
      case 'presentation':
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const completedTrainings = mockTrainings.filter(t => t.status === 'completed').length;
  const inProgressTrainings = mockTrainings.filter(t => t.status === 'in-progress').length;
  const upcomingTrainings = mockTrainings.filter(t => t.status === 'upcoming').length;
  const activeCertificates = mockCertificates.filter(c => c.status === 'active').length;
  const expiringSoonCertificates = mockCertificates.filter(c => c.status === 'expiring-soon').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="container max-w-screen-xl py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockStudent.avatar} />
                <AvatarFallback>
                  {mockStudent.firstName[0]}{mockStudent.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  Bonjour, {mockStudent.firstName} {mockStudent.lastName}
                </h1>
                <p className="text-muted-foreground">
                  {mockStudent.company} • Inscrit depuis {formatDate(mockStudent.registrationDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-screen-xl py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="trainings">Mes formations</TabsTrigger>
            <TabsTrigger value="materials">Supports</TabsTrigger>
            <TabsTrigger value="certificates">Certificats</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Formations terminées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{completedTrainings}</div>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    En cours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{inProgressTrainings}</div>
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    À venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{upcomingTrainings}</div>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Certificats actifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{activeCertificates}</div>
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Formations en cours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrainings.filter(t => t.status === 'in-progress').map((training) => (
                    <div key={training.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{training.functionId} - {training.functionTitle}</div>
                          <div className="text-sm text-muted-foreground">
                            Avec {training.instructor}
                          </div>
                        </div>
                        <Badge className={getStatusColor(training.status)}>
                          {training.progress}% terminé
                        </Badge>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Commencée le {formatDate(training.startDate)}</span>
                        <span>{training.location}</span>
                      </div>
                    </div>
                  ))}
                  {mockTrainings.filter(t => t.status === 'in-progress').length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Aucune formation en cours actuellement.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prochaines sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrainings.filter(t => t.status === 'upcoming').map((training) => (
                    <div key={training.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">{training.functionId} - {training.functionTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(training.startDate)} • {training.instructor}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          📍 {training.location}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Détails
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            {expiringSoonCertificates > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="h-5 w-5" />
                    Attention : Certificats expirant bientôt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-700 mb-4">
                    {expiringSoonCertificates} de vos certificats expire{expiringSoonCertificates > 1 ? 'nt' : ''} dans les 6 prochains mois. 
                    Pensez à planifier votre recyclage.
                  </p>
                  <Button size="sm" variant="outline">
                    Programmer un recyclage
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Trainings Tab */}
          <TabsContent value="trainings" className="space-y-6">
            <div className="space-y-4">
              {mockTrainings.map((training) => (
                <Card key={training.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{training.functionId}</Badge>
                        <CardTitle className="text-lg">{training.functionTitle}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(training.status)}>
                          {getStatusIcon(training.status)}
                          {training.status === 'completed' ? 'Terminée' :
                           training.status === 'in-progress' ? 'En cours' :
                           training.status === 'upcoming' ? 'À venir' : 'Expirée'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm font-medium">Dates</div>
                        <div className="text-sm text-muted-foreground">
                          Début: {formatDate(training.startDate)}
                          {training.completionDate && (
                            <div>Fin: {formatDate(training.completionDate)}</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Formateur</div>
                        <div className="text-sm text-muted-foreground">{training.instructor}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Lieu</div>
                        <div className="text-sm text-muted-foreground">{training.location}</div>
                      </div>
                    </div>
                    
                    {training.progress > 0 && training.status !== 'completed' && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{training.progress}%</span>
                        </div>
                        <Progress value={training.progress} />
                      </div>
                    )}

                    {training.score && (
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">Score final:</div>
                        <Badge variant="secondary">{training.score}/100</Badge>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {training.status === 'in-progress' && (
                        <Button size="sm">
                          Continuer la formation
                        </Button>
                      )}
                      {training.certificateId && (
                        <Button size="sm" variant="outline">
                          <Award className="mr-2 h-4 w-4" />
                          Voir le certificat
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Supports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="space-y-4">
              {mockMaterials.map((material) => {
                const training = mockTrainings.find(t => t.id === material.trainingId);
                return (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>{getMaterialIcon(material.type)}</div>
                          <div>
                            <div className="font-medium">{material.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {training?.functionId} {training?.functionTitle} • {material.size}
                              {material.type === 'video' && ' • Durée estimée: 15 min'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Ajouté le {formatDate(material.uploadDate)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {material.required && (
                            <Badge variant="destructive" className="text-xs">Obligatoire</Badge>
                          )}
                          {material.completed && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Terminé
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            {material.type === 'video' ? 'Regarder' :
                             material.type === 'quiz' ? 'Commencer' : 'Télécharger'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {mockCertificates.map((certificate) => (
                <Card key={certificate.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {certificate.functionId} - {certificate.functionTitle}
                          </CardTitle>
                          <Badge className={getStatusColor(certificate.status)}>
                            {certificate.status === 'active' ? 'Valide' :
                             certificate.status === 'expiring-soon' ? 'Expire bientôt' : 'Expiré'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Date d'obtention:</span>
                        <span>{formatDate(certificate.issueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date d'expiration:</span>
                        <span className={certificate.status === 'expiring-soon' ? 'text-yellow-600 font-medium' : ''}>
                          {formatDate(certificate.expiryDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Score:</span>
                        <span className="font-bold">{certificate.score}/100</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                      {certificate.status === 'expiring-soon' && (
                        <Button size="sm" className="flex-1">
                          Programmer recyclage
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {mockCertificates.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Aucun certificat disponible</h3>
                  <p className="text-muted-foreground mb-4">
                    Terminez une formation pour obtenir votre premier certificat IATA CBTA.
                  </p>
                  <Button>
                    Voir les formations disponibles
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}