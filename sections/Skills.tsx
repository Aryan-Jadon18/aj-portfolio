import Reveal from "@/components/Reveal";
import { capabilities } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal><div className="label">02 · SYSTEM CAPABILITIES</div></Reveal>
        <Reveal delay={1}>
          <h2>
            Stack inventory<span className="muted"> — calibrated for production.</span>
          </h2>
        </Reveal>

        <div className="cap-grid">
          {capabilities.map((c, i) => (
            <Reveal key={c.category} delay={((i % 4) || undefined) as 1 | 2 | 3 | undefined}>
              <div className="cap">
                <div className="cat">
                  <span>{c.category}</span>
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="items">
                  {c.items.map((it) => <span key={it}>{it}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
