# Marks follow one set of usage rules; only a founder adds or changes a mark

Brand resources offers nearly 30 marks, mostly to non-designers. Our four draft ground rules didn't say who approves a mark, or how to handle photos and other companies' logos. We adopt one set of usage rules: [the research's](../research/brand-kit-ground-rules.md) rewording of the four, plus the rules it found missing, adapted as below. The design system holds the wording ([0001](./0001-design-system-artifact-is-the-master.md)), and Brand resources shows the rules visually.

## What this decides

- **3:1 contrast, approved backgrounds.** Every color in a mark keeps at least 3:1 against what's directly behind it. WCAG 2.2 [exempts logos](https://www.w3.org/TR/WCAG22/#contrast-minimum), so this is our own rule. Each mark lists its approved backgrounds. Anywhere else, use the approved version with the most contrast and check it; if it's under 3:1, move the mark or use a tile instead.
- **Brand colors only, plus pure black and pure white** for one-color jobs, and no recoloring. Neither black nor white joins the brand palette ([0002](./0002-page-text-meets-wcag-aa.md)).
- **Two exceptions to the color rule.**
  - Any other color, such as a material's own finish, needs a founder's approval for that one job.
  - The glyph alone may take any brand color on a brand background, as long as it keeps 3:1.
- **Either founder,** Allison Browning or Canyon Browning, approves a new, changed or retired mark. The design system gets the change first and records who approved it. Nobody else makes one-off versions.
- **Who may use the marks.**
  - Employees and contractors, for studio work.
  - Trade partners, only to identify work done with or for the studio.
  - Anything sold needs our approval, and no use may suggest we endorse another business.
  - Beside another company's logo: about equal visual size, never merged, and joint layouts approved by the studio.
- **Every mark is labeled** with what it's for and its backgrounds. "Start here" is the most-used pair, not a "primary" mark.
- **Where the rules live.** The design system README holds the wording and the numbers. Brand resources draws most do-and-don't pictures from the mark files and those numbers. The Figma file mirrors them, and is the master only for realistic scenes ([research](../research/usage-rules-source-of-truth.md)).
- **Not decided here:**
  - The numbers themselves: minimum sizes (larger for two-tone and gold deep marks) and clear space. The design system holds them.
  - The black and white files ([issue #2](https://github.com/compass-design-studio/brand-site/issues/2), [0003](./0003-mark-file-naming-convention.md)).

## Considered options

- **Contrast in words only,** as 8 of 12 brand guides do; none of the guides we read gives a number. Rejected: a sign shop can't check "enough contrast".
- **One approver,** as the research proposed. Rejected so requests don't wait on one person.
- **No co-branding,** as 3 of 12 guides require. Rejected: job-site signs are the use trade partners most likely need.
- **A short curated kit.** Rejected: a starting pair, stated uses and a contrast tiebreaker keep large kits usable.

## Consequences

- **The design system leads.** It gets every change first, and it keeps each mark's "use it for" line and backgrounds for the sync to carry ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)). Its wording wins over this record.
- **Some changes need a new ADR.** Changing the 3:1 floor, the approvers or who may use the marks needs one. Sizes, wording and pictures change in the design system alone.
- **Stricter than WCAG.** Two-tone and gold deep marks can't sit on Paper 2 (2.91:1) or Tan (2.74:1). Two-tone print needs a proof, because Gold deep is only 3.18:1 on Paper.
- **The founders are a bottleneck** for one-off requests. With two approvers, the design system's change record is the only guard against inconsistent calls.
