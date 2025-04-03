import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


//funcion que pasas de una fecha a tiempo relativo (hace x tiempo)
// utils/formatDate.js
const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

const validUnits = new Set(['year', 'month', 'week', 'day', 'hour', 'minute', 'second']);

export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 }
  ];
  
  for (const { unit, seconds: secondsInUnit } of intervals) {
    if (!validUnits.has(unit)) continue;
    
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return formatter.format(-interval, unit);
    }
  }
  
  return 'justo ahora';
};