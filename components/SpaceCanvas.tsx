"use client";
import dynamic from "next/dynamic";

const Space = dynamic(() => import("@/components/Space"), { ssr: false });

export default function SpaceCanvas() {
  return <Space />;
}
