import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  User, 
  Search, 
  ArrowRight,
  Clock,
  BookOpen,
  AlertTriangle,
  Info,
  FileText,
  ChevronLeft
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  type: 'regulation' | 'guide' | 'news' | 'case-study';
}

const blogPosts: BlogPost[] = [
  {
    id: "dgr-66-changes",
    title: "IATA DGR 66ème édition : Les principales modifications pour 2025",
    excerpt: "Découvrez les changements majeurs de la 66ème édition des réglementations IATA DGR qui entrent en vigueur le 1er janvier 2025.",
    content: `Les nouvelles réglementations IATA DGR 66ème édition apportent plusieurs modifications importantes pour le transport aérien des marchandises dangereuses.

**Principales modifications :**

1. **Nouvelles substances réglementées**
   - Ajout de 12 nouvelles substances dans la liste des marchandises dangereuses
   - Reclassification de certains produits chimiques
   - Nouvelles restrictions pour les batteries lithium

2. **Évolutions des procédures d'emballage**
   - Nouveaux standards pour les emballages composites
   - Modification des tests de résistance pour certaines catégories
   - Instructions d'emballage mises à jour

3. **Formation et certification**
   - Nouveaux modules de formation obligatoires pour certaines fonctions
   - Mise à jour des compétences requises pour les fonctions 7.1 à 7.10
   - Nouvelles exigences de recyclage

**Impact pour les professionnels :**

Ces changements nécessitent une mise à jour des connaissances pour tous les professionnels impliqués dans la chaîne de transport des marchandises dangereuses. Nos formations sont déjà actualisées selon ces nouvelles exigences.`,
    author: "Marie Dubois",
    publishDate: "2025-01-15",
    readTime: "5 min",
    category: "Réglementation",
    tags: ["DGR", "IATA", "2025", "Réglementation"],
    featured: true,
    type: "regulation"
  },
  {
    id: "lithium-battery-guide",
    title: "Guide complet : Transport des batteries lithium en 2025",
    excerpt: "Tout ce qu'il faut savoir sur les nouvelles règles de transport des batteries lithium par voie aérienne.",
    content: `Le transport des batteries lithium reste l'un des sujets les plus complexes en matière de marchandises dangereuses. Ce guide vous explique les règles actualisées.

**Types de batteries concernées :**

1. **Batteries lithium métal (UN3090)**
   - Nouvelles limitations de quantité
   - Exigences d'emballage renforcées
   - Documentation spécifique

2. **Batteries lithium-ion (UN3480)**
   - Procédures de test mises à jour
   - Étiquetage obligatoire
   - Conditions de transport

**Bonnes pratiques :**

- Vérification systématique de l'état de charge
- Emballage dans des contenants approuvés
- Formation du personnel de manutention
- Documentation complète et précise

Cette réglementation évolue constamment. Assurez-vous de suivre nos formations de recyclage pour rester à jour.`,
    author: "Jean Martin",
    publishDate: "2025-01-10",
    readTime: "8 min",
    category: "Guide pratique",
    tags: ["Batteries", "Lithium", "UN3090", "UN3480"],
    featured: false,
    type: "guide"
  },
  {
    id: "accident-case-study",
    title: "Étude de cas : Analyse d'un incident de transport de marchandises dangereuses",
    excerpt: "Retour d'expérience sur un incident récent et les enseignements à en tirer pour améliorer la sécurité.",
    content: `L'analyse des incidents est essentielle pour améliorer nos pratiques de sécurité. Cette étude de cas examine un incident récent et ses enseignements.

**Contexte de l'incident :**

Un envoi de produits chimiques de classe 8 (matières corrosives) a été mal étiquetée, entraînant une procédure d'urgence à l'aéroport de destination.

**Causes identifiées :**

1. **Formation insuffisante** du personnel d'expédition
2. **Procédures de contrôle** non respectées
3. **Documentation incomplète**

**Mesures correctives :**

- Renforcement de la formation fonction 7.1 (Shippers)
- Mise en place de check-lists obligatoires
- Contrôles qualité systématiques

**Enseignements :**

Cet incident rappelle l'importance cruciale de la formation continue et du respect strict des procédures. Chaque maillon de la chaîne doit être parfaitement formé et sensibilisé.`,
    author: "Sophie Moreau",
    publishDate: "2025-01-05",
    readTime: "6 min",
    category: "Étude de cas",
    tags: ["Sécurité", "Incident", "Analyse", "Prévention"],
    featured: false,
    type: "case-study"
  },
  {
    id: "cargo-acceptance-best-practices",
    title: "Meilleures pratiques pour l'acceptation cargo des marchandises dangereuses",
    excerpt: "Optimisez vos procédures d'acceptation cargo avec ces conseils d'experts basés sur l'expérience terrain.",
    content: `L'acceptation cargo est une étape critique qui nécessite rigueur et expertise. Voici nos recommandations basées sur 15 ans d'expérience.

**Contrôles essentiels :**

1. **Vérification documentaire**
   - Déclaration de marchandises dangereuses complète
   - Certificat d'emballage si requis
   - Instruction d'emballage appropriée

2. **Contrôle physique**
   - État des emballages
   - Étiquetage et marquage conformes
   - Quantités déclarées

3. **Procédures de refus**
   - Critères de non-conformité
   - Documentation du refus
   - Communication avec l'expéditeur

**Technologies d'aide :**

- Lecteurs de codes-barres pour la traçabilité
- Applications mobiles de vérification
- Bases de données réglementaires actualisées

Une formation fonction 7.5 (Cargo Acceptance) récente est indispensable pour maîtriser ces procédures complexes.`,
    author: "François Dubois",
    publishDate: "2024-12-28",
    readTime: "7 min",
    category: "Guide pratique",
    tags: ["Cargo", "Acceptation", "Procédures", "Bonnes pratiques"],
    featured: false,
    type: "guide"
  },
  {
    id: "training-trends-2025",
    title: "Tendances de la formation CBTA en 2025",
    excerpt: "Comment la formation aux marchandises dangereuses évolue-t-elle ? Découvrez les tendances pour 2025.",
    content: `Le secteur de la formation CBTA connaît une évolution constante. Voici les principales tendances que nous observons pour 2025.

**Digitalisation de la formation :**

1. **Supports interactifs**
   - Simulations 3D d'emballage
   - Réalité virtuelle pour la formation pratique
   - Applications mobiles d'aide-mémoire

2. **Personnalisation pédagogique**
   - Parcours adaptés selon l'expérience
   - Évaluations continues
   - Suivi post-formation

**Nouvelles exigences réglementaires :**

- Formation continue obligatoire
- Évaluations pratiques renforcées
- Traçabilité des compétences

**Innovation pédagogique :**

Nous intégrons ces évolutions dans nos programmes pour offrir une formation toujours plus efficace et adaptée aux besoins du terrain.

L'avenir de la formation CBTA s'oriente vers plus d'interactivité et de personnalisation, tout en conservant la rigueur réglementaire indispensable.`,
    author: "Marie Dubois",
    publishDate: "2024-12-20",
    readTime: "4 min",
    category: "Innovation",
    tags: ["Formation", "Tendances", "2025", "Innovation"],
    featured: false,
    type: "news"
  }
];

