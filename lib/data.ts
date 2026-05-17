/**
 * Single source of truth for all portfolio content.
 * Edit here, render everywhere.
 */

export const profile = {
  name: "Aryan Singh Jadon",
  shortName: "Aryan Jadon",
  callsign: "AJ-018",
  role: "Software Engineer",
  org: "Capgemini",
  location: "Pune, India",
  coords: "LAT 18.52° N · LON 73.85° E",
  email: "jadonaryansingh@gmail.com",
  phone: "+91 62657 35822",
  phoneHref: "tel:+916265735822",
  github: "https://github.com/Aryan-Jadon18",
  githubHandle: "Aryan-Jadon18",
  linkedin: "https://www.linkedin.com/in/aryan-j-4971ab1b7",
  linkedinHandle: "in/aryan-j-4971ab1b7",
  tagline: "Backend systems · Cloud infra · Gen-AI integration. Shipping scalable architectures that move metrics — not just code.",
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    school: "SRM Institute of Science and Technology",
    period: "2020 – 2024",
    cgpa: "8.1 / 10",
  },
} as const;

export const heroStats = [
  { value: "1.4", unit: "×",  label: "deploy throughput" },
  { value: "−46", unit: "%",  label: "access tickets" },
  { value: "~75", unit: "ms", label: "avg API latency" },
  { value: "650", unit: "K",  label: "AI queries served" },
] as const;

export const capabilities = [
  {
    category: "Languages",
    items: ["C++", "JavaScript", "Node.js", "TypeScript"],
  },
  {
    category: "Backend",
    items: ["REST APIs", "OAuth 2.0", "System Design", "Distributed Systems"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Indexing", "Query Planning"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Gen-AI / LLM",
    items: ["LLM tooling", "Test-gen agents", "AI workflows", "Code review automation"],
  },
  {
    category: "Automation",
    items: ["Zapier", "Event-driven", "Webhooks", "Kite API"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "HTML / CSS", "Three.js"],
  },
  {
    category: "Concepts",
    items: ["API Design", "Caching", "Load balancing", "Identity / IdP"],
  },
] as const;

export const experience = {
  status: "ACTIVE",
  period: "OCT 2024 → PRESENT",
  location: "PUNE, IN",
  title: "Software Engineer",
  org: "Capgemini",
  sub: "Backend systems · CI/CD · Multi-cloud migration · Gen-AI integration lead",
  impacts: [
    { value: "1.4×",  label: "deploy throughput" },
    { value: "−14%",  label: "CPU utilisation" },
    { value: "−46%",  label: "access tickets" },
    { value: "+32%",  label: "test cycle speed" },
    { value: "~75ms", label: "API latency (↓ from 250ms)" },
    { value: "−8%",   label: "compute cost" },
  ],
  achievements: [
    "Designed <b>RESTful APIs and CI/CD pipelines</b> on GitHub Actions, lifting deployment throughput <c>1.4×</c> and reducing release errors.",
    "Migrated legacy <b>MySQL → PostgreSQL</b> with improved query planning and indexing — CPU utilisation down <c>14%</c>.",
    "Modernised legacy <b>LDAP → OAuth 2.0</b> with centralised IdP-based token access. Access support tickets dropped <c>46%</c>.",
    "Built an <b>LLM-powered testing agent</b> for intelligent test-case generation and validation — testing cycles <c>+32% faster</c>.",
    "Drove average API latency from <b>~250ms → ~75–100ms</b> via backend logic optimisation and caching strategies.",
    "Migrated <b>AWS-only → multi-cloud (AWS + Azure)</b> with optimised resource allocation. Compute costs down <c>8%</c>.",
    "Led <b>Gen-AI integration drive</b> across dev teams — embedding LLM tooling for automated code reviews and test generation.",
  ],
} as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  status: "shipped" | "production" | "active";
  metrics: { value: string; label: string }[];
  stack: string[];
  link?: { href: string; label: string };
  tag: string;
};

export const projects: Project[] = [
  {
    id: "001",
    title: "Automated Trading Agent",
    description: "Modular event-driven workflows with validation guardrails for automated order execution against Zerodha Kite. MVP delivered in three days — rapid prototyping, scalable system design, real-time API orchestration.",
    status: "shipped",
    metrics: [
      { value: "−40%", label: "execution risk" },
      { value: "−50%", label: "signal-to-execution latency" },
    ],
    stack: ["Node.js", "Zerodha Kite API", "Zapier", "Event-driven"],
    link: { href: profile.github, label: "View Source" },
    tag: "EVT · ASYNC",
  },
  {
    id: "002",
    title: "Shopify AI Customer Support",
    description: "AI-driven support automation embedded into Shopify merchants via OAuth-secured integration. Replaces routine human support with intelligent agent workflows — drops support overhead while keeping resolution quality.",
    status: "shipped",
    metrics: [
      { value: "−80%",   label: "support expense" },
      { value: "650K",   label: "queries served" },
      { value: "3,000",  label: "stores integrated" },
      { value: "24/7",   label: "automated coverage" },
    ],
    stack: ["Node.js", "OAuth 2.0", "Shopify API", "LLM"],
    link: { href: profile.github, label: "View Source" },
    tag: "AI · INTEGRATION",
  },
  {
    id: "003",
    title: "LLM Test-Generation Agent",
    description: "Internal Capgemini deployment — an autonomous testing agent that consumes API specs and generates / validates test cases with LLM reasoning. Folds directly into CI, lifts coverage without adding QA headcount.",
    status: "production",
    metrics: [
      { value: "+32%", label: "cycle speed" },
      { value: "↑",     label: "release confidence" },
    ],
    stack: ["LLM", "CI/CD", "GitHub Actions", "Node.js"],
    tag: "QA · LLM",
  },
  {
    id: "004",
    title: "Multi-Cloud Migration · AWS + Azure",
    description: "Re-architected production workload from single-cloud (AWS) to a multi-cloud topology spanning AWS + Azure. Optimised resource allocation and load distribution — meaningful cost wins, no downtime.",
    status: "production",
    metrics: [
      { value: "−8%", label: "compute cost" },
      { value: "+",   label: "scalability headroom" },
    ],
    stack: ["AWS", "Azure", "Docker", "Load balancing"],
    tag: "CLOUD · INFRA",
  },
];

export const sections = [
  { id: "hero",     label: "HOME" },
  { id: "mission",  label: "MISSION" },
  { id: "skills",   label: "SYSTEMS" },
  { id: "log",      label: "LOG" },
  { id: "missions", label: "DEPLOY" },
  { id: "term",     label: "TERMINAL" },
  { id: "contact",  label: "CONTACT" },
] as const;
