# DECK COMPANION — MASTER DEVELOPMENT HANDOFF
**Prepared:** October 16, 2026  
**Authority:** Claude’s earlier-this-week working baseline; ALL requirements below remain TODO until independently verified there.  
**Scope:** Cross-conversation consolidation of accessible Deck Companion decisions, benchmark history, current planning, and source artifacts. Not a claim of exhaustive access to every historic chat.

## Instructions to Claude — READ FIRST
- Identify and preserve the exact earlier-this-week Claude baseline and make a recovery copy before editing. Do not merge or cherry-pick ChatGPT attempts from October 12–15.
- The user authorizes the full implementation and release workflow described here: preserve a downloadable copy of the current live build before changes, develop and test, then commit, push, deploy live and playtest the deployed build. Do not pause for another approval gate. Never overwrite the backup.
- Classify every item **Not started / Present in baseline but unverified / In progress / Verified** with exact browser test evidence. No reported ChatGPT fixes or test counts count as verified.
- Preserve deck legality, saved data, actual card identities, alternate printing choices, tier stability, price accuracy and independent Buy List quantities.
- Simulation expansion is deferred. Do not modify the 300 deterministic practice-game simulation system under this roadmap.

## Cross-conversation historical background (evidence, NOT accepted completed work)
### Earlier builds and engine work (before October 12)
- Historical references include Builds 72, 73, 80, 118 and unpublished Build 119. Their features and code differ; do not assume any version is Claude’s baseline.
- The owner requested a deterministic deck-building and upgrade engine that can produce expert-quality Apex decks without reliance on external AI. Quality must be compared against **independent human/expert card selections**, not merely internal scores or the app’s previous output.
- Tramplesaurus Rex dinosaur precon is a recurring adversarial benchmark. A prior comparison reported approximately **32 engine-proposed replacements versus 14 independent reference swaps**, a material discrepancy requiring investigation, not proof the engine is correct.
- Prior experiments combining role-gap fixes, commander-mechanic awareness and missing-data handling yielded mixed results: a reported 48 replacements overall, 19 for Tramplesaurus. It retained Curious Altisaur, Terrian and Carnage Tyrant and proposed Greater Good / Return of the Wildspeaker, but reportedly cut Elemental Bond and Collective Resistance incorrectly. Reproduce against actual card/deck data before trusting these conclusions.
- Key engine concern: **cut accuracy**. The engine must distinguish a card’s role in the deck, commander-specific interactions, redundancy, role coverage, synergistic engines, and genuine weak slots. Apex picks should be independently assessed and must not worsen the real deck.
- Benchmark comparison should record input list, card pool and restrictions, independent expert reference, engine adds/cuts, overlap, false-positive cuts, missed upgrades, legality, and reason codes. Preserve traceability for every proposed swap.
- A prior card-data snapshot CI workflow reportedly failed on October 4; verify the current data-refresh pipeline rather than assuming card data is current.

### October 12–13: candidate testing and corrections, all unaccepted
- An unpublished Build 119 candidate ZIP was used for naming/search/selected-printing work; the live GitHub Pages build was not that candidate. Reported focused tests (24 browser and 39 acceptance) and a separate report of 74 passed / 1 failed are historical claims with differing scopes, not proof of current baseline correctness.
- Search and naming requirements: printed card names display consistently across decklists, upgrade cards and detail views; search by either face/name, partial name, or canonical identity; avoid duplicate logical cards under aliases; preserve manual printing selection across save/reload and precon imports.
- Alternate printings change artwork, printed name, set and **displayed selected-printing price**. They must not change a recommendation’s Budget/Mid/Apex tier or card gameplay score; user explicitly overruled the idea of dropping a manually selected expensive printing out of Budget.
- An A–Z sort issue using printed versus rules names and pricing-filter ambiguity were mentioned in prior test notes. Re-test and decide behavior from current explicit product rules, not old test expectations.

