import Reveal from "@/components/Reveal";
import { Arrow } from "@/lib/icons";
import { profile, heroStats } from "@/lib/data";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow"><span className="dot" />MISSION ENGINEER · COMMAND CONSOLE 018</div>
        </Reveal>

        <Reveal delay={1}>
          <h1>
            ARYAN<br />
            SINGH<br />
            <span className="gradient">JADON.</span>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="tagline">
            // <span className="acc">Software Engineer @ {profile.org}</span><br />
            Backend systems · Cloud infra · Gen-AI integration. Shipping scalable<br />
            architectures that move metrics — not just code.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="cta-row">
            <a href="#missions" className="btn primary">
              View Missions
              <Arrow />
            </a>
            <a href="#term" className="btn">Open Terminal</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn ↗</a>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div className="hero-stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero-stat">
                <div className="v">{s.value}<span className="small">{s.unit}</span></div>
                <div className="k">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="scroll-cue"><span>SCROLL</span><div className="arr" /></div>
    </section>
  );
}
