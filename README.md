# Fitness Tracker — Mobile Application Development Assignment 01

A React Native / Expo mobile app that helps users track their daily exercises.

## Features

### Required
- **Home Screen** — Displays a list of all exercises (built-in + custom)
- **Exercise Detail Screen** — Shows image, category, duration, and description of the selected exercise
- **Add Exercise Screen** — Form to create a custom exercise (name, category, duration, image URL, description)

### Optional (Bonus)
- **Mark as Completed** — Each exercise detail screen has a "Mark as Completed" toggle. Completed exercises show a ✓ Done badge on the home list.
- **Motivational Quotes Screen** — A separate tab that fetches motivational quotes from the public ZenQuotes API (`https://zenquotes.io/api/random`) with a refresh button.

## Tech Stack

- **Expo SDK 51** (React Native 0.74)
- **React Navigation** (Native Stack + Bottom Tabs)
- **React Context** for global state (exercise list + completion status)
- **fetch** for the public quotes API

## Project Structure

```
FitnessTracker/
├── App.js                          # Navigation setup (Tabs + Stack)
├── app.json                        # Expo config
├── package.json                    # Dependencies
├── babel.config.js                 # Babel preset
├── context/
│   └── ExerciseContext.js          # Global state (exercises + completed)
├── data/
│   └── exercises.js                # Initial sample exercises
└── screens/
    ├── HomeScreen.js               # List of exercises + FAB to add
    ├── ExerciseDetailScreen.js     # Detail view with complete toggle
    ├── AddExerciseScreen.js        # Form to add custom exercise
    └── QuotesScreen.js             # Motivational quotes tab
```

## How to Run

### Prerequisites
- **Node.js** v18 or newer — https://nodejs.org
- **Expo Go app** on your phone (Android Play Store / iOS App Store) — easiest way to test

### Steps

1. **Unzip this folder**, then open a terminal inside it:
   ```bash
   cd FitnessTracker
   ```

2. **Install dependencies** (takes a minute):
   ```bash
   npm install
   ```

3. **Start the dev server**:
   ```bash
   npx expo start
   ```

4. **Open the app**:
   - A QR code will appear in the terminal.
   - On your phone, open **Expo Go** and scan the QR code (Android) or scan with the Camera app (iOS).
   - The app will load on your phone.

   Alternatively, press `a` in the terminal to open an Android emulator, or `i` for iOS Simulator (Mac only), or `w` for web.

## Usage

1. **Home tab** shows the exercise list. Tap any card to see the detail view.
2. Tap the green **+ FAB** (bottom right) to add your own exercise.
3. On the detail screen, tap **Mark as Completed** to toggle completion status — a ✓ Done badge will appear on the home list.
4. Switch to the **Motivation tab** to see a motivational quote. Tap 🔄 New Quote to fetch another one.

## Notes

- Custom exercises are stored in-memory (using React Context). They reset when the app is closed. Persisting with AsyncStorage is a simple next step.
- Image URLs on the Add screen should be direct links to an image (e.g. from Unsplash).
- The quotes API is free and requires no key.
