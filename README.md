The Digital OCEAN 

A full-stack quiz that estimates your Big Five (OCEAN) personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism from your digital footprints, rather than direct self-report questions.

Live demo: add your Render URL here once deployed

How it works

The quiz asks 29 questions about digital behavior (what you watch, how you message, how you unwind, etc.). Each answer is normalized to a 0–1 value, averaged per trait, and converted to a 1–10 score using:
traitScore = 1 + (average of that trait's normalized answers × 9)

Scores are grouped into bands:
1–3	Low
4–7	Moderate
8–10 High

Results are visualized as a radar chart with a written breakdown per trait, and can be downloaded as a shareable image.

Tech stack
Frontend: Plain HTML, CSS, and JavaScript (no framework/build step)
Backend: Node.js + Express
Database: SQLite, via Node's built-in node:sqlite module
Charting: Chart.js
Image export: html2canvas
Project structure
ocean-quiz/
├── frontend/
│   ├── index.html        
│   ├── quiz.html          
│   ├── results.html       
│   ├── style.css
│   ├── questions.js        
│   ├── quiz.js
│   ├── results.js
│   └── traitContent.js    
└── backend/
    ├── server.js          
    ├── db.js              
    ├── traitMap.js         
    └── routes/
        └── quiz.js         
Running it locally
bash
cd backend
npm install
node server.js

Then open http://localhost:3000/index.html in your browser. (Everything is served through this one Express server; there's no separate frontend server.)

API
Method	Route	Description
POST	/api/submit	Accepts { answers: {...} }, computes trait scores, saves to the database, returns { id, scores }
GET	/api/results/:id	Returns { id, scores } for a previously saved submission
GET	/api/ping	Health check
Deployment

Deployed on Render as a single Web Service (root directory: backend, start command: npm start). Note: SQLite data only persists across restarts if a paid instance with an attached Disk is used — see Render's docs on persistent disks.

License

MIT — see LICENSE.