const axios = require("axios");

async function generateCourseContent(topic) {
  try {
    console.log(`📥 Generating content for topic: ${topic}`);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful and strict AI that ONLY returns valid raw JSON. No markdown. No explanation. No extra text. Only a JSON object.",
          },
          {
            role: "user",
            content: `Create a beginner-level course for the topic: "${topic}".

Return ONLY a valid JSON object with the following structure:

{
  "title": "string",
  "description": "string",
  "objectives": ["string", "string", "string"],
  "outcome": ["string", "string", "string"],
  "tableOfContent": ["string", "string", "string"],
  "quizzes": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string"
    }
  ]
}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "MyCourseGen",
        },
      }
    );

    const raw = response.data.choices[0].message.content;
    console.log("🧠 Raw AI response:\n", raw);

    // Always return the parsed object with fallbacks
    const parsed = JSON.parse(raw);
    return {
      title: parsed.title || topic,
      description: parsed.description || '',
      objectives: Array.isArray(parsed.objectives) ? parsed.objectives : [],
      outcome: Array.isArray(parsed.outcome) ? parsed.outcome : [],
      tableOfContent: Array.isArray(parsed.tableOfContent) ? parsed.tableOfContent : [],
      quizzes: Array.isArray(parsed.quizzes) ? parsed.quizzes : [],
    };
  } catch (error) {
    console.error("❌ OpenRouter error:", error?.response?.data || error.message);
    throw error;
  }
}

module.exports = generateCourseContent;