### October 12–15: design decisions
- The entire appended 18-section specification is approved as **requirements only**, not implemented features.
- Card-fit inconsistency acceptance example: Wakanda Forever, Greater Good → Sword of Fire and Ice, +2.4 deck score Best Swap while UI says “By my scoring it ranks below nearly every spell already in the deck” and Poor Fit. Distinguish isolated card rank, strategic fit and actual net deck delta; investigate contradictory calculations, do not just relabel or suppress.
- Fresh Peter Parker // Amazing Spider-Man 100/100, 96/100 Apex deck was immediately told to remove six Plains and add two Islands and four Forests. Generator and mana checker must use consistent source-aware mana evaluation and avoid false claims that colors shifted.
- A deck at 87/100 appeared below Budget: Apex progress must be based on deck strength versus calibrated reference tiers, never on proportion of recommended cards installed.
- Apex = highest-scoring legal eligible choice within **enforced** constraints; theme preference alone cannot demote Apex. Only if a genuine locked set/theme restriction excludes the strongest card may the UI show a separate stronger “Highest Score — Off Theme” warning.
- Buy List installation must **prompt**, never silently remove purchased/installed cards. Quantities and deck groups stay independent.

## Priority and execution gates
**Gate 0 — Back up current live build and inventory Claude baseline:** identify Claude snapshot, compare actual behavior to each requirement, make immutable backup, record build ID and tests.  
**Gate 1 — Correctness:** identity/printing/search, score contradictions, Apex tier rules, independent benchmark/cut quality, mana validator alignment.  
**Gate 2 — Data/workflow:** Buy List schema, cross-deck quantity accounting, confirmation on installation, price/value logic, automatic recommendation recalculation.  
**Gate 3 — UX:** landing navigation, Library, new-deck tile, Build Stats, stationary compact Build panel, Upgrades carousel and selected-card details.  
**Gate 4 — Regression:** full browser tests, cross-device layouts, save/reload, legal deck counts, history/undo, purchase/export, user acceptance.  
After validation, proceed to Git commit, push, live deployment and live browser playtesting without an additional approval checkpoint; keep the pre-change backup.


## Release authorization and backup protocol — REQUIRED
1. Before making any change, obtain the exact currently published build and source state; create a complete, downloadable backup archive (including code, assets, configuration and relevant exportable data). Give the user the backup link and record build ID, commit SHA and live URL. Do not substitute a screenshot or a partial source export for the backup.
2. Start development from Claude’s working build from **earlier this week**, not ChatGPT’s attempted patches. Inventory and preserve existing functionality.
3. Implement and independently test the roadmap; do not claim historical ChatGPT test results as passing.
4. After local/browser acceptance tests pass, commit the changes, push to the designated Deck Companion repository, deploy the complete build to the live site **without waiting for a further approval request**. This instruction is explicit authorization for that release workflow, not evidence that any release has happened.
5. Open the actual deployed URL in a browser, verify its build identity, run end-to-end live playtests (navigation, deck creation, scoring, card printing/flip, buy list, exports, persistence, mobile layout), document results and fix/redeploy regressions. Keep the original build recoverable.
6. If any prerequisite is unavailable (repository access, deployment credentials, live browser or backup), report the blocker accurately rather than claiming deployment or playtest success.

## Deck Power and Apex progress — authoritative calibration
- **Deck Power** is the actual whole-deck strength score, not a measure of how many suggested swaps the player has applied.
- Score the generated **Budget**, **Mid**, and **Apex** reference builds using the same scoring engine, legality checks, commander strategy and relevant hard restrictions.
- **Apex reference build = 100 power** on the tier-relative progress scale. Budget and Mid are placed at their **measured relative power** on that same scale; do not hardcode arbitrary 33/66 breakpoints. For example, if their validated relative scores are 63 and 84, show Budget at 63, Mid at 84, Apex at 100 (example only, not prescribed values).
- Calculate the player's installed deck power on the identical calibrated scale. Do not automatically grant Apex merely because every recommendation was applied. Allow truthful comparison when the player's deck equals or exceeds the Apex reference; show 100/100 on the capped progress bar and retain the underlying measured score/overperformance where meaningful.
- Recompute reference benchmarks when build settings, commander, card pool, hard restrictions or scoring methodology materially change; avoid stale comparisons. Never let a printing choice or price alone change deck power.
- Show the **Deck Power score and always-visible Apex Progress Bar together on both Upgrades and Build Stats**; synchronize values instantly after installed-deck changes. Neither belongs in the left Build settings panel.
- Validate the known regression: an 87/100 strong deck must not appear below Budget merely because the player has not applied the recommended swaps.

## Outstanding verification register
| Area | Required proof |
| --- | --- |
| Baseline | Exact Claude snapshot and saved recovery copy |
| Card data | Valid identity/alias/printing mapping and current pricing source |
| Generator | Independent expert comparison including Tramplesaurus cut accuracy |
| Apex | Strongest eligible pick; hard restrictions versus preferences |
| Scores | Consistent swap deltas, fit rationale and tier progress |
| Mana | Generator and validator agree or provide evidence-backed corrections |
| Buy List | Group-specific counts, idempotence, optional removal, merged export |
| UI | Four cards with persistent rating and price; selected stats below; left panel no scroll |
| Safety | Pre-change build backed up; controlled commit/push/deploy and live playtest |

