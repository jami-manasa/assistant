# Assistant Doreamon

Assistant Doreamon is a browser-based laptop assistant inspired by Siri. It listens for wake phrases after microphone permission is granted, speaks responses, keeps lightweight notes in local storage, and handles everyday actions like search, time, date, opening popular websites, battery status, and quick calculations.

## Features

- Wake phrase support for `Hey Siri`, `Hey Doreamon`, and `Assistant`
- Voice input with the Web Speech API
- Spoken responses with speech synthesis
- Search the web, YouTube, Google Maps, and open WhatsApp Web
- Quick commands for time, date, battery, and calculations
- Local note saving and recall
- Clean, responsive interface ready for GitHub Pages

## Project Structure

```text
assistant doreamon/
|-- index.html
|-- styles.css
|-- script.js
|-- .gitignore
|-- LICENSE
`-- README.md
```

## How To Run

1. Open `index.html` in a modern Chromium-based browser such as Chrome or Edge.
2. Click `Start Assistant` once.
3. Allow microphone access when the browser asks.
4. Then try commands like:
   - "Hey Siri open WhatsApp"
   - "Hey Doreamon open YouTube"
   - "Save note buy milk"
   - "Show my notes"
   - "Calculate 45 divided by 9"
   - "Battery status"

## Important Limitation

This version runs in the browser, so it cannot fully behave like iPhone Siri.

- Browsers require an initial user action and microphone permission before voice listening can start.
- Browsers cannot reliably act as a system-wide wake-word assistant from a closed tab.
- Opening installed desktop apps directly usually requires a native desktop app, not a website.

If you want a true laptop Siri experience with always-on wake word detection and real app launching, the next step is to convert this into a native desktop app using Electron or Tauri plus Windows automation.

## Publish Publicly On GitHub

If you want this project in its own public repository:

1. Create a new public GitHub repository named `assistant-doreamon`.
2. Copy the contents of this folder into that repository.
3. Push the code:

```bash
git init
git add .
git commit -m "Create Assistant Doreamon"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/assistant-doreamon.git
git push -u origin main
```

## Make It Live With GitHub Pages

1. Open the GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select the `main` branch and the root folder.
5. Save.

GitHub will publish the project at:

`https://YOUR-USERNAME.github.io/assistant-doreamon/`

## Notes

- Voice recognition support is best in Chrome and Microsoft Edge.
- Commands that open websites may be blocked unless triggered after a user action, depending on browser rules.
- Notes are stored only in the current browser using local storage.
