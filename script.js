const statusEl = document.getElementById("assistant-status");
const supportBadge = document.getElementById("support-badge");
const voiceToggleBtn = document.getElementById("voice-toggle");
const stopSpeakingBtn = document.getElementById("stop-speaking");
const form = document.getElementById("text-command-form");
const commandInput = document.getElementById("text-command");
const conversationLog = document.getElementById("conversation-log");
const clearLogBtn = document.getElementById("clear-log");
const shortcutButtons = document.querySelectorAll(".chip");

const notesKey = "assistant-doreamon-notes";
const RecognitionClass =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;
const wakePhrases = ["hey siri", "hey doreamon", "assistant", "hey assistant"];

let recognition = null;
let isListening = false;
let assistantEnabled = false;
let awaitingCommand = false;
let manualStopRequested = false;

function addEntry(role, text) {
  const entry = document.createElement("article");
  entry.className = `entry ${role}`;

  const label = document.createElement("span");
  label.className = "entry-label";
  label.textContent = role === "assistant" ? "Assistant Doreamon" : "You";

  const content = document.createElement("div");
  content.textContent = text;

  entry.append(label, content);
  conversationLog.prepend(entry);
}

function setStatus(text) {
  statusEl.textContent = text;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

function answer(text) {
  addEntry("assistant", text);
  setStatus(text);
  speak(text);
}

function answerWithoutSpeech(text) {
  addEntry("assistant", text);
  setStatus(text);
}

function openUrl(url) {
  const popup = window.open(url, "_blank", "noopener,noreferrer");

  if (!popup) {
    window.location.href = url;
  }
}

function normalizeCommand(text) {
  return text.trim().replace(/\s+/g, " ");
}

function extractWakeCommand(rawText) {
  const normalized = normalizeCommand(rawText.toLowerCase());

  for (const phrase of wakePhrases) {
    if (normalized === phrase) {
      return "";
    }

    if (normalized.startsWith(`${phrase} `)) {
      return rawText.slice(phrase.length).trim();
    }
  }

  return null;
}

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(notesKey)) || [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(notesKey, JSON.stringify(notes));
}

function handleNoteSave(command) {
  const note = command.replace(/^(save note|remember this|take note)\s*/i, "").trim();

  if (!note) {
    answer("Tell me what to save after saying save note.");
    return true;
  }

  const notes = getNotes();
  notes.push({
    text: note,
    createdAt: new Date().toISOString(),
  });
  saveNotes(notes);
  answer(`Saved your note: ${note}`);
  return true;
}

function handleShowNotes() {
  const notes = getNotes();

  if (!notes.length) {
    answer("You do not have any saved notes yet.");
    return true;
  }

  const list = notes
    .slice(-5)
    .map((note, index) => `${index + 1}. ${note.text}`)
    .join(" ");

  answer(`Here are your latest notes. ${list}`);
  return true;
}

function handleClearNotes() {
  saveNotes([]);
  answer("I cleared your saved notes.");
  return true;
}

function handleTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  answer(`It is ${time}.`);
  return true;
}

function handleDate() {
  const today = new Date().toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  answer(`Today is ${today}.`);
  return true;
}

async function handleBattery() {
  if (!("getBattery" in navigator)) {
    answer("Battery details are not supported in this browser.");
    return true;
  }

  try {
    const battery = await navigator.getBattery();
    const level = Math.round(battery.level * 100);
    const charging = battery.charging ? "and charging" : "and not charging";
    answer(`Your battery is at ${level} percent ${charging}.`);
  } catch {
    answer("I could not read the battery status right now.");
  }

  return true;
}

function handleSearch(command) {
  const query = command
    .replace(/^(search for|google|look up)\s*/i, "")
    .trim();

  if (!query) {
    answer("Tell me what you want me to search for.");
    return true;
  }

  openUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  answer(`Searching Google for ${query}.`);
  return true;
}

