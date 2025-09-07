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

interface ResumeTemplateProps {
  data: ResumeData
  className?: string
}

export function ModernTemplate({ data, className = "" }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className={`bg-white text-gray-900 p-8 max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="border-b-2 border-cyan-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-600 mb-3 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-600 mb-4 uppercase tracking-wide">Experience</h2>
          <div className="space-y-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-cyan-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed mb-3">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cyan-600 mb-4 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-cyan-600">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600">{formatDate(edu.graduationDate)}</div>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-cyan-600 mb-4 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ClassicTemplate({ data, className = "" }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className={`bg-white text-gray-900 p-8 max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-6 mb-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mt-1">
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>•</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">{formatDate(edu.graduationDate)}</span>
                </div>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-serif font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-gray-700 text-sm">
                • {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function MinimalTemplate({ data, className = "" }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className={`bg-white text-gray-900 p-8 max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-4">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-widest">About</h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.workExperience.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
              <div className="space-y-6">
                {data.workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <h3 className="font-medium text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.field}</p>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{formatDate(edu.graduationDate)}</p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-widest">Skills</h2>
              <div className="space-y-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-gray-700 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CreativeTemplate({ data, className = "" }: ResumeTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className={`bg-white text-gray-900 max-w-4xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="bg-gray-900 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
            <div className="w-12 h-1 bg-[#f1c8c8] mb-4"></div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide text-[#f1c8c8]">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
              {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide text-[#f1c8c8]">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f1c8c8] rounded-full mr-2"></div>
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wide text-[#f1c8c8]">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-300">{edu.field}</p>
                    <p className="text-gray-300">{edu.institution}</p>
                    <p className="text-xs text-gray-400">{formatDate(edu.graduationDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 p-8">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.workExperience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {data.workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-[#f1c8c8] rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-[#f1c8c8] font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const resumeTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with accent colors",
    component: ModernTemplate,
    preview: "/modern-resume-template.png",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout with serif fonts",
    component: ClassicTemplate,
    preview: "/classic-resume-template-preview.jpg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with plenty of white space",
    component: MinimalTemplate,
    preview: "/minimal-resume-template-preview.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with sidebar layout and color accents",
    component: CreativeTemplate,
    preview: "/creative-resume-template.png",
  },
]
