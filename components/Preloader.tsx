"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { t: 0,    s: "[boot] mission control v4.7 ..." },
  { t: 120,  s: "[ok]   kernel handshake established" },
  { t: 240,  s: "[ok]   loading subsystem · 3d-engine" },
  { t: 380,  s: "[ok]   loading subsystem · ui-hud" },
  { t: 520,  s: "[ok]   loading subsystem · telemetry" },
  { t: 700,  s: "[warn] cosmic radiation within nominal tolerances" },
  { t: 900,  s: "[ok]   profile · aryan.s.jadon · authenticated" },
  { t: 1100, s: "[ok]   spinning up missions registry · 4 modules" },
  { t: 1300, s: "[ok]   network · transmission channels open" },
  { t: 1550, s: "[sys]  all systems nominal · stand by ..." },
];

function colourise(line: string) {
  if (line.startsWith("[ok]"))   return <><span className="ok">[ok]</span>{line.slice(4)}</>;
  if (line.startsWith("[warn]")) return <><span className="warn">[warn]</span>{line.slice(6)}</>;
  if (line.startsWith("[boot]")) return <><span className="acc">[boot]</span>{line.slice(6)}</>;
  if (line.startsWith("[sys]"))  return <><span className="acc">[sys]</span>{line.slice(5)}</>;
  return <>{line}</>;
}

export default function Preloader() {
  const [visible, setVisible] = useState<typeof BOOT_LINES>([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // Stagger lines
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((l, i) => {
      timeouts.push(setTimeout(() => {
        setVisible((prev) => [...prev, l]);
      }, l.t));
    });

    // Progress
    const start = performance.now();
    const dur = 2400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setPct(Math.floor(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Finish
    const finishT = setTimeout(() => {
      setDone(true);
      document.body.classList.remove("is-loading");
    }, 2600);

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      clearTimeout(finishT);
    };
  }, []);

  const stage =
    pct < 30 ? "booting kernel" :
    pct < 60 ? "calibrating sensors" :
    pct < 90 ? "loading constellation map" :
    "ready";

  return (
    <div className={`preloader ${done ? "done" : ""}`} role="status" aria-label="Loading">
      <div className="boot">
        <div className="brand"><span className="dot" />SYS · MISSION CONTROL · AJ-018</div>
        <div>
          {visible.map((l, i) => (
            <div key={i} className="line">{colourise(l.s)}</div>
          ))}
        </div>
        <div className="bar" />
        <div className="progress">[ {String(pct).padStart(2, "0")}% ] {stage}</div>
      </div>
    </div>
  );
}
