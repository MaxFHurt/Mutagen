// MUTAGEN: Deck Mutator is part of MUTAGEN. Kept outside the app bundle so the copied Deck Companion code stays as it was.
// - Return to MUTAGEN: back to the game side (../commander/), which reopens the screen that opened Deck Mutator.
// - One profile: the player's name lives in the game side's profile (ccv07-profile) and is shown here read-only;
//   the profile page also shows the game record. Decks, collection, buy lists and tablemates stay here (dc.profile).
// - One installed app: works offline through sw.js, and manifest.json installs MUTAGEN, not a separate app.
// - One look: the MUTAGEN skin kit's frames, when installed (../ui/kits/skin-deck.css).
(function () {
  var GAME_PROFILE_KEY = 'ccv07-profile', MUTATOR_PROFILE_KEY = 'dc.profile', RETURN_KEY = 'mutagen.return';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  var game = read(GAME_PROFILE_KEY) || {};
  var gameName = String((game.account && game.account.displayName) || '').trim();

  // Runs before the app loads its profile, so the app shows the MUTAGEN name.
  var mutator = read(MUTATOR_PROFILE_KEY);
  if (gameName && mutator && Array.isArray(mutator.decks) && mutator.name !== gameName) {
    mutator.name = gameName;
    try { localStorage.setItem(MUTATOR_PROFILE_KEY, JSON.stringify(mutator)); } catch (e) { /* storage unavailable */ }
  }

  function openGameSide(screen) {
    try { sessionStorage.setItem(RETURN_KEY, JSON.stringify({ screen: screen, params: {} })); } catch (e) { /* lands on home */ }
    location.href = '../commander/';
  }

  // The MUTAGEN skin (ui/kits/skin/, generated into skin-deck.css): frames for buttons, panels, tabs and fields. The
  // sheet is empty until a skin kit is installed, so Deck Mutator looks as it does now until then.
  var skin = document.createElement('link');
  skin.rel = 'stylesheet';
  skin.href = '../ui/kits/skin-deck.css';
  document.head.appendChild(skin);

  var style = document.createElement('style');
  style.textContent =
    '.mutagen-return{position:fixed;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));' +
    'z-index:45;font-weight:700;letter-spacing:.06em}' +
    'body{padding-bottom:calc(56px + env(safe-area-inset-bottom,0px))}';
  document.head.appendChild(style);
  var back = document.createElement('a');
  back.className = 'btn mutagen-return';
  back.href = '../commander/';
  back.textContent = '◂ Return to MUTAGEN';
  document.body.appendChild(back);

  // Profile page: name is edited in the MUTAGEN profile; show the game record next to it.
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function patchProfile() {
    var input = document.getElementById('p-name');
    if (!input || input.dataset.mutagen) return;
    input.dataset.mutagen = '1';
    var group = input.closest('.grp') || input.parentNode;
    if (gameName) {
      input.readOnly = true;
      input.value = gameName;
      input.title = 'Your name is set in your MUTAGEN profile';
    }
    var games = Number(game.games || 0), wins = Number(game.wins || 0);
    var panel = document.createElement('div');
    panel.className = 'grp mutagen-record';
    panel.innerHTML =
      '<span class="lab">MUTAGEN game record</span><div class="row">' +
      '<span class="chip">' + esc(games) + ' game' + (games === 1 ? '' : 's') + '</span>' +
      '<span class="chip">' + esc(wins) + ' win' + (wins === 1 ? '' : 's') + '</span>' +
      '<span class="chip">' + (games ? Math.round((wins / games) * 100) : 0) + '% win rate</span>' +
      '<button class="btn sm" type="button" data-mutagen="profile">' + (gameName ? 'Open MUTAGEN profile' : 'Set your name in the MUTAGEN profile') + '</button></div>' +
      '<p class="note" style="margin:0">Your name, avatar, games and achievements are kept in your MUTAGEN profile, and its backup also saves everything here.</p>';
    group.parentNode.insertBefore(panel, group.nextSibling);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-mutagen="profile"]');
    if (t) openGameSide('profile');
  });
  new MutationObserver(patchProfile).observe(document.body, { childList: true, subtree: true });

  // Offline: Deck Mutator's own files are cached as they load (sw.js), so an installed MUTAGEN opens it offline too.
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(function (e) { console.warn('Deck Mutator offline cache not registered', e); });
  }
})();
