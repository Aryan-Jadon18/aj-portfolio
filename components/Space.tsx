"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Tunables — touch these to re-balance density vs perf
const STAR_FAR = { count: 3000, range: 2200, size: 1.6, color: 0xffffff };
const STAR_MID = { count: 1400, range: 1200, size: 2.6, color: 0xb4d6ff };
const STAR_NEAR = { count: 500,  range: 600,  size: 4.2, color: 0x9fc8ff };
const NEB_COUNT_DESKTOP = 7;
const NEB_COUNT_MOBILE  = 4;
const SAT_COUNT_DESKTOP = 36;
const SAT_COUNT_MOBILE  = 18;

const MOBILE_BREAKPOINT = 760;

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setM(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return m;
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setR(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return r;
}

/* ─────────────────────────────────────────────
   Layered starfield (3 buffer-geometry Points)
   ──────────────────────────────────────────── */
function StarLayer({
  count, range, size, color, speedY, speedX = 0,
}: {
  count: number; range: number; size: number; color: number;
  speedY: number; speedX?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const r = range * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const tint = 0.7 + Math.random() * 0.3;
      const c = base.clone().offsetHSL((Math.random() - 0.5) * 0.05, 0, 0).multiplyScalar(tint);
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count, range, color]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += speedY;
    ref.current.rotation.x += speedX;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   Nebula sprites (radial gradient canvas tex)
   ──────────────────────────────────────────── */
function makeNebulaTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(180,220,255,0.6)");
  g.addColorStop(0.5, "rgba(80,140,255,0.18)");
  g.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const NEB_COLORS = [0x4d8fff, 0x7c5cff, 0x00d4ff, 0xff5cf0];

function Nebulae({ count }: { count: number }) {
  const tex = useMemo(() => makeNebulaTexture(), []);
  const refs = useRef<THREE.Sprite[]>([]);
  const data = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const dist = 700 + Math.random() * 900;
      const ang = Math.random() * Math.PI * 2;
      const yJitter = (Math.random() - 0.5) * 500;
      const scl = 800 + Math.random() * 900;
      return {
        pos: [Math.cos(ang) * dist, yJitter, Math.sin(ang) * dist - 400] as [number, number, number],
        scl,
        color: NEB_COLORS[i % NEB_COLORS.length],
        baseOpacity: 0.16 + Math.random() * 0.10,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((s, i) => {
      if (!s) return;
      const d = data[i];
      (s.material as THREE.SpriteMaterial).opacity = d.baseOpacity + Math.sin(t * 0.2 + d.phase) * 0.04;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <sprite
          key={i}
          position={d.pos}
          scale={[d.scl, d.scl, 1]}
          ref={(el) => { if (el) refs.current[i] = el; }}
        >
          <spriteMaterial
            map={tex}
            color={d.color}
            transparent
            opacity={d.baseOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Wireframe planet + ring + orbiting moon + halo
   ──────────────────────────────────────────── */
function Planet({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const haloTex = useMemo(() => makeNebulaTexture(), []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.0012;
      wireRef.current.rotation.x += 0.0004;
    }
    if (coreRef.current) coreRef.current.rotation.y -= 0.0006;
    if (ringRef.current) ringRef.current.rotation.z += 0.0008;
    if (moonRef.current) {
      const mr = 140;
      moonRef.current.position.set(Math.cos(t * 0.5) * mr, Math.sin(t * 0.5) * 30, Math.sin(t * 0.5) * mr);
    }
  });

  return (
    <group ref={groupRef} position={[280, -40, -480]}>
      {/* halo */}
      <sprite scale={[420, 420, 1]}>
        <spriteMaterial
          map={haloTex}
          color={0x00d4ff}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* solid core (dark) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[68, 24, 24]} />
        <meshBasicMaterial color={0x020812} />
      </mesh>

      {/* wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[70, 2]} />
        <meshBasicMaterial color={0x00d4ff} wireframe transparent opacity={0.35} />
      </mesh>

      {/* ring */}
      <mesh ref={ringRef} rotation={[Math.PI * 0.35, Math.PI * 0.12, 0]}>
        <torusGeometry args={[110, 0.6, 8, 128]} />
        <meshBasicMaterial color={0x9fc8ff} transparent opacity={0.6} />
      </mesh>

      {/* moon */}
      <mesh ref={moonRef}>
        <icosahedronGeometry args={[6, 1]} />
        <meshBasicMaterial color={0xffffff} wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Orbiting satellites — tiny white dots
   ──────────────────────────────────────────── */
function Satellites({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const refs = useRef<THREE.Mesh[]>([]);
  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      r: 250 + Math.random() * 250,
      a: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0012,
      y: (Math.random() - 0.5) * 120,
    }));
  }, [count]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    refs.current.forEach((s, i) => {
      if (!s) return;
      const d = data[i];
      d.a += d.speed;
      s.position.set(
        Math.cos(d.a) * d.r,
        d.y + Math.sin(t * 0.3 + d.r) * 4,
        Math.sin(d.a) * d.r - 200
      );
    });
  });

  return (
    <>
      {data.map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <sphereGeometry args={[0.8, 6, 6]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Camera rig — mouse parallax + scroll dolly
   ──────────────────────────────────────────── */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollRef = useRef({ y: 0, target: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => { scrollRef.current.target = window.scrollY; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    const m = mouse.current;
    const sc = scrollRef.current;
    sc.y += (sc.target - sc.y) * 0.08;
    m.x += (m.tx - m.x) * 0.05;
    m.y += (m.ty - m.y) * 0.05;

    if (!reducedMotion) {
      camera.position.x = m.x * 22;
      camera.position.y = -m.y * 14 - sc.y * 0.04;
      camera.position.z = 200 + sc.y * 0.02;
    } else {
      camera.position.set(0, -sc.y * 0.04, 200 + sc.y * 0.02);
    }
    camera.lookAt(0, 0, -200);
  });

  return null;
}

/* ─────────────────────────────────────────────
   Distant grid disc (horizon)
   ──────────────────────────────────────────── */
function HorizonGrid() {
  return (
    <gridHelper args={[2400, 30, 0x0a4d80, 0x0a2540]} position={[0, -260, 0]}>
      <meshBasicMaterial attach="material" transparent opacity={0.15} />
    </gridHelper>
  );
}

/* ─────────────────────────────────────────────
   Exported scene
   ──────────────────────────────────────────── */
export default function Space() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  const starFarCount  = isMobile ? Math.floor(STAR_FAR.count * 0.4)  : STAR_FAR.count;
  const starMidCount  = isMobile ? Math.floor(STAR_MID.count * 0.43) : STAR_MID.count;
  const starNearCount = isMobile ? Math.floor(STAR_NEAR.count * 0.5) : STAR_NEAR.count;
  const nebCount = isMobile ? NEB_COUNT_MOBILE : NEB_COUNT_DESKTOP;
  const satCount = isMobile ? SAT_COUNT_MOBILE : SAT_COUNT_DESKTOP;

  return (
    <Canvas
      className="space-canvas"
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 58, near: 0.5, far: 4000, position: [0, 0, 0] }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000308, 1);
        scene.fog = new THREE.FogExp2(0x000308, 0.00045);
      }}
    >
      <StarLayer count={starFarCount}  range={STAR_FAR.range}  size={STAR_FAR.size}  color={STAR_FAR.color}  speedY={0.00006} />
      <StarLayer count={starMidCount}  range={STAR_MID.range}  size={STAR_MID.size}  color={STAR_MID.color}  speedY={0.00012} speedX={0.00004} />
      <StarLayer count={starNearCount} range={STAR_NEAR.range} size={STAR_NEAR.size} color={STAR_NEAR.color} speedY={0.00020} speedX={0.00006} />
      <Nebulae count={nebCount} />
      <Planet reducedMotion={reducedMotion} />
      <Satellites count={satCount} reducedMotion={reducedMotion} />
      <HorizonGrid />
      <CameraRig reducedMotion={reducedMotion} />
    </Canvas>
  );
}
