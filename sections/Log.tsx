import Reveal from "@/components/Reveal";
import { experience, profile } from "@/lib/data";

// Tiny renderer: tokens <b>...</b> → highlighted; <c>...</c> → cyan
function renderAchievement(s: string) {
  // We trust this string since it's hardcoded in lib/data.ts
  return <span dangerouslySetInnerHTML={{ __html: s }} />;
}

export default function Log() {
  return (
    <section id="log">
      <div className="wrap">
        <Reveal><div className="label">03 · MISSION LOG</div></Reveal>
        <Reveal delay={1}>
          <h2>
            Active deployment<span className="muted"> — {experience.org}, Oct 2024 → present.</span>
          </h2>
        </Reveal>

        <div className="log">
          <Reveal delay={1}>
            <div className="log-item">
              <div className="meta">
                <span className="acc">[{experience.status}]</span> · {experience.period} · {experience.location}
              </div>
              <h3>{experience.title} · {experience.org}</h3>
              <div className="sub">{experience.sub}</div>

              <div className="impact-grid">
                {experience.impacts.map((m) => (
                  <div key={m.label} className="impact">
                    <div className="v">{m.value}</div>
                    <div className="k">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="achievements">
                {experience.achievements.map((a, i) => (
                  <div key={i} className="achievement">
                    <div className="ico">{String(i + 1).padStart(2, "0")}</div>
                    <div className="txt">{renderAchievement(a)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="log-item">
              <div className="meta">
                <span className="acc">[CREDENTIAL]</span> · {profile.education.period} · CHENNAI, IN
              </div>
              <h3>{profile.education.degree}</h3>
              <div className="sub">{profile.education.school} · CGPA {profile.education.cgpa}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
