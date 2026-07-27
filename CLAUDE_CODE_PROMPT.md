# Claude Code Build Prompt — 4 New Portfolio Features
# Stack: React + Vite + Framer Motion + Tailwind v4
# Existing palette: navy/indigo/violet/purple/pink on near-black backgrounds
# All new components must match the existing design system in src/index.css

---

## CONTEXT

This is a portfolio for Muhammed Jamal — a Video Editor and AI Visual Specialist.
The existing app (src/App.jsx) renders these sections in order:
Hero → ScrollScrub → About → Projects → Skills → Experience → Certifications → Contact

We are adding 4 new features. Do NOT modify any existing section logic unless specifically told to. Just add new files and update App.jsx imports/order where specified.

---

## FEATURE 1 — HERO VIDEO BACKGROUND

### What to build:
Modify src/sections/Hero.jsx to add a muted autoplay looping video as the background layer of the hero section. The video should sit behind all existing content (particles, glows, text).

### Exact behavior:
- Add a `<video>` element as the very first child inside the `<section>` tag, before `<motion.div style={{ scale: bgScale }}>`.
- The video must have: `autoPlay`, `muted`, `loop`, `playsInline` attributes.
- It must be absolutely positioned to fill the section: `position: absolute, inset: 0, width: 100%, height: 100%, objectFit: cover`.
- z-index: 0. Everything else in the section stays above it.
- Add a dark overlay `<div>` directly after the video with `position: absolute, inset: 0, background: rgba(4,4,12,0.72), z-index: 1`. This keeps text readable.
- All existing content (particles, glows, motion.div with text) should have `position: relative, z-index: 2` or higher — check the existing z-index values and adjust so nothing is hidden under the overlay.
- The `<video>` src should point to `/showreel-loop.mp4` — a file the user will drop into the `public/` folder. If the file does not exist the section still renders normally (the gradient backgrounds from `.hero-bg` CSS class will show as fallback).
- Add a subtle `<video>` CSS rule: `opacity: 0.55` so the video does not overpower the text.

### Do NOT change:
- The SplitName animation, role cycler, stats grid, CTA buttons, particle system, ambient glows, scroll indicator. All existing logic stays identical.

---

## FEATURE 2 — BEFORE / AFTER SLIDER SECTION

### What to build:
Create a new file: `src/sections/BeforeAfter.jsx`
Add it to App.jsx between ScrollScrub and About.

### Visual layout:
- Full section, min-height: 100vh, background: `#04040c`.
- Centered content, max-width 5xl.
- Section label at top: "The Craft" (use the existing `SectionLabel` component from `./About`).
- Headline below: `"Raw footage. → Finished film."` — large, bold, Montserrat, white.
- Sub-label below headline in slate-400: `"Drag the handle to see the difference."`
- The main interactive element is a side-by-side comparison slider — full width, aspect ratio 16/9, max-width 900px, centered.

### Slider behavior:
- Two layers stacked: a "before" layer (left, full width) and an "after" layer (right, clipped).
- The "after" layer uses CSS `clip-path: inset(0 ${100 - sliderPos}% 0 0)` where `sliderPos` is a state value from 0 to 100, defaulting to 50.
- A draggable vertical divider line sits at the `sliderPos` percentage position horizontally.
- The divider: a 2px wide vertical line, full height of the container, color `#818cf8`, with a circular drag handle in the center — 48px diameter circle, background `rgba(129,140,248,0.15)`, border `2px solid #818cf8`, backdrop-filter blur(8px), contains a `⇔` or two arrows icon (use lucide-react `ChevronsLeftRight` icon, size 18, color `#818cf8`).
- The divider is draggable via `onMouseDown` / `onMouseMove` / `onMouseUp` and `onTouchStart` / `onTouchMove` / `onTouchEnd`. Calculate `sliderPos` from the pointer X position relative to the container width.
- Use a `useRef` on the container div to calculate bounds.
- Smooth the position update with `useState` — no spring needed, direct position is fine.
- Label "BEFORE" appears in the top-left of the container: small, uppercase, letter-spacing wide, color rgba(255,255,255,0.5), font-size 11px, position absolute, top 16px, left 16px, z-index 10.
- Label "AFTER" appears in the top-right: same style, top 16px, right 16px.
- The "before" side has a subtle cool desaturated color grade feel: apply CSS `filter: saturate(0.35) brightness(0.85)` to the before layer.
- The "after" side is full color, slightly warmer: apply CSS `filter: saturate(1.1) brightness(1.02)`.

