export type NavSection = {
  id: string;
  label: string;
};

export type JourneyEntry = {
  period: string;
  title: string;
  company: string;
  summary: string;
  signal: string;
};

export type Capability = {
  title: string;
  body: string;
};

export type WorkProof = {
  title: string;
  body: string;
  note: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  status: string;
  name: string;
  summary: string;
  body: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
};

export type Principle = {
  title: string;
  body: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const navSections: NavSection[] = [
  { id: "journey", label: "Journey" },
  { id: "now", label: "Now" },
  { id: "principles", label: "How I Work" },
  { id: "contact", label: "Contact" },
];

export const heroMetrics = [
  "Brisbane, Australia",
  "Code Wrangler @ Simpro",
  "Builder across product, frontend, backend, APIs, and AI-assisted workflows",
  "Best when the problem is ambiguous, research-heavy, or slightly cursed",
  "Trusted for outside-the-box ideas that turn strange problems into shipped software",
];

export const journeyEntries: JourneyEntry[] = [
  {
    period: "2013",
    title: "I found the kind of problems I actually liked",
    company: "Age 13 / high school",
    summary:
      "It started with Lego robots and a toolkit challenge win, then turned into a Skyrim wiki that scored an A+. I liked code more than essays, more than equations, and more than anything else I was being asked to do.",
    signal: "Spark",
  },
  {
    period: "2019 -> 2023",
    title: "I nearly threw university away, then locked the fuck in",
    company: "Griffith University / Bachelor of Information Technology",
    summary:
      "University started badly. I was in full party mode, dealing with personal issues, and got the email saying that one more failed course meant I was done. That snapped me awake. I locked in, averaged a 6.75/7 GPA, won Griffith University's Academic Improvement Award, and took home the $3000 prize.",
    signal: "Reset",
  },
  {
    period: "2023",
    title: "Redundancy forced the bet",
    company: "Freelance and indie work",
    summary:
      "I got made redundant at Dominos and had a choice: go work at another store or actually give software a real crack. I chose the second one. That stretch became four websites, two apps, and my first paid work building a site that genuinely changed a mate's business.",
    signal: "Bet",
  },
  {
    period: "2024 -> 2025",
    title: "FONSEKA showed me what real software work feels like",
    company: "Software Engineer / agency life",
    summary:
      "That era was hard work, heavy context switching, and the occasional rude startup founder, but the growth was explosive. It was the first time I was trusted to build properly inside real products instead of just theory.",
    signal: "Growth",
  },
  {
    period: "2025 -> now",
    title: "Simpro is where everything started clicking",
    company: "Simpro",
    summary:
      "For the first time, I was surrounded by seriously smart people. That changed everything. It pushed my growth harder than anywhere else, and it's where I became the guy people trust with weird, ambiguous, research-heavy problems that need good judgment before code.",
    signal: "Now",
  },
];

export const capabilities: Capability[] = [
  {
    title: "I like the awkward problems",
    body:
      "The work I enjoy most usually starts out vague, messy, or slightly cursed. That is normally a good sign. Those are the problems where product judgment and technical range actually matter.",
  },
  {
    title: "I care about choosing the right thing",
    body:
      "A lot of software work is not about heroics. It is about finding the right shape early enough that the whole thing does not drift into nonsense six weeks later.",
  },
  {
    title: "I try to improve the system around the code",
    body:
      "Docs, workflows, release confidence, search, automation. I care about the surrounding system because it changes how fast people can move and how often they get stuck.",
  },
];

export const signalStrip = [
  "Builder at scale",
  "Product judgment",
  "TypeScript first",
  "React / Next / Native",
  "Laravel / APIs",
  "AI as leverage",
  "Legacy rescue",
  "Docs that actually help",
  "Shipping beats theatre",
];

export const workProofs: WorkProof[] = [
  {
    title: "Modernised a stale product without breaking the business",
    body:
      "I led a messy dependency rescue on an aging product, moved it onto modern tooling, handled a major component-library upgrade, and left the platform in a state where future work could breathe again.",
    note: "Modernisation / risk control",
  },
  {
    title: "Rebuilt docs so developers could actually find things",
    body:
      "I rebuilt an outdated documentation experience, forked the underlying tooling, and added global search by hand so developers could actually find what they needed without guessing.",
    note: "DX / docs / adoption",
  },
  {
    title: "Became the guy for weird, research-heavy work",
    body:
      "The interesting problems are usually vague at the start. I built a reputation by taking those on, cutting through the ambiguity, and landing on solutions that make sense before the code ever tries to show off.",
    note: "Architecture / product calls",
  },
];

export const projects: Project[] = [
  {
    id: "trendsetter",
    status: "Current build",
    name: "Trendsetter",
    summary:
      "An AI-powered goal-setting app that turns a conversation into a real plan, timeline, and trackable progress system.",
    body:
      "Trendsetter is the clearest expression of where my work is heading: product-first, full-stack, and built around momentum. You talk to the system about what you want to achieve, it turns that into structure, and then the app makes the journey measurable instead of fuzzy.",
    highlights: [
      "AI-assisted planning tied to real timelines and events",
      "Progress, points, and goal visibility designed to keep the system useful after the first wow moment",
      "Built as a proper product flow, not a thin AI wrapper",
    ],
    stack: ["Expo", "React Native", "Laravel API", "OpenAI", "SQLite", "Zustand", "Jest", "Pest"],
    links: [
      { label: "App repo", href: "https://github.com/jakeb-k/trendsetter" },
      { label: "API repo", href: "https://github.com/jakeb-k/trendsetter-core" },
    ],
  },
  {
    id: "picklewear",
    status: "Shipped build",
    name: "Picklewear",
    summary:
      "A full-stack ecommerce rebuild born from a forced rebrand, with a stronger product and a sharper technical foundation on the other side.",
    body:
      "Picklewear is proof that I can build the whole thing. Storefront, admin tooling, payments, sync workflows, deployment flow, search, product ops, and the usual pile of edge cases that only show up when real people are using the system.",
    highlights: [
      "Stripe payments, automated product sync, and real admin controls",
      "Zero-downtime staging deploys through GitHub Actions and Forge",
      "Equal parts polished customer experience and operational tooling",
    ],
    stack: ["Laravel", "Inertia", "React", "MySQL", "Stripe", "GitHub Actions", "DigitalOcean", "Forge"],
    links: [
      { label: "Repo", href: "https://github.com/jakeb-k/picklewear" },
      { label: "Live site", href: "https://picklewear.com.au" },
    ],
  },
];

export const principles: Principle[] = [
  {
    title: "Start with the real problem",
    body:
      "Good software dies quickly when it solves the wrong thing beautifully. I would rather pick the right shape than brute-force the wrong one.",
  },
  {
    title: "Own the stack, own the outcome",
    body:
      "I am comfortable moving from product conversations to APIs, UI, deployment, and the occasional production gremlin hunt without changing personality.",
  },
  {
    title: "Modernise carefully",
    body:
      "Dragging old systems into the present is fun. Doing it without breaking trust is the real skill.",
  },
  {
    title: "Use AI as leverage, not identity",
    body:
      "I use AI to tighten loops, gather context, and validate work faster. The thinking was there long before the tooling showed up.",
  },
  {
    title: "Keep it human",
    body:
      "I like sharp systems and good people. The best work usually happens when both are in the room at the same time.",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "jk_web_dev@outlook.com",
    href: "mailto:jk_web_dev@outlook.com",
  },
  {
    label: "LinkedIn",
    value: "jakeb-knowles-software-dev",
    href: "https://www.linkedin.com/in/jakeb-knowles-software-dev/",
  },
];
