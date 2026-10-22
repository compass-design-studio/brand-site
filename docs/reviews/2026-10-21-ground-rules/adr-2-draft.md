<!-- docs/adr/0004-mark-usage-rules.md -->
# Marks follow one set of usage rules; only a founder adds or changes a mark

Brand resources offers 28 marks publicly, mostly to people who aren't designers. Our four draft ground rules left out who approves a mark, photos and other companies' logos. We adopt one set of usage rules: the four as reworded in [the research](../research/brand-kit-ground-rules.md), plus the ones it found missing. The design system holds the wording ([0001](./0001-design-system-artifact-is-the-master.md)), and Brand resources shows the rules visually.

## What this decides

- **3:1 contrast, approved backgrounds.** Every color in a mark keeps at least 3:1 against what's directly behind it, our own rule since WCAG 2.2 [exempts logos](https://www.w3.org/TR/WCAG22/#contrast-minimum). Each mark lists its approved backgrounds. Elsewhere, the highest-contrast version is checked, and below 3:1 a tile is used or the mark moves.
- **Brand colors only, plus pure black and pure white** for one-color jobs, and no recoloring. The brand palette doesn't change ([0002](./0002-page-text-meets-wcag-aa.md)).
- **Either founder,** Allison Browning or Canyon Browning, approves a new, changed or retired mark. The design system gets it first and records who approved it. Nobody else makes one-off versions.
- **Who may use the marks:** employees and contractors for studio work; trade partners only to identify work with or for the studio. Anything sold needs our approval; no use may imply we endorse another business. Beside another company's logo: about equal size, never merged, joint layouts approved by the studio.
- **Every mark is labeled** with what it's for and its backgrounds. Brand resources starts with the most used pair, not a "primary" mark.
- **Not decided here:** minimum sizes and the clear-space unit (set in the high-fidelity prototype), the black and white files and their names ([issue #2](https://github.com/compass-design-studio/brand-site/issues/2), [0003](./0003-mark-file-naming-convention.md)), and where the rules are mastered long-term.

## Considered options

- **Contrast in words only,** as 8 of 12 brand guides do; none we read gives a number. Rejected: a sign shop can't check "enough contrast".
- **One approver,** as the research proposed. Rejected so requests don't wait on one person.
- **No co-branding,** as 3 of 12 guides require. Rejected: job-site signs are the use trade partners most likely need.
- **A short curated kit.** Rejected: a default, stated uses and a contrast tiebreaker keep large kits usable.

## Consequences

- **The design system goes first here too.** Its README update lands before or with this ADR, and wins where they differ. The sync ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)) must carry each mark's "use it for" line and backgrounds.
- **Changing the 3:1 floor, the approvers or who may use the marks takes a new ADR.** Sizes, wording and pictures change in the design system.
- **Stricter than WCAG.** Two-tone and gold deep marks can't sit on Paper 2 (2.91:1), and two-tone print needs a proof, since Gold deep is only 3.18:1 on Paper.
- **A founder is a bottleneck** for one-off requests, and with two approvers the design system's approval record, not yet built, is the only guard against inconsistent calls.
