const STORAGE_KEY = "englishlift30-progress";

const dayGrid = document.getElementById("day-grid");
const sessionTitle = document.getElementById("session-title");
const sessionDescription = document.getElementById("session-description");
const sessionSteps = document.getElementById("session-steps");
const currentDayLabel = document.getElementById("current-day-label");
const completedCount = document.getElementById("completed-count");
const focusLabel = document.getElementById("focus-label");
const vocabList = document.getElementById("vocab-list");
const grammarTip = document.getElementById("grammar-tip");
const speakingChallenge = document.getElementById("speaking-challenge");
const listeningScript = document.getElementById("listening-script");
const coachLog = document.getElementById("coach-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const startTodayBtn = document.getElementById("start-today");
const playDialogueBtn = document.getElementById("play-dialogue");
const listenExampleBtn = document.getElementById("listen-example");
const practiceSpeakingBtn = document.getElementById("practice-speaking");
const markCompleteBtn = document.getElementById("mark-complete");
const resetProgressBtn = document.getElementById("reset-progress");

const programDays = [
  {
    day: 1,
    title: "Speak about yourself clearly",
    focus: "Self introduction",
    description: "Build confidence by introducing yourself with short, clear English sentences.",
    vocabulary: ["introduce", "currently", "interested", "improve", "confident"],
    grammar: "Use the present simple to talk about who you are, what you do, and what you like.",
    speaking: "Speak for 60 seconds: name, city, work or study, hobbies, and one goal.",
    listening:
      "Hello, my name is Asha. I live in Hyderabad and I work as a designer. I enjoy reading and learning English every evening.",
    steps: [
      { time: "3 min", title: "Warm-up", detail: "Read the example introduction aloud two times." },
      { time: "4 min", title: "Vocabulary", detail: "Use today's five words in your own short sentences." },
      { time: "4 min", title: "Speaking", detail: "Record or say your introduction without reading." },
      { time: "4 min", title: "Reflection", detail: "Type one sentence about what felt easy and what felt hard." },
    ],
  },
  {
    day: 2,
    title: "Talk about your daily routine",
    focus: "Daily routine",
    description: "Learn to explain your day in a natural sequence with simple time words.",
    vocabulary: ["usually", "sometimes", "after", "before", "schedule"],
    grammar: "Use present simple with time markers like in the morning, after lunch, and at night.",
    speaking: "Explain your morning to night routine in 6 to 8 sentences.",
    listening:
      "I usually wake up at six thirty. After breakfast, I check my messages and begin work at nine. In the evening, I go for a walk.",
    steps: [
      { time: "3 min", title: "Listen", detail: "Play the routine script and notice the order words." },
      { time: "4 min", title: "Pattern Practice", detail: "Say three sentences with usually, sometimes, and after." },
      { time: "4 min", title: "Speaking", detail: "Describe your real routine using a clear sequence." },
      { time: "4 min", title: "Coach Review", detail: "Ask the coach to improve one routine sentence." },
    ],
  },
  {
    day: 3,
    title: "Ask and answer basic questions",
    focus: "Conversation basics",
    description: "Practice the questions that appear in everyday conversations.",
    vocabulary: ["where", "when", "why", "favorite", "because"],
    grammar: "Form short questions with do, does, and be verbs.",
    speaking: "Ask and answer five questions about food, work, hobbies, and family.",
    listening:
      "Where do you work? I work in a hospital. What do you do after work? I usually meet my friends because it helps me relax.",
    steps: [
      { time: "3 min", title: "Question Drill", detail: "Read five question starters aloud." },
      { time: "4 min", title: "Answer Building", detail: "Answer each question in one full sentence." },
      { time: "4 min", title: "Roleplay", detail: "Imagine meeting a new person and continue the conversation." },
      { time: "4 min", title: "Review", detail: "Check if your answers sound complete and polite." },
    ],
  },
  {
    day: 4,
    title: "Describe people and personality",
    focus: "Descriptions",
    description: "Learn to describe people kindly, clearly, and naturally.",
    vocabulary: ["friendly", "helpful", "patient", "creative", "quiet"],
    grammar: "Use is, has, and adjectives to describe appearance and personality.",
    speaking: "Describe a friend or family member in 5 to 7 sentences.",
    listening:
      "My sister is very patient and creative. She has a calm voice and she always helps people when they are worried.",
    steps: [
      { time: "3 min", title: "Word Match", detail: "Match each adjective to a person you know." },
      { time: "4 min", title: "Sentence Practice", detail: "Make one sentence with each adjective." },
      { time: "4 min", title: "Speaking", detail: "Describe one person without repeating the same adjective." },
      { time: "4 min", title: "Refine", detail: "Replace simple words like good with stronger words." },
    ],
  },
  {
    day: 5,
    title: "Speak about places",
    focus: "Locations and environment",
    description: "Talk about your home, city, office, or favorite place with more detail.",
    vocabulary: ["crowded", "peaceful", "nearby", "comfortable", "modern"],
    grammar: "Use there is, there are, and prepositions of place.",
    speaking: "Describe your room, home, or neighborhood in 6 sentences.",
    listening:
      "My neighborhood is peaceful and there are many small shops nearby. There is a park behind my building where children play every evening.",
    steps: [
      { time: "3 min", title: "Observe", detail: "Look around and name five things in English." },
      { time: "4 min", title: "Structure", detail: "Use there is and there are in four sentences." },
      { time: "4 min", title: "Speaking", detail: "Describe one place from memory with location words." },
      { time: "4 min", title: "Expand", detail: "Add one feeling sentence such as I like this place because..." },
    ],
  },
];

while (programDays.length < 30) {
  const dayNumber = programDays.length + 1;
  const week = Math.ceil(dayNumber / 5);
  programDays.push({
    day: dayNumber,
    title: `Fluency practice day ${dayNumber}`,
    focus: `Week ${week} speaking confidence`,
    description:
      "Strengthen fluency through guided sentence patterns, listening repetition, and short personal speaking tasks.",
    vocabulary: ["clarify", "respond", "express", "natural", "fluent"],
    grammar: "Focus on speaking in complete sentences with clear connectors like and, but, so, and because.",
    speaking: `Speak for one minute about a real-life topic from your week and add one opinion sentence.`,
    listening:
      "Today I want to speak more naturally. I will answer slowly, choose clear words, and practice until my English feels more comfortable.",
    steps: [
      { time: "3 min", title: "Listen and repeat", detail: "Play the model script and repeat sentence by sentence." },
      { time: "4 min", title: "Vocabulary drill", detail: "Create one useful sentence with each focus word." },
      { time: "4 min", title: "Guided speaking", detail: "Answer the speaking prompt in your own words." },
      { time: "4 min", title: "Confidence review", detail: "Notice one pronunciation win and one sentence to improve." },
    ],
  });
}

const coachStarters = [
  "Welcome back. We will build your English step by step for 30 days.",
  "Speak in simple sentences first. Accuracy grows faster when your sentences are clear.",
  "Try not to translate every word. Think in short English ideas.",
];

let state = loadState();

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && typeof parsed.selectedDay === "number" && Array.isArray(parsed.completedDays)) {
      return parsed;
    }
  } catch {}

  return {
    selectedDay: 1,
    completedDays: [],
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getDayData(dayNumber) {
  return programDays.find((entry) => entry.day === dayNumber) || programDays[0];
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    addCoachMessage("bot", "Speech playback is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.93;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function addCoachMessage(role, text) {
  const card = document.createElement("article");
  card.className = `coach-entry ${role}`;

  const label = document.createElement("span");
  label.className = "coach-role";
  label.textContent = role === "bot" ? "English Coach" : "You";

  const body = document.createElement("div");
  body.textContent = text;

  card.append(label, body);
  coachLog.prepend(card);
}

function buildCoachReply(message) {
  const text = message.trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount <= 2) {
    return "Try a longer sentence. Add who, what, when, or why so your English sounds fuller.";
  }

  if (!/[.?!]$/.test(text)) {
    return `Good idea. A cleaner version is: "${text}." Try saying it slowly and clearly.`;
  }

  if (/i am|my name is|i live|i work/i.test(text)) {
    return "Nice personal introduction. Next, add one more detail about your goal, hobby, or daily routine.";
  }

  if (/because/i.test(text)) {
    return "Great. Using because makes your English sound more natural and connected.";
  }

  return "Good sentence. Now improve it by adding one adjective, one reason, or one time expression.";
}

function renderDayGrid() {
  dayGrid.innerHTML = "";

  programDays.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-card";

    if (entry.day === state.selectedDay) {
      button.classList.add("active");
    }

    if (state.completedDays.includes(entry.day)) {
      button.classList.add("completed");
    }

    button.innerHTML = `
      <strong>Day ${entry.day}</strong>
      <span>${entry.focus}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedDay = entry.day;
      saveState();
      renderAll();
    });

    dayGrid.append(button);
  });
}

function renderSession() {
  const day = getDayData(state.selectedDay);

  sessionTitle.textContent = `Day ${day.day}: ${day.title}`;
  sessionDescription.textContent = day.description;
  currentDayLabel.textContent = `Day ${day.day}`;
  completedCount.textContent = `${state.completedDays.length} / 30`;
  focusLabel.textContent = day.focus;
  grammarTip.textContent = day.grammar;
  speakingChallenge.textContent = day.speaking;
  listeningScript.textContent = day.listening;

  vocabList.innerHTML = "";
  day.vocabulary.forEach((word) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = word;
    vocabList.append(tag);
  });

  sessionSteps.innerHTML = "";
  day.steps.forEach((step, index) => {
    const card = document.createElement("article");
    card.className = "step-card";
    card.innerHTML = `
      <div class="step-index">${index + 1}</div>
      <div>
        <p class="step-time">${step.time}</p>
        <h3>${step.title}</h3>
        <p>${step.detail}</p>
      </div>
    `;
    sessionSteps.append(card);
  });

  markCompleteBtn.textContent = state.completedDays.includes(day.day)
    ? "Completed"
    : "Mark Day Complete";
}

function renderAll() {
  renderDayGrid();
  renderSession();
}

function markCurrentDayComplete() {
  const day = state.selectedDay;

  if (!state.completedDays.includes(day)) {
    state.completedDays.push(day);
    state.completedDays.sort((a, b) => a - b);
    saveState();
  }

  addCoachMessage("bot", `Excellent work. Day ${day} is complete. Come back tomorrow for the next 15-minute session.`);
  renderAll();
}

function startTodaySession() {
  const day = getDayData(state.selectedDay);
  addCoachMessage(
    "bot",
    `Today is Day ${day.day}. We will practice ${day.focus.toLowerCase()} in four small steps. Stay relaxed and speak in complete sentences.`
  );
}

function practiceSpeaking() {
  const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!RecognitionClass) {
    addCoachMessage("bot", "Voice speaking practice is not supported in this browser. You can still type your answer below.");
    return;
  }

  const recognition = new RecognitionClass();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  addCoachMessage("bot", "Speaking practice started. Say your answer clearly.");

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.trim();
    addCoachMessage("user", spoken);
    addCoachMessage("bot", buildCoachReply(spoken));
  };

  recognition.onerror = () => {
    addCoachMessage("bot", "I could not catch that clearly. Please try again in a quieter place.");
  };

  recognition.start();
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();

  if (!message) {
    return;
  }

  addCoachMessage("user", message);
  addCoachMessage("bot", buildCoachReply(message));
  chatForm.reset();
  chatInput.focus();
});

startTodayBtn.addEventListener("click", startTodaySession);
playDialogueBtn.addEventListener("click", () => {
  speakText(getDayData(state.selectedDay).listening);
});
listenExampleBtn.addEventListener("click", () => {
  speakText(getDayData(state.selectedDay).listening);
});
practiceSpeakingBtn.addEventListener("click", practiceSpeaking);
markCompleteBtn.addEventListener("click", markCurrentDayComplete);
resetProgressBtn.addEventListener("click", () => {
  state = {
    selectedDay: 1,
    completedDays: [],
  };
  saveState();
  renderAll();
  addCoachMessage("bot", "Your progress has been reset. We can begin again from Day 1.");
});

coachStarters.forEach((message) => addCoachMessage("bot", message));
renderAll();
