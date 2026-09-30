export interface AccentPreset {
  label: string
  value: string
  gradientClass: string
  previewColors: [string, string]
}

export const ACCENT_PRESETS: AccentPreset[] = [
  {
    label: 'Amber Glow',
    value: 'from-amber-500/20 to-amber-700/10',
    gradientClass: 'from-amber-500 to-amber-700',
    previewColors: ['#f59e0b', '#b45309'],
  },
  {
    label: 'Warm Sunset',
    value: 'from-orange-500/20 to-amber-700/10',
    gradientClass: 'from-orange-500 to-amber-700',
    previewColors: ['#f97316', '#b45309'],
  },
  {
    label: 'Emerald Mystique',
    value: 'from-emerald-500/20 to-teal-700/10',
    gradientClass: 'from-emerald-500 to-teal-700',
    previewColors: ['#10b981', '#0f766e'],
  },
  {
    label: 'Golden Retro',
    value: 'from-yellow-500/20 to-amber-600/10',
    gradientClass: 'from-yellow-500 to-amber-600',
    previewColors: ['#eab308', '#d97706'],
  },
  {
    label: 'Royal Purple',
    value: 'from-purple-500/20 to-indigo-700/10',
    gradientClass: 'from-purple-500 to-indigo-700',
    previewColors: ['#a855f7', '#4338ca'],
  },
  {
    label: 'Cyan Twilight',
    value: 'from-blue-500/20 to-cyan-700/10',
    gradientClass: 'from-blue-500 to-cyan-700',
    previewColors: ['#3b82f6', '#0e7490'],
  },
  {
    label: 'Rustic Folk',
    value: 'from-amber-600/20 to-red-700/10',
    gradientClass: 'from-amber-600 to-red-700',
    previewColors: ['#d97706', '#b91c1c'],
  },
  {
    label: 'Rose Melody',
    value: 'from-rose-500/20 to-pink-700/10',
    gradientClass: 'from-rose-500 to-pink-700',
    previewColors: ['#f43f5e', '#be185d'],
  },
  {
    label: 'Brass Gold',
    value: 'from-amber-400/25 to-yellow-600/10',
    gradientClass: 'from-amber-400 to-yellow-600',
    previewColors: ['#fbbf24', '#ca8a04'],
  },
  {
    label: 'Soulful Pink',
    value: 'from-pink-500/20 to-rose-700/10',
    gradientClass: 'from-pink-500 to-rose-700',
    previewColors: ['#ec4899', '#e11d48'],
  },
  {
    label: 'Stage Fire',
    value: 'from-red-500/25 to-amber-600/10',
    gradientClass: 'from-red-500 to-amber-600',
    previewColors: ['#ef4444', '#d97706'],
  },
  {
    label: 'Deep Violet',
    value: 'from-violet-500/20 to-purple-800/10',
    gradientClass: 'from-violet-500 to-purple-800',
    previewColors: ['#8b5cf6', '#6b21a8'],
  },
  {
    label: 'Teal Symphony',
    value: 'from-teal-500/20 to-cyan-800/10',
    gradientClass: 'from-teal-500 to-cyan-800',
    previewColors: ['#14b8a6', '#155e75'],
  },
]
