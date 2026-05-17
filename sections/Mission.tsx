import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";

export default function Mission() {
  return (
    <section id="mission">
      <div className="wrap">
        <Reveal><div className="label">01 · MISSION PROFILE</div></Reveal>
        <Reveal delay={1}>
          <h2>
            Innovative engineer building systems that scale
            <span className="muted"> — and Gen-AI workflows that ship.</span>
          </h2>
        </Reveal>

        <div className="mission-grid">
          <div className="mission-copy">
            <Reveal delay={2} as="p">
              <span className="acc">Software Engineer at {profile.org}</span>, based in {profile.location}.
              Focused on backend systems, automation, and scalable architectures — with a current emphasis on{" "}
              <span className="cyan">Gen-AI integration</span> across development workflows.
            </Reveal>
            <Reveal delay={2} as="p">
              Day-to-day: designing RESTful APIs and CI/CD pipelines, migrating legacy databases,
              modernising authentication, and embedding LLM-based tooling into engineering processes
              to lift developer productivity. Comfortable across the stack but happiest closest to
              the systems layer.
            </Reveal>
            <Reveal delay={3} as="p">
              Outside Capgemini, I prototype rapidly — an automated trading agent delivered as MVP
              in 3 days, a Shopify AI support integration that scaled to{" "}
              <span className="cyan">3,000 stores and 650K customer queries</span>. Bias toward shipping.
              Bias toward measurable impact.
            </Reveal>
          </div>

          <Reveal delay={3}>
            <aside className="holo-card" aria-label="Profile data">
              <div className="h">// PROFILE.DAT</div>
              <div className="row"><span className="k">NAME</span><span className="v">{profile.name}</span></div>
              <div className="row"><span className="k">ROLE</span><span className="v">{profile.role}</span></div>
              <div className="row"><span className="k">ORG</span><span className="v">{profile.org}</span></div>
              <div className="row"><span className="k">SECTOR</span><span className="v">{profile.location}</span></div>
              <div className="row"><span className="k">EDUCATION</span><span className="v">B.Tech CSE · SRM</span></div>
              <div className="row"><span className="k">CGPA</span><span className="v">{profile.education.cgpa}</span></div>
              <div className="row"><span className="k">FOCUS</span><span className="v">Backend · Cloud · Gen-AI</span></div>
              <div className="row"><span className="k">STATUS</span><span className="v"><span className="pill">●&nbsp;available</span></span></div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
