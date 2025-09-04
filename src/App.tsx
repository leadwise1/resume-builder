import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Badge } from "./components/ui/badge";
import { AuthModal } from "./components/auth/AuthModal";
import { useAuth, api, User } from "./utils/supabase/client";
import {
  ChevronDown,
  ChevronUp,
  Star,
  MessageCircle,
  Menu,
  X,
  Home,
  Zap,
  FileText,
  DollarSign,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  LogOut,
} from "lucide-react";
import svgPaths from "./imports/svg-8a00bw8v4j";
import imgHero from "figma:asset/3c2abb4def45421f03f9f83eab7d26ac0b483f2a.png";
import imgAI from "figma:asset/6c5f51ddfae13998030379734020423a05cf8ed3.png";
import imgTemplates from "figma:asset/b00afdc47c22bac73556c0db6c34f7997b38b012.png";
import imgMatching from "figma:asset/406586889bab00184c009efce06a4c719b4cb1e5.png";
import imgFeedback from "figma:asset/5b13388184104296a3a0c212df1e9acd98948992.png";
import imgModern from "figma:asset/53340fea880b30b41365fb2e81cc69cb9653771a.png";
import imgProfessional from "figma:asset/4c835e28fc3b11e9f578d0aa5fae5fef842256eb.png";
import imgCreative from "figma:asset/fdf61289c7941bb1217a2910cbccc962ca9e6f26.png";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<
    "signin" | "signup"
  >("signin");
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const { checkSession, signOut } = useAuth();

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
      description:
        "Get suggestions for improving your resume content and structure.",
      image: imgAI,
    },
    {
      title: "Interactive Templates",
      description:
        "Choose from a variety of modern and professional templates.",
      image: imgTemplates,
    },
    {
      title: "Job Matching Algorithm",
      description:
        "Find jobs that align with your skills and career aspirations.",
      image: imgMatching,
    },
    {
      title: "Instant Feedback",
      description:
        "Receive real-time feedback on your resume's effectiveness.",
      image: imgFeedback,
    },
  ];

  const templates: Template[] = [
    {
      title: "Modern Template",
      description:
        "Sleek and contemporary design for a modern look.",
      image: imgModern,
      category: "Modern",
    },
    {
      title: "Professional Template",
      description:
        "Classic and polished layout for a professional impression.",
      image: imgProfessional,
      category: "Professional",
    },
    {
      title: "Creative Template",
      description:
        "Unique and eye-catching design to showcase your creativity.",
      image: imgCreative,
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(
        (prev) => (prev + 1) % testimonials.length,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await checkSession();
        if (session?.access_token) {
          const { user: userProfile } = await api.getProfile();
          setUser(userProfile);
        }
      } catch (error) {
        console.error("Session initialization failed:", error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    initializeAuth();
  }, [checkSession]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = async (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleCreateResumeClick = () => {
    // TODO: Implement navigation to the resume creation page, e.g., using react-router.
    alert("Redirecting to the resume creation page!");
  };

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#121217] text-white">
      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#121217]/95 backdrop-blur-md border-b border-[#e5e8eb]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-4 h-4">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2886ad00}
                    fill="white"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold">LeadWise Foundation</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
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
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl px-4 py-2"
                      onClick={handleCreateResumeClick}
                    >
                      Create Resume
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-[#2e2938] hover:bg-[#3a3448] rounded-xl w-10 h-10"
                      title={user.name}
                    > 
                      <Avatar>
                        <AvatarImage src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-[#2e2938] hover:bg-[#3a3448] rounded-xl w-10 h-10"
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
                      className="bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl px-4 py-2"
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
                      className="bg-[#2e2938] hover:bg-[#3a3448] text-white rounded-xl px-4 py-2"
                      onClick={() => openAuthModal("signin")}
                    >
                      Login
                    </Button>
                  </motion.div>
                </>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#2e2938] hover:bg-[#3a3448] rounded-xl w-10 h-10"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 border-t border-[#e5e8eb]/10"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
                <div className="flex gap-2 mt-4">
                  {user ? (
                    <>
                      <Button className="flex-1 bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl">
                        Create Resume
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-[#2e2938] hover:bg-[#3a3448] text-white rounded-xl"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="flex-1 bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl"
                        onClick={() => openAuthModal("signup")}
                      >
                        Create Resume
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-[#2e2938] hover:bg-[#3a3448] text-white rounded-xl"
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
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${imgHero}')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
          >
            Craft Your Future with AI-Powered Resumes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Unlock your career potential with our cutting-edge
            AI resume builder. Match your skills with top job
            opportunities and land your dream role.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl px-8 py-4 text-lg"
                onClick={user ? handleCreateResumeClick : () => openAuthModal("signup")}
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
                className="bg-[#2e2938] hover:bg-[#3a3448] text-white rounded-xl px-8 py-4 text-lg"
                onClick={user ? handleCreateResumeClick : () => openAuthModal("signin")}
              >
                Try AI Resume Builder
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How LeadWise Works
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Build Your AI Resume",
                description:
                  "Our AI analyzes your skills and experience to create a standout resume.",
                icon: <FileText className="w-6 h-6" />,
              },
              {
                step: 2,
                title: "Match with Opportunities",
                description:
                  "Get matched with jobs that fit your profile and career goals.",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                step: 3,
                title: "Land Your Dream Job",
                description:
                  "Ace interviews and secure your ideal position with our expert guidance.",
                icon: <Star className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white text-[#121217] rounded-full p-3 mb-2">
                    {item.icon}
                  </div>
                  {index < 2 && (
                    <div className="w-0.5 h-8 bg-[#423d54]" />
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#a39eb8]">
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
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Smart Features for Smarter Resumes
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our AI-driven tools help you create a resume that
              not only looks great but also gets noticed by
              recruiters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-[#1a1a1f] border-[#2e2938] overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className="h-32 bg-cover bg-center rounded-t-xl"
                      style={{
                        backgroundImage: `url('${feature.image}')`,
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#a39eb8]">
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
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Resume Template Previews
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="bg-[#1a1a1f] border-[#2e2938] overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className="h-96 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${template.image}')`,
                      }}
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-[#7047eb]/10 text-[#7047eb] border-[#7047eb]/20"
                        >
                          {template.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        {template.title}
                      </h3>
                      <p className="text-sm text-[#a39eb8]">
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
      <section className="py-20 px-4 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <Card className="bg-[#121217] border-[#2e2938] p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7047eb] to-[#9333ea] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonials[activeTestimonial].name[0]}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-white">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-sm text-[#a39eb8]">
                        {testimonials[activeTestimonial].date}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i <
                          testimonials[activeTestimonial].rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg text-white leading-relaxed">
                    "{testimonials[activeTestimonial].comment}"
                  </p>

                  <div className="flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-[#a39eb8]" />
                      <span className="text-[#a39eb8]">
                        {testimonials[activeTestimonial].likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="w-5 h-5 text-[#a39eb8]" />
                      <span className="text-[#a39eb8]">
                        {
                          testimonials[activeTestimonial]
                            .dislikes
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial
                      ? "bg-[#7047eb]"
                      : "bg-[#2e2938]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Collapsible
                  open={openFAQ === index}
                  onOpenChange={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <motion.button
                      className="w-full bg-[#2e2938] hover:bg-[#3a3448] rounded-xl p-4 text-left flex items-center justify-between transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="font-semibold text-white">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </motion.button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 p-4 text-[#a39eb8] bg-[#2e2938] rounded-xl">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Create your AI-powered resume and start matching
              with top job opportunities today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-xl px-8 py-4 text-lg"
                onClick={user ? handleCreateResumeClick : () => openAuthModal("signup")}
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-[#2e2938]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <button
                onClick={() => scrollToSection("#home")}
                className="text-[#a39eb8] hover:text-white transition-colors"
              >
                About Us
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => alert("Contact form coming soon!")}
                className="text-[#a39eb8] hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="text-center">
              <a
                href="/privacy-policy"
                className="text-[#a39eb8] hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <div className="text-center">
              <a
                href="/terms-of-service"
                className="text-[#a39eb8] hover:text-white transition-colors"
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
              className="text-[#a39eb8] hover:text-white transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://facebook.com"
              aria-label="Facebook"
              whileHover={{ scale: 1.1 }}
              className="text-[#a39eb8] hover:text-white transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              aria-label="Twitter"
              whileHover={{ scale: 1.1 }}
              className="text-[#a39eb8] hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1 }}
              className="text-[#a39eb8] hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>

          <div className="text-center text-[#a39eb8]">
            <p>
              © {new Date().getFullYear()} LeadWise Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-[#7047eb] hover:bg-[#5f39d4] text-white rounded-full p-4 shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Widget (placeholder) */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-24 right-6 bg-[#1a1a1f] border border-[#2e2938] rounded-xl p-4 shadow-xl z-50 w-80"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">
              Need Help?
            </h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-[#a39eb8] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-[#a39eb8] mb-4">
            Hi! I'm here to help you with your resume. What can
            I assist you with today?
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-[#7047eb] hover:bg-[#5f39d4] text-white"
            >
              Get Started
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-[#2e2938] text-[#a39eb8] hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        defaultTab={authModalTab}
      />
    </div>
  );
}