const categories = ["Tous", "Réglementation", "Guide pratique", "Étude de cas", "Innovation"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regulation':
        return AlertTriangle;
      case 'guide':
        return BookOpen;
      case 'case-study':
        return FileText;
      case 'news':
        return Info;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'regulation':
        return 'bg-red-100 text-red-800';
      case 'guide':
        return 'bg-blue-100 text-blue-800';
      case 'case-study':
        return 'bg-yellow-100 text-yellow-800';
      case 'news':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container max-w-4xl py-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPost(null)}
              className="mb-6"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour aux actualités
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={getTypeColor(selectedPost.type)}>
                  {selectedPost.category}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedPost.publishDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedPost.readTime}
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold md:text-4xl">{selectedPost.title}</h1>
              <p className="text-xl text-muted-foreground">{selectedPost.excerpt}</p>
              
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container max-w-4xl py-12">
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
              {selectedPost.content}
            </div>
          </div>

          {/* Related Actions */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="font-semibold mb-2">Cet article vous a été utile ?</h3>
                <p className="text-sm text-muted-foreground">
                  Découvrez nos formations pour approfondir vos connaissances.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  Partager l'article
                </Button>
                <Button>
                  Voir nos formations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container max-w-screen-xl text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Actualités & Ressources</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Restez informé des dernières évolutions réglementaires, découvrez nos guides pratiques 
            et bénéficiez de l'expertise de nos formateurs.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">À la une</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => {
                const TypeIcon = getTypeIcon(post.type);
                return (
                  <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${getTypeColor(post.type)}`}>
                          <TypeIcon className="h-4 w-4" />
                        </div>
                        <Badge className={getTypeColor(post.type)}>
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.publishDate)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedPost(post)}
                      >
                        Lire l'article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.filter(post => !post.featured).map((post) => {
            const TypeIcon = getTypeIcon(post.type);
            return (
              <Card key={post.id} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`flex h-6 w-6 items-center justify-center rounded ${getTypeColor(post.type)}`}>
                      <TypeIcon className="h-3 w-3" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishDate)}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedPost(post)}
                  >
                    Lire l'article
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-muted-foreground">
              <Search className="h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Aucun article trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}