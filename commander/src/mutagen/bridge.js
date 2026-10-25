// MUTAGEN bridge: the link between the game side (this app) and Deck Mutator (../deck/).
// Deck Mutator owns every deck. This side only reads them, as plain-text lists for player setup,
// and never writes Deck Mutator's storage.

const DECK_MUTATOR_URL = '../deck/';
const RETURN_KEY = 'mutagen.return';     // sessionStorage: where to come back to from Deck Mutator
const MUTATOR_PROFILE_KEY = 'dc.profile'; // Deck Mutator's saved profile (its decks live here)

/** Leave for Deck Mutator. `back` is the screen to reopen on return: { screen, params }. */
export function openDeckMutator(back = { screen: 'landing', params: {} }) {
  try { sessionStorage.setItem(RETURN_KEY, JSON.stringify(back)); } catch { /* storage unavailable: return lands on the home screen */ }
  location.href = DECK_MUTATOR_URL;
}

/** The screen to reopen after coming back from Deck Mutator, once; null when there is none. */
export function takeReturn() {
  try {
    const text = sessionStorage.getItem(RETURN_KEY);
    sessionStorage.removeItem(RETURN_KEY);
    const back = text ? JSON.parse(text) : null;
    return back && typeof back.screen === 'string' ? { screen: back.screen, params: back.params || {} } : null;
  } catch {
    return null;
  }
}

function mutatorProfile(storage) {
  try {
    const profile = JSON.parse(storage?.getItem?.(MUTATOR_PROFILE_KEY) || 'null');
    return profile && Array.isArray(profile.decks) ? profile : null;
  } catch {
    return null;
  }
}

/** One Deck Mutator deck as the game side's deck shape: commanders first, then the rest of the list. */
export function toGameDeck(d) {
  const commanders = [d.commander, d.partner].filter(Boolean);
  const isCommander = name => commanders.includes(name);
  const lines = [...commanders.map(name => `1 ${name}`), ...(d.cards || []).filter(e => e?.n && e.q > 0 && !isCommander(e.n)).map(e => `${e.q} ${e.n}`)];
  return {
    id: String(d.id),
    name: d.name || 'Untitled deck',
    commander1: d.commander || '',
    commander2: d.partner || '',
    deckList: lines.join('\n'),
    updatedAt: Number.isFinite(new Date(d.updatedAt).getTime()) ? new Date(d.updatedAt).toISOString() : null,
    source: 'deck-mutator'
  };
}

/** Deck Mutator's Commander decks that have a commander set, in the game side's deck shape. */
export function listMutatorDecks(storage = globalThis.localStorage) {
  const profile = mutatorProfile(storage);
  if (!profile) return [];
  return profile.decks.filter(d => d && d.id && d.format === 'commander' && d.commander).map(toGameDeck);
}
