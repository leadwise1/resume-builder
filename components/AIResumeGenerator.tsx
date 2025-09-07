'use client';
import { useState } from "react";

interface AIResumeGeneratorProps {
  section: 'summary' | 'skills' | 'career'; // matches API type
  userData: any; // data to send to AI
  onGenerated: (content: any) => void; // callback to update resume state
}

export function AIResumeGenerator({ section, userData, onGenerated }: AIResumeGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: section, userData }),
      });

      const data = await res.json();

      if (data.error) setError(data.error);
      else onGenerated(data.data); // note: use data.data from API
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <button
        className="px-4 py-2 bg-cyan-600 text-white rounded"
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? "Generating..." : `Generate ${section}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}