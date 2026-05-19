"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

const Space = dynamic(() => import("@/components/Space"), { ssr: false });

class SpaceErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function SpaceCanvas() {
  return (
    <SpaceErrorBoundary>
      <Space />
    </SpaceErrorBoundary>
  );
}