---

# DECK COMPANION — CLAUDE REBUILD HANDOFF
**Status: ALL WORK PENDING — not a progress report**  
**Date: October 15, 2026**  
**Starting point: Claude’s own earlier-this-week working build**

## Mandatory reset instructions
1. Resume from **Claude’s earlier-this-week baseline**, not any build, ZIP, patch, browser-test result, or Git state produced by ChatGPT this week. Identify and document the baseline build before writing code.
2. **Treat EVERY item in the roadmap as TODO**, including items ChatGPT previously described as fixed, implemented, tested, approved, or complete. Approved means *approved as a requirement*, never implemented.
3. Do not cherry-pick or merge ChatGPT’s attempted implementation. Reimplement independently, using this document for specifications and examples only. Existing baseline features may satisfy a requirement, but Claude must independently inspect and prove that with tests before marking it done.
4. Never assert that Build 119 fixes or the claimed browser test counts establish working functionality. The naming, search, selected-printing pricing, tier stability and UI browser tests must be independently redone.
5. Keep the existing gothic purple/black/silver/chrome design, card art, typography and functional scope. No generic replacement UI.
6. This handoff authorizes Claude to implement, commit, push and deploy the finished build live without waiting for another approval. First produce a downloadable, immutable backup of the current build; develop in a separate working copy; run pre-deployment tests and then live browser playtests. Preserve a rollback path.
7. Expanded deck simulation work is expressly **deferred**; do not touch it. The deterministic engine can be assessed for recommendation quality without redesigning simulations.

## Scope and handoff interpretation
This handoff consolidates **everything discussed in the October 12–14 ChatGPT planning and attempted-development workstream** into future requirements for Claude. The timeline is *source of requirements only*, not evidence of delivered work. Any test counts, reported fixes, candidate versions, visual previews, or other claimed accomplishments from that workstream are **not accepted deliverables**.

### Explicit high-priority failures Claude must reproduce and fix
- **Sword of Fire and Ice / Greater Good:** Wakanda Forever UI simultaneously recommended a **+2.4 score Best Swap** while asserting the new card ranked below nearly every spell “by my scoring,” with Poor Fit. Resolve scoring contradictions at their source; separate intrinsic fit, deck-impact delta, and explanation. Do not simply hide the warning.
- **Peter Parker // Amazing Spider-Man:** A fresh untouched **96/100 Apex, 100-card** generated deck prompted **−6 Plains, +2 Islands, +4 Forests**, implying the user changed colors. Align generation and mana validation; prove the suggested fix improves actual mana performance rather than merely matching a different formula.
- **87/100 deck below Budget:** Recalibrate Apex progress to whole-deck strength against reference tiers, not count of recommended swaps applied.
- **Apex vs Highest Score:** Apex is strongest legal eligible card under *hard* restrictions. Theme preference cannot demote it. Only show stronger “Highest Score — Off Theme” separately when a genuinely enforced restriction excludes it.
- **Selected printing:** A player's printing choice changes displayed price and deck value, **never the card’s gameplay rating or Budget/Mid/Apex tier**.

## Required delivery discipline
For each roadmap section: inventory existing Claude-baseline behavior; document gaps; implement; test edge cases; browser-playtest actual candidate; record evidence; and report **Not started / In progress / Verified**. Do not mark any item Verified solely because this handoff says it was previously attempted.

---

# Deck Companion — Comprehensive Upgrade Roadmap
**Forward-looking implementation specification — October 15, 2026**

**Status:** Design and planning only. Claude is authorized to implement, commit, push, deploy live and playtest without another approval, after saving a downloadable backup of the current build. Preserve existing app appearance, imagery, typography, controls and features. Every requirement in this document is an OPEN WORK ITEM for Claude to implement or independently verify from the earlier-this-week Claude baseline. No work performed or claimed by ChatGPT this week counts as completed or accepted.

