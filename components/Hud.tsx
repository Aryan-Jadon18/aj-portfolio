"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Hud() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hud">
      <div className="left">
        <div className="id">AJ<span className="acc">·</span>018</div>
        <div className="chip"><span className="dot" />ONLINE</div>
      </div>
      <div className="right">
        <span className="coords">{profile.coords}</span>
        <span className="coords">{time} IST</span>
      </div>
    </header>
  );
}
