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
    owner: d.player || '',
    source: 'deck-mutator'
  };
}

/** Deck Mutator's Commander decks that have a commander set, in the game side's deck shape. */
export function listMutatorDecks(storage = globalThis.localStorage) {
  const profile = mutatorProfile(storage);
  if (!profile) return [];
  return profile.decks.filter(d => d && d.id && d.format === 'commander' && d.commander).map(toGameDeck);
}

// ---------- one MUTAGEN profile ----------
// Each fact is stored once. The game side keeps the player's name, avatar, games, achievements and history
// (ccv07-profile); Deck Mutator keeps decks, collection, buy lists and tablemates (dc.profile). Each side shows
// the other's data, and the game side's profile backup saves and restores both.

const DEFAULT_MUTATOR_NAMES = ['', 'me', 'planeswalker'];

/** Deck Mutator's whole saved profile, as stored; null when there is none. */
export function readMutatorProfile(storage = globalThis.localStorage) {
  return mutatorProfile(storage);
}

/** Put back Deck Mutator's saved profile from a MUTAGEN backup. */
export function writeMutatorProfile(profile, storage = globalThis.localStorage) {
  if (!profile || !Array.isArray(profile.decks)) return false;
  try { storage.setItem(MUTATOR_PROFILE_KEY, JSON.stringify(profile)); return true; } catch { return false; }
}

/** What Deck Mutator holds, for the game side's profile screen. */
export function mutatorSummary(storage = globalThis.localStorage) {
  const p = mutatorProfile(storage);
  const decks = p ? p.decks.filter(d => d && d.id) : [];
  return {
    decks: decks.length,
    commanderDecks: decks.filter(d => d.format === 'commander' && d.commander).length,
    collection: p?.library && typeof p.library === 'object' ? Object.keys(p.library).length : 0,   // different cards owned
    buyList: decks.reduce((n, d) => n + (Array.isArray(d.want) ? d.want.length : 0), 0) + (Array.isArray(p?.want) ? p.want.length : 0),
    tablemates: Array.isArray(p?.players) ? p.players.length : 0
  };
}

/** The name Deck Mutator was using before the merge, when it is a real name rather than its default. */
export function mutatorPlayerName(storage = globalThis.localStorage) {
  const name = String(mutatorProfile(storage)?.name || '').trim();
  return DEFAULT_MUTATOR_NAMES.includes(name.toLowerCase()) ? '' : name;
}
