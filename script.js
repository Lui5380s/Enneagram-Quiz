        const questions = [
    {
        text: "Wie wichtig ist es für dich, Perfektion in allem zu erreichen?",
        answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"]
    },
    {
        text: "Wie stark empfindest du das Bedürfnis, anderen Menschen zu helfen, auch wenn es deine eigenen Bedürfnisse zurückstellt?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"]
    },
    {
        text: "Wie sehr strebst du danach, als erfolgreich und kompetent wahrgenommen zu werden?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"]
    },
    {
        text: "Wie sehr interessierst du dich für kreative, einzigartige oder symbolische Dinge?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"]
    },
    {
        text: "Wie sehr analysierst du Situationen oder Menschen, um dir sicher zu sein, dass du ihnen vertrauen kannst?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Überhaupt nicht"]
    },
    {
        text: "Wie oft analysierst du Dinge tiefgründig, bevor du eine Entscheidung triffst?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    },
    {
        text: "Wie wichtig ist es dir, positive und angenehme Erfahrungen zu suchen, um unangenehme Gefühle zu vermeiden?",
        answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"]
    },
    {
        text: "Wie wichtig ist es dir, in schwierigen Situationen die Kontrolle zu übernehmen und Stärke zu zeigen?",
        answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"]
    },
    {
        text: "Wie sehr strebst du danach, Harmonie zu schaffen und Konflikte zu vermeiden?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Überhaupt nicht"]
    },
    {
        text: "Wie oft kümmerst du dich mehr um die Gefühle anderer, anstatt auf deine eigenen zu achten?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    },
    {
        text: "Wie sehr bemühst du dich, deine Zeit und Ressourcen zu schützen, um deine Energie zu bewahren?",
        answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Gar nicht"]
    },
    {
        text: "Wie oft fühlst du dich dazu veranlasst, mögliche Probleme vorauszusehen und Pläne dagegen zu machen?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    },
    {
        text: "Wie oft empfindest du dich von einer inneren Stimme getrieben, die dir sagt, was richtig oder falsch ist?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    },
    {
        text: "Wie oft ziehst du dich aus sozialen oder emotional schwierigen Situationen zurück, um nachzudenken?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    },
    {
        text: "Wie oft fühlst du dich verpflichtet, Schwächere zu schützen oder Ungerechtigkeit zu bekämpfen?",
        answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"]
    }
];


const enneagramTypes = {
    1: { name: "Diligence/Perfektionist", details: "Perfektionistisch, diszipliniert, und mit hohen internen Standards für sich und andere. Sucht ständige Verbesserung und Gerechtigkeit, kann jedoch kritisch wirken. Neigt zu Resignation, wenn Dinge nicht richtig gemacht werden." },
    2: { name: "Giving/Helfer", details: "Einfühlsam und aufmerksam für die Bedürfnisse anderer. Strebt nach harmonischen Beziehungen, kann jedoch übermäßig aufopfernd sein und sich unverstanden fühlen, wenn die Hilfe nicht gewürdigt wird." },
    3: { name: "Perform/Erfolgreiche", details: "Erfolg und Leistung sind wichtig. Sehr zielstrebig, wettbewerbsorientiert und arbeitet hart, um Anerkennung zu erlangen. Kann emotionale Bedürfnisse und Selbstreflexion zugunsten der Zielverwirklichung zurückstellen." },
    4: { name: "Mood/Individualist", details: "Kreativ, sensibel und emotional intensiv. Sucht tiefgehende Verbindungen und ein einzigartiges Leben, fühlt sich oft missverstanden und sehnsüchtig nach etwas Besonderem." },
    5: { name: "Knowledge/Denker", details: "Analytisch, introspektiv und unabhängig. Zieht es vor, Dinge zu beobachten, statt im Mittelpunkt zu stehen, und strebt nach Selbstgenügsamkeit. Vermeidet emotionale Überforderung und fokussiert sich auf kognitive Prozesse." },
    6: { name: "Doubt/Loyalist", details: "Verantwortungsbewusst und sicherheitsorientiert. Neigt dazu, Gefahr zu antizipieren und sucht nach Sicherheit, oft durch Loyalität und kritisches Hinterfragen von Autoritäten. Ist von Natur aus vorsichtig und sorgt sich um mögliche Bedrohungen." },
    7: { name: "Options/Enthusiast", details: "Optimistisch und abenteuerlustig. Sucht ständig nach neuen Erfahrungen und Ideen. Vermeidet Langeweile und unangenehme Aufgaben, kann sich jedoch durch zu viele Optionen und Verpflichtungen überwältigt fühlen." },
    8: { name: "Challenge/Herausforderer", details: "Stark, direkt und entschlossen. Hat einen natürlichen Drang, die Kontrolle zu übernehmen, besonders in unsicheren oder ungerechten Situationen. Schätzt Stärke und Unabhängigkeit und zeigt oft eine dominante Außenwirkung." },
    9: { name: "Harmony/Friedensstifer", details: "Harmonie und Konfliktvermeidung sind zentrale Themen. Sehr anpassungsfähig und ausgleichend, kann jedoch Schwierigkeiten haben, Entscheidungen zu treffen und sich durchzusetzen, wenn es zu Konflikten kommt." }
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

    // Lade die aktuelle Frage und ihre Antwortmöglichkeiten
    const current = questions[currentQuestion];
    questionElement.textContent = current.text;
    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => handleAnswer(index + 1); // Score-Wert ist der Index + 1
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
