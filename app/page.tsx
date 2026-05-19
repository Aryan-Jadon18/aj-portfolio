import SpaceCanvas from "@/components/SpaceCanvas";
import Preloader from "@/components/Preloader";
import Hud from "@/components/Hud";
import SideNav from "@/components/SideNav";
import Hero from "@/sections/Hero";
import Mission from "@/sections/Mission";
import Skills from "@/sections/Skills";
import Log from "@/sections/Log";
import Missions from "@/sections/Missions";
import Terminal from "@/components/Terminal";
import Contact from "@/sections/Contact";

export default function Page() {
  return (
    <>
      <SpaceCanvas />
      <div className="vignette" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="grain" aria-hidden />

      <Preloader />
      <Hud />
      <SideNav />

      <main className="stage">
        <Hero />
        <Mission />
        <Skills />
        <Log />
        <Missions />
        <section id="term">
          <div className="wrap">
            <div className="label reveal">05 · COMMAND TERMINAL</div>
            <h2 className="reveal d1">
              Live console<span className="muted"> — type `help` to begin.</span>
            </h2>
            <Terminal />
          </div>
        </section>
        <Contact />
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 · ARYAN SINGH JADON · MISSION CONTROL 018</span>
          <span>BUILT WITH NEXT.JS · R3F · SHIPPED FROM EARTH ORBIT</span>
        </div>
      </footer>
    </>
  );
}
