# A selfie video page for clients

Research for a new page on Brand resources that we send clients once a project is finished. It asks for a 30 to 60 second selfie video recorded on their phone, offers a few prompts, gets their plain-language sign-off to use it in our marketing, and collects the file into a private store, with an email to us and a copy in Google Drive. A first attempt at `/testimonial` was rejected as "basically just the PDF turned into a webpage". So this note covers how testimonial tools do the job, what phones do with video, what the law asks of the sign-off, which prompts get honest footage, and how the page fits Brand resources. Every source was read on **22 October 2026**.

Related: [prototype-options.md](../prototype-options.md) (item 14, one filled button per view; item 15, the request form's type-first steps), [ADR 0001](../adr/0001-design-system-artifact-is-the-master.md) (new controls go into the design system first), [ADR 0002](../adr/0002-page-text-meets-wcag-aa.md) (small text contrast), [GLOSSARY.md](../GLOSSARY.md) (clients aren't a visitor type yet), [button-emphasis.md](button-emphasis.md) (the filled-button rule) and commit `8b64151`, the first attempt (§7).

## How to read this

- **Sources.** First-party where possible: the testimonial tools' own help pages; Vercel, Google, Resend, Next.js, MDN and WebKit docs; federal regulations, state statutes and FTC guidance; GOV.UK, NN/g and Apple; and published studies. Secondary sources and anything before 2025 are marked. Numbers link to §9. *(judgment)* marks a recommendation, not a finding.
- **Method.** Five research streams ran side by side: flows, capture and storage, consent, prompts, and fit with the code. A separate fact-checker re-read the sources behind the capture, storage and consent claims. Its corrections are used and marked *corrected*. Claims it couldn't confirm are marked **unverified** and go on the device test list (§3.4) instead of into the design. The flow and prompt streams weren't fact-checked separately. Compass's files were read at brand-site `39cd42e`, compass-marketing-v1 `e3f0f1b` and the design system as of 22 October [173].
- **Not legal advice.** **Lawyer check** marks what a lawyer should confirm.
- **Could not be used.** Bonjoro's help page and the Smithsonian oral history guide returned 403, so only search excerpts were seen [35], [165]. Material Design's progress pages need JavaScript to render. Justia returned 403, so statutes were read through FindLaw and Onecle [134], [135], [139], and the first Pavesich link returned 404 [126]. Google's Issue Tracker needs a sign-in [53]. Apple publishes video sizes only inside the iPhone's Settings [76]. No vendor publishes credible completion rates.

---

## 1. Summary

- **Every tool runs the same flow:** intro, prompts, capture, review, details, consent, thank-you. They differ on where consent sits, whether prompts come one at a time or as a list, and whether the browser records or the client uploads a file [1]–[39].
- **The hard part is the phone, not the layout.**
  - Once the camera opens, the prompts are off screen, so they have to be few and easy to remember.
  - A 60-second video is roughly 60 to 200 MB (unverified), so it goes straight from the browser to storage, with real progress and the screen kept awake [89], [90].
  - The browser's camera shortcuts are unreliable, so the safest path is to record in the Camera app, then choose the file *(judgment)* [58].
- **Canyon's architecture works as stated.** Private Vercel Blob stores have been generally available since 30 June 2026 [85]. One catch: Vercel's Hobby plan caps Blob at 1 GB and is for non-commercial use only, so brand-site needs to be on Pro [91], [94].
- **Drive is simplest as an app acting for Canyon,** with Google's narrow `drive.file` permission *(judgment)*. Service accounts can't own files, and Zapier and Make struggle with large videos [101], [109], [111].
- **The law lets us ask and choose, but not distort.** The video has to be the client's honest opinion, edits can't change its meaning, and we're responsible for what we publish [113]. Alabama protects anyone's name, face and voice in advertising, with $5,000 statutory damages, and covers paid ads only if the person authorized them. So the sign-off has to name ads if we'll run them [125].
- **A checkbox plus a typed name is a valid signature** in Alabama and Georgia [132], [134], [135]. A personal link, a server timestamp and the exact versioned wording make the record strong.
- **Three short prompts beat five.** Five prompts in a minute leave about 30 words each [162]. Specific detail and a little candor persuade; gushing doesn't [149], [150].
- **Sound matters more than picture.** "Hold it upright" and "find a quiet room" are the two tips that count [154], [155].
- **Brand resources has some of the parts.** The request dialog and the live site's quote pages and contact card give us steps, choice cards, check tiles and sent states. A checkbox, stepper, video picker, upload progress and success panel would be new [173].
- **The first attempt's plumbing is reusable.** Commit `8b64151` has the upload, the Drive copy and the email; Canyon rejected its layout, not its code. Tag it before git clears it *(judgment)*.

---

## 2. Flow patterns

### 2.1 What the tools do

| Tool | Prompts | Capture | Consent |
|---|---|---|---|
| Vocal Video [1]–[4] | One per screen, up to 5 | In the browser only | A plain summary up front and a required toggle at the end; stores the wording agreed to |
| VideoAsk [11]–[14] | One per step, asked by the owner's own video | In the browser, or upload up to 200 MB | Optional checkbox; asking for details too early loses people |
| Testimonial.to [15]–[21] | A list of up to 5, hidden on phones while recording | In the browser; iPhones can be set to upload-only for quality | Required checkbox, logged |
| Senja [23]–[26] | 3 to 5 advised | Record or upload | Its own page; progress saved for 7 days |
| Vouch [28]–[31] | All visible, in any order | In the browser, with notes on screen | Optional checkbox |
| StoryPrompt [36], [37] | One at a time | In the browser | At the start |

Boast also stores the exact wording each person agreed to [32]; Bonjoro asks for consent last [35].

### 2.2 What carries over

- **Tell them early, confirm before sending.** Vocal Video explains use up front and asks for agreement at the end [4]. That fits "honest and transparent" best *(judgment)*.
- **Three to five prompts** [16], [23], [39], and **unlimited retakes** [1], [28].
- **On-screen prompts need in-browser recording,** and phones hide them even then [16]. With the Camera app, nothing shows while they talk.
- **A short intro video from the founders** is the most-cited lever for response rates, and the weakest in evidence: anecdotes with no figures [6], [31].
- **Form guidance:** one thing per screen on a phone [41]; buttons that name the action, not "Next" [45]; a percent bar for any wait over 10 seconds [46], [47]; fewer fields matter more than fewer steps [48]; ask for camera access only after a tap [50]; and a thank-you that says what happens next [43].

