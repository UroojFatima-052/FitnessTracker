# Fitness Tracker

A simple mobile fitness tracking application built using React Native and Expo. The app allows users to view a list of exercises, see details about each one, add their own custom exercises, mark exercises as completed, and view motivational quotes from a public API.

## Features

- View a list of built-in exercises (Push Ups, Squats, Plank, etc.)
- Tap any exercise to see its image, category, duration, and description
- Add new custom exercises through a form
- Mark exercises as completed and see them tracked on the home screen
- View random motivational quotes fetched from the ZenQuotes public API

## Technologies Used

- React Native
- Expo SDK 54
- React Navigation (Bottom Tabs and Native Stack)
- React Context API for state management
- @expo/vector-icons for icons
- Fetch API for the motivational quotes

## How to Clone and Run This Project

### Prerequisites

Before you start, make sure you have:

- **Node.js** (version 18 or higher) — Download from https://nodejs.org
- **Git** — Download from https://git-scm.com
- **Expo Go** app on your mobile phone — Available on Google Play Store (Android) or App Store (iOS)

### Step 1: Clone the Repository

Open a terminal (PowerShell on Windows or Terminal on Mac) and run:

```bash
git clone https://github.com/yourusername/FitnessTracker.git
```

Then enter the project folder:

```bash
cd FitnessTracker
```

### Step 2: Install the Dependencies

Run this command to install all the required packages:

```bash
npm install
```

This will take a few minutes the first time.

### Step 3: Start the App

Start the development server with:

```bash
npx expo start
```

A QR code will appear in the terminal.

### Step 4: Open the App on Your Phone

- Open the **Expo Go** app on your phone
- Make sure your phone and computer are on the **same Wi-Fi network**
- On Android, scan the QR code from inside Expo Go
- On iOS, scan the QR code with the Camera app
- The app will load on your phone

If the QR code does not work, try tunnel mode instead:

```bash
npx expo start --tunnel
```

This works even when your phone and computer are on different networks.

## How to Use the App

1. The app opens on the **Workouts** tab showing all available exercises.
2. Tap any exercise card to view its details.
3. On the detail screen, tap **Mark as Completed** to record that you finished it.
4. Tap the **+ button** at the bottom right to add your own exercise.
5. Switch to the **Motivation** tab to read a motivational quote, and tap the refresh button to get a new one.

## Notes

- Custom exercises are stored only while the app is running and will reset when the app is closed.
- The motivational quotes API is free and does not require any key.
- An internet connection is needed to load exercise images and quotes.

## Author

Submitted By **Urooj Fatima**.
