"use client";

import dynamic from 'next/dynamic';

// Use dynamic import to avoid issues with D3 which requires browser APIs
const ScrollytellingContainer = dynamic(
  () => import('./components/ScrollytellingContainer'),
  { ssr: false }
);

export default function Home() {
  return <ScrollytellingContainer />;
}
