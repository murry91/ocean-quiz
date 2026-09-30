// each question has: id, trait, text, and options, carries a "value" from 0 to 1 — this is the normalized score and 
// later used in the formula: traitScore = 1 + (average of that trait's values * 9)

const FREQUENCY = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 0.33 },
  { label: "Sometimes", value: 0.67 },
  { label: "Often", value: 1 },
];

const YES_NO = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

const QUESTIONS = [
  // ---------- OPENNESS ----------
  {
    id: 1,
    trait: "openness",
    text: "What type of YouTube content do you watch most often?",
    options: [
      { label: "Educational", value: 1 },
      { label: "Documentaries", value: 1 },
      { label: "Art/Music", value: 0.75 },
      { label: "Comedy", value: 0.25 },
      { label: "Daily vlogs", value: 0.25 },
      { label: "Gaming", value: 0.25 },
    ],
  },
  {
    id: 2,
    trait: "openness",
    text: "How often do you explore new genres of music or podcasts?",
    options: FREQUENCY,
  },
  {
    id: 3,
    trait: "openness",
    text: "Do you follow creators who discuss ideas, science, culture, or philosophy?",
    options: YES_NO,
  },
  {
    id: 4,
    trait: "openness",
    text: "How likely are you to click on content you've never seen before?",
    options: FREQUENCY,
  },
  {
    id: 5,
    trait: "openness",
    text: "I use the internet to learn new skills or concepts.",
    options: FREQUENCY,
  },
  {
    id: 6,
    trait: "openness",
    text: "How often do you read long-form content (blogs, articles, essays)?",
    options: FREQUENCY,
  },
  {
    id: 7,
    trait: "openness",
    text: "Do you subscribe to educational or informative channels/newsletters?",
    options: YES_NO,
  },

  // ---------- EXTRAVERSION  ----------
  {
    id: 8,
    trait: "extraversion",
    text: "How often do you post, comment, or reply on social media?",
    options: FREQUENCY,
  },
  {
    id: 9,
    trait: "extraversion",
    text: "Do you prefer group chats or one-on-one conversations?",
    options: [
      { label: "Group", value: 1 },
      { label: "Both equally", value: 0.66 },
      { label: "One-on-one", value: 0.33 },
    ],
  },
  {
    id: 10,
    trait: "extraversion",
    text: "How many people do you message at least once per week?",
    options: [
      { label: "1–3", value: 0.25 },
      { label: "4–10", value: 0.5 },
      { label: "11–20", value: 0.75 },
      { label: "20+", value: 1 },
    ],
  },
  {
    id: 11,
    trait: "extraversion",
    text: "Do you enjoy livestreams or interactive content (chats, Q&A, lives)?",
    options: YES_NO,
  },
  {
    id: 12,
    trait: "extraversion",
    text: "I feel comfortable expressing my opinions publicly online.",
    options: FREQUENCY,
  },
  {
    id: 13,
    trait: "extraversion",
    text: "I often initiate conversations online.",
    options: FREQUENCY,
  },

  // ---------- AGREEABLENESS ----------
  {
    id: 14,
    trait: "agreeableness",
    text: "I prefer content that focuses on relationships, emotional bonding, and everyday life rather than conflict or competition.",
    options: YES_NO,
  },
  {
    id: 15,
    trait: "agreeableness",
    text: "I follow mental health or well-being content mainly to better support or understand others.",
    options: YES_NO,
  },
  {
    id: 16,
    trait: "agreeableness",
    text: "I try to keep online interactions polite and respectful.",
    options: FREQUENCY,
  },
  {
    id: 17,
    trait: "agreeableness",
    text: "When disagreements happen online, I usually disengage.",
    options: FREQUENCY,
  },
  {
    id: 18,
    trait: "agreeableness",
    text: "I frequently support or encourage others online (likes, comments, messages).",
    options: FREQUENCY,
  },

  // ---------- NEUROTICISM ----------
  {
    id: 19,
    trait: "neuroticism",
    text: "My screen usage increases when I feel stressed or anxious.",
    options: [
      { label: "Decreases", value: 0 },
      { label: "Stays the same", value: 0.5 },
      { label: "Increases", value: 1 },
    ],
  },
  {
    id: 20,
    trait: "neuroticism",
    text: "I consume content related to mental health, stress, or self-help.",
    options: FREQUENCY,
  },
  {
    id: 21,
    trait: "neuroticism",
    text: "I frequently check my phone without a clear reason.",
    options: FREQUENCY,
  },
  {
    id: 22,
    trait: "neuroticism",
    text: "I use my phone late at night even when I feel tired.",
    options: FREQUENCY,
  },
  {
    id: 23,
    trait: "neuroticism",
    text: "I feel uneasy if I can't access my phone for some time.",
    options: FREQUENCY,
  },
  {
    id: 24,
    trait: "neuroticism",
    text: "I often reflect on my emotions through online content or posts.",
    options: FREQUENCY,
  },

  // ---------- CONSCIENTIOUSNESS ----------
  {
    id: 25,
    trait: "conscientiousness",
    text: "My phone usage times (first and last use of the day) are similar on most days.",
    options: FREQUENCY,
  },
  {
    id: 26,
    trait: "conscientiousness",
    text: "I plan my screen usage (rather than using it impulsively).",
    options: FREQUENCY,
  },
  {
    id: 27,
    trait: "conscientiousness",
    text: "I regularly use productivity or planning tools (calendar, notes, to-do apps).",
    options: YES_NO,
  },
  {
    id: 28,
    trait: "conscientiousness",
    text: "I avoid binge-watching content when I have responsibilities.",
    options: FREQUENCY,
  },
  {
    id: 29,
    trait: "conscientiousness",
    text: "I often set limits on my screen time.",
    options: FREQUENCY,
  },
];
