import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Calendar,
  Shield,
  CheckCircle,
  Plane,
  Building,
  User,
  Mail,
  Phone
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specializations: string[];
  email: string;
  phone?: string;
  bio: string;
  certifications: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  validUntil?: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "marie-dubois",
    name: "Marie Dubois",
    role: "Directrice de Formation",
    experience: "15 ans d'expérience dans l'aviation civile",
    specializations: ["IATA DGR", "Formation 7.1", "Formation 7.3", "Audit qualité"],
    email: "marie.dubois@cbta-formation.fr",
    phone: "+33 1 23 45 67 89",
    bio: "Ancienne responsable sécurité chez Air France Cargo, Marie possède une expertise reconnue dans le domaine des marchandises dangereuses. Elle supervise l'ensemble des programmes de formation et garantit la conformité de nos cursus aux standards IATA les plus récents.",
    certifications: [
      "IATA DGR Instructor Certification",
      "Auditor IOSA (IATA Operational Safety Audit)",
      "Formation de formateur agréée DGAC"
    ]
  },
  {
    id: "jean-martin",
    name: "Jean Martin",
    role: "Formateur Senior",
    experience: "12 ans chez Fedex Express",
    specializations: ["Formation 7.4", "Formation 7.5", "Ground Operations"],
    email: "jean.martin@cbta-formation.fr",
    bio: "Expert en opérations au sol et handling cargo, Jean apporte son expérience terrain pour des formations pratiques et concrètes. Il forme principalement les agents de handling et les équipes d'acceptation cargo.",
    certifications: [
      "IATA DGR Category 6 Instructor",
      "Certification Ground Handling",
      "Habilitation sûreté niveau 11.2.3.2"
    ]
  },
  {
    id: "sophie-moreau",
    name: "Sophie Moreau",
    role: "Formatrice Experte",
    experience: "10 ans en transitaire international",
    specializations: ["Formation 7.2", "Formation 7.3", "Documentation DGR"],
    email: "sophie.moreau@cbta-formation.fr",
    bio: "Spécialiste des réglementations douanières et de transport, Sophie forme les transitaires et agents de fret aux spécificités du transport aérien de marchandises dangereuses. Son approche pédagogique privilégie les cas pratiques.",
    certifications: [
      "IATA DGR Category 1 & 3 Instructor",
      "Certification FIATA (Fédération Internationale des Associations de Transitaires)",
      "Expert en réglementation douanière"
    ]
  }
];

const certifications: Certification[] = [
  {
    name: "Centre de Formation Agréé IATA",
    issuer: "International Air Transport Association",
    date: "2020",
    validUntil: "2025",
    description: "Agrément officiel IATA pour dispenser les formations CBTA sur les marchandises dangereuses selon les dernières réglementations DGR."
  },
  {
    name: "Certification Qualité ISO 9001:2015",
    issuer: "AFNOR Certification",
    date: "2022",
    validUntil: "2025",
    description: "Certification qualité garantissant l'excellence de nos processus de formation et notre amélioration continue."
  },
  {
    name: "Agrément DGAC",
    issuer: "Direction Générale de l'Aviation Civile",
    date: "2021",
    validUntil: "2026",
    description: "Reconnaissance officielle par les autorités françaises de l'aviation civile pour nos programmes de formation."
  },
  {
    name: "Membre APEX",
    issuer: "Airline Passenger Experience Association",
    date: "2023",
    description: "Participation active aux groupes de travail sur l'évolution des réglementations de sécurité dans l'aviation."
  }
];

const companyStats = [
  { label: "Années d'expérience", value: "15+", icon: Calendar },
  { label: "Stagiaires formés", value: "2500+", icon: Users },
  { label: "Taux de réussite", value: "98%", icon: Award },
  { label: "Centres de formation", value: "5", icon: Building }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container max-w-screen-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Plane className="h-8 w-8" />
          </div>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">À Propos de Notre Centre</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Depuis plus de 15 ans, nous formons les professionnels du transport aérien aux réglementations 
            les plus exigeantes en matière de marchandises dangereuses.
          </p>
        </div>
      </div>

      {/* Company Stats */}
      <section className="py-16">
        <div className="container max-w-screen-xl">
          <div className="grid gap-8 md:grid-cols-4">
            {companyStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-screen-xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Notre Mission</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Notre mission est d'accompagner les professionnels du transport aérien dans leur montée en compétences 
                sur les réglementations IATA relatives aux marchandises dangereuses. Nous garantissons des formations 
                de qualité, actualisées selon les dernières évolutions réglementaires et adaptées aux besoins spécifiques 
                de chaque secteur d'activité.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En tant que centre de formation agréé IATA, nous nous engageons à maintenir les plus hauts standards 
                de qualité pédagogique et à préparer nos stagiaires aux défis opérationnels qu'ils rencontreront sur le terrain.
              </p>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Nos Valeurs</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Excellence Pédagogique</h4>
                    <p className="text-sm text-muted-foreground">
                      Formations dispensées par des experts reconnus avec une approche pratique et interactive.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Conformité Réglementaire</h4>
                    <p className="text-sm text-muted-foreground">
                      Respect strict des exigences IATA et des autorités nationales de l'aviation civile.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Accompagnement Personnalisé</h4>
                    <p className="text-sm text-muted-foreground">
                      Suivi individualisé et adaptation des contenus aux besoins spécifiques de chaque participant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Innovation Continue</h4>
                    <p className="text-sm text-muted-foreground">
                      Méthodes pédagogiques modernes et supports de formation régulièrement mis à jour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Notre Équipe d'Experts</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Rencontrez nos formateurs qualifiés, tous experts dans leur domaine avec une expérience significative 
              dans l'industrie du transport aérien.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Spécialisations</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <ul className="space-y-1">
                      {member.certifications.slice(0, 2).map((cert, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Award className="h-3 w-3" />
                          {cert}
                        </li>
                      ))}
                      {member.certifications.length > 2 && (
                        <li className="text-xs text-muted-foreground">
                          +{member.certifications.length - 2} autre{member.certifications.length > 3 ? 's' : ''}
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Nos Agréments et Certifications</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Nos certifications officielles garantissent la qualité et la reconnaissance de nos formations.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{cert.date}</div>
                      {cert.validUntil && (
                        <div className="text-muted-foreground">Valide jusqu'en {cert.validUntil}</div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-screen-xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Prêt à Commencer Votre Formation ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Rejoignez plus de 2500 professionnels qui nous ont fait confiance pour leur formation 
            aux marchandises dangereuses.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg">
              Consulter nos formations
            </Button>
            <Button variant="outline" size="lg">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}