## 1. Product objectives and non-negotiables
- Keep the existing dark gothic purple/black/silver/chrome visual identity, fonts, card imagery, tabs and buttons. Avoid generic redesigns or replacing approved assets.
- Preserve current workflows and data. Reorganize, do not delete capabilities merely to make a page shorter.
- No AI requirement for deck generation; favor deterministic, auditable scoring and robust validation. Defer the user's separate future simulation plan.
- Distinguish theme preferences from hard locked restrictions. Commander legality and explicit restrictions always apply.
- Avoid accidental deck mutation: regeneration of recommendations never silently changes installed cards.
- Test against actual builds and actual card data. Confirm build identity before declaring a defect fixed.

## 2. Navigation and landing page
### 2.1 Global Buy List button
Add a Buy List destination to the landing page/top-level navigation using existing design. It opens a centralized view of all outstanding card purchases.
### 2.2 Library button
Add a Library button on the landing page and in the top navigation panel, linking to the existing card library. Do not assume library editing is restricted to read-only: preserve existing functionality until separately specified.
### 2.3 Decks screen: new-deck tile
Always display an empty deck-shaped tile with a large “+” at the end of the saved-decks grid. Clicking opens the existing new-deck creation workflow, including existing import/creation options, rather than auto-generating or overwriting a deck. Preserve card grid proportions and responsive behavior.

## 3. Global Buy List: behavior and export
- Organize in-app entries under each saved deck and a separate **Other** group for unassigned purchases. Groups should be collapsible and clearly labeled.
- Keep each deck's desired quantities independently. The same card may appear in multiple deck groups.
- Support export selection for **all**, **one**, or **any combination** of deck groups, including Other.
- Export a `.txt` file in standard plain-text decklist syntax: `N Card Name`, one line per unique card, with quantities **summed across selected groups**. Do not include deck names, section headers, prices or chip labels in exported content.
- Export should use canonical card names, not printing-specific display labels, unless an established decklist export convention explicitly requires a variant. Printing selection affects pricing, not decklist identity.
- Changes in one deck's Buy List must not erase another deck's need for the same card.
- Purchases, removals and installations must update displayed counts consistently, but **installing a card must NOT silently remove it from the Buy List**. If installed card/quantity appears in the corresponding deck Buy List, prompt the player whether to remove the relevant quantity. Default to leaving it intact until confirmed; do not affect other deck groups.
- Handle duplicate clicks, partial quantities, absent cards, and multiple copies idempotently.

## 4. Decklist page: Add All to Buy List
- Add **Add All to Buy List** using existing button style.
- Include all eligible cards in the deck, including commander(s) and **nonbasic lands**.
- Exclude **all basic lands**, including Snow-Covered basic lands and Wastes. Determine basic-land status from card identity/type, not just a short list of names.
- Preserve eligible quantities and avoid adding duplicate quantities if button is clicked repeatedly; reconcile toward the deck's required quantity instead of blindly incrementing.
- Include owned cards: Add All is an explicit request, not an automatic inventory shortage calculator.
- Never alter the deck itself. Confirm the action with a clear count before committing if appropriate.

## 5. Main deck workspace and Build panel
### 5.1 Tabs
Insert a **Build Stats** tab between **Decklist** and **Upgrades**. Preserve other existing tabs and their ordering unless necessary to insert this one.
### 5.2 Left Build panel: no scrolling
The left Build panel must fit in the available screen height at supported viewports, while the right Upgrades area may scroll independently. Consolidate existing controls without dropping functionality:
- Deck name and commander identification in compact header.
- Budget/Mid/Apex target build options on a single row where possible.
- Prioritized mechanics list with reorder controls.
- Theme First compact inline toggle.
- Color identity indicators.
- Compact preference controls for creature types, keywords, sets and optional filters.
- Clearly separate preference controls from **hard locked** restrictions.
- Preserve all other existing build options; use dropdowns/pop-up editors for longer lists, not a clipped or unusable panel.
- Place **Regenerate Upgrades** as the primary anchored bottom action. Remove the duplicate right-pane regeneration action and ambiguous “Generate Deck” action for existing decks. Initial deck generation remains accessible in its existing creation workflow.
- Regenerate recommendations from current build settings **without altering installed cards**.
- Keep touch targets readable and accessible: no scroll should be achieved through dangerously tiny text or controls.

