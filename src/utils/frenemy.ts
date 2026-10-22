// The six Allies player colors, shared with the thumbnail templates.
export const FRENEMY_COLORS = {
  red: '#D9534F',
  blue: '#4C8BD8',
  gold: '#D9B24C',
  green: '#8DB255',
  teal: '#2BA39B',
  purple: '#9C67C9',
} as const;

export type FrenemyColor = keyof typeof FRENEMY_COLORS;

// YouTube's 16:9 copies of the uploaded thumbnail.
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const youtubeThumbFallback = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
