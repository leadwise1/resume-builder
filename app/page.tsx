"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileText, Download, Zap, Plus, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import {
  resumeTemplates,
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  CreativeTemplate,
} from "@/components/resume-templates"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  gpa?: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
}

interface CareerGuidance {
  careerPaths: string[]
  jobTitleSuggestions: string[]
  skillGaps: string[]
  recommendations: string[]
}

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false)

  if (isStarted) {
    return <ResumeBuilder />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
      <header className="border-b border-slate-700 backdrop-blur-sm bg-slate-900/80">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <img src="/leadwise-logo.svg" alt="LeadWise Foundation" className="h-8 w-auto" />
            <span className="text-xl font-bold text-white">LeadWise Foundation</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16" style={{ color: "white !important" }}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <Badge variant="outline" className="border-emerald-400/30 text-slate-900 bg-white/90">
              <Zap className="mr-1 h-3 w-3" />
              Empowering Career Success
            </Badge>
          </div>

          <h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl"
            style={{ color: "white !important", backgroundColor: "transparent" }}
          >
            Build Your Career Foundation with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Resumes
            </span>
          </h1>

          <p
            className="mb-8 text-xl leading-relaxed text-white font-medium"
            style={{ color: "white !important", backgroundColor: "transparent" }}
          >
            LeadWise Foundation empowers job seekers with professional, ATS-friendly resumes. Our AI-powered platform
            helps you craft compelling content that showcases your potential and opens doors to new opportunities.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 transition-colors font-semibold"
              onClick={() => setIsStarted(true)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Start Building Resume
            </Button>
            <Button className="text-slate-900 bg-white hover:bg-gray-100 font-semibold" variant="outline" size="lg">
              <FileText className="mr-2 h-4 w-4" />
              View Templates
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-slate-700 bg-slate-800/80">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/20">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-left text-white">AI Content Generation</CardTitle>
                <CardDescription className="text-left text-slate-300">
                  Get personalized suggestions for every section of your resume
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-700 bg-slate-800/80">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-left text-white">Professional Templates</CardTitle>
                <CardDescription className="text-left text-slate-300">
                  Choose from modern, ATS-friendly templates designed by experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-700 bg-slate-800/80">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-600/20">
                  <Download className="h-6 w-6 text-slate-400" />
                </div>
                <CardTitle className="text-left text-white">Instant Export</CardTitle>
                <CardDescription className="text-left text-slate-300">
                  Download your resume as PDF or Word document in seconds
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [careerGuidance, setCareerGuidance] = useState<CareerGuidance>({
    careerPaths: [],
    jobTitleSuggestions: [],
    skillGaps: [],
    recommendations: [],
  })
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    workExperience: [],
    education: [],
    skills: [],
  })

  const steps = [
    { title: "Template", description: "Choose your design" },
    { title: "Personal Info", description: "Basic contact information" },
    { title: "Summary", description: "Professional summary" },
    { title: "Experience", description: "Work history" },
    { title: "Education", description: "Educational background" },
    { title: "Skills", description: "Technical and soft skills" },
    { title: "Career Guidance", description: "AI career insights" },
    { title: "Preview", description: "Final preview" },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen default-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/leadwise-logo.svg" alt="LeadWise Foundation" className="h-8 w-auto" />
              <span className="text-xl font-bold text-foreground">LeadWise Foundation</span>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    index <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-foreground">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mx-auto max-w-4xl">
          {currentStep === 0 && (
            <TemplateStep selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
          )}
          {currentStep === 1 && <PersonalInfoStep resumeData={resumeData} setResumeData={setResumeData} />}
          {currentStep === 2 && <SummaryStep resumeData={resumeData} setResumeData={setResumeData} />}
          {currentStep === 3 && <ExperienceStep resumeData={resumeData} setResumeData={setResumeData} />}
          {currentStep === 4 && <EducationStep resumeData={resumeData} setResumeData={setResumeData} />}
          {currentStep === 5 && <SkillsStep resumeData={resumeData} setResumeData={setResumeData} />}
          {currentStep === 6 && (
            <CareerGuidanceStep
              resumeData={resumeData}
              careerGuidance={careerGuidance}
              setCareerGuidance={setCareerGuidance}
            />
          )}
          {currentStep === 7 && <PreviewStep resumeData={resumeData} selectedTemplate={selectedTemplate} />}
        </div>

        {/* Navigation */}
        <div className="mx-auto mt-8 flex max-w-4xl justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function TemplateStep({
  selectedTemplate,
  setSelectedTemplate,
}: {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Template</CardTitle>
        <CardDescription>Select a professional template that best fits your style and industry.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resumeTemplates.map((template) => (
            <div key={template.id} className="space-y-3">
              <div
                className={`relative cursor-pointer rounded-lg border-2 p-2 transition-colors ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={`${template.name} template preview`}
                  className="w-full rounded aspect-[3/4] object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    ✓
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-medium text-foreground">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PersonalInfoStep({
  resumeData,
  setResumeData,
}: { resumeData: ResumeData; setResumeData: (data: ResumeData) => void }) {
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter your basic contact information that will appear at the top of your resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={resumeData.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input
              id="website"
              value={resumeData.personalInfo.website}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SummaryStep({
  resumeData,
  setResumeData,
}: { resumeData: ResumeData; setResumeData: (data: ResumeData) => void }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    setIsGenerating(true)
    try {
      const experienceContext =
        resumeData.workExperience.length > 0
          ? `Work experience: ${resumeData.workExperience.map((exp) => `${exp.position} at ${exp.company}`).join(", ")}`
          : ""

      const skillsContext = resumeData.skills.length > 0 ? `Key skills: ${resumeData.skills.join(", ")}` : ""

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Professional seeking to highlight their background`,
          section: "professional summary",
          context: `${experienceContext}. ${skillsContext}`.trim(),
        }),
      })
      const data = await response.json()
      setResumeData({ ...resumeData, summary: data.content })
    } catch (error) {
      console.error("Error generating summary:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
        <CardDescription>
          Write a compelling summary that highlights your key qualifications and career objectives.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Summary</Label>
            <Button variant="outline" size="sm" onClick={generateSummary} disabled={isGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "AI Assist"}
            </Button>
          </div>
          <Textarea
            id="summary"
            value={resumeData.summary}
            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            placeholder="Experienced software engineer with 5+ years of expertise in full-stack development..."
            rows={6}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ExperienceStep({
  resumeData,
  setResumeData,
}: { resumeData: ResumeData; setResumeData: (data: ResumeData) => void }) {
  const [generatingId, setGeneratingId] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, newExperience],
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const generateExperienceDescription = async (experienceId: string) => {
    const experience = resumeData.workExperience.find((exp) => exp.id === experienceId)
    if (!experience || !experience.position || !experience.company) return

    setGeneratingId(experienceId)
    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Position: ${experience.position} at ${experience.company}`,
          section: "work experience",
          context: `Skills: ${resumeData.skills.join(", ")}`,
        }),
      })
      const data = await response.json()
      updateExperience(experienceId, "description", data.content)
    } catch (error) {
      console.error("Error generating experience description:", error)
    } finally {
      setGeneratingId(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your work history, starting with your most recent position.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.workExperience.map((experience, index) => (
          <div key={experience.id} className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Position {index + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => removeExperience(experience.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Description</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateExperienceDescription(experience.id)}
                  disabled={generatingId === experience.id || !experience.position || !experience.company}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {generatingId === experience.id ? "Generating..." : "AI Assist"}
                </Button>
              </div>
              <Textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
          </div>
        ))}

        <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  )
}

function EducationStep({
  resumeData,
  setResumeData,
}: { resumeData: ResumeData; setResumeData: (data: ResumeData) => void }) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    }
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background, certifications, and relevant coursework.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.education.map((education, index) => (
          <div key={education.id} className="space-y-4 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Education {index + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Graduation Date</Label>
                <Input
                  type="month"
                  value={education.graduationDate}
                  onChange={(e) => updateEducation(education.id, "graduationDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>GPA (Optional)</Label>
              <Input
                value={education.gpa || ""}
                onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                placeholder="3.8"
              />
            </div>
          </div>
        ))}

        <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  )
}

function SkillsStep({
  resumeData,
  setResumeData,
}: { resumeData: ResumeData; setResumeData: (data: ResumeData) => void }) {
  const [newSkill, setNewSkill] = useState("")
  const [isGeneratingSkills, setIsGeneratingSkills] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    })
  }

  const generateSkillsSuggestions = async () => {
    setIsGeneratingSkills(true)
    try {
      const experienceContext =
        resumeData.workExperience.length > 0
          ? `Work experience: ${resumeData.workExperience.map((exp) => `${exp.position} at ${exp.company}`).join(", ")}`
          : ""

      const educationContext =
        resumeData.education.length > 0
          ? `Education: ${resumeData.education.map((edu) => `${edu.degree} in ${edu.field}`).join(", ")}`
          : ""

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Professional background information`,
          section: "skills",
          context: `${experienceContext}. ${educationContext}`.trim(),
        }),
      })
      const data = await response.json()

      const suggestedSkills = data.content
        .split(",")
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill)
      const newSkills = suggestedSkills.filter((skill: string) => !resumeData.skills.includes(skill))

      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, ...newSkills],
      })
    } catch (error) {
      console.error("Error generating skills:", error)
    } finally {
      setIsGeneratingSkills(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Add your technical skills, programming languages, tools, and soft skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />
          <Button onClick={addSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={generateSkillsSuggestions}
            disabled={isGeneratingSkills}
            className="bg-transparent"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGeneratingSkills ? "Generating Skills..." : "AI Suggest Skills"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                ×
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CareerGuidanceStep({
  resumeData,
  careerGuidance,
  setCareerGuidance,
}: {
  resumeData: ResumeData
  careerGuidance: CareerGuidance
  setCareerGuidance: (guidance: any) => void
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [desiredRole, setDesiredRole] = useState("")

  const analyzeCareerPath = async () => {
    setIsAnalyzing(true)
    try {
      const experienceContext = resumeData.workExperience
        .map((exp) => `${exp.position} at ${exp.company}: ${exp.description}`)
        .join(". ")

      const educationContext = resumeData.education
        .map((edu) => `${edu.degree} in ${edu.field} from ${edu.institution}`)
        .join(". ")

      const skillsContext = resumeData.skills.join(", ")

      const fullContext = `
        Experience: ${experienceContext}
        Education: ${educationContext}
        Skills: ${skillsContext}
        Career Goal: ${desiredRole || "Open to opportunities"}
      `.trim()

      const careerPathResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullContext,
          section: "career paths",
          context: desiredRole ? `Target role: ${desiredRole}` : "",
        }),
      })
      const careerPathData = await careerPathResponse.json()

      const jobTitleResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullContext,
          section: "job title suggestions",
          context: "Based on current background and experience",
        }),
      })
      const jobTitleData = await jobTitleResponse.json()

      const skillGapResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullContext,
          section: "skill gaps",
          context: desiredRole ? `For target role: ${desiredRole}` : "For career advancement",
        }),
      })
      const skillGapData = await skillGapResponse.json()

      const recommendationsResponse = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullContext,
          section: "career recommendations",
          context: desiredRole ? `Target role: ${desiredRole}` : "General career growth",
        }),
      })
      const recommendationsData = await recommendationsResponse.json()

      setCareerGuidance({
        careerPaths: careerPathData.content.split("\n").filter((path: string) => path.trim()),
        jobTitleSuggestions: jobTitleData.content.split(",").map((title: string) => title.trim()),
        skillGaps: skillGapData.content.split("\n").filter((gap: string) => gap.trim()),
        recommendations: recommendationsData.content.split("\n").filter((rec: string) => rec.trim()),
      })
    } catch (error) {
      console.error("Error analyzing career path:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Career Guidance</CardTitle>
        <CardDescription>
          Get personalized career insights and recommendations based on your resume profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Desired Role Input */}
        <div className="space-y-2">
          <Label htmlFor="desiredRole">Target Role (Optional)</Label>
          <Input
            id="desiredRole"
            value={desiredRole}
            onChange={(e) => setDesiredRole(e.target.value)}
            placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
          />
          <p className="text-sm text-muted-foreground">
            Enter a specific role you're targeting for more tailored guidance
          </p>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <Button
            onClick={analyzeCareerPath}
            disabled={isAnalyzing}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing Your Career Path..." : "Get AI Career Insights"}
          </Button>
        </div>

        {/* Results */}
        {(careerGuidance.careerPaths.length > 0 || careerGuidance.jobTitleSuggestions.length > 0) && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Career Paths */}
            {careerGuidance.careerPaths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Potential Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {careerGuidance.careerPaths.map((path, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {path}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Job Title Suggestions */}
            {careerGuidance.jobTitleSuggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Job Titles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {careerGuidance.jobTitleSuggestions.map((title, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skill Gaps */}
            {careerGuidance.skillGaps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills to Develop</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {careerGuidance.skillGaps.map((gap, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-2">▲</span>
                        {gap}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {careerGuidance.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Career Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {careerGuidance.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-emerald-500 mr-2">✓</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PreviewStep({ resumeData, selectedTemplate }: { resumeData: ResumeData; selectedTemplate: string }) {
  const [isExporting, setIsExporting] = useState(false)

  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case "classic":
        return ClassicTemplate
      case "minimal":
        return MinimalTemplate
      case "creative":
        return CreativeTemplate
      default:
        return ModernTemplate
    }
  }

  const TemplateComponent = getTemplateComponent()

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
        }),
      })

      if (response.ok) {
        const htmlContent = await response.text()

        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(htmlContent)
          printWindow.document.close()

          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print()
            }, 500)
          }
        }
      } else {
        console.error("Failed to generate PDF")
      }
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const openFullScreenPreview = () => {
    const previewWindow = window.open("", "_blank", "width=1200,height=800")
    if (previewWindow) {
      const previewContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Resume Preview</title>
          <style>
            body { margin: 0; padding: 20px; background: #f5f5f5; }
            .preview-container { background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="preview-container">
            ${document.querySelector(".resume-preview")?.innerHTML || ""}
          </div>
        </body>
        </html>
      `
      previewWindow.document.write(previewContent)
      previewWindow.document.close()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Preview</CardTitle>
          <CardDescription>Review your resume and make any final adjustments before downloading.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={exportToPDF}
              disabled={isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? "Generating PDF..." : "Download PDF"}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={openFullScreenPreview}>
              <Eye className="mr-2 h-4 w-4" />
              Full Screen Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume Preview */}
      <div className="border border-border rounded-lg overflow-hidden shadow-lg resume-preview">
        <TemplateComponent data={resumeData} className="transform scale-75 origin-top" />
      </div>
    </div>
  )
}
