import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Building,
  Users,
  Calendar,
  MessageSquare,
  CheckCircle
} from "lucide-react";

interface ContactInfo {
  type: string;
  icon: any;
  title: string;
  details: string[];
}

interface Office {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string[];
  description: string;
}

const contactMethods: ContactInfo[] = [
  {
    type: "phone",
    icon: Phone,
    title: "Téléphone",
    details: ["+33 1 23 45 67 89", "Lun-Ven 9h-18h"]
  },
  {
    type: "email",
    icon: Mail,
    title: "Email",
    details: ["contact@cbta-formation.fr", "Réponse sous 24h"]
  },
  {
    type: "address",
    icon: MapPin,
    title: "Adresse principale",
    details: ["123 Avenue de l'Aviation", "75015 Paris, France"]
  },
  {
    type: "hours",
    icon: Clock,
    title: "Horaires d'ouverture",
    details: ["Lun-Ven : 9h00 - 18h00", "Sam : 9h00 - 12h00"]
  }
];

const offices: Office[] = [
  {
    name: "Centre Principal - Paris",
    address: "123 Avenue de l'Aviation",
    city: "Paris",
    postalCode: "75015",
    phone: "+33 1 23 45 67 89",
    email: "paris@cbta-formation.fr",
    hours: ["Lun-Ven : 9h00 - 18h00", "Sam : 9h00 - 12h00"],
    description: "Notre centre principal dispose de 5 salles de formation modernes équipées des dernières technologies pédagogiques."
  },
  {
    name: "Centre Régional - Lyon",
    address: "45 Rue de l'Aéroport",
    city: "Lyon",
    postalCode: "69125",
    phone: "+33 4 78 12 34 56",
    email: "lyon@cbta-formation.fr",
    hours: ["Lun-Ven : 9h00 - 17h30"],
    description: "Centre proche de l'aéroport Lyon-Saint Exupéry, spécialisé dans les formations ground handling."
  },
  {
    name: "Centre Régional - Marseille",
    address: "78 Boulevard Maritime",
    city: "Marseille",
    postalCode: "13014",
    phone: "+33 4 91 23 45 67",
    email: "marseille@cbta-formation.fr",
    hours: ["Mar-Sam : 9h00 - 17h00"],
    description: "Formation adaptée aux spécificités du transport multimodal air-mer."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    trainingType: "",
    message: "",
    participants: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-screen-xl py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Message envoyé avec succès !</h1>
            <p className="mb-8 text-muted-foreground">
              Merci pour votre message. Notre équipe vous recontactera dans les plus brefs délais, 
              généralement sous 24 heures ouvrées.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSubmitted(false)}>
                Envoyer un autre message
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Retour à l'accueil
              </Button>
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
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Contactez-Nous</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner 
            dans votre projet de formation.
          </p>
        </div>
      </div>

      <div className="container max-w-screen-xl py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Formulaire de Contact
                </CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire et nous vous recontacterons rapidement.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Training Information */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="subject">Sujet de votre demande *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formation-info">Information sur une formation</SelectItem>
                          <SelectItem value="inscription">Demande d'inscription</SelectItem>
                          <SelectItem value="devis">Demande de devis</SelectItem>
                          <SelectItem value="intra-entreprise">Formation intra-entreprise</SelectItem>
                          <SelectItem value="certification">Questions sur la certification</SelectItem>
                          <SelectItem value="autre">Autre demande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="trainingType">Formation concernée</Label>
                      <Select value={formData.trainingType} onValueChange={(value) => handleInputChange("trainingType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une formation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7.1">7.1 - Shippers</SelectItem>
                          <SelectItem value="7.2">7.2 - Packers</SelectItem>
                          <SelectItem value="7.3">7.3 - Freight Forwarders</SelectItem>
                          <SelectItem value="7.4">7.4 - Ground Handling</SelectItem>
                          <SelectItem value="7.5">7.5 - Cargo Acceptance</SelectItem>
                          <SelectItem value="multiple">Plusieurs formations</SelectItem>
                          <SelectItem value="non-applicable">Non applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.subject === "intra-entreprise" && (
                    <div>
                      <Label htmlFor="participants">Nombre de participants estimé</Label>
                      <Input
                        id="participants"
                        value={formData.participants}
                        onChange={(e) => handleInputChange("participants", e.target.value)}
                        placeholder="Ex: 8 personnes"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}\n                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{method.title}</div>
                      {method.details.map((detail, i) => (
                        <div key={i} className="text-sm text-muted-foreground">{detail}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Questions Fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Comment s'inscrire à une formation ?</h4>
                    <p className="text-xs text-muted-foreground">
                      Consultez notre calendrier et réservez directement en ligne.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Quels sont les prérequis ?</h4>
                    <p className="text-xs text-muted-foreground">
                      Chaque formation a des prérequis spécifiques détaillés dans sa fiche.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Formation en intra-entreprise ?</h4>
                    <p className="text-xs text-muted-foreground">
                      Nous organisons des formations sur site pour vos équipes.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Voir toutes les FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <section className="mt-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Nos Centres de Formation</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Retrouvez-nous dans nos différents centres répartis sur le territoire français.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {offices.map((office, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{office.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{office.address}</div>
                        <div>{office.postalCode} {office.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{office.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Horaires d'ouverture</h4>
                    {office.hours.map((hour, i) => (
                      <div key={i} className="text-sm text-muted-foreground">{hour}</div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{office.description}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="mr-2 h-4 w-4" />
                      Itinéraire
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}