### 2.3 Five flow shapes

The setting: one video per client, often a couple, on a phone, arriving from a close-out email they've already said yes to.

- **A. Stepped guide.** Welcome · ideas · get ready · add your video · sign-off · sending · thank-you, one thing per screen. *Risk:* the most taps, and the client leaves to record, so the page has to remember where they were.
- **B. One page that changes state.** Sections unlock and collapse, and a sticky send bar turns on when the video and sign-off are in. *Risk:* the closest to the rejected PDF unless checkmarks, a live preview and the send bar carry it.
- **C. Video first.** "Add your video" is the hero, with "Haven't recorded yet? See ideas" beside it. *Risk:* clients who haven't recorded hit a wall first.
- **D. Prompt deck.** Prompts as cards that collapse into a short cue card. *Risk:* can tip into scripting. Better as a part of A, B or C.
- **E. Choose your way.** Record a video, or book the recorded interview. *Risk:* pulls people away from the video Canyon wants.

**What to prototype *(judgment)*:** A, B and C as switchable options, with D's cue card in all three and the interview as a quiet link on the first and last screens.

---

## 3. Capture and upload

### 3.1 The file

- **Format.** iPhones record HEVC in a `.MOV`, with HDR on by default [71]–[73]. Android phones send `.mp4`, and some report no file type, so check the extension too.
- **Size (unverified, secondary sources).** About 60 MB a minute at the iPhone's default 1080p, 170 MB at 4K30 and 400 MB at 4K60; Samsung runs larger [76]–[79]. Plan for 60 to 200 MB, with a 1 GB cap *(judgment)*. A 170 MB clip takes about 2.3 minutes at 10 Mbps.

### 3.2 Choosing or recording

- **Recommended *(judgment)*: record in the Camera app, then "Choose your video".** It keeps the phone's own quality and leaves the client a file to resend if the upload fails.
- **A "Record now" button is risky on iPhone.** Video captured through the browser's `capture` shortcut has come out at 480 × 360 in a WebKit bug that's still open, last confirmed on iOS 15 (dated) [58], [64]. `capture` is only a hint anyway [51], [52].
- **Unverified, to test:**
  - Chrome on Android 14 and 15 reportedly hides the camera in a plain video picker, so offering both needs two buttons [53].
  - The iPhone Photos picker's default "Automatic" format reportedly compresses video; "Current", or picking through Files, sends the original [61], [62], [66]. Expect a silent pause after tapping Add.
- **Recording inside the page isn't worth it now.** An open bug on iOS 26.6 and 27.0 records a portrait selfie as landscape (*corrected:* it plays upright but landscape, not sideways as first reported) [59], [65]. Permission is asked every time [55]. brand-site's `Permissions-Policy` header blocks the camera on every route [70]. It adds 3 to 5 days of work *(judgment)*.

### 3.3 The upload

- **Straight from the browser to private storage.** Our server functions take at most 4.5 MB, so the file never passes through them. Blob's browser upload reports progress, sends large files in parts that retry on failure, and can be cancelled [89], [90], [92].
- **No resume after a reload** *(judgment, from the API)*. A resumable protocol such as tus would add it, at the cost of leaving Blob [82].
- **Keep the page alive.** A Screen Wake Lock keeps the screen on (Safari from iOS 16.4) and has to be requested again when the client returns to the tab [68], [69]. Add a leave-page warning and "Keep this page open until you see Sent."
- **Remember their place.** The client leaves to record and Safari may reload the page, so save the step, prompt picks and names on the phone, as Senja does [25].
- **Preview before sending,** in a 9:16 frame with "Choose a different one". Desktop browsers may not play iPhone video, so show a plain card there [67].
- **Nudge on length, never block** *(judgment)*. Plain errors, GOV.UK style, and "Try again" reuses the chosen file [42].

### 3.4 Device tests for the prototype

1. iPhone, iOS 26 and 27: pick a 4K clip with "Automatic" and with "Current"; check the uploaded quality and time the pause.
2. iPhone: check the resolution of a "Record now" video.
3. Android 14 or 15, Chrome: what does the video picker offer?
4. Both phones: does the page read the length and play the preview?
5. Lock the phone and switch apps mid-upload.
6. Does Blob's completion callback reach a password-protected preview?
7. Time a 400 MB copy from Blob to Drive.

---

## 4. Storage, notification and Google Drive

### 4.1 The private store

- **Private Blob stores** opened in beta in February 2026 and became generally available on 30 June [85], [86]. Private files have no public address [84].
- **The server must check who's uploading** before it issues an upload token, or anyone can fill the store [89]. Each token can limit file type, size and expiry [90]. A newer flow (June 2026) uses Vercel's self-rotating credentials instead of a permanent key [87], [88].
- **The completion callback** is retried if it fails, but can't reach a laptop during development and may be blocked on password-protected previews [89]. A call from the browser and a daily clean-up job are cheap backups *(judgment)*.
- **The plan.** Hobby caps Blob at 1 GB, locks it for 30 days if exceeded, and allows non-commercial use only [91], [94]. On Pro, 2 to 20 videos a month cost pennies. Confirm brand-site's plan before building.

### 4.2 The notification email

- **Sent once.** It goes from the completion callback with Resend's idempotency key, so a retry never sends twice [100]. Next.js's `after()` lets the route answer quickly and send afterwards [97].
- **A link, not the file.** *Corrected:* Resend caps an email's attachments at 40 MB after encoding, about 30 MB of raw video [100].
- **What it carries:** who's in the video, the project, their sign-off choices, file size and length, and the Drive link, or until the copy lands, a signed download link that lasts up to 7 days [87].
- **A copy for the client?** brand-site's request form emails nothing back, but the consent research argues for sending clients what they signed (§5.3).

### 4.3 Getting the file into Drive

