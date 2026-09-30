// Score bands match the report: 1-3 = low, 4-7 = moderate, 8-10 = high.

const TRAIT_INFO = {
  openness: {
    label: "Openness",
    color: "#A694B2",
    low: "You tend to stick with familiar content and routines rather than seeking out new ideas or experiences online.",
    moderate: "You're open to new ideas and content sometimes, but you don't actively seek them out.",
    high: "You actively seek out new ideas, genres, and perspectives, and curiosity shapes what you engage with online."
  },
  extraversion: {
    label: "Extraversion",
    color: "#6B5673",
    low: "You engage online in a quieter, more selective way, with smaller circles and less public expression.",
    moderate: "You engage at a steady, balanced pace, neither highly outspoken nor withdrawn online.",
    high: "You engage online in an active, outward-facing way, with frequent posting, broad conversations, and comfort being visible."
  },
  agreeableness: {
    label: "Agreeableness",
    color: "#C7DCCF",
    low: "You engage online in a direct, less accommodating way, with less focus on group harmony.",
    moderate: "You engage online in a cooperative, polite way, balancing others' comfort with your own views.",
    high: "You engage online in a warm, supportive way, prioritizing harmony and others' comfort."
  },
  neuroticism: {
    label: "Neuroticism",
    color: "#1E1B23",
    low: "Your digital habits are relatively stable, and your screen use doesn't shift much with your mood.",
    moderate: "Your digital habits fluctuate somewhat with stress or mood, but not strongly.",
    high: "Your digital habits are notably reactive to stress and emotion, with screen use and checking increasing when you're anxious."
  },
  conscientiousness: {
    label: "Conscientiousness",
    color: "#A7B3B3",
    low: "Your screen habits tend to be impulsive and unstructured, with few deliberate limits.",
    moderate: "Your screen habits show some intentional structure, but no strict routines or limits.",
    high: "Your screen habits show clear self-regulation, with consistent routines, planned usage, and deliberate limits."
  },
};

function getLevel(score) {
  if (score <= 3) return "low";
  if (score <= 7) return "moderate";
  return "high";
}