function handleYouTube(command) {
  const query = command.replace(/^(play|search youtube for)\s*/i, "").trim();

  if (!query || /^youtube$/i.test(query)) {
    openUrl("https://www.youtube.com/");
    answer("Opening YouTube.");
    return true;
  }

  openUrl(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
  answer(`Searching YouTube for ${query}.`);
  return true;
}

function handleMaps(command) {
  const place = command.replace(/^(find|open map for|map)\s*/i, "").trim();

  if (!place) {
    answer("Tell me the place you want to see on the map.");
    return true;
  }

  openUrl(`https://www.google.com/maps/search/${encodeURIComponent(place)}`);
  answer(`Opening maps for ${place}.`);
  return true;
}

function handleOpenSite(command) {
  const sites = {
    google: "https://www.google.com/",
    youtube: "https://www.youtube.com/",
    whatsapp: "https://web.whatsapp.com/",
    gmail: "https://mail.google.com/",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    netflix: "https://www.netflix.com/",
    spotify: "https://open.spotify.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    chatgpt: "https://chat.openai.com/",
    x: "https://x.com/",
    twitter: "https://x.com/",
  };

  const siteName = command.replace(/^open\s+/i, "").trim().toLowerCase();

  if (!sites[siteName]) {
    return false;
  }

  openUrl(sites[siteName]);
  answer(`Opening ${siteName}.`);
  return true;
}

function handleCalculation(command) {
  const expression = command
    .replace(/^(calculate|what is|solve)\s*/i, "")
    .replace(/\bdivided by\b/gi, "/")
    .replace(/\binto\b/gi, "*")
    .replace(/\bmultiplied by\b/gi, "*")
    .replace(/\bplus\b/gi, "+")
    .replace(/\bminus\b/gi, "-")
    .trim();

  if (!/^[\d+\-*/().%\s]+$/.test(expression)) {
    return false;
  }

  try {
    // The expression is restricted to digits, whitespace, and math operators.
    const result = Function(`"use strict"; return (${expression})`)();
    answer(`The answer is ${result}.`);
    return true;
  } catch {
    answer("I could not calculate that.");
    return true;
  }
}

async function processCommand(rawCommand) {
  const command = rawCommand.trim();

  if (!command) {
    return;
  }

  addEntry("user", command);

  const lowerCommand = command.toLowerCase();

  if (/^(hi|hello|hey)\b/i.test(command)) {
    answer("Hello. I am Assistant Doreamon. How can I help you today?");
    return;
  }

  if (/(what time|current time|time now)/i.test(command)) {
    handleTime();
    return;
  }

  if (/(what.*date|today'?s date|current date)/i.test(command)) {
    handleDate();
    return;
  }

  if (/^(save note|remember this|take note)\b/i.test(command)) {
    handleNoteSave(command);
    return;
  }

  if (/(show my notes|read my notes|show notes)/i.test(command)) {
    handleShowNotes();
    return;
  }

  if (/(clear notes|delete notes)/i.test(command)) {
    handleClearNotes();
    return;
  }

  if (/(battery status|battery level)/i.test(command)) {
    await handleBattery();
    return;
  }

  if (/^(search for|google|look up)\b/i.test(command)) {
    handleSearch(command);
    return;
  }

  if (/^(play|search youtube for)\b/i.test(command) || lowerCommand === "open youtube") {
    handleYouTube(command);
    return;
  }

  if (/^(open map for|map|find)\b/i.test(command) && /(map|maps)/i.test(command)) {
    handleMaps(command.replace(/\bmaps?\b/i, "").trim());
    return;
  }

  if (/^open\b/i.test(command) && handleOpenSite(command)) {
    return;
  }

  if (/^(calculate|what is|solve)\b/i.test(command) && handleCalculation(command)) {
    return;
  }

  if (/(who are you|your name)/i.test(command)) {
    answer("I am Assistant Doreamon, your browser-based laptop assistant.");
    return;
  }

  answer(
    "I can help with time, date, notes, battery, WhatsApp, websites, YouTube, Google search, and simple calculations. Try saying Hey Siri open WhatsApp."
  );
}

function restartRecognition() {
  if (!recognition || !assistantEnabled || manualStopRequested || isListening) {
    return;
  }

  try {
    recognition.start();
  } catch {
    setTimeout(restartRecognition, 600);
  }
}

function stopAssistantMode() {
  manualStopRequested = true;
  assistantEnabled = false;
  awaitingCommand = false;

  if (recognition && isListening) {
    recognition.stop();
  }

  window.speechSynthesis.cancel();
  setStatus("Assistant stopped");
  voiceToggleBtn.textContent = "Start Assistant";
}

function initRecognition() {
  if (!RecognitionClass) {
    supportBadge.textContent = "Wake mode unavailable here";
    setStatus("Voice recognition is unavailable in this browser");
    return;
  }

  recognition = new RecognitionClass();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  supportBadge.textContent = "Wake mode ready";
  supportBadge.classList.add("support-ok");

  recognition.onstart = () => {
    isListening = true;
    document.body.classList.add("is-listening");
    setStatus(awaitingCommand ? "Listening for your command..." : "Listening for wake phrase...");
    voiceToggleBtn.textContent = "Assistant Running";
  };

  recognition.onend = () => {
    isListening = false;
    document.body.classList.remove("is-listening");
    if (!assistantEnabled) {
      voiceToggleBtn.textContent = "Start Assistant";
      if (
        statusEl.textContent === "Listening for wake phrase..." ||
        statusEl.textContent === "Listening for your command..."
      ) {
        setStatus("Idle and ready");
      }
      return;
    }

    setTimeout(restartRecognition, 350);
  };

  recognition.onerror = (event) => {
    isListening = false;
    document.body.classList.remove("is-listening");

    if (event.error === "not-allowed") {
      assistantEnabled = false;
      manualStopRequested = true;
      voiceToggleBtn.textContent = "Start Assistant";
      setStatus("Microphone permission is required");
      addEntry("assistant", "Microphone permission is required before wake-word mode can run.");
      return;
    }

    if (event.error !== "aborted" && event.error !== "no-speech") {
      setStatus(`Voice error: ${event.error}`);
    }
  };

  recognition.onresult = (event) => {
    const result = event.results[event.resultIndex];

    if (!result || !result[0]) {
      return;
    }

    const transcript = result[0].transcript.trim();

    if (!assistantEnabled) {
      return;
    }

    const inlineWakeCommand = extractWakeCommand(transcript);

    if (inlineWakeCommand !== null) {
      if (!inlineWakeCommand) {
        awaitingCommand = true;
        answerWithoutSpeech("Yes, I am listening.");
        return;
      }

      awaitingCommand = false;
      processCommand(inlineWakeCommand);
      return;
    }

    if (awaitingCommand) {
      awaitingCommand = false;
      processCommand(transcript);
    }
  };
}

voiceToggleBtn.addEventListener("click", () => {
  if (!recognition) {
    answer("Voice recognition is not available in this browser. You can still type commands.");
    return;
  }

  if (assistantEnabled) {
    stopAssistantMode();
    return;
  }

  manualStopRequested = false;
  assistantEnabled = true;
  awaitingCommand = false;
  setStatus("Starting hands-free mode...");
  restartRecognition();
});

stopSpeakingBtn.addEventListener("click", () => {
  stopAssistantMode();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  processCommand(commandInput.value);
  form.reset();
  commandInput.focus();
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    processCommand(button.dataset.command || "");
  });
});

clearLogBtn.addEventListener("click", () => {
  conversationLog.innerHTML = "";
  setStatus("Conversation cleared");
});

initRecognition();
answer(
  "Assistant Doreamon is ready. Start the assistant once, then say Hey Siri or Hey Doreamon with your command."
);
