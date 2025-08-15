import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Plane,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface LoginProps {
  onLogin: (userType: 'student' | 'admin', userData: any) => void;
  onBack: () => void;
}

export default function LoginPage({ onLogin, onBack }: LoginProps) {
  const [activeTab, setActiveTab] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [studentForm, setStudentForm] = useState({
    email: "",
    password: ""
  });
  
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: ""
  });

  const [resetForm, setResetForm] = useState({
    email: "",
    sent: false
  });

  const [showReset, setShowReset] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    if (studentForm.email === "pierre.martin@exemple.fr" && studentForm.password === "demo123") {
      onLogin('student', {
        id: "student-001",
        firstName: "Pierre",
        lastName: "Martin",
        email: studentForm.email,
        company: "Air France Cargo"
      });
    } else {
      setError("Email ou mot de passe incorrect");
    }
    
    setIsLoading(false);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    if (adminForm.email === "admin@cbta-formation.fr" && adminForm.password === "admin123") {
      onLogin('admin', {
        id: "admin-001",
        firstName: "Marie",
        lastName: "Dubois",
        email: adminForm.email,
        role: "Directrice de Formation"
      });
    } else {
      setError("Accès administrateur non autorisé");
    }
    
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setResetForm({ ...resetForm, sent: true });
    setIsLoading(false);
  };

  if (showReset) {
    if (resetForm.sent) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Email envoyé !</CardTitle>
              <p className="text-muted-foreground">
                Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => {
                  setShowReset(false);
                  setResetForm({ email: "", sent: false });
                }}
                className="w-full"
              >
                Retour à la connexion
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Réinitialiser le mot de passe</CardTitle>
            <p className="text-muted-foreground">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <Label htmlFor="reset-email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="votre.email@exemple.fr"
                    value={resetForm.email}
                    onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowReset(false)}
              >
                Retour à la connexion
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            ← Retour à l'accueil
          </Button>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plane className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold">CBTA Formation</div>
          </div>
          <h1 className="text-2xl font-bold">Espace de Connexion</h1>
          <p className="text-muted-foreground mt-2">
            Accédez à votre espace personnel ou administrateur
          </p>
        </div>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-sm">
              <div className="font-medium text-blue-900 mb-2">Comptes de démonstration :</div>
              <div className="space-y-2 text-blue-700">
                <div>
                  <strong>Étudiant :</strong><br/>
                  Email: pierre.martin@exemple.fr<br/>
                  Mot de passe: demo123
                </div>
                <div>
                  <strong>Administrateur :</strong><br/>
                  Email: admin@cbta-formation.fr<br/>
                  Mot de passe: admin123
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Étudiant
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Administrateur
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student" className="p-6 space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Espace Étudiant</h3>
                  <p className="text-sm text-muted-foreground">
                    Accédez à vos formations, supports et certificats
                  </p>
                </div>

                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="student-email">Adresse email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="votre.email@exemple.fr"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="student-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="student-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowReset(true)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                </form>
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin" className="p-6 space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Espace Administrateur</h3>
                  <p className="text-sm text-muted-foreground">
                    Gestion des formations, étudiants et contenu
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Adresse email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@cbta-formation.fr"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="admin-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe administrateur"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Accès administrateur"}
                    {!isLoading && <Shield className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Help */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Besoin d'aide pour vous connecter ?
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                Contacter le support
              </Button>
              <Button variant="outline" size="sm" onClick={onBack}>
                Retour au site
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}