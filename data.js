/**
 * K-Explore Event Management Platform
 * Dataset of Curated Events, Categories, and Metadata
 */

const EVENTS_DATA = [
  {
    id: "hack-k-explore-2026",
    title: "HackK-Explore 2026: 48-Hour National Hackathon",
    tagline: "Build the future of AI, Web3, and Sustainable Tech",
    category: "tech",
    categoryLabel: "Tech & AI",
    badge: "Flagship",
    date: "2026-11-20",
    time: "09:00 AM - 05:00 PM (48 Hours)",
    isoDate: "2026-11-20T09:00:00",
    venue: "Main Auditorium & Innovation Lab, Tech Campus",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: true,
    seatsTotal: 300,
    seatsFilled: 235,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "The premier collegiate hackathon bringing together 300+ developers, designers, and innovators to solve real-world problems.",
    fullDescription: "HackK-Explore 2026 is our flagship 48-hour endurance hackathon. Whether you are passionate about generative artificial intelligence, decentralized applications, fintech, or climate-tech solutions, this is your arena. Enjoy 24/7 mentoring from top industry leads, high-speed WiFi, complimentary gourmet meals, swag bags, and a ₹2,50,000 prize pool.",
    speakers: [
      { name: "Aarav Mehta", role: "AI Research Lead at CloudScale", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Elena Rostova", role: "Principal Architect, OpenSystem Labs", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
      { name: "Devendra Patel", role: "Founder & CTO at NexusVentures", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "Day 1 - 09:00 AM", activity: "Check-in, Breakfast & Opening Ceremony" },
      { time: "Day 1 - 11:00 AM", activity: "Hacking Begins & Mentor Round 1" },
      { time: "Day 1 - 08:00 PM", activity: "Midnight Snack & Lightning Workshops" },
      { time: "Day 2 - 02:00 PM", activity: "Project Submission & Demo Pitching" },
      { time: "Day 2 - 04:30 PM", activity: "Grand Finale, Awards & Networking" }
    ],
    perks: ["₹2,50,000 in Prizes", "Official Verified Certificate", "Exclusive Swag Kit & Hoodie", "Free Meals & Energy Drinks", "Internship Fast-Tracks"]
  },
  {
    id: "ux-future-summit",
    title: "Future of UI/UX & Spatial Design Summit",
    tagline: "Designing next-gen immersive experiences and AI interfaces",
    category: "design",
    categoryLabel: "Design & UI/UX",
    badge: "Trending",
    date: "2026-11-25",
    time: "10:30 AM - 04:30 PM",
    isoDate: "2026-11-25T10:30:00",
    venue: "Design Studio Hall 4, Creative Arts Block",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: true,
    seatsTotal: 150,
    seatsFilled: 118,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Explore micro-interactions, spatial computing design tokens, and human-AI collaboration design systems with industry pioneers.",
    fullDescription: "Step into the evolution of digital product design. Dive deep into Figma advanced variables, design systems governance, spatial interface paradigms for visionOS/XR, and cognitive UX. Includes live interactive critiques and portfolio teardowns by design directors.",
    speakers: [
      { name: "Sophia Zhang", role: "VP of Product Design, StudioNova", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
      { name: "Kabir Sengupta", role: "Design Systems Architect, FinFlow", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "10:30 AM", activity: "Keynote: The AI-Assisted Design Era" },
      { time: "12:00 PM", activity: "Hands-on Workshop: Spatial UI Prototyping" },
      { time: "02:00 PM", activity: "Lunch & Portfolio Review Sessions" },
      { time: "03:30 PM", activity: "Fireside Chat & Q&A" }
    ],
    perks: ["Figma Enterprise Template Pack", "Verified UX Certificate", "1-on-1 Portfolio Teardown", "Networking Lunch"]
  },
  {
    id: "startup-conclave-2026",
    title: "VentureCraft: Founders & Angel Investor Conclave",
    tagline: "Pitch your ideas, raise seed funding, and learn scaling playbooks",
    category: "business",
    categoryLabel: "Business & Startups",
    badge: "Popular",
    date: "2026-12-02",
    time: "09:30 AM - 06:00 PM",
    isoDate: "2026-12-02T09:30:00",
    venue: "Executive Conference Pavilion, Management Tower",
    locationType: "Hybrid",
    price: "Free",
    isFree: true,
    featured: true,
    seatsTotal: 200,
    seatsFilled: 172,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Connect with angel investors, VC partners, and seasoned entrepreneurs. Discover product-market fit strategies and pitch on stage.",
    fullDescription: "VentureCraft 2026 unites ambitious student entrepreneurs and early-stage founders with active angel syndicates and venture capitalists. Features live pitch battles, term-sheet breakdown masterclasses, and actionable growth frameworks for 0-to-1 startups.",
    speakers: [
      { name: "Rohan Singhal", role: "Partner at Horizon Ventures", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
      { name: "Ananya Deshmukh", role: "3x Founder (Exited $40M), Angel Investor", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "09:30 AM", activity: "Breakfast & Welcome Address" },
      { time: "10:30 AM", activity: "Panel: Raising Capital in Modern Markets" },
      { time: "01:00 PM", activity: "Networking Luncheon" },
      { time: "02:30 PM", activity: "The FastPitch Showcase: 10 Finalist Pitches" },
      { time: "05:00 PM", activity: "Investment Announcements & Cocktails" }
    ],
    perks: ["₹10,00,000 Seed Pool Access", "Investor Contact Directory", "Mentorship Vouchers", "Legal Advisory Credits"]
  },
  {
    id: "web-dev-mastery-workshop",
    title: "Full-Stack Cloud & Next.js Architecture Masterclass",
    tagline: "Server components, edge computing, and performant APIs",
    category: "workshops",
    categoryLabel: "Workshops",
    badge: "Hands-on",
    date: "2026-11-18",
    time: "02:00 PM - 06:30 PM",
    isoDate: "2026-11-18T14:00:00",
    venue: "Computer Science Center, Lab 302",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: false,
    seatsTotal: 80,
    seatsFilled: 68,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A code-along masterclass building a production-ready cloud application with Next.js, TypeScript, and serverless databases.",
    fullDescription: "Join senior software engineers in a deep technical dive into modern web architecture. You will construct a real-time reactive collaborative web app from scratch, configure authentication, deploy to global edge networks, and optimize Lighthouse core web vitals for flawless performance.",
    speakers: [
      { name: "Vikram Nair", role: "Staff Engineer, Vercel Community Champion", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "02:00 PM", activity: "Environment Setup & Architecture Deep-Dive" },
      { time: "03:15 PM", activity: "Building Real-Time State & Edge Routes" },
      { time: "04:45 PM", activity: "Coffee Break & Code Debugging" },
      { time: "05:15 PM", activity: "Production Deployment & Performance Profiling" }
    ],
    perks: ["Source Code GitHub Repository", "Course Completion Certificate", "Cloud Hosting Credits ($100)", "Direct Q&A with Senior Engineers"]
  },
  {
    id: "cultural-rhythm-fest",
    title: "Echoes 2026: Inter-College Music & Cultural Gala",
    tagline: "Two nights of acoustic showcases, battle of bands, and art installations",
    category: "cultural",
    categoryLabel: "Cultural & Music",
    badge: "Exciting",
    date: "2026-12-10",
    time: "05:00 PM - 10:30 PM",
    isoDate: "2026-12-10T17:00:00",
    venue: "Open Air Amphitheatre, Cultural Quad",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: true,
    seatsTotal: 1000,
    seatsFilled: 812,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "The biggest celebration of sound, dance, and creative arts on campus featuring top independent artists and college bands.",
    fullDescription: "Echoes 2026 brings together dynamic musical acts, live beatboxing battles, choreography showcases, food trucks, and interactive digital art galleries. An unforgettable evening of rhythm, camaraderie, and celebration.",
    speakers: [
      { name: "The Velvet Odyssey", role: "Headlining Indie Rock Band", avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80" },
      { name: "Meera Krishnan", role: "Classical-Fusion Vocalist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "05:00 PM", activity: "Gates Open & Art Installation Walkthrough" },
      { time: "06:00 PM", activity: "Battle of the College Bands" },
      { time: "08:00 PM", activity: "Dance Troupe Championship" },
      { time: "09:00 PM", activity: "Celebrity Headliner Concert & Fireworks" }
    ],
    perks: ["Entry Pass to Concert", "Event Wristband & Glow Merchandise", "Food Court Discount Tokens", "Memorable Photo Booth Access"]
  },
  {
    id: "game-clash-esports",
    title: "Nexus Arena: Collegiate Esports Championship",
    tagline: "Valorant, EA FC, and Rocket League Showdown",
    category: "gaming",
    categoryLabel: "Gaming & Esports",
    badge: "Tournament",
    date: "2026-11-28",
    time: "11:00 AM - 08:00 PM",
    isoDate: "2026-11-28T11:00:00",
    venue: "Indoor Sports Complex & Esports Arena",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: false,
    seatsTotal: 250,
    seatsFilled: 210,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Compete in intense 5v5 tactical shooters and sports simulators with live shoutcasting, custom trophies, and gaming gears.",
    fullDescription: "Experience high-octane competitive gaming at Nexus Arena. Featuring high refresh-rate monitors, lag-free LAN setup, spectator bleachers, live Twitch streaming commentary, and prizes for top fraggers and champions.",
    speakers: [
      { name: "Aditya 'Ghost' Verma", role: "Professional Esports Caster", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "11:00 AM", activity: "Group Stage Knockouts" },
      { time: "02:30 PM", activity: "Quarter-Finals & Semis Broadcast" },
      { time: "05:00 PM", activity: "Grand Finals on Center Stage" },
      { time: "07:30 PM", activity: "Trophy Presentation & MVP Awards" }
    ],
    perks: ["Gaming Gear Prizes (Keyboards/Mice)", "Championship Trophy & Medals", "Official Stream Highlight Reel", "Energy Drinks Sponsor Pass"]
  },
  {
    id: "ai-robotics-expo",
    title: "RoboVerse: Autonomous Systems & IoT Expo",
    tagline: "Robotic combat, drone obstacle racing, and computer vision demos",
    category: "tech",
    categoryLabel: "Tech & AI",
    badge: "Innovative",
    date: "2026-12-05",
    time: "10:00 AM - 05:00 PM",
    isoDate: "2026-12-05T10:00:00",
    venue: "Robotics Arena, Mechanical Engineering Block",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: false,
    seatsTotal: 180,
    seatsFilled: 140,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Witness battle bots, micro-drone races, autonomous rovers, and cutting-edge industrial robotics prototypes.",
    fullDescription: "RoboVerse is a celebration of hardware engineering, mechatronics, and embedded software. Watch teams pit their custom combat robots against each other in the steel cage, navigate drone obstacle courses, and explore smart home IoT showcases.",
    speakers: [
      { name: "Dr. Arvind Chawla", role: "Director, Center for Autonomous Robotics", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "10:00 AM", activity: "Inaugural Drone Flight Demonstration" },
      { time: "11:30 AM", activity: "Combat Robot Elimination Rounds" },
      { time: "02:00 PM", activity: "Line Follower & Maze Solving Competitions" },
      { time: "04:00 PM", activity: "Drone Racing Finals & Award Ceremony" }
    ],
    perks: ["Robotics Hardware Kits for Winners", "Participation Certificates", "Hands-on Drone Simulator Access", "Networking with Hardware Labs"]
  },
  {
    id: "cybersecurity-redteam-workshop",
    title: "CyberShield: Ethical Hacking & Defense Boot Camp",
    tagline: "Capture The Flag (CTF), vulnerability assessment, and defense tactics",
    category: "workshops",
    categoryLabel: "Workshops",
    badge: "Certified",
    date: "2026-12-12",
    time: "01:00 PM - 06:00 PM",
    isoDate: "2026-12-12T13:00:00",
    venue: "Cyber Defense Simulation Lab 101",
    locationType: "In-Person",
    price: "Free",
    isFree: true,
    featured: false,
    seatsTotal: 90,
    seatsFilled: 75,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Learn hands-on penetration testing, web app security vulnerabilities (OWASP Top 10), and participate in a live CTF challenge.",
    fullDescription: "Equip yourself with practical cybersecurity defense skills. Instructors will guide you through Kali Linux security tools, privilege escalation detection, API exploitation mitigation, and defensive blue-team log monitoring. Concludes with a 2-hour competitive jeopardy-style CTF.",
    speakers: [
      { name: "Kavita Rao", role: "Lead Pen-Tester & Bug Bounty Hunter", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80" }
    ],
    schedule: [
      { time: "01:00 PM", activity: "Security Fundamentals & Threat Landscape" },
      { time: "02:15 PM", activity: "Hands-on: Exploiting & Fixing OWASP Top 10" },
      { time: "04:00 PM", activity: "Live CTF Flag Hunting Challenge" },
      { time: "05:30 PM", activity: "Solutions Walkthrough & Security Certifications Guide" }
    ],
    perks: ["Ethical Hacking Course Certificate", "CTF Leaderboard Medals", "Curated Security Tooling Cheat-Sheets", "Bug Bounty Platform Credits"]
  }
];

const CATEGORIES = [
  { id: "all", label: "All Events", icon: "sparkles" },
  { id: "tech", label: "Tech & AI", icon: "cpu" },
  { id: "design", label: "Design & UI/UX", icon: "layout" },
  { id: "business", label: "Business & Startups", icon: "trending-up" },
  { id: "workshops", label: "Workshops", icon: "book-open" },
  { id: "cultural", label: "Cultural & Music", icon: "music" },
  { id: "gaming", label: "Gaming & Esports", icon: "gamepad-2" }
];
