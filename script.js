const quizData = [
  { q: "Which industry is the largest user of freshwater worldwide?", o: ["Textile", "Tech", "Animal agriculture", "Oil and Gas"], a: 2, f: "Animal farming consumes more water than any other industry due to crop irrigation and livestock." },
  { q: "What causes more greenhouse gas emissions globally?", o: ["All transport", "Animal agriculture", "Cement industry", "Fashion industry"], a: 1, f: "Animal farming emits more CO₂ than the entire transport sector." }
];
const impacts = { water: 250, animal: 0.1, co2: 0.5 };
let current = 0, score = 0;

function loadQuestion() {
  const d = quizData[current];
  document.getElementById("questionText").innerHTML = \`<strong>Q${current + 1}:</strong> \${d.q}\`;
  const optionsBox = document.getElementById("optionsBox");
  optionsBox.innerHTML = "";
  d.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => handleAnswer(i, btn);
    optionsBox.appendChild(btn);
  });
  document.getElementById("nextBtn").style.display = "none";
}

function handleAnswer(i, btn) {
  const d = quizData[current];
  document.querySelectorAll(".option-btn").forEach((b, idx) => {
    b.disabled = true;
    if (idx === d.a) b.classList.add("correct");
    if (idx === i && idx !== d.a) b.classList.add("wrong");
  });
  if (i === d.a) {
    document.getElementById("correctSound").play();
    score++;
  } else {
    document.getElementById("wrongSound").play();
  }
  const fact = document.createElement("p");
  fact.innerHTML = "💡 <em>" + d.f + "</em>";
  document.getElementById("optionsBox").appendChild(fact);
  document.getElementById("nextBtn").style.display = "inline-block";
}

document.getElementById("nextBtn").onclick = () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else showImpact();
};

function showImpact() {
  document.getElementById("questionBox").style.display = "none";
  document.getElementById("impactBox").style.display = "block";
  document.getElementById("waterStat").textContent = score * impacts.water;
  document.getElementById("animalStat").textContent = (score * impacts.animal).toFixed(1);
  document.getElementById("co2Stat").textContent = (score * impacts.co2).toFixed(1);
  document.getElementById("finalScore").textContent = \`You scored \${score} out of \${quizData.length}\`;
}

document.getElementById("userForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("userForm").style.display = "none";
  document.getElementById("thankYouMsg").style.display = "block";
});

loadQuestion();
