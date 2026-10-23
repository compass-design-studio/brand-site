// Site copy: section names and short page text that isn't a brand rule. Brand wording comes
// from content/brand.ts (the design system).

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brand.compass-design.studio'

export type SectionId = 'logos' | 'rules' | 'color' | 'type' | 'voice' | 'icons' | 'imagery' | 'insitu'

/** The numbered sections, in page order. Spacing sits in an unnumbered drawer after Iconography. */
export const SECTIONS: { id: SectionId; name: string; nav: string }[] = [
  { id: 'logos', name: 'Logo files', nav: 'Logo files' },
  { id: 'rules', name: 'Using the marks', nav: 'Usage' },
  { id: 'color', name: 'Color', nav: 'Color' },
  { id: 'type', name: 'Typography & fonts', nav: 'Type' },
  { id: 'voice', name: 'Voice & copy', nav: 'Voice' },
  { id: 'icons', name: 'Iconography', nav: 'Icons' },
  { id: 'imagery', name: 'Imagery', nav: 'Imagery' },
  { id: 'insitu', name: 'In situ', nav: 'In situ' },
]

export function sectionNumber(id: SectionId): string {
  return String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, '0')
}

export const STUDIO_META = 'Compass Design Studio · Northern Alabama'

export const HERO = {
  kicker: 'Brand resources',
  title: "Everything you need to put the studio's name on something.",
  lead: "Logos and brand guidelines: colors, type and the rules for using them, for the studio's staff, contractors and trade partners.",
}

export const REQUEST_COPY = {
  topBar: 'Request a file',
  closeEyebrow: 'Requests',
  closeTitle: "Need a file that isn't here?",
  closeBody: 'A missing format, a correction, or a question about using a mark. It goes to Allison and Canyon.',
  closeButton: "Tell us what's missing",
  dialogEyebrow: 'Brand resources · requests',
  dialogIntro: 'It goes to Allison and Canyon. We reply within the week.',
  trust: 'No newsletter, no spam — just a reply from the studio.',
}

/**
 * The testimonial page's sign-off: the words a client agrees to before their video uploads.
 * Each video's record quotes the version it was signed under, so change the wording only with a
 * new version. Light on purpose (Canyon, 23 October 2026): website, social and paid ads in one
 * yes, and the client picks how they're named.
 */
export const TESTIMONIAL_SIGN_OFF = {
  version: '1 · October 2026',
  title: 'Before you send it',
  lead: 'Here’s what you’re saying yes to.',
  terms: {
    me: [
      'We’ll share your video on our website, our social media and in ads we run.',
      'We may trim it, add captions or use short clips. We’ll never change what you meant.',
      'Anyone else in it is happy to be in it. For anyone under 19, you’re their parent or guardian.',
      'Changed your mind later? Email us and we’ll take it down.',
    ],
    two: [
      'We’ll share your video on our website, our social media and in ads we run.',
      'We may trim it, add captions or use short clips. We’ll never change what you meant.',
      'Everyone in it is happy to be in it. For anyone under 19, you’re their parent or guardian.',
      'Changed your mind later? Email us and we’ll take it down.',
    ],
  },
  naming: {
    question: 'When we share it, how should we name you?',
    options: [
      { value: 'names-town', label: 'First names and town', example: '“Sam and Jamie, Huntsville”' },
      { value: 'first-names', label: 'First names only', example: '“Sam and Jamie”' },
      { value: 'none', label: 'No names', example: '“The owners”' },
    ],
  },
  agree: {
    me: 'I’ve read this and I agree. Typing my name above is my signature.',
    two: 'We’ve read this and we agree. Typing our names above is our signature.',
  },
  details: {
    label: 'The details',
    items: [
      'Your video uploads privately to our web host, Vercel, then moves to our studio’s Google Drive.',
      'Only Allison and Canyon, and anyone helping us edit, see it before it’s shared.',
      'We use it for as long as we’re in business, unless you ask us to stop.',
      'We keep anything that shows where you live out of what we share.',
    ],
  },
  button: 'Agree and send',
} as const

/**
 * The testimonial page (/testimonial): page copy and small labels. The sign-off wording is
 * TESTIMONIAL_SIGN_OFF above, and the limits behind the video notes are in lib/testimonial.ts.
 */