## 6. Build Stats tab
Move full deck-analysis content into a dedicated tab without deleting underlying capabilities:
- Current deck score and its category breakdowns.
- Strength comparison to **Budget, Mid and Apex reference decks** using the same scoring methodology; the Apex progress bar is strength-based, **not** a percentage of recommendation cards installed.
- Commander bracket, Game Changer count, diagnostics, strategic role coverage, mana curve, color distribution, card types, land balance, synergy, win conditions/combos where already available.
- Deck Health findings with direct navigation to actionable proposed swaps.
- Deck value from **currently installed cards and their selected printings/quantities**.
- Upgrade history, swaps and Buy List information as already supported.
- **Remove Money Spent/Spent** from the interface: acquisition cost is unknowable from the deck alone. Keep **Deck Value**.
- **Apex bar remains visible when maxed** and reads Apex Achieved at its benchmark. Keep actual numeric deck score even at Apex.
- The **Deck Score + Apex Progress Bar pair belongs on the Upgrades tab**, not in the left Build panel. Build Stats retains detailed analysis; do not add a redundant permanent score/progress block to the Build panel.

## 7. Upgrades tab: four-card horizontal sheets
### 7.1 Page structure
Top: compact **Deck Score + always-visible Apex Progress Bar**. Next: space-efficient search, Fill, Analyze, Lands helper, Best by Job, sort and filters. Below: horizontally navigated upgrade sheets. Vertical page scrolling remains allowed and expected, but remove excessive padding, blank space and oversized controls.
### 7.2 Four cards on each sheet
For each upgrade opportunity show exactly four positions, left to right:
1. **Your Card** (currently installed)
2. **Budget** recommendation
3. **Mid** recommendation
4. **Apex** recommendation

Each slot visibly displays **card artwork, rating, and selected-printing price**, even when not selected. The rating and price must be comparable across all four slots. A missing eligible tier candidate should be explicitly marked rather than filled with a duplicate or fabricated pick.
### 7.3 Interaction
- Tap any card to select it and update a **shared Upgrade Stats panel below the row**; do not require a separate modal merely to inspect routine upgrade stats.
- Panel includes card contribution, fit, predicted whole-deck score impact, strategic role changes, price, warnings, alternatives and Apply action as applicable.
- Left/right arrows navigate complete **four-card upgrade sheets**, with current position and total count; swipes can supplement arrows where appropriate.
- Filters narrow sheets without breaking tier comparisons. Support existing role chips, exclusions, Game Changers and relevant sort controls.
- Keep Apply actions alongside their relevant recommendation, not in an unrelated stats header.
- Preserve upgrade alternatives, highest-score notification logic, undo/history and other existing actions.

## 8. Apex, Budget, Mid and Highest Score semantics
- **Apex must be the highest-scoring legal candidate for that slot under the player's enforced restrictions.** Do not demote it because of popularity or a mere theme preference.
- If the unrestricted highest-scoring legal card is also permitted, it **is** Apex; do not duplicate it as Highest Score.
- Only when a **genuine locked theme/set restriction** excludes a stronger off-theme candidate should a separate **Highest Score — Off Theme** notification be shown, explaining the restriction and the difference.
- Budget/Mid are strongest candidates within their applicable price tiers and enforced restrictions. A user's choice of a different printing does **not** change gameplay value or tier classification.
- Price changes should not silently re-tier an already established recommendation based only on a printing selection. Make tier logic stable and auditable.
- Compare current deck strength against reference tier deck scores using consistent whole-deck evaluation; fix the observed case of a deck scored 87/100 but displayed below Budget despite being nearly Apex.

## 9. Upgrade scoring consistency and card-fit language
### Critical example: Wakanda Forever, Greater Good → Sword of Fire and Ice
Observed interface simultaneously displayed **Best Swap**, **+2.4 Deck Score**, **Weakest Fit**, **TIP POOR FIT**, and the claim “By my scoring it ranks below nearly every spell already in the deck.” These claims appear contradictory without a clear distinction between intrinsic card rating, thematic synergy and actual swap impact.

Requirements:
- Separate **standalone card quality**, **strategy/theme fit**, and **marginal whole-deck impact of replacing this specific card**.
- Never claim a candidate ranks below almost every existing spell while recommending it as a major score improvement unless the discrepancy is explicitly justified with traceable calculations.
- Use labels consistent with actual score deltas: Major Upgrade, Strong Upgrade, Small Upgrade, No Net Upgrade, or Negative Impact as appropriate; keep fit as a distinct signal.
- Popularity/EDHREC usage is supporting evidence, not an override of computed deck impact.
- Provide concise, evidence-based “why this swap” explanations showing what is gained and lost; avoid irrelevant statements such as adding card draw that is already abundant without explaining the marginal benefit.
- Flag internal disagreement between evaluators for diagnostics rather than displaying mutually inconsistent verdicts.
- Preserve existing visual language and chips where possible; correct meaning before cosmetic changes.