### Media:
- Before layer: `<video src="/before-clip.mp4" autoPlay muted loop playsInline />` — fills the container, objectFit cover. Falls back gracefully if file missing (show a dark gradient placeholder div).
- After layer: same video file but `/after-clip.mp4`. If file missing, use a gradient placeholder.
- Placeholder for missing video: a `<div>` with background matching the existing section gradients and centered text "[ Your footage here ]" in slate-600.

### Entry animation:
- The headline and slider animate in with `whileInView`, `initial={{ opacity: 0, y: 40 }}`, `animate={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, standard easing `[0.22, 1, 0.36, 1]`.

### Below the slider:
- Three small stat chips in a row, centered, with gap-6:
  - `"Pacing"` with value `"Psychology-driven"`
  - `"Color"` with value `"Emotion-first"`  
  - `"Result"` with value `"Retention maximized"`
- Each chip: dark glass card, small, rounded-full, px-5 py-2, border border-white/8, flex row with a tiny dot accent color (violet) + label in slate-500 uppercase tracking-wide text-xs + value in white text-sm font-semibold.

---

## FEATURE 3 — THE PIPELINE (Interactive AI Workflow Diagram)

### What to build:
Create a new file: `src/sections/Pipeline.jsx`
Add it to App.jsx after the Skills section.

### Concept:
An animated, interactive node diagram showing Jamal's AI production pipeline. Nodes are connected by animated lines. Clicking/hovering a node expands its detail panel.

### Section layout:
- Background: `#05050d`, py-36, px-6.
- SectionLabel: `"How It Works"`
- Headline: `"The AI Pipeline"` — large, Montserrat, font-black, white with `"Pipeline"` using the `.shimmer-text` class.
- Sub-copy below: `"From brief to finished content — every tool, every step."` in slate-400.
- The diagram sits below the headline, max-width 900px, centered, mt-16.

### Nodes — define as an array:
```
const nodes = [
  {
    id: 'brief',
    label: 'Client Brief',
    sublabel: 'Goal & audience',
    icon: 'FileText',  // lucide-react
    color: '#818cf8',
    rgb: '129,140,248',
    detail: 'Every project starts with understanding the brand, audience psychology, and platform. This defines every creative decision downstream.',
    x: 0,   // relative grid position (0-4 left to right)
    y: 0,
  },
  {
    id: 'ai-visual',
    label: 'AI Visual Gen',
    sublabel: 'ComfyUI · Freepik',
    icon: 'Cpu',
    color: '#c084fc',
    rgb: '192,132,252',
    detail: 'Character-consistent AI scenes generated via ComfyUI node workflows and Freepik Spaces. No re-casting. No reshooting. Infinite variations.',
    x: 1,
    y: 0,
  },
  {
    id: 'voice',
    label: 'Voice & Sync',
    sublabel: 'ElevenLabs · HeyGen',
    icon: 'Mic2',
    color: '#f472b6',
    rgb: '244,114,182',
    detail: 'Arabic and English VO generated via ElevenLabs, then lip-synced to AI characters via HeyGen. Multilingual content at a fraction of dubbing cost.',
    x: 2,
    y: 0,
  },
  {
    id: 'edit',
    label: 'Post-Production',
    sublabel: 'Premiere · After Effects',
    icon: 'Film',
    color: '#67e8f9',
    rgb: '103,232,249',
    detail: 'All AI assets are brought into Premiere Pro and After Effects. Color grading, sound design, motion graphics, pacing — the craft layer that makes it feel real.',
    x: 3,
    y: 0,
  },
  {
    id: 'output',
    label: 'Final Output',
    sublabel: 'Multi-format delivery',
    icon: 'Sparkles',
    color: '#4ade80',
    rgb: '74,222,128',
    detail: 'Delivered in every format: 9:16 Reels, 1:1 Feed, 16:9 YouTube pre-roll. Platform-native, retention-optimized, ready to run.',
    x: 4,
    y: 0,
  },
]
```

