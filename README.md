# K-Explore — Responsive Event Management Platform

> **Task Title:** Design and Develop a Responsive Event Management Website  
> **Student / Author:** Sarthak Sharma  
> **Project Folder:** `sarthak k explore`  
> **Tech Stack:** HTML5, CSS3, Modern JavaScript (ES6+), LocalStorage API

---

## 🌟 Overview & Problem Statement

**K-Explore** is a modern, visually stunning, fully responsive event management website built to allow attendees and students to explore upcoming campus and technical events, view in-depth event schedules and speaker lineups, and seamlessly register for their chosen events.

The platform provides a responsive, accessible, and intuitive user experience with smooth transitions, interactive components, instant search and category filtering, client-side form validation, and real-time digital pass generation.

---

## 🚀 Key Features

### 1. Modern Responsive UI/UX
- **Responsive Layout:** Fluidly adapts to mobile phones, tablets, laptops, and ultra-wide desktop monitors using modern CSS Flexbox and Grid.
- **Glassmorphism & Theming:** Subtle frosted glass navigation (`backdrop-filter: blur`), glowing badges, smooth card hover lifts, and clean typography (`Inter` & `Plus Jakarta Sans`).
- **Mobile Friendly:** Collapsible slide-down hamburger navigation with touch-friendly controls.

### 2. Hero Section & Flagship Event Countdown
- Engaging value proposition introducing the annual campus conclave.
- Quick navigation CTAs ("Explore All Events", "Browse Categories").
- **Real-Time Live Countdown Timer:** Active countdown (Days, Hours, Minutes, Seconds) ticking down to the flagship hackathon (*HackK-Explore 2026*).
- Key platform statistics highlight banner.

### 3. Smart Search, Category Filters & Sorting
- **Real-time Instant Search:** Instant filtering across event titles, short descriptions, venue locations, and categories with a one-click clear button.
- **Category Filter Pills:** All Events, Tech & AI, Design & UI/UX, Business & Startups, Workshops, Cultural & Music, Gaming & Esports.
- **Status Filter:** All Statuses, Featured Events, and My Saved Favorites.
- **Sorting Options:** Sort by Upcoming Date, Popularity (seats filled), and Alphabetical (A-Z).
- **Empty State Display:** Graceful feedback with an instant "Reset All Filters" button.

### 4. Comprehensive Event Cards
- High-resolution imagery with subtle zoom hover transitions.
- Category tags, date badge overlays, and real-time seat availability progress bar.
- Interactive **Favorite / Bookmark heart button** persisted in `localStorage`.
- Direct action triggers: **"View Details"** and **"Register"**.

### 5. In-Depth Event Details Modal
- Full cover banner with event metadata.
- **Event-Specific Live Countdown Clock:** Calculates remaining time to the event's start date and time.
- **Agenda / Schedule Timeline:** Chronological schedule breakdown with visual timeline connectors.
- **Speaker & Mentor Lineup:** Speaker avatars, designations, and company affiliations.
- **Perks & Takeaways:** Tagged badges for prizes, certificates, swags, and lunch tokens.
- Single-click transition to registration.

### 6. Interactive Registration Form with JavaScript Validation
The registration form enforces strict, friendly client-side validation:
- **Full Name:** Required, letters and spaces only, minimum 3 characters.
- **Email Address:** Required, validated against standard email format (`^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`).
- **Phone Number:** Required, validates 10-digit mobile number format.
- **Event Selection:** Required selection from dynamic event dataset.
- **Pass Type:** Standard Delegate, Hacker/Competitor, VIP & Networking.
- **Terms & Conditions:** Mandatory consent checkbox.
- **Real-time Inline Error Feedback:** Instant error prompts that clear dynamically as the user types.
- **Duplicate Registration Prevention:** Alerts users if they have already registered with the same email for that event.

### 7. Digital Ticket Pass & Confirmation Modal
Upon successful registration:
- Generates a sleek, printable **K-Explore Digital Pass**.
- Displays unique registration ID (e.g. `KX-2026-4829`).
- Features a simulated **Security Checkpoint QR Code & Auth Token**.
- **Print / Save as PDF** support via `@media print` optimized CSS.
- **Add to Google Calendar** integration (pre-fills title, dates, and venue in one click).

---

## 🏆 Bonus Challenges Implemented

1. **Dark & Light Mode Toggle:**
   - Seamless color palette transition using CSS custom properties (`data-theme="dark"` / `data-theme="light"`).
   - Automatically detects user OS color scheme preference.
   - Persists theme choice in browser `localStorage`.

2. **Dual Real-time Countdown Timers:**
   - **Hero Countdown:** Live clock ticking down to the flagship event.
   - **Modal Countdown:** Live clock tailored to each selected event's start timestamp.

3. **Local Storage-Based Registration Data Management:**
   - Saved in `kexplore_registrations`.
   - **"My Passes" Slide-out Drawer:** Users can open their passes drawer from the header at any time.
   - Shows active registrations with attendee details.
   - View complete digital pass anytime.
   - **Cancel Registration:** Users can release their reserved seat with instant confirmation; dynamically restores seat counts.

4. **Favorites / Bookmarking System:**
   - Bookmark favorite events using the heart icon.
   - Stored in `localStorage` under `kexplore_favorites`.
   - Instant filter to view only saved events.

5. **Smooth Micro-Animations & Toast Alerts:**
   - Interactive hover cards, smooth modal scale/fade animations, and toast feedback for all key user actions.

---

## 📂 Project Directory Structure

```
sarthak k explore/
├── index.html          # Semantic HTML5 single-page structure
├── css/
│   └── style.css       # Custom CSS3 with CSS variables, dark/light themes & responsive breakpoints
├── js/
│   ├── data.js         # Comprehensive dataset of 8 realistic events, schedules & speakers
│   └── app.js          # Core JavaScript application logic, state, validation & localStorage
├── assets/             # Project assets folder
├── .gitignore          # Git exclusion rules
└── README.md           # Project documentation & GitHub instructions
```

---

## 💻 How to Run Locally

You can open and view this project immediately without requiring Node.js, external packages, or complex build tools:

1. Navigate to the project directory:
   ```bash
   cd "/Users/sarthaksharma/Desktop/sarthak k explore"
   ```
2. Open `index.html` directly in your favorite web browser (Google Chrome, Safari, Microsoft Edge, Firefox):
   - **macOS Terminal command:**
     ```bash
     open index.html
     ```
   - Or double-click `index.html` in macOS Finder.
3. Alternatively, if you use VS Code, right-click `index.html` and click **"Open with Live Server"**.

---

## 🐙 Git & GitHub Submission Guide

This project is prepared for version control submission. To push it to your GitHub account, follow these quick steps in your terminal:

```bash
# 1. Navigate to the project folder
cd "/Users/sarthaksharma/Desktop/sarthak k explore"

# 2. Check git status
git status

# 3. Create a new repository on your GitHub account (e.g. named "sarthak-k-explore")

# 4. Link your local project to your GitHub repository:
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Set main branch and push:
git branch -M main
git push -u origin main
```

---

## 📄 License & Attribution

Designed and developed by **Sarthak Sharma** for the **K Explore – Web Designing** challenge. All assets, event data, and scripts are free to use for academic and evaluation purposes.
