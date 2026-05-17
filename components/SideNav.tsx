"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data";

export default function SideNav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="sidenav" aria-label="Section navigation">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
