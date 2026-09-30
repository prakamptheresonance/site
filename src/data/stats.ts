export interface StatItem {
  value: string
  label: string
}

export const HERO_STATS: readonly StatItem[] = [
  { value: '11+', label: 'Musical Genres' },
  { value: 'Live', label: 'Orchestra & Vocals' },
  { value: 'Versatile', label: 'Every Occasion' },
  { value: 'Tripura', label: 'Pan-India Shows' },
] as const

export function getHeroStats(genreCount?: number): StatItem[] {
  const genreValue = genreCount && genreCount > 0 ? `${genreCount}+` : '11+'
  return [
    { value: genreValue, label: 'Musical Genres' },
    { value: 'Live', label: 'Orchestra & Vocals' },
    { value: 'Versatile', label: 'Every Occasion' },
    { value: 'Tripura', label: 'Pan-India Shows' },
  ]
}
