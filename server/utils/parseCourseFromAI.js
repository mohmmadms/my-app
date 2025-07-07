function parseCourseFromAI(content) {
  const titleMatch = content.match(/\*\*Course Title:\*\*\s*(.+)/i);
  const descriptionMatch = content.match(/\*\*Short Description:\*\*\s*([\s\S]+?)\n\s*\*\*Learning Objectives:\*\*/i);
  const objectivesMatch = content.match(/\*\*Learning Objectives:\*\*\s*([\s\S]+?)\n\s*\*\*Table of Contents:\*\*/i);
  const topicsMatch = content.match(/\*\*Table of Contents:\*\*\s*([\s\S]+?)\n\s*---/i);
  const quizMatch = content.match(/\*\*Simple Quiz:\*\*([\s\S]*)/i);

  // Quiz parsing
  const questionMatch = quizMatch?.[1]?.match(/\*\*Question:\*\*\s*(.+)/i);
  const optionMatches = quizMatch?.[1]?.match(/([A-D])\)\s*(.+)/g) || [];
  const correctAnswerMatch = quizMatch?.[1]?.match(/\*\*Correct Answer:\*\*\s*(.+)/i);

  const options = optionMatches.map((opt) => {
    const parts = opt.match(/^[A-D]\)\s*(.+)/);
    return parts?.[1]?.trim() || '';
  });

  return {
    title: titleMatch?.[1]?.trim() || "Untitled Course",
    description: descriptionMatch?.[1]?.trim() || "",
    objectives: objectivesMatch?.[1]?.trim() || "",
    tableOfContent: topicsMatch?.[1]?.trim() || "",
    quizzes: questionMatch
      ? [
          {
            question: questionMatch[1].trim(),
            options: options,
            correctAnswer: correctAnswerMatch?.[1]?.trim() || "",
          },
        ]
      : [],
    category: "", // default
    location: "Online",
    price: 0,
    seats: 30,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    generated: true,
  };
}

module.exports = parseCourseFromAI;