Compass's mail runs on Google Workspace [108], and every Business edition has shared drives [102].

| Option | Who owns the files | What it takes | Verdict *(judgment)* |
|---|---|---|---|
| **An app acting as Canyon** | Canyon, shared with Allison | One Google Cloud project and a one-time sign-in. Stops if access is revoked or unused for 6 months [104], [105], [107] | Recommended |
| **A shared drive** through a service account | The business | The most moving parts [95], [101] | Only if files must belong to the business |
| **By hand from the email link** | Canyon | Nothing; the link expires in 7 days | A fine first step |
| **Zapier or Make** | Depends | Make caps files at 100 to 500 MB. *Corrected:* Zapier has no single cap but times out over about 100 MB [109]–[111] | No |

The copy streams from Blob into Drive in chunks, checks the size, then deletes the Blob copy [103]. Old-style service account keys are blocked by default in newer Google Cloud organizations [106].

### 4.4 Who can upload

- **A personal link per client** can't be forged, expires, prefills names, ties the sign-off to a project and shows "we have your video" on return *(judgment)*. The live site's private quote pages already work this way.
- **One shared page** is simpler, but every upload token allows up to 1 GB, and the request form's spam checks are best-effort.
- **Unlisted either way:** `noindex` in the page and its headers, left out of the sitemap, and not blocked in robots.txt, or Google can't see the `noindex` [99]. Keep personal codes out of analytics *(judgment)*.

---

## 5. Consent and disclosure

### 5.1 The FTC

A client video on our site, accounts or ads is an "endorsement" [112], [113]. The FTC's 2024 rule on reviews and testimonials adds civil penalties, cited at up to $53,088 per violation in its December 2025 warning letters [123], [124].

- **Honest opinions, and edits that keep the meaning.** Prompts are fine; scripts, reordering that changes meaning, and AI changes to voice or face aren't [113], [117], [119].
- **What a client says, we publish as our claim.** "Our architect" is a problem twice over: our voice rule, and Alabama and Georgia limit that title to registered architects [146], [147]. Specific results, like coming in under budget, may need a "typical results" note, so leave them out [114].
- **Ask every client.** Choosing which videos to run is normal, but FTC staff say asking only happy customers "could violate the FTC Act" [117]. Send the link to every client at close-out *(judgment)*.
- **Gifts.** A thank-you promised before recording has to be disclosed in every use, spoken and on screen. A surprise afterward, or the same gift to every client, needs nothing [116], [120]. A client related to the studio is a connection to disclose [115], [121].
- **People who knew it was for an ad.** The Guides suggest the ad say so [115]. **Lawyer check:** whether a short "Compass client · recorded for us" line is needed on organic posts, or only on paid ads.

### 5.2 Name, face and voice

- **Alabama** protects every resident, famous or not. Advertising use without consent costs $5,000 per action or actual damages, plus punitive damages. Paid advertising is covered only if the person authorized it. Consent needn't be written [125].
- **Georgia** has no statute but has protected the same thing at common law since 1905 [127], [128]. Its courts haven't clearly covered voice, so name voice anyway.
- **New York** requires written consent, and a parent's for a minor [131]. **Lawyer check** for clients outside Alabama and Georgia.

### 5.3 Signing on a phone

- **A checkbox plus a typed full name is a valid signature** under federal law and both states' electronic transactions acts [132], [134], [135] (**Lawyer check**).
- **Proving it was them** rests on a client-specific link and a copy of the terms sent back to them [134].
- **Record with each video:** the time, the wording version and text, their choices, the typed name, who else is in it, and a fingerprint (SHA-256) of the file. Skip the IP address *(judgment)* [144].
- **Nothing pre-checked.** The send button stays off until the box is ticked and a name typed.

### 5.4 Other people, children, homes and privacy

- **Every adult in the video has their own rights.** Each types their name, or the signer confirms they agreed *(judgment)*.
- **Children need a parent or guardian.** Alabama's age of majority is **19** [139]; Georgia's is 18 [140]. Never name children, and keep them out of paid ads *(judgment)*.
- **Homes.** Strip the location data phones add [145], and keep house numbers and street signs out *(judgment)*.
- **Taking it down.** No law sets a deadline, and whether a free release can be withdrawn is unsettled (**Lawyer check**). Promise two business days, off the website, accounts and ads *(judgment)*.
- **Privacy.** No state privacy law applies to a studio our size [141]–[143]. But our privacy policy says personal information is used for "one purpose" and not shared [148]. The page needs a short privacy note, and the policy a "Client videos" paragraph *(judgment)*.

### 5.5 Layout and draft wording

Recommended *(judgment)*: a scope choice ("Website and social", preselected, or "Also in ads"), a naming choice, a short list of terms that updates as they choose, then one checkbox and a typed name. Longer terms sit under "The details", like the live site's legal accordion. About 110 visible words, half a minute of reading [161]. Braces mark the paid-ads version:

> **Before you send it.** Here's what you're saying yes to.
> - We'll share your video on our website and social media{, and in ads we pay to run}.
> - We may trim it, add captions or use short clips. We'll never change what you meant, or use AI to alter your words, voice or face.
> - Everyone in it agreed to be in it. Anyone under 19? You're their parent or guardian.
> - We're not paying you, and you don't owe us praise. Say what's true.
> - Changed your mind? Email us, and within two business days we'll take it down from our website and accounts{ and stop any ads}. We can't recall copies other people have already shared.
> - Your video is stored privately. Only Allison and Canyon, and anyone helping us edit, see it before it's shared.
>
> *How should we name you?* First names and town · First names only · No names
> ☐ I've read this, and I agree. · *Type your full name to sign* · We'll email you a copy. · **Sign and continue**

**Lawyer check, in one pass:** the final wording, withdrawal, out-of-state clients, the age of 19, paid ads and the privacy paragraph.

---

## 6. Prompts and coaching

### 6.1 What makes a short testimonial convincing

- **Specific beats general.** Concrete language raises satisfaction and purchase [149]. "Allison caught that the pantry door hit the fridge" persuades; "they were great" doesn't.
- **A little candor helps.** Two-sided reviews are more credible, and gushing ones less so [150]–[152]. Purchases peak at 4.2 to 4.5 stars, not 5 [153].
- **A person, a moment and a detail** make a story [156], [157].
- **A rough picture is fine; rough sound isn't.** Unpolished customer video earns trust [154], [167], but poor audio makes speakers seem less intelligent and likeable [155].

