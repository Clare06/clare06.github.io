# Spidey Theme - Internal Documentation

## Overview
The "Spidey Theme" is an alternate, immersive UI mode inspired by *Spider-Man: Into the Spider-Verse*. It features a "Stealth Mode" dark aesthetic, glitch animations, specific audio cues, and haptic feedback. This document details the technical implementation and assets used.

## 1. File Structure
*   **Logic:** `js/spidey.js` (Handles audio, haptics, animations)
*   **Styles:** `css/spidey.css` (Visuals, keyframes, mobile styles)
*   **Structure:** `spidey-index-body.html` (The HTML fragment loaded into the main container)
*   **Orchestration:** `js/script.js` (Manages the loading and swapping mechanism)
*   **Assets:**
    *   `assets/audio/transition-activate.mp3`
    *   `assets/audio/hover-glitch.mp3`

## 2. Transition Logic (`js/script.js`)
The transition is orchestrating by `triggerSpideyTransition()` in `js/script.js`.

### Phase 1: Activation
1.  User clicks the toggle button (`#spidey-toggle`).
2.  `#transition-overlay` becomes active (opacity 1).
3.  Glitch text displays: *"Deactivating Professional Protocol..."*.
4.  `loadAndTriggerSpideyEffect()` is called.
    *   It ensures `js/spidey.js` is loaded.
    *   It triggers `window.triggerTechGlitch()`.

### Phase 2: The Glitch (`js/spidey.js`)
`triggerTechGlitch()` runs for **2.8 seconds**:
*   **Audio:** Plays `transition-activate.mp3`.
*   **Visual:** Spawns `span.tech-bleed-span` elements containing tech keywords (Java, Spring Boot, AWS, etc.) at random positions with random scaling.

### Phase 3: The Swap
After 3 seconds:
1.  `toggleSpideyTheme()` fetches `spidey-index-body.html`.
2.  It replaces the innerHTML of `#default-theme-container`.
3.  Adds `.spidey-mode` class to `<body>`.
4.  Calls `window.initSpideyTheme()`.

## 3. Visual Effects (`css/spidey.css`)

### Color Palette "Stealth Mode"
*   **Background:** Deep Matte Gray/Black (`#0f0f0f`)
*   **Accents:** High-Voltage Red (`#FF0033`), Electric Blue (`#0066FF`), Cyan (`#00F0FF`)
*   **Text:** White (`#ffffff`)

### Key Animations
1.  **Spider Drop (`@keyframes spider-drop-kinetic`)**:
    *   Duration: 1.2s
    *   Behavior: Drops from `-100vh`, overshoots past 0 to `20px` (at 80%), then settles at `0`.
2.  **Web Pop (`@keyframes web-pop`)**:
    *   Expands the geometric web SVG from scale 0 to 1.2, then settles at 1.0.
3.  **Glitch Text**:
    *   Uses `::before` and `::after` pseudo-elements with `clip-path` animations (`slice-red`, `slice-cyan`) to create a tearing effect.

## 4. Audio & Haptics (`js/spidey.js`)

### AudioController
A dedicated `AudioController` class manages sound playback with error handling.
*   **Transition:** `assets/audio/transition-activate.mp3` (Played on toggle)
*   **Hover:** `assets/audio/hover-glitch.mp3` (Volume: 0.2) - Played when hovering over cards, buttons, or links.

### Haptic Feedback (Vibration)
*   **Toggle Button Warning:**
    *   Pattern: `[50, 30, 50, 30, 150]` (Buzz-Buzz-Buzz-Long)
    *   Triggered on clicking the spider icon.
*   **Impact Thud:**
    *   Pattern: `[60]` (Single sharp thud)
    *   Triggered at **800ms** into the drop animation (when the profile hits the center).

## 5. Mobile Implementation
*   **Menu:** A custom overlay (`#spidey-menu`) replaces the standard navigation.
    *   Triggered by `.spidey-hamburger`.
    *   Contains "Download CV" button.
*   **Responsiveness:**
    *   Profile picture and web assets scale down.
    *   Grid layouts switch to single column.
    *   The drop animation distance is relative (`vh`), so it works on all screen heights.

## 6. Development Notes
*   **Isolation:** The theme is strictly isolated. Styles are in `spidey.css` and do not affect `main.css` due to the specific `.spidey-mode` body class scoping (where applicable) or specific class names.
*   **Content:** Text content is static in `spidey-index-body.html` and does not currently pull from `data/content.json` like the main theme, allowing for creative rewrites (e.g., "Mission Log" instead of "Experience").