## 10. Deck Health and Game Changers
- Deck Health warnings should offer concrete, legal proposed fixes and navigation to the relevant upgrade sheets. Do not strand players at a count or generic diagnosis. Audit existing fix code first: some behavior may already exist but be inaccessible or ineffective.
- Game Changer chips should appear on all matching recommendations; count should be actionable and filter to those exact recommendations.
- Game Changers should not be treated as mandatory for improving a deck or reaching a stronger commander bracket. Theme preference alone must not falsely block progression.
- Preserve filters, roles and explanations, including when no valid fixes exist.

## 11. Automatic recalculation after applying an upgrade
- When a player **applies** an upgrade, automatically recompute the actual deck score, Apex progress, role coverage, health, and remaining recommendations against the **updated installed deck**.
- Do not automatically apply any further upgrades. Do not reset build settings or silently regenerate the whole deck.
- Refresh/maintain recommendation state, exclusions, sheet selection and history as coherently as possible; explain when the previous opportunity disappears because it is now resolved.
- Preserve undo functionality; undo should restore deck contents and rerun analysis.
- **Buy List prompt:** if the installed card exists on this deck's Buy List, ask whether to remove the installed quantity. Do not auto-remove; do not touch other decks' entries. Cancel/No leaves Buy List unchanged.
- Ensure recalculation does not loop, duplicate operations or produce stale scores.

## 12. Pricing, printings and card intelligence
- Card price in four-card row is always visible beneath rating and corresponds to selected printing.
- Printings affect display and monetary valuation, **not** the card's strategic rating or recommendation tier.
- Maintain selected-printing consistency in deck value, Buy List displays where relevant, and card detail views.
- Verify pricing data freshness, source/fallback behavior, card identification and ambiguous variant matching. Never claim precise current prices without source support.
- Clarify card-fit evaluation and avoid contradictory scoring explanations. Preserve legal-play and deck restrictions.

## 13. Generated deck quality: mana-base contradiction
### Acceptance case: Peter Parker // Amazing Spider-Man
A newly generated untouched **100/100-card, 96/100 Apex** deck was immediately told to remove **6 Plains** and add **2 Islands + 4 Forests**. The interface implied the deck's colors had shifted even though no edits occurred.

Requirements:
- Audit the generator's mana-base construction and post-generation mana checker. They may weight spell pips, nonbasic sources and mana-producing permanents differently.
- Use compatible color-source and casting-requirement calculations for generation and validation.
- Validate a generated deck **before** presenting it as finished; if a mana fix is necessary, reconcile or explain it during generation.
- Do not suppress genuine warnings merely to make the first screen look clean.
- Never claim “colors shifted” without evidence of an actual change.
- Evaluate whether the suggested land swaps improve color access and casting reliability before recommending them.
- Keep legality, land counts, commander color identity and budget/set restrictions intact.

## 14. Automatic recommendations quality and engine benchmarks
- Benchmark generated recommendations against independently reasoned high-quality deck-building picks, not only internal consistency. User previously requested comparisons to independent expert-quality selections and attention to cut accuracy.
- Preserve theme and strategy where hard restrictions apply; maximize actual deck performance within the allowed pool.
- Validate cut choices as rigorously as additions: the replacement should improve the whole deck more than alternative cuts would.
- Include known regression cases from previous builds and card-specific contradictions. Do not claim new benchmark results without executing them.
- Investigate existing engine quality before considering AI; user prefers a strong deterministic engine.
- **Defer expanded simulation/performance-testing feature plans.** The user explicitly has a separate plan for that later. Do not expand or redesign the existing 300 deterministic practice-game simulations as part of this roadmap.

## 15. Required naming, search, printing and candidate verification work — ALL TODO
Claude must independently implement, repair or verify the following against its own earlier-this-week baseline. Do not adopt the ChatGPT Build 119 candidate or any reported fixes as the baseline; they are untrusted reference material only:
- Card naming consistency across display, lookup, upgrade, buy list and exports.
- Search behavior and correct results selection.
- Selected printing's price propagation without altering tier classification.
- Build identity confirmation before testing and clear separation of candidate from live deployment.
- Existing build/deck-score behavior and alternative card handling.
- Do not overwrite existing source ZIPs or assume fixes are deployed.

