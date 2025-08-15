import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Users, 
  Calendar, 
  Euro, 
  Search,
  Filter,
  BookOpen,
  Award,
  ChevronRight
} from "lucide-react";

interface Training {
  id: string;
  function: string;
  title: string;
  description: string;
  fullDescription: string;
  duration: string;
  prerequisites: string[];
  objectives: string[];
  price: {
    initial: number;
    recurrent: number;
  };
  nextSessions: Array<{
    date: string;
    location: string;
    instructor: string;
    availableSpots: number;
    maxSpots: number;
    type: 'initial' | 'recurrent';
  }>;
  certification: string;
}

const trainingsData: Training[] = [
  {
    id: "7.1",
    function: "7.1",
    title: "Shippers",
    description: "Formation pour les expéditeurs de marchandises dangereuses aériennes",
    fullDescription: "Cette formation s'adresse aux expéditeurs qui préparent et remettent des marchandises dangereuses au transport aérien. Elle couvre la classification, l'emballage, le marquage, l'étiquetage et la documentation requise selon les réglementations IATA DGR.",
    duration: "2 jours (14h)",
    prerequisites: ["Aucun prérequis spécifique"],
    objectives: [
      "Identifier et classifier les marchandises dangereuses",
      "Maîtriser les procédures d'emballage et de marquage",
      "Établir la documentation de transport appropriée",
      "Comprendre les restrictions et interdictions",
      "Appliquer les procédures d'urgence"
    ],
    price: {
      initial: 890,
      recurrent: 690
    },
    nextSessions: [
      {
        date: "15 Mars 2025",
        location: "Paris",
        instructor: "Marie Dubois",
        availableSpots: 8,
        maxSpots: 12,
        type: "initial"
      },
      {
        date: "10 Avril 2025",
        location: "Lyon",
        instructor: "Jean Martin",
        availableSpots: 5,
        maxSpots: 10,
        type: "recurrent"
      }
    ],
    certification: "Certificat IATA valable 24 mois"
  },
  {
    id: "7.2",
    function: "7.2",
    title: "Packers",
    description: "Emballage sécurisé des marchandises dangereuses selon les normes IATA",
    fullDescription: "Formation spécialisée pour le personnel responsable de l'emballage des marchandises dangereuses destinées au transport aérien. Couvre les techniques d'emballage, les matériaux autorisés et les procédures de contrôle qualité.",
    duration: "1.5 jours (12h)",
    prerequisites: ["Connaissance de base des marchandises dangereuses recommandée"],
    objectives: [
      "Maîtriser les techniques d'emballage conformes",
      "Sélectionner les emballages appropriés",
      "Effectuer les contrôles de conformité",
      "Appliquer les procédures de sécurité"
    ],
    price: {
      initial: 750,
      recurrent: 550
    },
    nextSessions: [
      {
        date: "25 Mars 2025",
        location: "Paris",
        instructor: "Pierre Lambert",
        availableSpots: 6,
        maxSpots: 8,
        type: "initial"
      }
    ],
    certification: "Certificat IATA valable 24 mois"
  },
  {
    id: "7.3",
    function: "7.3",
    title: "Freight Forwarders",
    description: "Formation pour les transitaires et agents de fret aérien",
    fullDescription: "Cette formation couvre les responsabilités des transitaires dans la chaîne de transport des marchandises dangereuses par voie aérienne, incluant la vérification des documents, l'acceptation et le transfert des envois.",
    duration: "2 jours (14h)",
    prerequisites: ["Expérience dans le fret aérien souhaitée"],
    objectives: [
      "Vérifier la conformité des expéditions",
      "Gérer la documentation de transport",
      "Coordonner avec les différents acteurs",
      "Appliquer les procédures d'urgence"
    ],
    price: {
      initial: 920,
      recurrent: 720
    },
    nextSessions: [
      {
        date: "02 Avril 2025",
        location: "Marseille",
        instructor: "Sophie Moreau",
        availableSpots: 10,
        maxSpots: 15,
        type: "initial"
      }
    ],
    certification: "Certificat IATA valable 24 mois"
  },
  {
    id: "7.4",
    function: "7.4",
    title: "Ground Handling",
    description: "Agents de handling au sol - Manipulation sécurisée",
    fullDescription: "Formation destinée au personnel de handling responsable de la manipulation, du stockage et du chargement/déchargement des marchandises dangereuses dans les aéroports.",
    duration: "1 jour (7h)",
    prerequisites: ["Habilitation aéroportuaire requise"],
    objectives: [
      "Manipuler les marchandises dangereuses en sécurité",
      "Identifier les risques et appliquer les mesures préventives",
      "Utiliser les équipements de protection individuelle",
      "Gérer les situations d'urgence"
    ],
    price: {
      initial: 680,
      recurrent: 480
    },
    nextSessions: [
      {
        date: "22 Mars 2025",
        location: "Paris CDG",
        instructor: "Michel Rousseau",
        availableSpots: 12,
        maxSpots: 20,
        type: "recurrent"
      },
      {
        date: "15 Avril 2025",
        location: "Nice",
        instructor: "Anne Leclerc",
        availableSpots: 8,
        maxSpots: 15,
        type: "initial"
      }
    ],
    certification: "Certificat IATA valable 24 mois"
  },
  {
    id: "7.5",
    function: "7.5",
    title: "Cargo Acceptance",
    description: "Acceptation des marchandises dangereuses en cargo",
    fullDescription: "Formation pour le personnel responsable de l'acceptation des marchandises dangereuses dans les terminaux cargo, incluant les contrôles documentaires, physiques et les procédures de refus.",
    duration: "2 jours (14h)",
    prerequisites: ["Formation 7.4 ou expérience équivalente"],
    objectives: [
      "Effectuer les contrôles d'acceptation réglementaires",
      "Identifier les non-conformités",
      "Appliquer les procédures de refus",
      "Gérer la documentation d'acceptation"
    ],
    price: {
      initial: 950,
      recurrent: 750
    },
    nextSessions: [
      {
        date: "05 Avril 2025",
        location: "Paris",
        instructor: "François Dubois",
        availableSpots: 6,
        maxSpots: 12,
        type: "initial"
      }
    ],
    certification: "Certificat IATA valable 24 mois"
  }
];

