"use client";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">ShibBurn AMM 🏗️🔥</h1>
        <ConnectKitButton />
      </div>

      <div className="mt-12 p-8 border border-slate-800 rounded-xl bg-slate-900/50">
        <h2 className="text-xl mb-4 text-orange-500">Infrastructure Status</h2>
        <p className="text-slate-400">Plumbing: <span className="text-green-400">Connected</span></p>
        <p className="text-slate-400">Burn Engine: <span className="text-green-400">Ready</span></p>
      </div>
    </main>
  );
}