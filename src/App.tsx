import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { AuthModal } from "./components/auth/AuthModal";
import { useAuth, api, User } from "./utils/supabase/auth";
import { Menu, X, Home, Zap, FileText, DollarSign, BookOpen, LogOut } from "lucide-react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageCircleIcon,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from "./components/icons/CustomIcons";
import { Card, CardContent } from "./components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

// Interfaces
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Template {
  title: string;
  description: string;
  image: string;
  category: string;
}

interface Testimonial {
  name: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
}

interface FAQ {
  question: string;
  answer: string;
}

// Static Data (moved outside the component for performance)
const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Features", href: "#features", icon: Zap },
  { name: "Templates", href: "#templates", icon: FileText },
  { name: "Pricing", href: "#pricing", icon: DollarSign },
  { name: "Blog", href: "#blog", icon: BookOpen },
];

const features: Feature[] = [
  {
    title: "AI Writing Assistant",
    description: "Get suggestions for improving your resume content and structure.",
    image: "https://source.unsplash.com/600x400/?artificial-intelligence,technology",
  },
  {
    title: "Interactive Templates",
    description: "Choose from a variety of modern and professional templates.",
    image: "https://source.unsplash.com/600x400/?resume,template",
  },
  {
    title: "Job Matching Algorithm",
    description: "Find jobs that align with your skills and career aspirations.",
    image: "https://source.unsplash.com/600x400/?career,job-search",
  },
  {
    title: "Instant Feedback",
    description: "Receive real-time feedback on your resume's effectiveness.",
    image: "https://source.unsplash.com/600x400/?feedback,analytics",
  },
];

const templates: Template[] = [
  {
    title: "Modern Template",
    description: "Sleek and contemporary design for a modern look.",
    image: "https://source.unsplash.com/600x400/?document,modern",
    category: "Modern",
  },
  {
    title: "Professional Template",
    description: "Classic and polished layout for a professional impression.",
    image: "https://source.unsplash.com/600x400/?business,resume",
    category: "Professional",
  },
  {
    title: "Creative Template",
    description: "Unique and eye-catching design to showcase your creativity.",
    image: "https://source.unsplash.com/600x400/?design,creative",
    category: "Creative",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sophia Carter",
    date: "2023-08-15",
    rating: 5,
    comment:
      "LeadWise transformed my job search! The AI-powered resume builder helped me create a standout resume that landed me multiple interviews. Highly recommend!",
    likes: 12,
    dislikes: 1,
  },
  {
    name: "Ethan Bennett",
    date: "2023-09-22",
    rating: 5,
    comment:
      "I was struggling to articulate my skills effectively until I used LeadWise. The interactive templates and AI suggestions were incredibly helpful.",
    likes: 15,
    dislikes: 0,
  },
  {
    name: "Olivia Hayes",
    date: "2023-10-10",
    rating: 5,
    comment:
      "Thanks to LeadWise, I found my dream job in just a few weeks. The job matching algorithm is spot-on, and the resume feedback was invaluable.",
    likes: 10,
    dislikes: 2,
  },
];