export default function TrainingCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFunction, setSelectedFunction] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const filteredTrainings = trainingsData.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.function.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFunction = selectedFunction === "all" || training.function === selectedFunction;
    
    return matchesSearch && matchesFunction;
  });

  if (selectedTraining) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container max-w-screen-xl py-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTraining(null)}
              className="mb-4"
            >
              ← Retour au catalogue
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {selectedTraining.function}
              </Badge>
              <h1 className="text-3xl font-bold">{selectedTraining.title}</h1>
            </div>
            <p className="mt-2 text-muted-foreground">{selectedTraining.description}</p>
          </div>
        </div>

        <div className="container max-w-screen-xl py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Description détaillée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTraining.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle>Objectifs pédagogiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedTraining.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Next Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Prochaines sessions disponibles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTraining.nextSessions.map((session, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{session.date}</span>
                            <Badge variant={session.type === 'initial' ? 'default' : 'secondary'}>
                              {session.type === 'initial' ? 'Formation initiale' : 'Recyclage'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>📍 {session.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>👨‍🏫 {session.instructor}</span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{session.availableSpots}/{session.maxSpots} places disponibles</span>
                          </div>
                          <Button 
                            className="mt-2"
                            disabled={session.availableSpots === 0}
                          >
                            {session.availableSpots === 0 ? 'Complet' : "S'inscrire"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations pratiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Durée</div>
                      <div className="text-sm text-muted-foreground">{selectedTraining.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Euro className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <div className="font-medium">Tarifs</div>
                      <div className="text-sm text-muted-foreground">
                        Formation initiale: {selectedTraining.price.initial}€<br/>
                        Recyclage: {selectedTraining.price.recurrent}€
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <div className="font-medium">Certification</div>
                      <div className="text-sm text-muted-foreground">{selectedTraining.certification}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle>Prérequis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {selectedTraining.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {prereq}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'informations ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Notre équipe est à votre disposition pour répondre à vos questions.
                  </p>
                  <Button variant="outline" className="w-full">
                    Nous contacter
                  </Button>
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
          <h1 className="mb-4 text-4xl font-bold">Catalogue de Formations</h1>
          <p className="max-w-2xl text-muted-foreground">
            Découvrez nos formations IATA CBTA pour toutes les fonctions de 7.1 à 7.10. 
            Formations initiales et recyclages disponibles.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl py-12">
        {/* Filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedFunction} onValueChange={setSelectedFunction}>
            <SelectTrigger>
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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Type de formation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="initial">Formation initiale</SelectItem>
              <SelectItem value="recurrent">Recyclage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredTrainings.length} formation{filteredTrainings.length > 1 ? 's' : ''} trouvée{filteredTrainings.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Training Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredTrainings.map((training) => (
            <Card key={training.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {training.function}
                    </Badge>
                    <CardTitle className="text-xl">{training.title}</CardTitle>
                  </div>
                </div>
                <p className="text-muted-foreground">{training.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro className="h-4 w-4 text-muted-foreground" />
                      <span>À partir de {training.price.recurrent}€</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{training.nextSessions.length} session{training.nextSessions.length > 1 ? 's' : ''} disponible{training.nextSessions.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>Certification IATA</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedTraining(training)}
                  >
                    Voir détails
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button className="flex-1">
                    S'inscrire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-muted-foreground">
              <Filter className="h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Aucune formation trouvée</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou de filtres.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}