export const TESTIMONIAL = {
  meta: {
    title: 'In your own words · Compass Design Studio',
    description: 'Send Compass Design Studio a short, honest selfie video about working with us.',
  },
  skip: 'Skip to the page',
  home: 'Compass Design Studio',

  welcome: {
    eyebrow: 'A small favor',
    title: 'In your own words.',
    lead: 'You know what working with us is really like. A short, honest video from your phone helps the next family decide if we’re right for them. The more real, the better.',
    facts: [
      { id: 'length', label: 'Length', value: 'About a minute' },
      { id: 'camera', label: 'Camera', value: 'Your phone’s selfie camera' },
      { id: 'takes', label: 'Takes', value: 'One is plenty' },
    ],
    howWeUseIt: 'We’ll share it on our website, our social media and in ads we run. You’ll see exactly what you’re agreeing to before anything is sent.',
    start: 'Let’s start',
    skip: 'Already recorded? Skip to your video',
  },
  who: {
    question: 'Who’s recording?',
    options: [
      { value: 'me', label: 'Just me' },
      { value: 'two', label: 'The two of us' },
    ],
  },
  interview: {
    text: 'Rather talk it through?',
    link: 'Book a short interview instead',
    href: 'https://calendar.app.google/cH8dUaaZQfHvUKXT7',
  },

  steps: {
    nav: 'Your progress',
    names: ['Welcome', 'Ideas', 'Get ready', 'Your video', 'Sign off'],
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    done: 'done',
    sending: 'Sending',
    allDone: 'All done',
    back: 'Back',
  },

  ideas: {
    title: 'Three things to talk about',
    lead: 'No script. Just these three, in your own words.',
    openerTag: 'First',
    opener: {
      me: 'Start by saying your first name, and what we designed together.',
      two: 'Start by saying your first names, and what we designed together.',
    },
    beats: [
      {
        id: 'before',
        word: 'Before',
        me: 'What was on your mind before we started?',
        two: 'Ask each other what was on your mind before we started.',
        hint: 'A wish, a worry, or a question nobody could answer.',
      },
      {
        id: 'moment',
        word: 'A moment',
        me: 'Tell us about one moment you remember.',
        two: 'Each of you pick one moment you remember.',
        hint: 'Seeing your home drawn for the first time, a decision we made together, a room you love.',
      },
      {
        id: 'friend',
        word: 'A friend',
        me: 'What would you tell a friend who’s thinking about it?',
        two: 'What would you tell friends who are thinking about it?',
        hint: 'Say it the way you would over dinner.',
      },
    ],
    shortOnTime: {
      label: 'Short on time?',
      question: 'If a friend asked what it was really like to work with us, what would you tell them?',
    },
    nudge: '“They were great” is kind. Tell us one thing that made it great.',
    next: 'Get ready to record',
  },

  ready: {
    title: 'Get ready to record',
    lead: 'Screenshot your card, set up your phone, then record.',
    cue: { title: 'What to say', hint: 'Screenshot this before you record.' },
    setUp: 'Set up like this',
    allSet: 'All set',
    /** Ranked: the first two matter most. */
    tips: [
      { id: 'upright', title: 'Hold your phone upright' },
      { id: 'quiet', title: 'Find a quiet room' },
      { id: 'window', title: 'Face a window' },
      { id: 'eye-level', title: 'Keep it at eye level' },
      { id: 'pause', title: 'Count to two' },
    ],
    /** Added after the first two when a couple records together. */
    tipTwo: { id: 'propped', title: 'Prop the phone up' },
    easy: ['No dressing up. Any room works.', 'Start over as many times as you like.', 'About a minute is plenty. A little over is fine.'],
    record: {
      title: 'Record it in your camera app',
      body: 'Open your phone’s camera, switch to video and the selfie camera, and talk. When you’re happy with a take, come back to this page and choose it.',
      keepOpen: 'This page will be right here when you come back.',
    },
    smallAsk: 'One small ask: please leave out prices and your street address.',
    recorded: 'I’ve recorded it',
    drawing: {
      me: 'Drawing: a phone propped upright on books at eye level, framing one person’s head and shoulders, with a window beside them lighting their face.',
      two: 'Drawing: a phone propped upright on books at eye level, framing two people side by side from the shoulders up, with a window beside them lighting their faces.',
    },
  },

  video: {
    title: 'Add your video',
    hint: 'From your photos or files, up to 1 GB. Nothing is sent until you agree.',
    choose: 'Choose your video',
    chooseAgain: 'Choose a different one',
    use: 'Use this video',
    slot: 'Your video will show here',
    notChosen: 'Not chosen yet',
    dropHere: 'Drop your video here',
    reading: 'Reading your video…',
    preview: 'Preview of your video',
    length: 'Length',
    size: 'Size',
    file: 'File',
    unknown: 'Unknown',
    notSent: 'Not sent yet',
    sending: 'Sending',
    sent: 'Sent',
    notes: {
      long: 'That’s a little long, and that’s fine. We’ll trim it.',
      tooLong: 'That one’s over three minutes. Could you record a shorter take?',
      tooBig: 'That file is over 1 GB, which is more than we can take. A shorter take will fit.',
      sideways: 'This one looks sideways. Upright works best on phones, but we’ll gladly take it.',
      noPreview: 'Your browser can’t preview this video, but it will send just fine.',
      notVideo: 'That file isn’t a video. Choose one from your photos or files.',
    },
  },

  signOff: {
    fields: {
      names: { me: 'Your full name', two: 'Your full names', placeholder: { me: 'Sam Rivera', two: 'Sam and Jamie Rivera' } },
      email: { label: 'Email', hint: 'We’ll send you a copy of what you agreed to.' },
    },
    yours: 'Your video',
    change: 'Change',
    changeSr: ' your video',
    none: 'No video chosen yet.',
    carried: 'Your details and agreement carry over from your last video.',
    trap: 'Leave this empty',
    /** Shown when uploads aren't switched on yet (no Blob store connected). */
    off: {
      text: 'Uploads aren’t switched on yet. Reply to the email we sent you with your video attached, or shared from your photos.',
      button: 'Email it to us instead',
      subject: 'Our selfie video',
    },
  },

  errors: {
    names: { me: 'Please type your full name.', two: 'Please type your full names.' },
    namesLong: 'That’s longer than we expected. Could you shorten it?',
    emailEmpty: 'Please add your email so we can send you a copy.',
    email: 'That email doesn’t look quite right.',
    agreed: 'Please check the box to agree.',
    video: 'Please choose your video first.',
    videoReading: 'One moment, we’re still reading your video.',
  },

  sending: {
    title: 'Sending your video',
    failedTitle: 'Let’s try that again',
    keepOpen: 'Keep this page open until you see “Sent”.',
    cancel: 'Cancel',
    failed: 'The upload stopped, probably a dropped connection. Your video is still chosen.',
    retry: 'Try again',
    label: 'Upload progress',
    progress: (pct: number, amount: string) => `${pct}% · ${amount}`,
    finishing: 'Finishing up',
    milestone: (pct: number) => `${pct}% sent`,
    sent: 'Sent.',
  },

  sent: {
    title: (firstNames: string) => (firstNames ? `Thank you, ${firstNames}.` : 'Thank you.'),
    body: 'It’s with Allison and Canyon now. We’ll email you a copy of what you agreed to.',
    count: (n: number) => `${['No', 'One', 'Two', 'Three'][n] ?? n} ${n === 1 ? 'video' : 'videos'} sent.`,
    another: 'Send another take',
    nextTitle: 'What happens next',
    next: {
      watch: { title: 'We watch it', detail: 'Allison and Canyon see it first.' },
      trim: { title: 'We trim and caption it', detail: 'Short clips and captions. Never a change to what you meant.' },
      share: {
        title: 'You’ll see it on our site and social',
        none: 'With no names, as you asked.',
        firstNames: (n: string) => (n ? `As “${n}”.` : 'With your first names.'),
        namesTown: (n: string) => (n ? `As “${n}”, with your town.` : 'With your first names and town.'),
      },
    },
    signOff: 'Thank you for trusting us with your home, and for helping the next family find their way to us.',
    signature: 'Allison and Canyon',
  },
}
