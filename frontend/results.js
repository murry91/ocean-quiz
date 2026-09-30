const API_BASE = "/api";

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function drawRadarChart(scores) {
  const traitKeys = Object.keys(TRAIT_INFO);

  const labels = traitKeys.map((key) => TRAIT_INFO[key].label);

  const dataValues = traitKeys.map((key) => scores[key]);
  const colors = traitKeys.map((key) => TRAIT_INFO[key].color);

  const canvas = document.getElementById("radarChart");
  if (canvas._chartInstance) canvas._chartInstance.destroy();

  canvas._chartInstance = new Chart(canvas.getContext("2d"), {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "Your traits",
        data: dataValues,
        backgroundColor: "rgba(107, 86, 115, 0.15)",
        borderColor: "#6B5673",
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: "#fff",
        pointRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 12 },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { stepSize: 2, backdropColor: "transparent" },
          grid: { color: "rgba(167, 179, 179, 0.3)" },
          angleLines: { color: "rgba(167, 179, 179, 0.3)" },
          pointLabels: {
            padding: 6,
            font: { family: "Quicksand", size: 12, weight: "600" },
            color: "#1E1B23",
          },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

function renderBreakdown(scores) {
  const container = document.getElementById("traitBreakdown");

  container.innerHTML = Object.entries(scores)
    .map(([trait, score]) => {
      const info = TRAIT_INFO[trait];
      if (!info) return "";

      const level = getLevel(score);
      const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);
      const numericScore = Number(score);
      const formattedScore = Number.isInteger(numericScore)
        ? numericScore.toFixed(0)
        : numericScore.toFixed(1);

      return `
        <section class="trait-card">
          <div class="trait-card-header">
            <h2 class="trait-name" style="color:${info.color}">${info.label}</h2>
            <span class="trait-score" style="background-color:${info.color}; color:${["neuroticism", "extraversion"].includes(trait) ? "#fff" : "#1E1B23"}">
              ${levelLabel} · ${formattedScore}/10
            </span>
          </div>
          <p class="trait-description">${info[level]}</p>
        </section>
      `;
    })
    .join("");
}

function setupDownloadButton() {
  const downloadBtn = document.getElementById("downloadBtn");
  const actionsRow = downloadBtn.parentElement;

  downloadBtn.addEventListener("click", async () => {

    actionsRow.style.visibility = "hidden";

    const canvas = await html2canvas(document.querySelector(".quiz-card"), {
      backgroundColor: "#FAFAF5",
      scale: 2, // sharper output
    });

    actionsRow.style.visibility = "visible";

    const link = document.createElement("a");
    link.download = "my-ocean-results.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

async function loadResults() {
  const id = getIdFromUrl();
  const resultsContent = document.getElementById("resultsContent");

  if (!id) {
    resultsContent.innerHTML = `<p style="color: var(--text-soft);">No result id was provided.</p>`;
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/results/${id}`);
    if (!response.ok) throw new Error(`Server responded with status ${response.status}`);

    const data = await response.json();

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    resultsContent.innerHTML = `<p style="color: var(--text-soft);">Here's how your digital habits map onto the five traits:</p>`;

    drawRadarChart(data.scores);
    renderBreakdown(data.scores);
  } catch (err) {
    console.error("Failed to load results:", err);
    resultsContent.innerHTML = `<p style="color: var(--text-soft);">Couldn't load your results. Make sure the server is running.</p>`;
  }
}

loadResults();
setupDownloadButton();