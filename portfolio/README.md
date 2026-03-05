# 🌿 Forest Portfolio

A **premium, cinematic personal portfolio website** with a dark mystical forest aesthetic, glowing firefly particles, glassmorphism panels, and smooth Lenis scrolling.

## ✨ Features

- 🎆 Canvas-based firefly / bioluminescent particle system
- 🌿 Enchanted forest hero with AI-generated background
- 🖱️ Custom glowing cursor with trailing ring
- 🌊 Lenis smooth scrolling (cinematic 1.4s easing)
- 🧊 Glassmorphism panels across all sections
- 📱 Fully responsive (mobile hamburger menu)
- ✨ Scroll-triggered reveal animations
- 📊 Animated number counters on first view
- 🧠 All content editable from **one JSON file**

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── hero-forest.png         # Hero background image
│   └── visionary-tree.png      # About section image
├── src/
│   ├── app/
│   │   ├── globals.css         # Design system, CSS vars, animations
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   └── page.tsx            # Main page (composes all sections)
│   ├── components/
│   │   ├── CustomCursor.tsx    # Glowing cursor + ring
│   │   ├── SmoothScroll.tsx    # Lenis wrapper
│   │   ├── Navbar.tsx          # Glass nav with contact button
│   │   ├── HeroSection.tsx     # Canvas particles + parallax
│   │   ├── AboutSection.tsx    # Visionary editorial layout
│   │   ├── ProjectsSection.tsx # Glass project cards
│   │   ├── SkillsSection.tsx   # Animated bars + floating chips
│   │   └── ContactSection.tsx  # Form + social links
│   └── content.json            # ← ALL PERSONAL CONTENT HERE
```

## 🛠️ How to Run Locally

```bash
cd d:\MyProtfolio\portfolio
npm run dev
```

Then open **http://localhost:3000**

## ✏️ How to Edit Your Content

Open `src/content.json` and edit any field:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your tagline...",
    "location": "Your City",
    "bio": "Your bio paragraph..."
  },
  "stats": [...],
  "socials": [...],
  "projects": [...],
  "skills": [...],
  "collaborations": [...]
}
```

**No component code needs to change** — everything reads from this file.

## 🚀 Deploy to Vercel

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**
3. Import your GitHub repo
4. Leave all defaults as-is (Next.js is auto-detected)
5. Click **Deploy**

## 🌐 Deploy to Netlify

1. Push your project to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `.next`
5. Click Deploy

## 🔧 Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 15** | React framework + SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility classes |
| **Lenis** | Smooth scrolling |
| **Canvas API** | Firefly particle system |
| **CSS Animations** | Float, pulse-glow, shimmer effects |
| **IntersectionObserver** | Scroll-triggered reveals |
