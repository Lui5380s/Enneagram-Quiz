const questions = [
    "Wie wichtig ist es für dich, Perfektion in allem zu erreichen?",
    "Wie stark empfindest du das Bedürfnis, anderen Menschen zu helfen, auch wenn es deine eigenen Bedürfnisse zurückstellt?",
    "Wie sehr strebst du danach, als erfolgreich und kompetent wahrgenommen zu werden?",
    "Wie oft fühlst du dich zu einzigartigen und kreativen Aktivitäten hingezogen?",
    "Wie sehr hinterfragst du andere und suchst nach Bestätigung für Vertrauen?",
    "Wie oft analysierst du Dinge tiefgründig, bevor du eine Entscheidung triffst?",
    "Wie stark bist du auf die Suche nach positiven und angenehmen Erfahrungen fokussiert?",
    "Wie oft empfindest du einen starken inneren Antrieb, Kontrolle über eine Situation zu behalten?",
    "Wie sehr strebst du danach, Harmonie zu schaffen und Konflikte zu vermeiden?",
    "Wie oft findest du dich dabei, dich mit den Gefühlen anderer stark zu verbinden, selbst wenn du deine eigenen Emotionen ignorierst?",
    "Wie sehr bemühst du dich, deine Zeit und Ressourcen zu schützen, um deine Energie zu bewahren?",
    "Wie wichtig ist es für dich, Pläne für mögliche Probleme zu erstellen?",
    "Wie oft empfindest du dich von einer inneren Stimme getrieben, die dir sagt, was richtig oder falsch ist?",
    "Wie stark bevorzugst du, dich aus sozialen oder emotional anspruchsvollen Situationen zurückzuziehen, um über Dinge nachzudenken?",
    "Wie oft fühlst du dich verpflichtet, Schwächere zu schützen oder Ungerechtigkeit zu bekämpfen?"
];

const enneagramTypes = {
    1: { name: "Perfectionist", details: "Du bist ein idealistischer Typ, der hohe Standards setzt und immer nach Perfektion strebt." },
    2: { name: "Helper", details: "Du liebst es, anderen zu helfen und legst großen Wert auf zwischenmenschliche Beziehungen." },
    3: { name: "Achiever", details: "Du bist zielstrebig, motiviert und möchtest erfolgreich sein." },
    4: { name: "Individualist", details: "Du bist kreativ, einzigartig und legst Wert auf tiefe emotionale Verbindungen." },
    5: { name: "Investigator", details: "Du bist analytisch, introspektiv und bevorzugst es, Dinge in Ruhe zu durchdenken." },
    6: { name: "Loyalist", details: "Du bist verlässlich, vorsichtig und baust gerne Sicherheit auf." },
    7: { name: "Enthusiast", details: "Du bist optimistisch, vielseitig interessiert und immer auf der Suche nach neuen Abenteuern." },
    8: { name: "Challenger", details: "Du bist stark, entschlossen und kämpfst für das, was dir wichtig ist." },
    9: { name: "Peacemaker", details: "Du bist ausgeglichen, friedliebend und suchst nach Harmonie in deinem Umfeld." }
};

const scores = Array(9).fill(0);
let currentQuestion = 0;
let resultType = null;

function startQuiz() {
    document.getElementById("intro-text").classList.add("hidden");
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.textContent = questions[currentQuestion];
    answersElement.innerHTML = "";

    const answerValues = [5, 4, 3, 2, 1];
    answerValues.forEach((value) => {
        const button = document.createElement("button");
        button.textContent = value === 5 ? "Stark" :
                             value === 4 ? "Semi" :
                             value === 3 ? "Neutral" :
                             value === 2 ? "Wenig" : "Kaum";
        button.onclick = () => handleAnswer(value);
        answersElement.appendChild(button);
    });
}

function handleAnswer(value) {
    scores[currentQuestion % 9] += value;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        calculateResult();
    }
}

function calculateResult() {
    const highestScore = Math.max(...scores);
    resultType = scores.indexOf(highestScore) + 1;

    document.getElementById("type").textContent = enneagramTypes[resultType].name;
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("learn-more-btn").onclick = showDetails;
    document.getElementById("end-btn").classList.remove("hidden");
    document.getElementById("end-btn").onclick = endQuiz;
}

function showDetails() {
    const detailsElement = document.getElementById("type-details");
    detailsElement.textContent = enneagramTypes[resultType].details;
    detailsElement.classList.remove("hidden");
}

function endQuiz() {
    alert("Danke, dass du das Quiz gemacht hast!");
    location.reload(); // Seite neu laden, um zum Start zurückzukehren
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
