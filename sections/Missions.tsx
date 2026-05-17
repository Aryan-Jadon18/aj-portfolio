import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/lib/icons";
import { projects, profile } from "@/lib/data";

export default function Missions() {
  return (
    <section id="missions">
      <div className="wrap">
        <Reveal><div className="label">04 · DEPLOYED MISSIONS</div></Reveal>
        <Reveal delay={1}>
          <h2>
            Selected projects<span className="muted"> — proof of work over polish.</span>
          </h2>
        </Reveal>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(((i % 4) + 1) as 1 | 2 | 3 | 4)}>
              <article className="proj">
                <div className="proj-head">
                  <span className="proj-id">MISSION · {p.id}</span>
                  <span className="proj-status">● {p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>

                <div className="metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="m">
                      <div className="v">{m.value}</div>
                      <div className="k">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="stack">
                  {p.stack.map((s) => <span key={s}>{s}</span>)}
                </div>

                <div className="proj-foot">
                  {p.link ? (
                    <a className="ln" href={p.link.href} target="_blank" rel="noopener noreferrer">
                      {p.link.label} →
                    </a>
                  ) : (
                    <span className="ln" style={{ color: "var(--txt-2)" }}>Internal · Capgemini</span>
                  )}
                  <span className="proj-id">{p.tag}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="gh-row">
            <div className="t">
              // More repositories live at <span className="acc">github.com/{profile.githubHandle}</span> — explore the source.
            </div>
            <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
              Open GitHub
              <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
