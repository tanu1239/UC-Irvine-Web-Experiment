# Temperature Estimation Task (Wisdom of Crowds Experiment)

**Wisdom of Crowds (WoC)** refers to the phenomenon where aggregating the judgments of many imperfect estimators can produce highly accurate results. A classic example is that averaging many people’s guesses often yields a better estimate than relying on a single individual, even when no individual is especially accurate.

This repository contains a browser-based behavioral experiment designed to study how people combine multiple noisy sources of information when making repeated estimates. Specifically, the task examines whether participants learn to:
- rely on **specialized high-quality sources (“experts”)**, or
- continue to **aggregate information across many sources**, leveraging wisdom-of-crowds effects.

The task is framed as an intuitive temperature estimation problem using visual sensors and thermometers, making it accessible to a general CS audience without prior background in psychology or experimental methods.

---

## Overview

Participants complete **60 trials**, split into **3 blocks of 20 trials**. Each block corresponds to a different **temperature range**, indicated by a uniquely colored sensor (**yellow**, **red**, or **blue**).

### Randomization
- The **order of the three blocks is randomized** across participants.
- Within each block, the **20 trials are presented in randomized order**.

### Trial Structure
On each trial:
1. A **colored sensor** flashes briefly (~700 ms). The sensor’s **hue and brightness** encode the true temperature.
2. Participants see **10 thermometers**, each providing an estimate of the temperature.
3. Participants adjust a separate **response thermometer** labeled “You” to report their own estimate.
4. After submission, the thermometer with the **most accurate estimate** is highlighted as feedback.

Within each block, **2 of the 10 thermometers are designated “experts”** and are systematically more accurate than the others for that temperature range.

---

## Experimental Question

The experiment is designed to investigate whether participants:
- Learn to **identify and rely on expert thermometers** through feedback, or
- Continue to rely on **aggregate strategies** (e.g., averaging across all thermometers), consistent with wisdom-of-crowds principles.

Trial-by-trial feedback allows learning dynamics to be analyzed across trials, blocks, and temperature ranges.

---

## Repository Structure

The project follows a standard static web experiment layout:

### Key Components

#### `public/`
Contains all client-facing files served to the browser.

- **HTML files**  
  Define the experiment flow, including instructions, block transitions, and the main task.
- **`js/task.js`**  
  Implements the core experiment logic:
  - Block and trial randomization
  - Stimulus presentation and timing
  - Participant response collection
  - Feedback highlighting the most accurate thermometer
- **Images and CSS**  
  Assets for sensor stimuli, thermometers, and instructional screens.

#### Top-level configuration files
- **`firebase.json`**  
  Firebase Hosting configuration (e.g., which folder to deploy).
- **`firestore.rules` / `firestore.indexes.json`**  
  Security rules and indexes for storing experiment data in Firestore.
- **`package.json` / `package-lock.json`**  
  JavaScript dependencies and scripts for local development.
- **`.firebaserc`**  
  Firebase project configuration.

---

## Running the Experiment

### Local Testing
To run the experiment locally:

1. Clone or download this repository.
2. Serve the project using a local web server:
   ```bash
   python -m http.server