## 16. Implementation phases and gates
**Phase 0 — Restore Claude baseline and inventory.** Begin from Claude’s earlier-this-week build, not ChatGPT’s work from October 12–14. Identify exact source build, back up candidate, catalog screens, engine interfaces, storage schema, visual assets and existing functionality. Build a feature-to-test traceability matrix. Back up the current live build before any edits; release after testing.

**Phase 1 — Correctness first.** Resolve contradictory score/fit labels, tier-vs-printing behavior, Apex strength benchmarking and generator/mana validator mismatch. Add regression fixtures for Sword of Fire and Ice and Peter Parker examples.

**Phase 2 — Data and Buy List behavior.** Implement/verify per-deck and Other quantities, idempotent Add All excluding basics, installation prompts, selected-group plain-text exports and synchronization. Test duplicate cards across multiple decks.

**Phase 3 — Navigation and Build Stats.** Add landing/top-nav Buy List and Library, new-deck + tile, Build Stats tab and move full analytical material. Remove Money Spent; retain Deck Value.

**Phase 4 — Workspace layout.** Consolidate left Build panel without scrolling or feature loss. Place Regenerate Upgrades there, preserve existing deck, remove duplicate actions. Add compact score/Apex header only on Upgrades.

**Phase 5 — Upgrade sheet UI.** Four visible card slots, permanent rating and price, shared details panel, arrows/swipe, filtering, tier-specific Apply actions and accessible responsive behavior.

**Phase 6 — Recalculation and actionable guidance.** Automatically recompute after swaps, support Buy List removal prompt, wire Deck Health/Game Changer links, preserve undo/history and verify no unwanted deck mutations.

**Phase 7 — Browser playtest and release gate.** Independently test the actual candidate in a browser across target screen sizes; verify card prices, scores, exports, prompts, deck persistence, build panel fit, navigation, accessibility and regressions. Present test evidence and proposed changes to the user. **After passing pre-release tests, commit, push, deploy live and browser-playtest the published site without requesting another approval.**

## 17. Acceptance-test checklist
1. Brand-new Apex deck does not report fictitious user color changes; any mana fix is independently justified.
2. +2.4 recommended swap never coexists with unexplained “below nearly every spell” scoring claim.
3. Apex candidate is the highest-scoring allowed candidate; off-theme Highest Score appears only for hard restriction conflict.
4. Selecting a different printing updates price/value but not score/tier.
5. Upgrade row shows Your Card/Budget/Mid/Apex, each with visible rating and price without tapping.
6. Tapping a card changes only the detail panel and selection; navigating arrows changes entire sheet.
7. Deck Power Score and Apex progress appear together on BOTH Upgrades and Build Stats, not in the left Build panel; progress stays visible at Apex.
8. Build Stats sits between Decklist and Upgrades, retains all diagnostics, keeps Deck Value and excludes Money Spent.
9. Left Build panel fits supported viewport without scroll or hidden controls; regeneration doesn't modify installed cards.
10. Apply upgrade recalculates recommendations and score; no unrequested automatic swaps.
11. Installing a Buy List card prompts before removal; No leaves list unchanged and other deck lists untouched.
12. Add All excludes all basic lands but includes nonbasic lands and commander; repeated clicks do not duplicate.
13. Export one/multiple/all groups sums quantities correctly and produces plain `N Card Name` text only.
14. Landing and top navigation reach Buy List and Library; Decks grid always has a + tile.
15. Deck Health and Game Changer counts lead to relevant, usable upgrade options.
16. Original visual identity and unrelated functions remain intact.
17. Candidate is independently browser-tested; no code changes are published without user permission.

## 18. Open points requiring explicit product decision
- Exact Buy List confirmation copy and behavior for installing fewer copies than listed.
- Whether Buy List should track selected printings as optional purchase metadata while keeping plain-text exports canonical.
- Exact supported minimum screen dimensions for a non-scrolling left Build panel.
- Thresholds and calibration method for score labels, tier reference decks and Apex completion.
- Whether Buy List export includes commander cards in a special order (default: normal aggregated text lines).

**Authority:** This document is a planning handoff only. User-approved requirements above supersede earlier exploratory mockups and assistant suggestions when inconsistent. Do not treat a design note as authorization to edit the GitHub repository.


## 19. Double-faced and multi-face card support — ALL TODO
**Goal:** Every supported two-sided Magic card must display the correct artwork, name, characteristics, and abilities for the face currently being viewed. This is a future implementation requirement, not completed work.

