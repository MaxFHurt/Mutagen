// MUTAGEN home after the approved master (01-Landing-Approved.png): every position below is copied from the supplied
// ui/piping/home/HOME-LAYOUT.json (ChatGPT, rev 051), on the master's 1672 × 941 canvas. Generated, do not edit by hand.
export const CANVAS = [1672, 941];
// Pipe assemblies, back to front. liquid: carries live liquid (overlay + mask), else a solid steel piece shown as made.
export const PIECES = [
  {
    "id": "top-header-with-elbows",
    "rect": [
      37,
      15,
      1596,
      115
    ],
    "liquid": false,
    "flow": null,
    "file": "piping-pieces/top-header-with-elbows.png"
  },
  {
    "id": "left-sight-column",
    "rect": [
      9,
      128,
      122,
      695
    ],
    "liquid": true,
    "flow": "down",
    "file": "animation-overlays/left-sight-column.png"
  },
  {
    "id": "right-sight-column",
    "rect": [
      1540,
      129,
      119,
      693
    ],
    "liquid": true,
    "flow": "up",
    "file": "animation-overlays/right-sight-column.png"
  },
  {
    "id": "branch-1-left",
    "rect": [
      134,
      454,
      344,
      68
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-1-left.png"
  },
  {
    "id": "branch-1-right",
    "rect": [
      1188,
      454,
      351,
      68
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-1-right.png"
  },
  {
    "id": "branch-2-left",
    "rect": [
      134,
      586,
      344,
      67
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-2-left.png"
  },
  {
    "id": "branch-2-right",
    "rect": [
      1188,
      586,
      351,
      67
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-2-right.png"
  },
  {
    "id": "branch-3-left",
    "rect": [
      134,
      717,
      344,
      65
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-3-left.png"
  },
  {
    "id": "branch-3-right",
    "rect": [
      1188,
      717,
      351,
      65
    ],
    "liquid": true,
    "flow": "right",
    "file": "animation-overlays/branch-3-right.png"
  },
  {
    "id": "bottom-left-elbow",
    "rect": [
      40,
      822,
      106,
      66
    ],
    "liquid": false,
    "flow": null,
    "file": "piping-pieces/bottom-left-elbow.png"
  },
  {
    "id": "bottom-joint-profile-settings",
    "rect": [
      594,
      830,
      47,
      60
    ],
    "liquid": false,
    "flow": null,
    "file": "piping-pieces/bottom-joint-profile-settings.png"
  },
  {
    "id": "bottom-joint-settings-help",
    "rect": [
      1027,
      830,
      45,
      59
    ],
    "liquid": false,
    "flow": null,
    "file": "piping-pieces/bottom-joint-settings-help.png"
  },
  {
    "id": "bottom-right-elbow",
    "rect": [
      1525,
      821,
      104,
      69
    ],
    "liquid": false,
    "flow": null,
    "file": "piping-pieces/bottom-right-elbow.png"
  }
];
// Control slots on the master: logo, tagline and the six buttons.
export const CONTROLS = {
  "logo": [
    501,
    103,
    672,
    285
  ],
  "tagline": [
    606,
    380,
    465,
    47
  ],
  "new-game": [
    477,
    425,
    712,
    127
  ],
  "continue": [
    477,
    551,
    712,
    125
  ],
  "deck-mutator": [
    477,
    675,
    712,
    124
  ],
  "profile": [
    145,
    794,
    451,
    120
  ],
  "settings": [
    640,
    794,
    389,
    120
  ],
  "help": [
    1071,
    794,
    455,
    120
  ]
};
