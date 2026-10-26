// MUTAGEN display preferences for the live liquid (MUT-21): "Still liquid" shows one still frame instead of motion, and
// "Softer green" lowers the green's brightness and saturation only. The liquid reads them from <html data-motion> and
// <html data-green>; they are saved with the device settings.
import { loadSettings } from '../data/store.js';

export function applyLiquidPrefs(settings = loadSettings()) {
  const root = document.documentElement;
  if (settings.stillLiquid) root.dataset.motion = 'reduced'; else delete root.dataset.motion;
  if (settings.softGreen) root.dataset.green = 'reduced'; else delete root.dataset.green;
}
