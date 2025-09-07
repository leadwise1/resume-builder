import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, section } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content: `You are a career guidance assistant helping users build resumes. Focus on the ${section} section.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return new Response(JSON.stringify({ error: "Groq API request failed" }), { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return Response.json({ content });
  } catch (err) {
    console.error("Error in /api/generate-content:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
