// Portfolio videos — unlisted on YouTube, embedded via lazy facade.
// `orientation` drives layout: 'landscape' (16:9 featured) vs 'short' (9:16 reel).
export const featured = [
  {
    id: 'zE8tcOzvUko',
    title: 'Awqaf — Brand Film',
    category: 'Brand Film',
    blurb: 'Full-length brand film for Awqaf — narrative edit, color grade, and sound design.',
    orientation: 'landscape',
  },
]

export const shorts = [
  {
    id: 'EQCEuWGS5AE',
    title: "Adam — Spending Habits",
    category: 'Social / Finance',
    orientation: 'short',
  },
  {
    id: 'yjNGajmiMPk',
    title: 'World Cup — AI Spot',
    category: 'AI / Sports',
    orientation: 'short',
  },
  {
    id: '8rNTPMSJJKQ',
    title: 'KAIF — The Simulator',
    category: 'AI / Concept',
    orientation: 'short',
  },
  {
    id: 'mFfwCA9Akys',
    title: 'Yabi — Mobile App Ad',
    category: 'App / Ad',
    orientation: 'short',
  },
  {
    id: 'SdEKVNDbyh4',
    title: 'Awqaf — Social Cut',
    category: 'Social',
    orientation: 'short',
  },
  {
    id: 'o1yWqTGhEPw',
    title: 'Social Media Reel',
    category: 'Social',
    orientation: 'short',
  },
]

export const allVideos = [...featured, ...shorts]

// hqdefault always exists (even for shorts); maxres is not guaranteed.
export const thumbUrl = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
export const embedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