const faqs: FAQ[] = [
  {
    question: "How does the AI resume builder work?",
    answer:
      "Our AI analyzes your skills, experience, and career goals to create a tailored resume. It suggests improvements to your content and structure, ensuring your resume is optimized for applicant tracking systems (ATS) and stands out to recruiters.",
  },
  {
    question: "What types of templates are available?",
    answer:
      "We offer a wide variety of professional templates including modern, classic, creative, and industry-specific designs. Each template is ATS-friendly and customizable to match your personal style and career level.",
  },
  {
    question: "How does the job matching algorithm work?",
    answer:
      "Our algorithm analyzes your resume content, skills, experience, and preferences to match you with relevant job opportunities. It considers factors like location, salary expectations, company culture, and career goals to provide personalized job recommendations.",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // --- Dark mode state and effect ---
  const [darkMode, setDarkMode] = useState(true); // enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  // --- end dark mode additions ---

  const { checkSession, signOut } = React.useMemo(() => useAuth(), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await checkSession();
      if (session) {
        const { user: profile } = await api.getProfile();
        setUser(profile);
      }
      setIsLoadingAuth(false);
    };
    fetchUser();
  }, [checkSession]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleCreateResumeClick = () => {
    if (user) {
      alert("Redirecting to resume builder...");
    } else {
      openAuthModal("signup");
    }
  };

  return (
    <div className="bg-animated min-h-screen bg-background text-foreground">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 z-50 bg-primary text-primary-foreground px-3 py-2 rounded"
      >
        Toggle Dark Mode
      </button>
      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`dark fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/logo.jpg"
                alt="LeadWise Logo"
                className="h-8 w-8 rounded-md"
              />
              <span className="text-lg font-bold">LeadWise Foundation</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {isLoadingAuth ? (
                <div className="h-10 w-24 bg-secondary/50 animate-pulse rounded-xl" />
              ) : user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2"
                      onClick={handleCreateResumeClick}
                    >
                      Create Resume
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-secondary hover:bg-accent rounded-xl w-10 h-10"
                      title={user.name}
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-secondary hover:bg-accent rounded-xl w-10 h-10"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2"
                      onClick={() => openAuthModal("signup")}
                    >
                      Create Resume
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      className="bg-secondary hover:bg-accent text-secondary-foreground rounded-xl px-4 py-2"
                      onClick={() => openAuthModal("signin")}
                    >
                      Login
                    </Button>
                  </motion.div>
                </>
              )}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-secondary hover:bg-accent rounded-xl w-10 h-10"
                >
                  <MessageCircleIcon className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-t border-border p-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </button>
              ))}
              <div className="flex gap-2 mt-4">
                {user ? (
                  <>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                      onClick={handleCreateResumeClick}
                    >
                      Create Resume
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-secondary hover:bg-accent text-secondary-foreground rounded-xl"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                      onClick={() => openAuthModal("signup")}
                    >
                      Create Resume
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-secondary hover:bg-accent text-secondary-foreground rounded-xl"
                      onClick={() => openAuthModal("signin")}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center text-center px-4"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://source.unsplash.com/1600x900/?technology,future)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            >
              Craft Your Future, Instantly
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/90 mb-8 max-w-3xl mx-auto"
            >
              Unlock your career potential with our cutting-edge AI resume
              builder. Match your skills with top job opportunities and land your
              dream role faster.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-lg"
                  onClick={
                    user ? handleCreateResumeClick : () => openAuthModal("signup")
                  }
                >
                  Create Resume Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="secondary"
                  className="bg-secondary hover:bg-accent text-secondary-foreground rounded-xl px-8 py-4 text-lg"
                  onClick={
                    user ? handleCreateResumeClick : () => openAuthModal("signin")
                  }
                >
                  Try AI Resume Builder
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                How It Works
              </h2>
            </motion.div>
            <div className="flex flex-col md:flex-row justify-center items-start gap-8">
              {[
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: "Create Your Resume",
                  description:
                    "Use our AI-powered builder to craft a professional resume.",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Get Matched",
                  description:
                    "Our algorithm matches you with top job opportunities.",
                },
                {
                  icon: <StarIcon className="w-6 h-6" />,
                  title: "Land Your Dream Job",
                  description:
                    "Ace interviews and secure your ideal position with our expert guidance.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-3 mb-2">
                      {item.icon}
                    </div>
                    {index < 2 && (
                      <div className="w-0.5 h-8 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Smart Features for Smarter Resumes
              </h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Our AI-driven tools help you create a resume that not only looks
                great but also gets noticed by recruiters.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="bg-card border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div
                        className="h-32 bg-cover bg-center rounded-t-xl"
                        style={{
                          backgroundImage: `url(${feature.image})`,
                        }}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Interactive Resume Template Previews
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-card border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div
                        className="h-96 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${template.image})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {template.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-background/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                What Our Users Say
              </h2>
            </motion.div>
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <Card className="bg-card border-border p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-card-foreground">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[activeTestimonial].date}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[activeTestimonial].rating
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg text-foreground leading-relaxed">
                    "{testimonials[activeTestimonial].comment}"
                  </p>

                  <div className="flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <ThumbsUpIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {testimonials[activeTestimonial].likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsDownIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {testimonials[activeTestimonial].dislikes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  open={openFAQ === index}
                  onOpenChange={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <motion.button
                      className="w-full bg-secondary hover:bg-accent rounded-xl p-4 text-left flex items-center justify-between transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="font-semibold text-foreground">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </motion.button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 text-muted-foreground bg-secondary rounded-xl">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Create your AI-powered resume and start matching with top job
              opportunities today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-lg"
                onClick={
                  user ? handleCreateResumeClick : () => openAuthModal("signup")
                }
              >
                Get Started Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <button
                  onClick={() => scrollToSection("#home")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </div>
              <div className="text-center">
                <button
                  onClick={() => alert("Contact form coming soon!")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </div>
              <div className="text-center">
                <a
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
              <div className="text-center">
                <a
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <motion.a
                href="https://instagram.com"
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <InstagramIcon className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FacebookIcon className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedinIcon className="w-6 h-6" />
              </motion.a>
            </div>

            <div className="text-center text-muted-foreground">
              <p>
                © {new Date().getFullYear()} LeadWise Foundation. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircleIcon className="w-6 h-6" />
      </motion.button>

      {/* Chat Widget (placeholder) */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-24 right-6 bg-card border border-border rounded-xl p-4 shadow-xl z-50 w-80"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-card-foreground">Need Help?</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Hi! I'm here to help you with your resume. What can I assist you
            with today?
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              onClick={handleCreateResumeClick}
            >
              Get Started
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground rounded-xl"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setUser(user);
          setIsAuthModalOpen(false);
        }}
        defaultTab={authModalDefaultTab}
      />
    </div>
  );
}