### UI and interaction
- Detect cards with two faces (including transforming modal double-faced cards and other supported dual-face layouts). Display a visible **Flip** button only when a second face is available; do not show a nonfunctional button on single-faced cards.
- The Flip action switches the rendered image, visible face name, mana cost where printed, type line, rules text, power/toughness or loyalty/defense where relevant, and face-specific abilities to the selected face. The view must never show back-face artwork with front-face rules or vice versa.
- Flip is a viewing action, not an in-game zone transition or a change to the deck's underlying card identity. Preserve the current face when navigating within the same card detail session when practical; resetting to front on reopening is acceptable if consistent and tested.
- Support card detail views throughout Decklist, search, Library, Buy List, deck builder and upgrade comparisons. Avoid separate, conflicting flip implementations.

### Printing integrity
- Both faces must come from the **same exact selected printing** (same provider printing identifier / set and collector-number identity, with language/finish variants handled as appropriate). Never mix a front from one printing with the back of another.
- Changing the selected printing must update both face images and associated printing metadata atomically. Where a selected printing has no usable face image, show a clear unavailable-image state rather than silently substituting a different printing.
- Keep pricing and Deck Value tied to the selected physical printing; flipping the visible face must not alter card price, owned quantity, upgrade tier, or intrinsic card identity.

### Card intelligence and search
- Index both face names and recognized combined names (e.g. `Front // Back`), with exact and partial search matching for either face. A match on the back name must resolve to the same underlying card, not create a duplicate deck entry or duplicate Buy List line.
- Use the appropriate face's actual oracle characteristics and rules text for face display. For rules/scoring/legality, respect the card's full multi-face rules and the relevant game-zone context; do not assume that flipping the viewer means the reverse face is castable or active in every zone.
- Do not infer game legality, color identity, mana value or scoring solely from whichever face is visually selected. Commander identity and deck constraints must be derived using applicable Magic rules and complete card data.
- Search result presentation should identify which face matched; opening from a back-face search may initially display that face, provided the selected printing stays consistent.

### Edge cases and QA
- Verify transforming cards, modal double-faced cards, cards with a back face that has distinct abilities/types, alternate printings, and one-sided cards. Treat other special multi-face layouts (split, adventure, meld, reversible) according to their actual data/layout rather than blindly presenting a generic two-face flip.
- Acceptance: (1) Flip button only on eligible cards; (2) front/back art, names and text remain in sync; (3) both faces always share the selected printing; (4) either name finds one card identity; (5) printing change updates both faces without changing tier; (6) pricing/Buy List/deck quantity are stable under flip; (7) face-specific abilities display correctly; (8) browser tests pass on mobile and desktop.
- Implement against Claude's earlier-this-week baseline. No ChatGPT candidate or earlier attempted implementation is considered completed or authoritative. This handoff supplies release authorization after backup and testing.


## 20. Upgrades window scroll lock after page reload — HIGH PRIORITY, ALL TODO
**Reproduction:** Reloading an open deck sometimes locks vertical scrolling inside the Upgrades content window. Changing browser zoom or resizing the viewport restores scrolling. This is a reported bug, not a verified fix.

### Required behavior and diagnosis
- The Upgrades content region must be vertically scrollable immediately after initial page load and reload, without changing zoom or viewport size.
- Diagnose initial layout measurement, flex/grid min-height, overflow containers, restored tab state, hydration/render timing, and event listeners or overlays that could intercept scrolling. Correct the underlying initialization/lifecycle issue rather than firing a synthetic resize event as a workaround.
- The left Build panel remains stationary and fits the supported viewport without its own scrolling. The right-side Upgrades region may scroll naturally.
- Preserve scroll functionality when switching among Decklist, Build Stats and Upgrades; selecting or expanding cards; filtering/searching; regenerating recommendations; restoring a saved deck; and navigating away/back.
- Do not let this repair change card selections, apply upgrades, clear recommendations, or alter the existing visual design.

### Required live-browser regression tests
1. Open a deck directly into Upgrades and verify wheel/trackpad/touch scrolling works before any resize.
2. Reload multiple times at default zoom, including with an already-open upgrade detail.
3. Navigate across tabs, return to Upgrades, and verify scrolling.
4. Exercise zoom in/out and viewport resize; scrolling must remain functional throughout.
5. Test desktop and mobile viewport sizes, long recommendation lists, search/filter changes, and regenerated results.
6. Verify scroll remains available on the actual published build after deployment, not only in a local preview.

**Release requirement:** Include this regression in the independent post-deployment live playtest.
