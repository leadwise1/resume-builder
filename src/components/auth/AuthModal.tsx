import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth, User as AuthUser } from "../../utils/supabase/auth";
import { X, Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: AuthUser) => void;
  defaultTab?: "signin" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  defaultTab = "signin",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // Memoize the auth functions to prevent them from being recreated on every render,
  // which is a good practice for performance and consistency with App.tsx.
  const { signIn, signUp } = React.useMemo(() => useAuth(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (activeTab === "signup") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        const result = await signUp(
          formData.email,
          formData.password,
          formData.name,
        );
        if (result.user) onSuccess?.(result.user);
      } else {
        const result = await signIn(formData.email, formData.password);
        if (result.user) onSuccess?.(result.user);
      }

      onClose();
      setFormData({ email: "", password: "", name: "", confirmPassword: "" });
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md bg-card border-border text-card-foreground">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold">
          Welcome to LeadWise
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
        >
         <TabsList className="grid w-full grid-cols-2 bg-secondary">
         <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Sign Up
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="signin" className="mt-6">
                <Card className="bg-transparent border-none">
                  <CardHeader className="space-y-1 p-0 pb-4">
                    <CardTitle className="text-xl">
                      Sign in to your account
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Enter your credentials to access your resume dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Sign In Form Fields */}
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input id="signin-email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input id="signin-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="pl-10 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? (<EyeOff className="w-4 h-4" />) : (<Eye className="w-4 h-4" />)}
                          </button>
                        </div>
                      </div>
                      {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                          {error}
                        </motion.div>
                      )}
                      <Button type="submit"          
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                      disabled={isLoading}
                      >
                        {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...</>) : ("Sign In")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <Card className="bg-transparent border-none">
                  <CardHeader className="space-y-1 p-0 pb-4">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Start building your AI-powered resume today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Sign Up Form Fields */}
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input id="signup-name" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input id="signup-email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className="pl-10 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? (<EyeOff className="w-4 h-4" />) : (<Eye className="w-4 h-4" />)}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input id="confirm-password" type={showPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} className="pl-10 pr-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? (<EyeOff className="w-4 h-4" />) : (<Eye className="w-4 h-4" />)}
                          </button>
                        </div>
                      </div>
                      {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                          {error}
                        </motion.div>
                      )}
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                        {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</>) : ("Create Account")}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}