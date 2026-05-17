import Reveal from "@/components/Reveal";
import { Mail, Phone, LinkedIn, GitHub } from "@/lib/icons";
import { profile } from "@/lib/data";

export default function Contact() {
  const channels = [
    { icon: <Mail />,     label: "// EMAIL",    value: profile.email,           href: `mailto:${profile.email}` },
    { icon: <Phone />,    label: "// PHONE",    value: profile.phone,           href: profile.phoneHref },
    { icon: <LinkedIn />, label: "// LINKEDIN", value: profile.linkedinHandle,  href: profile.linkedin, ext: true },
    { icon: <GitHub />,   label: "// GITHUB",   value: profile.githubHandle,    href: profile.github,   ext: true },
  ];

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal><div className="label">06 · TRANSMISSION CHANNEL</div></Reveal>
        <Reveal delay={1}>
          <h2>
            Open a channel<span className="muted"> — receiving signals on all bands.</span>
          </h2>
        </Reveal>

        <div className="contact-grid">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={(((i % 4) + 1) as 1 | 2 | 3 | 4)}>
              <a
                className="channel"
                href={c.href}
                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="ico">{c.icon}</div>
                <div>
                  <div className="lbl">{c.label}</div>
                  <div className="val">{c.value}</div>
                </div>
                <div className="arr">→</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
