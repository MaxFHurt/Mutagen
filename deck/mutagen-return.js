// MUTAGEN: Deck Mutator is part of MUTAGEN; this adds the way back to the game side (../commander/).
// The game side remembers which screen opened Deck Mutator and reopens it, with any player setup intact.
// Kept outside the app bundle so the copied Deck Companion code stays as it was.
(function () {
  var style = document.createElement('style');
  style.textContent =
    '.mutagen-return{position:fixed;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));' +
    'z-index:45;font-weight:700;letter-spacing:.06em}' +
    'body{padding-bottom:calc(56px + env(safe-area-inset-bottom,0px))}';
  document.head.appendChild(style);
  var a = document.createElement('a');
  a.className = 'btn mutagen-return';
  a.href = '../commander/';
  a.textContent = '◂ Return to MUTAGEN';
  document.body.appendChild(a);
})();
