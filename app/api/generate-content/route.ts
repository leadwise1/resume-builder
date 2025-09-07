import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, section, context } = await request.json();

    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY environment variable is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompts = {
      "professional summary": `You are an expert resume writer. Create a compelling professional summary (2-3 sentences) that highlights key qualifications and career objectives.

Context: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Start with years of experience or key expertise area
- Include 2-3 most relevant skills or achievements
- End with career goal or value proposition
- Keep to 2-3 sentences maximum
- Use active voice and strong action words

Generate a professional summary:`,

      "work experience": `You are an expert resume writer. Generate 3-4 bullet points describing responsibilities and achievements for this work experience.

Job Details: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Start each bullet with a strong action verb
- Include quantifiable results where possible (numbers, percentages, dollar amounts)
- Focus on achievements, not just duties
- Use past tense for previous roles, present tense for current roles
- Each bullet should be 1-2 lines maximum
- Show impact and value delivered

Generate professional bullet points:`,

      "skills": `You are an expert resume writer. Suggest relevant skills based on the provided information.

Context: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Include both technical and soft skills
- Focus on industry-relevant skills
- Mix of tools, technologies, and competencies
- Return as a comma-separated list
- Include 8-12 skills maximum
- Prioritize in-demand skills for the field

Generate relevant skills:`,

      "education description": `You are an expert resume writer. Generate a brief description for this educational background.

Education Details: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Highlight relevant coursework, projects, or achievements
- Include honors, awards, or notable GPA if applicable
- Keep to 1-2 sentences
- Focus on what's most relevant to career goals

Generate education description:`,

      "job title suggestions": `You are an expert resume writer. Suggest professional job titles that accurately represent this role.

Role Description: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Provide 3-5 alternative job titles
- Use industry-standard terminology
- Consider seniority level and responsibilities
- Return as a comma-separated list
- Focus on titles that would be recognized by ATS systems

Generate job title suggestions:`,

      "company description": `You are an expert resume writer. Generate a brief, professional description of this company.

Company Information: ${prompt}
Additional Context: ${context || ""}

Requirements:
- 1 sentence describing what the company does
- Include industry and company size if known
- Use professional, neutral tone
- Focus on business function and market position

Generate company description:`,

      "career paths": `You are an expert career counselor. Analyze the provided background and suggest 3-5 potential career paths.

Background: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Consider current experience, education, and skills
- Suggest realistic next steps and long-term paths
- Include both lateral moves and advancement opportunities
- Focus on growth potential and market demand
- Each path should be 1-2 sentences explaining the progression
- Return each path on a new line

Generate career path suggestions:`,

      "skill gaps": `You are an expert career counselor. Identify key skills that would enhance career prospects based on the provided background.

Background: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Identify 4-6 high-impact skills to develop
- Focus on in-demand skills for the industry/role
- Include both technical and soft skills
- Consider current skill set and natural progression
- Each skill should include brief explanation of why it's valuable
- Return each skill on a new line

Generate skill gap analysis:`,

      "career recommendations": `You are an expert career counselor. Provide actionable career advice based on the provided background.

Background: ${prompt}
Additional Context: ${context || ""}

Requirements:
- Provide 4-6 specific, actionable recommendations
- Include networking, learning, experience, and positioning advice
- Focus on practical steps they can take in the next 6-12 months
- Consider industry trends and market opportunities
- Each recommendation should be specific and measurable
- Return each recommendation on a new line

Generate career recommendations:`,
    };

    const selectedPrompt = prompts[section as keyof typeof prompts] || prompts["professional summary"];

    console.log('Making request to Groq API...');

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile", // Stable model name
        messages: [
          {
            role: "user",
            content: selectedPrompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('Groq API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      return NextResponse.json({ 
        error: `Groq API request failed: ${response.status} ${response.statusText}`,
        details: errorText 
      }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    console.log('Generated content length:', content.length);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ 
      error: "Failed to generate content",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}