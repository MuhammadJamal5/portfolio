// Portfolio videos — supports YouTube unlisted videos & Google Drive files.
// `orientation` drives layout: 'landscape' (16:9 featured) vs 'short' (9:16 reel).
// `provider`: 'youtube' (default) | 'drive'

export const featured = [
  {
    id: 'LS0lPuzL5h4',
    title: 'SaaS & Tech Product Demo',
    category: 'SaaS & Tech',
    orientation: 'landscape',
  },
  {
    id: 'zE8tcOzvUko',
    title: 'Brand Showcase',
    category: 'Commercial',
    blurb: 'Narrative edit, color grade, and sound design.',
    orientation: 'landscape',
  },
]

export const shorts = [
  {
    id: 'HbhVcYkjees',
    title: 'Bath & Body Works — Product Video (Spec)',
    category: 'Commercial / Ad',
    orientation: 'short',
  },
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
    id: 'o1yWqTGhEPw',
    title: 'Social Media Reel',
    category: 'Social',
    orientation: 'short',
  },
]

export const allVideos = [...featured, ...shorts]

export const thumbUrl = (videoInput) => {
  if (!videoInput) return ''
  if (typeof videoInput === 'object') {
    if (videoInput.provider === 'drive') {
      return `https://lh3.googleusercontent.com/d/${videoInput.id}`
    }
    return `https://img.youtube.com/vi/${videoInput.id}/hqdefault.jpg`
  }
  // String ID fallback
  return `https://img.youtube.com/vi/${videoInput}/hqdefault.jpg`
}

export const embedUrl = (videoInput) => {
  if (!videoInput) return ''
  if (typeof videoInput === 'object') {
    if (videoInput.provider === 'drive') {
      return `https://drive.google.com/file/d/${videoInput.id}/preview`
    }
    return `https://www.youtube-nocookie.com/embed/${videoInput.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  }
  return `https://www.youtube-nocookie.com/embed/${videoInput}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
}
