"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Line = { html: string };

const COMMANDS: Record<string, () => string[] | "__clear__"> = {
  help: () => [
    "Available commands:",
    "  <span class='pr'>about</span>       · mission profile",
    "  <span class='pr'>skills</span>      · system capabilities",
    "  <span class='pr'>projects</span>    · deployed missions",
    "  <span class='pr'>experience</span>  · capgemini log",
    "  <span class='pr'>contact</span>     · transmission channels",
    "  <span class='pr'>resume</span>      · scroll to top",
    "  <span class='pr'>clear</span>       · wipe console",
  ],
  about: () => [
    "<span class='ok'>[profile]</span> Aryan Singh Jadon · Software Engineer @ Capgemini · Pune, IN",
    "Focus: backend systems · cloud · gen-AI integration.",
    "Education: B.Tech CSE · SRM · CGPA 8.1/10.",
  ],
  skills: () => [
    "<span class='pr'>languages</span> ····· C++, JavaScript (Node.js), TypeScript",
    "<span class='pr'>databases</span> ····· PostgreSQL, MySQL",
    "<span class='pr'>cloud</span> ········· AWS, Azure, Docker",
    "<span class='pr'>devops</span> ········ GitHub Actions, CI/CD, Zapier",
    "<span class='pr'>concepts</span> ······ OAuth 2.0, API Design, System Design, LLMs",
  ],
  projects: () => [
    "<span class='ok'>001</span> Automated Trading Agent · Node.js · Zerodha Kite · −40% risk, −50% latency",
    "<span class='ok'>002</span> Shopify AI Support      · Node.js · OAuth · 650K queries · 3,000 stores · −80% support cost",
    "<span class='ok'>003</span> LLM Test-Gen Agent       · Capgemini · CI/CD · +32% cycle speed",
    "<span class='ok'>004</span> Multi-Cloud Migration   · AWS + Azure · −8% compute cost",
  ],
  experience: () => [
    "<span class='ok'>[active]</span> Capgemini · Software Engineer · Oct 2024 → present",
    "  · 1.4× deploy throughput (REST APIs + GitHub Actions CI/CD)",
    "  · −14% CPU via MySQL → PostgreSQL migration",
    "  · −46% access tickets via LDAP → OAuth 2.0 modernisation",
    "  · ~75ms API latency (down from ~250ms)",
    "  · Led Gen-AI integration drive across dev teams",
  ],
  contact: () => [
    "<span class='pr'>email</span>    · jadonaryansingh@gmail.com",
    "<span class='pr'>phone</span>    · +91 62657 35822",
    "<span class='pr'>github</span>   · github.com/Aryan-Jadon18",
    "<span class='pr'>linkedin</span> · linkedin.com/in/aryan-j-4971ab1b7",
  ],
  resume: () => {
    if (typeof window !== "undefined") {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
    }
    return ["<span class='ok'>[link]</span> see hero CTAs for résumé download · returning to top..."];
  },
  clear: () => "__clear__",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] as string)
  );
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { html: `<span class="pr">aj@mc</span> ~ % welcome` },
    { html: `<span class="ok">[ok]</span> systems online · 7 modules registered` },
    { html: `Type <span class="pr">help</span> for a list of commands.` },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = input.trim();
    const lower = raw.toLowerCase();
    const echo = { html: `<span class="pr">aj@mc</span> ~ % ${escapeHtml(raw)}` };

    const fn = COMMANDS[lower];
    if (!raw) {
      setInput("");
      return;
    }
    if (!fn) {
      setLines((prev) => [
        ...prev,
        echo,
        { html: `<span class="warn">[err]</span> unknown command: ${escapeHtml(raw)} — try <span class="pr">help</span>` },
      ]);
      setInput("");
      return;
    }
    const out = fn();
    if (out === "__clear__") {
      setLines([]);
      setInput("");
      return;
    }
    setLines((prev) => [...prev, echo, ...out.map((html) => ({ html }))]);
    setInput("");
  }

  return (
    <div className="term reveal d2">
      <div className="term-bar">
        <div className="dots"><span /><span /><span /></div>
        <div className="title">aj@mission-control ~ %</div>
        <div style={{ width: 48 }} />
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <span key={i} className="term-line" dangerouslySetInnerHTML={{ __html: l.html }} />
        ))}
      </div>
      <form className="term-input" onSubmit={onSubmit}>
        <span className="ic">aj@mc ~ %</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="help / skills / projects / contact / clear"
          aria-label="terminal input"
        />
        <span className="blink">▌</span>
      </form>
    </div>
  );
}
