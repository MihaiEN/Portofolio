const evidenceItems = [
  {
    title: "Anonymised Lesson Planning Example",
    type: "Teaching Evidence",
    description:
      "A selected lesson planning example showing clear objectives, modelling, guided practice and student support.",
    link: "#"
  },
  {
    title: "Assessment Design Sample",
    type: "Assessment Creation",
    description:
      "A self-created assessment sample showing question sequencing, marks, command words and mark scheme thinking.",
    link: "#"
  },
  {
    title: "Tutoring Progress Reflection",
    type: "Tutoring Evidence",
    description:
      "An anonymised reflection showing how diagnostic questioning and targeted practice supported student progress.",
    link: "#"
  },
  {
    title: "Examiner-Style Marking Commentary",
    type: "Assessment Practice",
    description:
      "A professional commentary showing understanding of mark schemes, common errors and consistent judgement.",
    link: "#"
  },
  {
    title: "Curriculum Sequencing Reflection",
    type: "Curriculum",
    description:
      "A short reflection explaining how mathematical topics can be sequenced to build fluency and confidence.",
    link: "#"
  },
  {
    title: "Professional CV",
    type: "CV",
    description:
      "A current CV summarising teaching, tutoring, assessment and wider professional experience.",
    link: "#"
  }
];

const evidenceGrid = document.getElementById("evidenceGrid");

evidenceItems.forEach(function(item) {
  const card = document.createElement("article");
  card.className = "card evidence-card";

  card.innerHTML = `
    <div>
      <span class="evidence-type">${item.type}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>

    <a class="btn secondary" href="${item.link}" target="_blank">
      View Evidence
    </a>
  `;

  evidenceGrid.appendChild(card);
});
