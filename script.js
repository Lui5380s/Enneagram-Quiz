const questions = [
    { text: "Wie wichtig ist es für dich, Perfektion in allem zu erreichen?", answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"] },
    { text: "Wie stark empfindest du das Bedürfnis, anderen Menschen zu helfen, auch wenn es deine eigenen Bedürfnisse zurückstellt?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"] },
    { text: "Wie sehr strebst du danach, als erfolgreich und kompetent wahrgenommen zu werden?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"] },
    { text: "Wie sehr interessierst du dich für kreative, einzigartige oder symbolische Dinge?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher schwach", "Gar nicht"] },
    { text: "Wie sehr analysierst du Situationen oder Menschen, um dir sicher zu sein, dass du ihnen vertrauen kannst?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Überhaupt nicht"] },
    { text: "Wie oft analysierst du Dinge tiefgründig, bevor du eine Entscheidung triffst?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] },
    { text: "Wie wichtig ist es dir, positive und angenehme Erfahrungen zu suchen, um unangenehme Gefühle zu vermeiden?", answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"] },
    { text: "Wie wichtig ist es dir, in schwierigen Situationen die Kontrolle zu übernehmen und Stärke zu zeigen?", answers: ["Sehr wichtig", "Eher wichtig", "Neutral", "Eher unwichtig", "Überhaupt nicht wichtig"] },
    { text: "Wie sehr strebst du danach, Harmonie zu schaffen und Konflikte zu vermeiden?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Überhaupt nicht"] },
    { text: "Wie oft kümmerst du dich mehr um die Gefühle anderer, anstatt auf deine eigenen zu achten?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] },
    { text: "Wie sehr bemühst du dich, deine Zeit und Ressourcen zu schützen, um deine Energie zu bewahren?", answers: ["Sehr stark", "Eher stark", "Neutral", "Eher wenig", "Gar nicht"] },
    { text: "Wie oft fühlst du dich dazu veranlasst, mögliche Probleme vorauszusehen und Pläne dafür zu machen?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] },
    { text: "Wie oft empfindest du dich von einer inneren Stimme getrieben, die dir sagt, was richtig oder falsch ist?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] },
    { text: "Wie oft ziehst du dich aus sozialen oder emotional schwierigen Situationen zurück, um nachzudenken?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] },
    { text: "Wie oft fühlst du dich verpflichtet, Schwächere zu schützen oder Ungerechtigkeit zu bekämpfen?", answers: ["Sehr oft", "Oft", "Manchmal", "Selten", "Nie"] }
];

const enneagramTypes = {
    1: { name: "Diligence / Perfektionist", details: "Perfektionistisch, diszipliniert, mit hohen internen Standards." },
    2: { name: "Giving / Helfer", details: "Einfühlsam, aufmerksam für die Bedürfnisse anderer, strebt nach harmonischen Beziehungen." },
    3: { name: "Perform / Erfolgreiche", details: "Erfolg und Leistung sind wichtig, sehr zielstrebig und wettbewerbsorientiert." },
    4: { name: "Mood / Individualist", details: "Kreativ, sensibel, sucht tiefgehende Verbindungen." },
    5: { name: "Knowledge / Denker", details: "Analytisch, introspektiv, unabhängig." },
    6: { name: "Doubt / Loyalist", details: "Verantwortungsbewusst, sicherheitsorientiert, sucht nach Loyalität und kritischem Hinterfragen." },
    7: { name: "Options / Enthusiast", details: "Optimistisch, abenteuerlustig, sucht ständig neue Erfahrungen." },
    8: { name: "Challenge / Herausforderer", details: "Stark, entschlossen, übernimmt gerne Kontrolle in unsicheren Situationen." },
    9: { name: "Harmony / Friedensstifter", details: "Harmonie und Konfliktvermeidung sind zentrale Themen, sehr anpassungsfähig." }
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
    const current = questions[currentQuestion];
    document.getElementById("question").textContent = current.text;
    const answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";
    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => handleAnswer(index + 1); 
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
    const typeScores = scores.map((score, index) => ({ type: index + 1, score }));
    typeScores.sort((a, b) => b.score - a.score);
    const topTypes = typeScores.slice(0, 4);

    const topTypesElement = document.getElementById("top-types");
    topTypesElement.innerHTML = topTypes
        .map((type, index) => `<p>${index + 1}. ${enneagramTypes[type.type].name} (Score: ${type.score})</p>`)
        .join("");

    resultType = topTypes[0].type;

    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("learn-more-btn").onclick = toggleDetails;
    document.getElementById("tips-btn").onclick = toggleTips;
    document.getElementById("end-btn").classList.remove("hidden");
    document.getElementById("end-btn").onclick = endQuiz;
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

function toggleDetails() {
    const detailsElement = document.getElementById("type-details");

    if (enneagramTypes[resultType]) {
        if (detailsElement.classList.contains("hidden")) {
            detailsElement.textContent = enneagramTypes[resultType].details;
            detailsElement.classList.remove("hidden");
        } else {
            detailsElement.classList.add("hidden");
        }
    }
}

function toggleTips() {
    const tipsElement = document.getElementById("type-tips");
    tipsElement.innerHTML = "";
    const tipsForType = tips[resultType]?.tips || ["Keine Tipps verfügbar."];
    
    tipsForType.forEach(tip => {
        const listItem = document.createElement("li");
        listItem.textContent = tip;
        tipsElement.appendChild(listItem);
    });

    tipsElement.classList.toggle("hidden");
}

const tips = {
    1: { details: "Details für Typ 1", tips: ["Sei klar und respektvoll, besonders bei Kritik.", "Betone ihre Stärken und ihre Integrität.", "Vermeide übermäßige Kritik, sei fair und konstruktiv."] },
    2: { details: "Details für Typ 2", tips: ["Zeige Wertschätzung für ihre Hilfe und Fürsorge.", "Höre aufmerksam zu und sei empathisch.", "Ermutige sie, ihre eigenen Bedürfnisse nicht zu vernachlässigen."] },
    3: { details: "Details für Typ 3", tips: [ "Erkenne ihre Leistungen und Erfolge an.", "Bleibe auf den Punkt und vermeide überflüssige Details.", "Hilf ihnen, sich auf ihre emotionalen Bedürfnisse zu konzentrieren."] },
    4: { details: "Details für Typ 4", tips: [ "Höre ihnen aufmerksam zu und erkenne ihre Einzigartigkeit an.", "Zeige Verständnis für ihre Gefühle und Stimmungen.", "Ermutige sie, sich auf das Positive zu konzentrieren."] },
    5: { details: "Details für Typ 5", tips: [ "Sei präzise und klar in deiner Kommunikation.", "Respektiere ihre Privatsphäre und ihre Unabhängigkeit.", "Gib ihnen Zeit, über Dinge nachzudenken, bevor sie antworten."] },
    6: { details: "Details für Typ 6", tips: [        "Sei ehrlich und zuverlässig, baue Vertrauen auf.", "Gib klare und konsistente Informationen.", "Vermeide es, ihre Ängste oder Unsicherheiten zu verstärken."] },
    7: { details: "Details für Typ 7", tips: [ "Halte die Kommunikation positiv und optimistisch.", "Ermutige sie, sich auf ein Thema oder Ziel zu konzentrieren.", "Vermeide es, sie mit zu vielen Details oder negativen Themen zu überfordern."] },
    8: { details: "Details für Typ 8", tips: [ "Sei direkt und selbstbewusst in deiner Kommunikation.", "Zeige Respekt für ihre Stärke und Unabhängigkeit.", "Vermeide es, zu defensiv oder passiv-aggressiv zu sein."] },
    9: { details: "Details für Typ 9", tips: [ "Sei freundlich und geduldig, vermeide Druck.", "Hilf ihnen, ihre Meinung zu äußern und Entscheidungen zu treffen.", "Vermeide übermäßige Konflikte oder Konfrontationen."] },
};

function endQuiz() {
    alert("Danke, dass du das Quiz gemacht hast!");
    location.reload();
}
