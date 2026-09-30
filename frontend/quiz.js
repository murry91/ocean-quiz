const STORAGE_KEY = "ocean_quiz_progress";

let currentIndex = 0;
let answers = {};

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    currentIndex = parsed.currentIndex || 0;
    answers = parsed.answers || {};
  }
}

function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ currentIndex, answers })
  );
}

function renderQuestion() {
  const q = QUESTIONS[currentIndex];

  questionText.textContent = q.text;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.label;
    btn.type = "button";

    if (answers[q.id] === opt.value) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => selectOption(q.id, opt.value, btn));
    optionsContainer.appendChild(btn);
  });

  const percent = (currentIndex / QUESTIONS.length) * 100;
  progressFill.style.width = `${percent}%`;
  progressLabel.textContent = `Question ${currentIndex + 1} of ${QUESTIONS.length}`;

  backBtn.disabled = currentIndex === 0;
  backBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
  nextBtn.disabled = answers[q.id] === undefined;
  nextBtn.textContent = currentIndex === QUESTIONS.length - 1 ? "Finish" : "Next";
}

function selectOption(questionId, value, clickedBtn) {
  answers[questionId] = value;
  saveProgress();

  [...optionsContainer.children].forEach((el) => el.classList.remove("selected"));
  clickedBtn.classList.add("selected");

  nextBtn.disabled = false;
}

function goNext() {
  if (currentIndex === QUESTIONS.length - 1) {
    finishQuiz();
    return;
  }
  currentIndex++;
  saveProgress();
  renderQuestion();
}

function goBack() {
  if (currentIndex === 0) return;
  currentIndex--;
  renderQuestion();
}

const API_BASE = "/api";

async function finishQuiz() {
  // brief "submitting" state 
  document.querySelector(".quiz-card").innerHTML = `
    <div style="text-align:center; padding: 60px 0;">
      <p class="brand">Digital Footprint</p>
      <p style="color: var(--text-soft); margin-top: 24px;">Calculating your results…</p>
    </div>
  `;

  try {
    const response = await fetch(`${API_BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    localStorage.removeItem(STORAGE_KEY);

    window.location.href = `results.html?id=${data.id}`;
  } catch (err) {
    console.error("Failed to submit quiz:", err);
    document.querySelector(".quiz-card").innerHTML = `
      <div style="text-align:center; padding: 40px 0;">
        <p class="brand">Digital Footprint</p>
        <h1 class="question-text" style="margin-top: 24px;">Something went wrong</h1>
        <p style="color: var(--text-soft); max-width: 40ch; margin: 0 auto 24px;">
          We couldn't reach the server. Make sure it's running at
          ${API_BASE}, then try again.
        </p>
        <button class="btn btn-primary" onclick="location.reload()">Try again</button>
      </div>
    `;
  }
}

function restartQuiz() {
  currentIndex = 0;
  answers = {};
  location.reload();
}

backBtn.addEventListener("click", goBack);
nextBtn.addEventListener("click", goNext);

loadProgress();
renderQuestion();
