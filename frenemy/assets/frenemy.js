// Shared pieces for the Building a Frenemy templates.
// Colors are the six Allies player colors. Faces are drawn in a -100..100 box.

const FRENEMY_COLORS = {
  red: '#D9534F',
  blue: '#4C8BD8',
  gold: '#D9B24C',
  green: '#8DB255',
  teal: '#2BA39B',
  purple: '#9C67C9',
  discord: '#5865F2'
};

const INK = '#141014';

// Each face matches an AI behavior being worked on that episode.
const FRENEMY_FACES = {
  neutral:
    `<circle cx="-30" cy="-8" r="14" fill="${INK}"/><circle cx="30" cy="-8" r="14" fill="${INK}"/>
     <path d="M-28,36 L28,36" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
  aggressive:
    `<circle cx="-30" cy="-6" r="14" fill="${INK}"/><circle cx="30" cy="-6" r="14" fill="${INK}"/>
     <path d="M-58,-40 L-14,-24 M58,-40 L14,-24 M-36,40 L-24,28 L-12,40 L0,28 L12,40 L24,28 L36,40" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  grudge:
    `<path d="M-46,-8 A16,16 0 0 0 -14,-8 Z M14,-8 A16,16 0 0 0 46,-8 Z" fill="${INK}"/>
     <path d="M-50,-30 L-12,-18 M50,-30 L12,-18 M-34,46 Q0,22 34,46" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  friendly:
    `<circle cx="-56" cy="22" r="11" fill="#ffffff" opacity="0.35"/><circle cx="56" cy="22" r="11" fill="#ffffff" opacity="0.35"/>
     <path d="M-46,-4 Q-30,-24 -14,-4 M14,-4 Q30,-24 46,-4 M-38,24 Q0,64 38,24" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  calculating:
    `<circle cx="-30" cy="-6" r="12" fill="${INK}"/><circle cx="30" cy="-6" r="12" fill="${INK}"/>
     <path d="M-48,-34 L-14,-32 M14,-46 Q30,-58 48,-44 M-26,40 L26,34" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  defensive:
    `<circle cx="-30" cy="-4" r="12" fill="${INK}"/><circle cx="30" cy="-4" r="12" fill="${INK}"/>
     <path d="M-48,-26 L-14,-38 M14,-38 L48,-26 M-32,40 Q-16,30 0,40 Q16,50 32,40" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  greedy:
    `<circle cx="-30" cy="-10" r="15" fill="${INK}"/><circle cx="30" cy="-10" r="15" fill="${INK}"/>
     <circle cx="-25" cy="-15" r="5" fill="#ffffff"/><circle cx="35" cy="-15" r="5" fill="#ffffff"/>
     <path d="M-46,-38 Q-30,-48 -14,-38 M14,-38 Q30,-48 46,-38" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
     <path d="M-42,20 Q0,72 42,20 Z" fill="#ffffff" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`
};

function frenemyColor(value, fallback) {
  if (!value) return fallback;
  return FRENEMY_COLORS[value.toLowerCase()] || value; // a name or any CSS color
}

// The mascot: a map-style troop badge with a face.
function mascotSVG(color, face, size) {
  const features = FRENEMY_FACES[face] || FRENEMY_FACES.neutral;
  return `<svg viewBox="-100 -100 200 200" width="${size}" height="${size}" role="img" aria-label="${face} mascot face">
    <rect x="-90" y="-90" width="180" height="180" rx="34" fill="${color}" stroke="${INK}" stroke-width="8"/>
    <rect x="-77" y="-77" width="154" height="154" rx="26" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.85"/>
    ${features}
  </svg>`;
}

// Read ?game=7&title=Added|Grudges&a=purple&b=gold&face=grudge&tilt=-12
// A "|" in title or status forces a line break.
function frenemyParams(defaults) {
  const q = new URLSearchParams(location.search);
  const get = (k) => (q.has(k) ? q.get(k) : defaults[k]);
  return {
    game: get('game'),
    title: get('title'),
    status: get('status'),
    a: frenemyColor(get('a'), FRENEMY_COLORS.purple),
    b: frenemyColor(get('b'), FRENEMY_COLORS.gold),
    face: get('face'),
    tilt: Number(get('tilt')) || 0
  };
}

function frenemyLines(text) {
  const span = document.createElement('span');
  return (text || '').split('|').map((line) => {
    span.textContent = line;
    return span.innerHTML;
  }).join('<br>');
}