### Connections — edges between nodes (left to right, each connects to next):
- brief → ai-visual
- ai-visual → voice
- voice → edit
- edit → output

### Visual rendering:
- Render the nodes in a horizontal row on desktop (flex row, gap between nodes).
- On mobile: vertical column (flex-col).
- Each node is a card: roughly 140px wide, auto height. Rounded-2xl. Background: `rgba(rgb, 0.08)`. Border: `1px solid rgba(rgb, 0.2)`. Padding: p-4. Centered content.
  - Inside: icon at top (28px, color = node.color), then label (text-sm font-bold text-white mt-2), then sublabel (text-xs text-slate-500 mt-1).
  - On hover: border brightens to `rgba(rgb, 0.45)`, background to `rgba(rgb, 0.14)`. Scale 1.06. transition 0.3s.
  - Active (clicked): same hover styles but persistent, plus a glow `boxShadow: 0 0 24px rgba(rgb, 0.3)`.
- Between each pair of nodes: an animated SVG connector line.
  - Use an `<svg>` absolutely positioned overlay, or render inline SVG between nodes.
  - The line: a horizontal `<line>` or `<path>` from center-right of one node to center-left of the next.
  - Animate with `strokeDasharray` and `strokeDashoffset` — particles flowing left to right along the line. Use a CSS animation or Framer Motion.
  - Line color: gradient from left node color to right node color.
  - Line thickness: 1.5px.
  - Animated dash: a short bright segment (length ~30px) traveling along the line, looping every 1.5s. Stagger start delay between each connection.

### Detail panel:
- Below the node row, a detail panel fades in when a node is active (clicked or hovered on desktop).
- Default state: `activeNode = nodes[0]` (shows brief by default).
- Panel: max-width 560px, centered, mt-12, rounded-2xl, glass background, border matching active node color, p-6.
- Inside: colored dot + node label in node.color + detail text in slate-400 text-base leading-relaxed.
- Animate panel content with `AnimatePresence` + `key={activeNode.id}` + `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}`.

### Section entry:
- Headline animates in with whileInView.
- Nodes stagger in: each node `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, delay: `i * 0.1`.

---

## FEATURE 4 — SERVICE SELECTOR

### What to build:
Create a new file: `src/sections/Services.jsx`
Add it to App.jsx between Skills and Experience.

### Concept:
An interactive section where the visitor selects what type of content they need. The right panel updates to show relevant info — turning passive browsing into active engagement.

### Layout:
- Background: `#060610`, py-36, px-6.
- SectionLabel: `"What I Can Build For You"`
- Headline: `"Pick your"` + line break + `"content type."` — Montserrat, font-black, white, large (clamp 36px to 64px).
- Body text below headline: `"Each service is AI-enhanced, psychology-informed, and delivered fast."` in slate-400.

### Two-column layout (desktop), stacked (mobile):
- Left column (roughly 40% width): vertical list of 6 service options — clickable items.
- Right column (roughly 60% width): detail panel that updates based on selected service.

