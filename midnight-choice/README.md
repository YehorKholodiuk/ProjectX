# Midnight Choice

**An experimental React Native application exploring personalized music and film recommendations through emotional and behavioral patterns.**

## Overview

Midnight Choice is an experimental mobile application built around a simple idea: the way people respond to unusual questions can reveal something about their current emotional state, preferences, and inner world.

Instead of relying on conventional genres or popularity rankings, the application uses users' answers to build an emotional profile and recommend music and films that may resonate with them.

The project explores the intersection of interaction design, lightweight behavioral modeling, and personalized content discovery.

## How It Works

1. **User Interaction** — The application presents a series of questions designed to explore different aspects of a user's preferences and emotional state.
2. **Profile Mapping** — Answers contribute to an emotional profile represented by a set of conceptual dimensions.
3. **Recommendation Matching** — The application compares the resulting profile with tagged media entries in its curated database.
4. **Personalized Discovery** — Users receive music and film recommendations selected according to the matching process.

## Recommendation Engine

The recommendation system combines a curated media database with an emotional tagging model.

Key concepts include:

- **Emotional dimensions** representing different moods, experiences, and personal associations.
- **Weighted tag mapping** to represent the relationship between media items and emotional dimensions.
- **Profile calibration** using a normalized scoring system.
- **Similarity-based matching** to identify media entries that best correspond to the user's profile.

The goal is to explore an alternative approach to content discovery, where recommendations are shaped by a user's responses rather than popularity alone.

## Tech Stack

- React Native
- JavaScript
- Zustand for state management
- JSON-based media data and emotional dictionaries
- Custom recommendation and matching logic

## Design Philosophy

Midnight Choice focuses on atmospheric interaction design and a more personal approach to media discovery.

The project explores how carefully designed questions, structured data, and lightweight recommendation logic can work together to create a distinctive user experience.

## Project Status

Midnight Choice is an experimental project developed to explore personalized recommendations, interaction design, and behavioral state mapping in a mobile application.

## Getting Started

### Prerequisites

- Node.js
- npm
- Android Studio and an Android emulator (for Android development)

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/YehorKholodiuk/ProjectX.git
cd ProjectX/midnight-choice
npm install
```

## Running the Application

Start the development server:

```bash
npx expo start
```

### Running on Android Emulator

1. Start an Android emulator from Android Studio.
2. Run `npx expo start` in the project directory.
3. Press `a` in the terminal to launch the application on the Android emulator.

### Running on a Physical Device

1. Install Expo Go on your mobile device.
2. Run `npx expo start` in the project directory.
3. Scan the QR code displayed in the terminal using Expo Go.

Make sure your computer and mobile device are connected to the same local network when using the standard LAN connection.

## Author

**Yehor Kholodiuk**

(https://github.com/YehorKholodiuk)
