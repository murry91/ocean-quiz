const express = require("express");
const crypto = require("crypto");
const db = require("../db");
const { TRAIT_MAP, TRAITS } = require("../traitMap");

const router = express.Router();

// Turns { "1": 0.75, "2": 0.33, ... } into { openness: 0.6, extraversion: 0.4, ... } 
// uses formula: traitScore = 1 + (average of that trait's values * 9)
function computeTraitScores(answers) {
  const buckets = {}; // e.g. { openness: [0.75, 0.33, ...], ... }
  TRAITS.forEach((trait) => (buckets[trait] = []));

  for (const [questionId, value] of Object.entries(answers)) {
    const trait = TRAIT_MAP[questionId];
    if (trait) buckets[trait].push(value);
  }

  const scores = {};
  TRAITS.forEach((trait) => {
    const values = buckets[trait];
    const average = values.reduce((sum, v) => sum + v, 0) / values.length;
    const score = 1 + average * 9;
    scores[trait] = Math.round(score * 10) / 10; // round to 1 decimal
  });

  return scores;
}

router.post("/submit", (req, res) => {
  const { answers } = req.body;

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Missing or invalid 'answers' in request body." });
  }

  const scores = computeTraitScores(answers);
  const id = crypto.randomUUID();

  db.prepare(
    `INSERT INTO responses
      (id, raw_answers, openness, extraversion, agreeableness, neuroticism, conscientiousness)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    JSON.stringify(answers),
    scores.openness,
    scores.extraversion,
    scores.agreeableness,
    scores.neuroticism,
    scores.conscientiousness
  );

  res.json({ id, scores });
});

router.get("/results/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM responses WHERE id = ?").get(req.params.id);

  if (!row) {
    return res.status(404).json({ error: "No result found for that id." });
  }

  res.json({
    id: row.id,
    scores: {
      openness: row.openness,
      extraversion: row.extraversion,
      agreeableness: row.agreeableness,
      neuroticism: row.neuroticism,
      conscientiousness: row.conscientiousness,
    },
  });
});

module.exports = router;