### Service options data:
```
const services = [
  {
    id: 'ugc',
    number: '01',
    title: 'AI UGC Creator Pack',
    tagline: 'Authentic creators. Zero casting.',
    color: '#a78bfa',
    rgb: '167,139,250',
    description: 'Multiple AI-generated UGC creators — male, female, Arabic and Western — reviewing your product in authentic short-form videos. Character-consistent across 10, 20, 100 videos.',
    deliverables: ['3 AI creator characters', '4 scenes per creator', 'Arabic + English versions', '9:16 optimized'],
    timeline: '3-5 days',
    ideal: 'E-commerce · Skincare · Tech · Food & Beverage',
  },
  {
    id: 'hero',
    number: '02',
    title: 'Cinematic Product Hero',
    tagline: 'Agency visuals. No agency budget.',
    color: '#f472b6',
    rgb: '244,114,182',
    description: '30-45 second luxury product commercial. AI-generated cinematography — macro shots, lifestyle scenes, skin texture close-ups. Edited with color grade, sound design, and music.',
    deliverables: ['7 cinematic shots', '30-45s final cut', 'Color graded', '16:9 + 1:1 formats'],
    timeline: '5-7 days',
    ideal: 'Perfume · Skincare · Luxury Goods · Supplements',
  },
  {
    id: 'before-after',
    number: '03',
    title: 'Before / After Ad',
    tagline: 'The psychology of transformation.',
    color: '#67e8f9',
    rgb: '103,232,249',
    description: 'Problem-to-solution storytelling. AI-generated visuals for both states — the heavy, relatable "before" and the warm, aspirational "after." No filming required.',
    deliverables: ['5 scene storyboard', 'Full edit + grade', 'Cold-to-warm color arc', 'Platform-ready'],
    timeline: '3-4 days',
    ideal: 'Health & Wellness · Productivity · Home · Beauty',
  },
  {
    id: 'spokesperson',
    number: '04',
    title: 'Brand Spokesperson',
    tagline: 'Your virtual brand face. Always available.',
    color: '#4ade80',
    rgb: '74,222,128',
    description: 'A consistent AI brand ambassador — same face, multiple videos, Arabic and English. Testimonials, product holds, brand intros. Voiced via ElevenLabs, lip-synced via HeyGen.',
    deliverables: ['Character reference locked', '3-4 video formats', 'Arabic + English VO', 'Unlimited future videos'],
    timeline: '5-7 days',
    ideal: 'Fintech · Real Estate · E-commerce · Coaching',
  },
  {
    id: 'multiformat',
    number: '05',
    title: 'Multi-Format Social Pack',
    tagline: 'One campaign. Every platform.',
    color: '#fbbf24',
    rgb: '251,191,36',
    description: 'One creative concept adapted for 9:16 Reels, 1:1 feed posts, and 16:9 YouTube pre-roll. Consistent brand look, platform-native compositions. Built for content systems, not one-offs.',
    deliverables: ['3 formats per concept', 'Consistent grade', 'Platform-spec sizing', 'Reels-optimized pacing'],
    timeline: '2-3 days',
    ideal: 'Any brand running paid social + organic content',
  },
  {
    id: 'broll',
    number: '06',
    title: 'Generative B-Roll Library',
    tagline: 'Replace $5k/day shoots with AI.',
    color: '#fb923c',
    rgb: '251,146,60',
    description: '15-20 cinematic AI-generated B-roll shots — urban architecture, product close-ups, lifestyle silhouettes, skin and texture macros. Edited into a 90-second showreel with your color grade.',
    deliverables: ['15-20 AI shots', 'Color graded', '90s showreel edit', 'Raw files included'],
    timeline: '4-5 days',
    ideal: 'Any brand needing visual variety without a shoot day',
  },
]
```

### Left column — service list:
- Each item: a row with number (font-mono text-xs, slate-600) + title (text-sm font-bold text-white) + tagline (text-xs slate-500) — stacked vertically in the title+tagline part.
- When selected: left border highlight (3px solid in node.color), background `rgba(rgb, 0.06)`, title color changes to node.color. 
- Transition: all 0.25s ease.
- Entire row is clickable, py-4 px-5, rounded-xl.
- A small animated right-arrow icon (`ChevronRight` from lucide) appears on hover/active at the far right of the row.
- Default selected: first item (ugc).