### 6.2 How many prompts, and when

- **About three.** Vendors land on 2 to 4 [8], [22], [27], and five in a minute leaves about 30 words each [162].
- **Easy to remember.** Clients read and record on the same phone, so the prompts vanish once the camera opens. Three one-word beats fit in short-term memory [160]; five sentences don't.
- **Shown at the "ready" step,** not sent days ahead, when answers turn into drafts that sound read [22]. No box to write answers in *(judgment)*.
- **Couples talk to each other,** as StoryCorps pairs people [164]. A "Just me / The two of us" toggle can switch the wording *(judgment)*.

### 6.3 The PDF's prompts, and three sets to try

Of the PDF's five: keep the opener, but say "what we designed together", since "built" invites "Compass built our house". "Worried about before" is the strongest. Replace "what working with us was actually like", which invites adjectives, with "one moment you remember", and merge it with "a detail you loved". Keep "what you'd tell a friend" last; it's the likely hook [33], [166]. Nothing invites a "good or hard" moment, the most credibility-building ingredient [150].

All three sets open with "Say your first names, and what we designed together."
- **A · Three beats.** *Before · A moment · A friend.* What was on your mind before we started? Tell us about one moment you remember. What would you tell a friend who's thinking about it?
- **B · Pick two cards.** Worried about before we met · Why you called us · First time you saw your home drawn · A room or detail you love · How we handled a change of plans · Something that surprised you, good or hard. Then always the friend.
- **C · One question.** If a friend asked what it was really like to work with us, what would you tell them? A "short on time" fallback.

### 6.4 Tips, nerves and footage

