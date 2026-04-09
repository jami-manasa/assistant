# Assistant Doreamon

Assistant Doreamon is a browser-based laptop assistant inspired by Siri. It listens to voice commands, speaks responses, keeps lightweight notes in local storage, and handles everyday actions like search, time, date, opening popular websites, battery status, and quick calculations.

## Features

- Voice input with the Web Speech API
- Spoken responses with speech synthesis
- Search the web, YouTube, and Google Maps
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
2. Click `Enable Voice`.
3. Allow microphone access when the browser asks.
4. Try commands like:
   - "What time is it?"
   - "Search for machine learning tutorials"
   - "Open YouTube"
   - "Save note buy milk"
   - "Show my notes"
   - "Calculate 45 divided by 9"
   - "Battery status"

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