### Right column — detail panel:
- Animated with `AnimatePresence` + `key={selected.id}`. Exit: `opacity: 0, x: 20`. Enter: `opacity: 0, x: 20` → `opacity: 1, x: 0`. Duration 0.35s.
- Content from top to bottom:
  1. A colored number badge: `selected.number` in large font (clamp 80px-120px), font-black Montserrat, color `rgba(rgb, 0.08)` — faded watermark style, absolute positioned top-right of the panel.
  2. Small colored dot + `selected.id.toUpperCase()` label in selected.color, text-xs tracking-widest.
  3. `selected.title` — text-2xl md:text-3xl font-black text-white Montserrat, mt-2.
  4. `selected.tagline` — text-base text-slate-400 italic, mt-1.
  5. `selected.description` — text-slate-400 text-sm leading-relaxed, mt-4, max-width 46ch.
  6. Deliverables list — mt-6, label "WHAT YOU GET" in selected.color text-xs tracking-widest. Then 4 items in a 2-column grid, each a small chip: `px-3 py-1.5 rounded-lg bg-black/30 border border-white/8 text-slate-300 text-xs flex items-center gap-1.5` with a small check icon in selected.color.
  7. Two data chips in a row — mt-4:
     - `"Timeline"` + `selected.timeline` 
     - `"Ideal for"` + `selected.ideal`
     - Each chip: `glass border border-white/8 rounded-xl px-4 py-3 text-xs`. Label in slate-500 uppercase tracking-wide. Value in slate-200 font-semibold mt-0.5.
  8. A CTA button at the bottom: `"Let's discuss this →"` — links to `#contact`, styled as a rounded-full button in selected.color background (use `rgba(rgb, 0.15)` background + border `1px solid rgba(rgb, 0.4)` + text in selected.color), font-bold text-sm, px-6 py-3, mt-8. On hover: background `rgba(rgb, 0.25)`.

### Overall panel:
- Right column has a subtle rounded-2xl card container: `glass border border-white/6 rounded-2xl p-8 relative overflow-hidden`.
- A subtle radial glow in the top-right corner of the card: `radial-gradient(ellipse 60% 50% at 95% 5%, rgba(rgb, 0.12) 0%, transparent 60%)` — updates with selected color.

---

## App.jsx UPDATE

Update the section order in App.jsx to:

```jsx
<Hero />
<ScrollScrub />
<StickyFeatures />   {/* already exists in src/sections/StickyFeatures.jsx, just wasn't imported */}
<About />
<BeforeAfter />      {/* NEW */}
<Projects />
<Pipeline />         {/* NEW */}
<Skills />
<Services />         {/* NEW */}
<Experience />
<Certifications />
<Contact />
```

Import all new components. Import StickyFeatures from `./sections/StickyFeatures`.

Also add nav links for the new sections. In src/components/Nav.jsx, update the links array to include:
- `{ href: '#services', label: 'Services' }` — add between Skills and Experience.
- Keep all existing links, just insert this one.
Add `id="services"` to the Services section's outer `<section>` element.
Add `id="pipeline"` to the Pipeline section's outer `<section>` element.
The BeforeAfter section does not need a nav link.

---

## DESIGN RULES (match existing system exactly)

- Font: Montserrat for headings (font-family already set in index.css h1/h2/h3), Inter for body.
- All section backgrounds use the existing near-black range: `#030308` to `#07070f`.
- Use existing CSS classes: `.glass`, `.label`, `.shimmer-text`, `.grain` (do not redefine them).
- Use the existing `SectionLabel` component exported from `src/sections/About.jsx` for all section labels.
- Use `CardSpotlight` from `src/components/CardSpotlight.jsx` on interactive cards where appropriate.
- All whileInView animations: `viewport={{ once: true }}`, ease `[0.22, 1, 0.36, 1]`.
- All hover transitions: duration 0.3s.
- No new npm packages. Use only what's already installed: framer-motion, lucide-react, react.