- **Tips, by how much they save the footage:** hold your phone upright (sideways can't be cropped to vertical at usable quality [167], [168]); find a quiet room [155]; face a window; phone at eye level; pause before and after [22], [34]. Use the selfie camera so people see their framing *(judgment)* [159].
- **Nerves:** retakes are fine; "We'll trim it, and we'll never change what you meant" [113]; talk to one friend [166]. No polished sample video, because people copy examples [158]. A framing drawing instead *(judgment)*.
- **What Canyon needs:** vertical 9:16 with space above the head [168]; clean audio for captions [170]; a 45 to 60 second take gives a hook, a Reel and a website cut [169], [171]. Build the hook in the edit from the friend answer [167].
- **Screen before publishing** *(judgment)*: "architect", prices, "Compass built our house", addresses, named builders, children.

---

## 7. Fit with Brand resources

- **Brand resources has one page.** Its top bar links to home-page sections, its providers mount the staff request form, and its link preview says "logos and brand guidelines". So the client page stands alone: its own route, a small wordmark header, the shared footer and its own link preview [98] *(judgment)*. Copy goes in `content/site.ts`, nothing new in `content/brand.ts` (ADR 0001). Inputs go to 16 px so iPhones don't zoom in.
- **What exists.** The design system's Button and its one-filled-per-view rule, fields, chips, cards, the drafting plate and motion. brand-site's AA-safe fields (the design system's gold labels fail ADR 0002). The request dialog's choice cards, "Step 2 of 2" line and sent state.
- **What's new:** a checkbox, a stepper, a video picker with preview, an upload progress bar, a success panel and a bottom sheet. Prototype them site-only, then add the ones Canyon keeps to the design system before merging (ADR 0001) *(judgment)*.
- **Borrow from the live site, structure not type.** The contact page's Ink band holds a Paper card that swaps to "Thank you". The private quote pages have check tiles, radio rows, a phone bottom sheet, sending, done and error states, and a sent state remembered on the device. Their Spectral text and small gold capitals predate design system version 16.
- **Why the first attempt read as a PDF.** It rebuilt each block of the guide as static markup: a masthead, a spec strip, two columns of lists, a Tan box, one form at the bottom. Nothing responded until the end, and consent was fine print.
- **What makes this one real UI** *(judgment)*: one step at a time on a plate; a stepper that collapses to "Step 2 of 4 · Record" on phones; prompt cards to pick from and a cue card of the picks; a video card that turns into a preview, then a progress bar; a sign-off with real controls and a live summary; a success panel; one filled button per step, in a sticky bar on phones.
- **Docs.** The glossary needs a **Client** visitor and a wider definition of Brand resources, and client pages need an ADR. Drafts exist in `8b64151`.

---

## 8. Open decisions

Already decided: clients upload a phone video (recording in the page is optional), 30 to 60 seconds, prompts not a script, a plain-language sign-off covering marketing and testimonials on the website and social media, a private store plus a notification email, then Google Drive. These are the edges left open, in order of how much each changes the page.

### 8.1 For Canyon

1. **Which flows should the prototype show?** All three, switchable · stepped guide only · stepped guide and video first. *Recommended:* all three, to compare on his phone.
2. **A personal link per client, or one shared page?** Personal link · one shared link · shared now, personal later. *Recommended:* a personal link: names prefilled, the upload locked to it, a receipt on return.
3. **Which prompt style leads?** Three beats · pick two cards · both side by side. *Recommended:* both, with the one question as a fallback.
4. **Can the upload start before they sign?** Sign first · upload, then delete if unsigned. *Recommended:* sign first. A video-first flow can still preview the file before signing.
5. **Are paid ads in scope?** Website and social only · always include ads · the client chooses. *Recommended:* the client chooses, with "Website and social" preselected.
6. **How are clients named?** The client chooses · first names and town · no names. *Recommended:* the client chooses, defaulting to first names and town.
7. **Should a prompt invite something hard, as well as good?** Yes, an optional card · yes, a helper line · no. *Recommended:* an optional card, if Canyon will publish mild candor.
8. **How does Drive get the file?** Automatically, as Canyon · a shared drive · by hand at first. *Recommended:* automatically, as Canyon, shared with Allison.

### 8.2 Defaults unless Canyon says otherwise

- **Plan and route:** Vercel Pro; `/testimonial`, plus `/testimonial/{code}` for personal links; unlisted and standalone.
- **Capture:** Camera app, then "Choose your video". "Record now" only if device tests pass. No in-page recorder.
- **Length and clips:** a warm note past about 90 seconds, refusing only past 3 minutes or 1 GB. "One take is plenty", up to three videos per link. A "Just me / The two of us" toggle.
- **Extras:** a quiet interview link; a framing drawing, never a sample testimonial; no gift mentioned.
- **Sign-off:** children allowed with a guardian (under 19), never named, never in ads. Takedown in two business days. "Please leave out prices and your street address." "We'll trim it, and we'll never change what you meant."
- **Records and email:** versioned wording in `content/`, a record beside each video, no IP address. The studio gets a link; the client gets a copy of what they signed. Delete the Blob copy once Drive has it.
- **Build:** tag `8b64151` and reuse its plumbing; new controls site-only until Canyon picks; one fixed-fee review by an Alabama attorney before the page goes to clients.

---

## 9. Sources

All read on 22 October 2026. Dates in brackets are the page's own date or last update, where it shows one.

**Testimonial tools**

1. Vocal Video, responding on desktop and mobile [8 Oct 2026]: https://help.vocalvideo.com/article/80-how-to-respond-to-video-collectors-on-desktop-and-mobile
2. Vocal Video, teleprompter [10 Oct 2026]: https://help.vocalvideo.com/article/128-sharing-scripts-with-a-teleprompter
3. Vocal Video, collector customization FAQ [29 Sep 2026]: https://help.vocalvideo.com/article/91-video-collector-customization
4. Vocal Video, standard and custom releases [10 Oct 2026]: https://help.vocalvideo.com/article/35-standard-and-custom-video-releases
5. Vocal Video, recorder upgrade [25 Feb 2025]: https://vocalvideo.com/resources/explore-the-major-upgrade-to-our-video-recorder/
6. Vocal Video, case study on response rates [27 Sep 2022, dated]: https://vocalvideo.com/resources/how-the-product-marketing-alliance-drives-high-video-response-rates/
7. Vocal Video, real-estate template and three-email sequence: https://vocalvideo.com/templates/real-estate-testimonial-videos
8. Vocal Video, testimonial questions [8 Mar 2021, dated]: https://vocalvideo.com/resources/video-testimonial-questions/
9. Vocal Video, 34 testimonial questions [13 Mar 2023, dated]: https://vocalvideo.com/resources/customer-testimonial-questions/
10. Vocal Video, how to get video testimonials [2 Jul 2021, dated]: https://vocalvideo.com/resources/how-to-get-video-testimonials-from-customers/
11. VideoAsk, consent checkbox: https://www.videoask.com/help/responses/360048783832-add-a-consent-checkbox-to-your-contact-form
12. VideoAsk, FAQ: https://app.videoask.com/help/how-it-works/360035487372-frequently-asked-questions
13. VideoAsk, drop-off rate (screenshots from 2022): https://www.videoask.com/help/tracking/4403727473428-analyze-the-drop-off-rate-of-your-videoask
14. VideoAsk help on uploaded versus streamed recordings (served on a customer's domain): https://inbvideo.who.int/help/video-audio/360044119891-what-s-the-difference-between-an-uploaded-recording-and-a-streamed-recording
15. Testimonial.to, overview: https://testimonial.to
16. Testimonial.to, questions on desktop and phone: https://testimonial.to/guide/articles/guide-your-users-through-questions
17. Testimonial.to, consent: https://testimonial.to/guide/articles/collect-the-users-consent
18. Testimonial.to, length limits: https://testimonial.to/guide/articles/is-there-any-time-limit-for-each-video
19. Testimonial.to, upload-only on iPhone: https://testimonial.to/guide/articles/turn-off-video-recording-for-iphone-devices
20. Testimonial.to, multi-clip recording: https://testimonial.to/guide/articles/multi-clip-video-recording
21. Testimonial.to, thank-you page: https://testimonial.to/guide/articles/all-in-one-customize-your-thank-you-page
22. Testimonial.to, a script that doesn't sound scripted [23 Aug 2026]: https://testimonial.to/resources/video-testimonial-script
23. Senja, collecting more video testimonials: https://support.senja.io/how-to-collect-more-video-testimonials-jgy9f
24. Senja, form questions and pages: https://support.senja.io/how-to-set-up-questions-and-pages-in-senja-form-rlui9
25. Senja, saving progress: https://support.senja.io/what-happens-when-customers-complete-the-form-e4h0w
26. Senja, consent and permission: https://senja.io/blog/testimonial-consent-permission
27. Senja, testimonial statistics (own platform data): https://senja.io/blog/testimonial-statistics-facts
28. Vouch, the respondent's view [27 Aug 2024]: https://vouchfor.com/blog/your-respondents-pov-the-vouch-recorder
29. Vouch, recorder settings [16 Oct 2026]: https://help.vouchfor.com/article/61-recorder-recorder-settings
30. Vouch, multi-video uploads [16 Oct 2026]: https://help.vouchfor.com/article/170-requests-multi-video-uploads
31. Vouch, response rates [Nov 2024, updated Dec 2025]: https://vouchfor.com/blog/turn-up-the-volume-increase-your-video-response-rates
32. Boast, consent tracking [16 Apr 2026]: https://boast.io/support/how-does-boast-collect-and-track-consent
33. Boast, short testimonials that convert [18 Mar 2025]: https://boast.io/how-to-make-short-video-testimonials-that-convert/
34. Boast, 11 smartphone tips [22 Apr 2025]: https://boast.io/11-tips-to-make-great-looking-testimonial-videos-on-a-smartphone
35. Bonjoro, collecting testimonials (403; search excerpts only): https://help.bonjoro.com/en/articles/5806425-collecting-testimonials
36. StoryPrompt, how clients respond [9 Sep 2026]: https://help.storyprompt.com/en/articles/7038529-how-does-my-client-respond-to-my-storyprompt
37. StoryPrompt, welcome page: https://help.storyprompt.com/en/articles/8967496-how-to-add-a-welcome-page-to-your-storyprompt
38. Trustmary, video testimonials (respondent flow not documented): https://trustmary.com/video-testimonial/
39. Famewall, collection page examples (founder's analysis) [24 Jun 2026]: https://famewall.io/blog/testimonial-collection-page-examples/

**Form and progress guidance**

40. GOV.UK Design System, question pages: https://design-system.service.gov.uk/patterns/question-pages/
41. GOV.UK Service Manual, form structure [2018]: https://www.gov.uk/service-manual/design/form-structure
42. GOV.UK Design System, file upload: https://design-system.service.gov.uk/components/file-upload/
43. GOV.UK Design System, confirmation pages: https://design-system.service.gov.uk/patterns/confirmation-pages/
44. GOV.UK Design System, check answers: https://design-system.service.gov.uk/patterns/check-answers/
45. NN/g, wizards [2017]: https://www.nngroup.com/articles/wizards/
46. NN/g, progress indicators [2014]: https://www.nngroup.com/articles/progress-indicators/
47. Apple Human Interface Guidelines, progress indicators: https://developer.apple.com/design/human-interface-guidelines/progress-indicators
48. Baymard, fields versus steps [2024]: https://baymard.com/research-articles/checkout-flow-average-form-fields
49. Baymard, required and optional fields [2018]: https://baymard.com/blog/required-optional-form-fields
50. web.dev, permission best practices [2024]: https://web.dev/articles/permissions-best-practices

**Phones, browsers and video files**

51. MDN, the `capture` attribute: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture
52. web.dev, recording video from the user: https://web.dev/articles/media-recording-video
53. addpipe, Android 14 and 15 camera option missing [Jul 2025, updated Aug 2026]: https://blog.addpipe.com/html-file-input-accept-video-camera-option-is-missing-android-14-15/ (also https://blog.addpipe.com/html-file-input-accept-video-camera-option-is-missing-android-14-15.md)
54. addpipe, iOS capture quality [2016, updated May 2026, dated tests]: https://blog.addpipe.com/video-quality-when-recording-videos-from-safari-on-ios-through-html-media-capture/
55. addpipe, recording inside the page on iOS [2021, updated May 2026]: https://blog.addpipe.com/inline-recorder-on-ios-beta.md
56. addpipe, MediaRecorder formats by browser: https://addpipe.com/tech-demos/media-recorder-api-demo/
57. WebKit, features in Safari 18.4: https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
58. WebKit bug 197216, captured video at 480 × 360 (open; last comment 2021): https://bugs.webkit.org/show_bug.cgi?id=197216
59. WebKit bug 323550, portrait selfie recorded as landscape on iOS 26.6 and 27.0 (open): https://bugs.webkit.org/show_bug.cgi?id=323550
60. WebKit bug 319396, empty upload under a service worker (fixed; brand-site has none): https://bugs.webkit.org/show_bug.cgi?id=319396
61. Apple Developer Forums, Photo Library videos compressed in Safari [2023 to 2024]: https://developer.apple.com/forums/thread/731042
62. Apple Developer Forums, picker format menu [iOS 17]: https://developer.apple.com/forums/thread/743037
63. Apple Developer Forums, iOS 13.6.1 sends originals [2020, dated]: https://developer.apple.com/forums/thread/658708
64. Apple Developer Forums, `capture="user"` at 360 × 480 [2020 to 2021, dated]: https://developer.apple.com/forums/thread/656965
65. Apple Developer Forums, portrait recording workaround [Sep 2026]: https://developer.apple.com/forums/thread/844826
66. Echo360, troubleshooting iOS uploads [6 Jan 2026]: https://support.echo360.com/hc/en-us/articles/38604331326093-Troubleshooting-iOS-Uploads
67. Can I use, HEVC: https://caniuse.com/hevc
68. Can I use, Screen Wake Lock: https://caniuse.com/wake-lock
69. MDN, Screen Wake Lock API: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
70. MDN, `Permissions-Policy: camera`: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/camera
71. Apple, iPhone video recording settings (iOS 27 guide): https://support.apple.com/guide/iphone/change-video-recording-settings-iphc1827d32f/ios
72. Apple, record a video (iOS 27): https://support.apple.com/guide/iphone/record-a-video-iph61f49e4bb/27/ios/27
73. Apple, HEIF and HEVC [5 Dec 2025]: https://support.apple.com/en-us/116944
74. Apple, editing HDR video: https://support.apple.com/HT211950
75. Apple, Final Cut Camera storage: https://support.apple.com/en-bh/guide/final-cut-camera/dev14d309a3f/ios
76. Gadget Hacks, iPhone video sizes per minute (secondary): https://ios.gadgethacks.com/how-to/enable-4k-recording-your-iphones-camera-for-higher-resolution-smoother-videos-0164933/
77. iMore, 4K video on iPhone (secondary, dated): https://www.imore.com/how-shoot-trim-edit-and-share-4k-video-iphone
78. Wistia, iPhone camera settings (secondary): https://wistia.com/blog/best-iphone-camera-settings-for-video
79. SamMobile, Samsung storage use [Mar 2026]: https://www.sammobile.com/news/how-much-storage-do-photos-and-videos-actually-use/
80. Android Authority, Pixel 10 video formats: https://www.androidauthority.com/pixel-10-video-recording-av1-vp9-3586429
81. PetaPixel, ProRes at about 6 GB a minute [Sep 2021]: https://petapixel.com/2021/09/23/iphone-13-prores-video-format-will-gobble-up-6gb-per-minute-report
82. tus, resumable uploads: https://tus.io/

**Vercel, Next.js, email and Google**

83. Vercel Blob overview [26 Aug 2026]: https://vercel.com/docs/vercel-blob
84. Vercel Blob private storage [15 Sep 2026]: https://vercel.com/docs/vercel-blob/private-storage
85. Vercel changelog, private Blob generally available [30 Jun 2026]: https://vercel.com/changelog/vercel-private-blob-is-now-generally-available
86. Vercel changelog, private Blob public beta [19 Feb 2026]: https://vercel.com/changelog/private-storage-for-vercel-blob-now-available-in-public-beta
87. Vercel Blob signed URLs [15 Sep 2026]: https://vercel.com/docs/vercel-blob/vercel-signed-urls
88. Vercel changelog, signed URLs [2 Jun 2026]: https://vercel.com/changelog/signed-urls-are-now-available-for-vercel-blob
89. Vercel Blob client uploads [15 Sep 2026]: https://vercel.com/docs/vercel-blob/client-upload
90. Vercel Blob SDK reference [26 Aug 2026]: https://vercel.com/docs/vercel-blob/using-blob-sdk
91. Vercel Blob usage and pricing [23 Sep 2026]: https://vercel.com/docs/vercel-blob/usage-and-pricing
92. Vercel Functions limits [24 Aug 2026]: https://vercel.com/docs/functions/limitations
93. Vercel cron jobs usage [15 Jul 2026]: https://vercel.com/docs/cron-jobs/usage-and-pricing
94. Vercel fair use guidelines [14 Sep 2026]: https://vercel.com/docs/limits/fair-use-guidelines
95. Vercel OIDC with Google Cloud: https://vercel.com/docs/oidc/gcp
96. npm, `@vercel/blob` (2.8.2 released 14 Oct 2026): https://www.npmjs.com/package/@vercel/blob
97. Next.js, `after()` [16 Sep 2026]: https://nextjs.org/docs/app/api-reference/functions/after
98. Next.js, `opengraph-image` [9 Jul 2026]: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
99. Google Search Central, block indexing with noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
100. Resend, send email (idempotency key, attachment limit): https://resend.com/docs/api-reference/emails/send-email
101. Google Drive API, shared drives and service accounts [3 Sep 2026]: https://developers.google.com/workspace/drive/api/guides/about-shareddrives
102. Google Workspace Updates, shared drives for Business Starter [Aug 2024]: https://workspaceupdates.googleblog.com/2024/08/shared-drive-access-business-starter.html
103. Google Drive API, uploads [3 Sep 2026]: https://developers.google.com/workspace/drive/api/guides/manage-uploads
104. Google Identity, OAuth 2.0 and refresh token expiry [16 Oct 2026]: https://developers.google.com/identity/protocols/oauth2
105. Google Drive API, scopes [3 Sep 2026]: https://developers.google.com/workspace/drive/api/guides/api-specific-auth
106. Google Cloud, secure-by-default organizations: https://docs.cloud.google.com/resource-manager/docs/secure-by-default-organizations
107. Google, OAuth verification and internal apps: https://developers.google.com/data-manager/api/devguides/concepts/oauth-verification
108. Google Public DNS, compass-design.studio mail records: https://dns.google/resolve?name=compass-design.studio&type=MX
109. Make, file size limits: https://help.make.com/working-with-files
110. Zapier Community, file size thread (staff reply): https://community.zapier.com/troubleshooting-99/failed-to-create-an-update-in-buffer-49997
111. Zapier Help, sending files in Zaps: https://help.zapier.com/hc/en-us/articles/8496288813453-Send-files-in-Zaps

**Law and regulation**

112. 16 CFR 255.0, definitions: https://www.law.cornell.edu/cfr/text/16/255.0
113. 16 CFR 255.1, honesty, context and liability: https://www.law.cornell.edu/cfr/text/16/255.1
114. 16 CFR 255.2, consumer endorsements and typical results: https://www.law.cornell.edu/cfr/text/16/255.2
115. 16 CFR 255.5, material connections: https://www.law.cornell.edu/cfr/text/16/255.5
116. FTC, Endorsement Guides: what people are asking: https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking
117. FTC, Consumer Reviews and Testimonials Rule Q&A [Nov 2024]: https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
118. 16 CFR 465.1, definitions: https://www.law.cornell.edu/cfr/text/16/465.1
119. 16 CFR 465.2, fake or false testimonials: https://www.law.cornell.edu/cfr/text/16/465.2
120. 16 CFR 465.4, incentives tied to sentiment: https://www.law.cornell.edu/cfr/text/16/465.4
121. 16 CFR 465.5, insider testimonials: https://www.law.cornell.edu/cfr/text/16/465.5
122. 16 CFR 465.7, review suppression: https://www.law.cornell.edu/cfr/text/16/465.7
123. FTC, final rule announced [14 Aug 2024]: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
124. FTC, warning letters to 10 companies [22 Dec 2025]: https://www.ftc.gov/node/327403
125. Alabama SB197 (2015), Right of Publicity Act, enrolled text: https://alison.legislature.state.al.us/files/pdf/SearchableInstruments/2015RS/PrintFiles/SB197-Enr.pdf
126. *Pavesich v. New England Life* (1905), opinion text (404 on recheck): https://faculty.uml.edu/sgallagher/pavesich_v.htm
127. 11th Circuit, *MLK Center v. American Heritage Products*, 694 F.2d 674: https://law.resource.org/pub/us/case/reporter/F2/694/694.F2d.674.81-7264.html
128. Right of Publicity Roadmap, Georgia: https://rightofpublicityroadmap.com/state_page/georgia/
129. Georgia HB 566 status: https://policyrisk.com/state-bill/GA-HB566-2025-2026
130. Alabama HB 327 (2026): https://legiscan.com/AL/text/HB327/2026
131. New York Civil Rights Law §50: https://www.nysenate.gov/legislation/laws/CVR/50
132. 15 U.S.C. 7001 (ESIGN): https://www.law.cornell.edu/uscode/text/15/7001
133. UETA as enacted in Maine (first cited; replaced by 134 and 135): https://legislature.maine.gov/statutes/10/title10ch1051.pdf
134. Ala. Code §8-1A-9, attribution of electronic signatures: https://law.onecle.com/alabama/title-8/8-1A-9.html
135. O.C.G.A. §10-12-9, attribution of electronic signatures: https://codes.findlaw.com/ga/title-10-commerce-and-trade/ga-code-sect-10-12-9/
136. Alabama UETA, Title 8 ch. 1A (403): https://law.justia.com/codes/alabama/title-8/chapter-1a/
137. Georgia UETA, Title 10 ch. 12 (403): https://law.justia.com/codes/georgia/title-10/chapter-12/
138. Ala. Code §26-1-1, age of majority (403): https://law.justia.com/codes/alabama/title-26/chapter-1/section-26-1-1
139. Ala. Code §26-1-1, age of majority: https://codes.findlaw.com/al/title-26-infants-and-incompetents/al-code-sect-26-1-1/
140. O.C.G.A. §39-1-1, age of majority: https://law.justia.com/codes/georgia/title-39/chapter-1/section-39-1-1
141. Burr & Forman, Alabama's data protection act [Jul 2026]: https://www.burr.com/newsroom/articles/alabama-enacts-comprehensive-data-protection-law
142. Alabama HB351 (2026), enrolled text: https://alison.legislature.state.al.us/files/pdf/SearchableInstruments/2026RS/HB351-enr.pdf
143. JD Supra, southeastern privacy laws: https://www.jdsupra.com/legalnews/southeastern-privacy-laws-taking-shape-6041158/
144. Dropbox Sign, audit trail: https://developers.hellosign.com/api/manual-reference-pages/glossary/security-compliance
145. Apple Personal Safety guide, location in photos and videos: https://support.apple.com/guide/personal-safety/ips0d7a5df82
146. Alabama Board for Registration of Architects, 2025 handbook: https://boa.alabama.gov/wp-content/uploads/2025/08/2025-Architect-Handbook.pdf
147. Ga. Comp. R. & Regs. 50-3-.01, use of the title "architect": https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-50-3-.01
148. Compass Design Studio, privacy policy [revised Jun 2026]: https://compass-design.studio/legal/privacy

**Research and platform guidance on footage**

149. Packard and Berger, concrete language and satisfaction (Wharton summary, 2021): https://knowledge.wharton.upenn.edu/article/how-language-boosts-customer-satisfaction/
150. Jensen, Averbeck, Zhang and Wright, credibility of online reviews (2013): https://jmis-web.org/articles/475
151. Lee and Johnson, two-sided sponsored posts (University of Florida summary, 2021): https://jou.ufl.edu/?p=451096
152. Ein-Gar, Shiv and Tormala, the blemishing effect (2012): https://ideas.repec.org/a/oup/jconrs/doi10.1086-660807.html
153. Spiegel Research Center, 4.5 stars beat 5 (2015): https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel-research-reveals-4.5-stars-are-better-than-5-The-Medill-IMC-Spiegel-Research-Center.pdf
154. Hautz, Füller, Hutter and Thürridl, user-generated video ads (2014): https://ideas.repec.org/a/eee/joinma/v28y2014i1p1-15.html
155. Newman and Schwarz, good sound, good research (2018): https://openresearch-repository.anu.edu.au/items/67350c38-062b-4837-84c9-81419829d59d
156. van Laer et al., narrative transportation meta-analysis (2014): https://openaccess.city.ac.uk/id/eprint/6755/
157. Forman, Ghose and Wiesenfeld, reviewer identity (2008): https://ideas.repec.org/a/inm/orisre/v19y2008i3p291-313.html
158. Jansson and Smith, design fixation (1991): https://pure.ul.ie/en/publications/design-fixation-from-initial-examples-provided-versus-self-genera/
159. Bailenson, nonverbal overload (2021): https://vhil.stanford.edu/publications/social-interaction/nonverbal-overload-theoretical-argument-causes-zoom-fatigue
160. Cowan, the magical number 4 in short-term memory (2001): https://pubmed.ncbi.nlm.nih.gov/11515286/
161. Brysbaert, how many words we read per minute (2019): https://reader.ku.edu/sites/reader/files/2024-01/How%20many%20words%20do%20we%20read%20per%20minute%20(1).pdf
162. Voices.com, words to time (about 150 spoken words a minute, secondary): https://www.voices.com/tools/words_to_time_conversion
163. StoryCorps, tips for a great conversation (2021): https://storycorps.org/participate/tips-for-a-great-conversation/
164. StoryCorps, what to expect at an interview: https://storycorps.org/?p=1440
165. Smithsonian Folklife and Oral History Interviewing Guide (403; search excerpts only): https://folklife.si.edu/the-smithsonian-folklife-and-oral-history-interviewing-guide/the-interview/smithsonian
166. TechSmith, getting comfortable on camera: https://www.techsmith.com/blog/get-comfortable-on-camera/
167. TikTok for Business, creative best practices [Jun 2025]: https://ads.tiktok.com/help/article/creative-best-practices
168. Meta Ads Guide, Instagram Reels specs: https://www.facebook.com/business/ads-guide/update/video/instagram-reels
169. Social Media Today, Reels extended to 3 minutes [Jan 2025]: https://www.socialmediatoday.com/news/instagram-officially-expands-reels-length-to-3-minutes/737766/
170. 3Play Media, captions survey (2019, dated): https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/
171. Wistia, optimal video length: https://wistia.com/blog/optimal-video-length
172. SocialPilot, video marketing statistics (Wyzowl 2026 survey, small sample): https://www.socialpilot.co/blog/video-marketing-statistic

**Compass's own**

173. Compass Design System artifact (README, `tokens.json`, component READMEs; last changed 22 Oct 2026): https://claude.ai/artifact/Rw1w5LKT3xh6SJpoXojNnV

Local files read, not published:
- brand-site at `39cd42e`: `README.md`, `docs/GLOSSARY.md`, `docs/adr/`, `docs/prototype-options.md`, `app/`, `components/client/RequestDialog.tsx` and `TopBar.tsx`, `lib/request.ts`, `lib/request-server.ts`, `next.config.ts`, `app/styles/`, `content/`
- brand-site commit `8b64151`, the first `/testimonial` attempt (reachable through `git reflog show claude/selfie-video-page-6e19ab`)
- compass-marketing-v1 at `e3f0f1b`: the contact page and form, the private quote pages under `src/app/(quote)/quotes/[slug]/` and `src/components/quote/`, `src/data/projects.ts`, `src/components/LegalAccordion.tsx`, the privacy page
- The handoff note, `compass-design-studio/tmp/brand-site-selfie-video-page-handoff-2026-10-22.md`
- The selfie video guide PDF's HTML source, `compass-design-studio/tmp/ugc-selfie-testimonial-guide/`
- The selfie ad angles doc, `compass/design_studio/marketing/docs/compass-selfie-ad-angles-v1.md`
