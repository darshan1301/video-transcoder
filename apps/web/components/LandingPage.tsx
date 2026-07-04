import { ArrowUpRight, Check, Film, Gauge, Layers, Sparkles } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button"
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <Pipeline />
        <Pricing />
        <CTA />
      </main>
    </div>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[420px] max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.13_70/0.15),transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            New — H.265 & AV1 hardware encoding
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Transcode video,<br />
            <span className="italic text-muted-foreground">beautifully fast.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A modern video pipeline for builders. Convert, stream, and deliver any format
            with one tiny API — built for scale, priced for sanity.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={"/upload"} className="text-white text-sm bg-primary rounded-full flex py-2 px-6 transition duration-200 hover:scale-105 hover:cursor-pointer">
              Start transcoding
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
            
            <Button size="lg" variant="ghost" className="rounded-full py-2 px-6 hover:cursor-pointer transition duration-200 hover:scale-105">
              View live demo
            </Button>
          </div>
        </div>
        <ConsolePreview />
      </div>
    </section>
  );
}

function ConsolePreview() {
  return (
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.18_0.01_80/0.25)]">
        <div className="flex items-center justify-between border-b border-border/80 bg-muted/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">muxr.transcode</span>
          <span className="text-xs text-muted-foreground">v2.4</span>
        </div>
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="border-b border-border/60 p-6 font-mono text-[13px] leading-relaxed md:border-b-0 md:border-r">
            <div className="text-muted-foreground">$ muxr transcode</div>
            <div className="mt-1">
              <span className="text-muted-foreground">→</span> source.mov{" "}
              <span className="text-accent">→</span> mp4, webm, hls
            </div>
            <div className="mt-4 space-y-1.5 text-xs">
              {[
                ["1080p · H.264", 100],
                ["720p · H.265", 86],
                ["480p · AV1", 64],
                ["HLS manifest", 42],
              ].map(([label, pct]) => (
                <div key={label as string} className="flex items-center gap-3">
                  <span className="w-32 text-muted-foreground">{label}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-10 text-right text-muted-foreground">{pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-5 text-xs text-muted-foreground">
              ✓ Completed in <span className="text-foreground">11.3s</span> · 4 outputs · 218 MB
            </div>
          </div>
          <div className="bg-muted/40 p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Live job</div>
            <div className="mt-2 font-serif text-2xl">interview-final.mov</div>
            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Region", "fra1 · eu-west"],
                ["Codec", "AV1 / H.265"],
                ["Throughput", "1.2 GB/s"],
                ["Cost", "$0.013"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-xs">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  const names = ["Lumen", "Northwave", "Atlas Studio", "Field Notes", "Parallel", "Quarter"];
  return (
    <section className="border-b border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Powering video at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {names.map((n) => (
            <span key={n} className="font-serif text-xl text-muted-foreground/70">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Gauge,
      title: "Blazing throughput",
      body: "GPU-accelerated nodes deliver real-time transcoding at any resolution, with sub-second cold starts.",
    },
    {
      icon: Layers,
      title: "Every format",
      body: "MP4, WebM, HLS, DASH, ProRes, AV1. One endpoint, dozens of presets, infinitely composable.",
    },
    {
      icon: Sparkles,
      title: "Smart presets",
      body: "Per-title encoding analyses each scene and picks bitrates that preserve quality at half the size.",
    },
    {
      icon: Film,
      title: "Adaptive streaming",
      body: "Ship multi-bitrate ladders and signed playback URLs out of the box. CDN included.",
    },
  ];
  return (
    <section id="features" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Capabilities</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Everything your video pipeline needs.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-card p-8">
              <Icon className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    { n: "01", t: "Upload", d: "Push from S3, GCS, or signed URL. We pull the source — no waiting." },
    { n: "02", t: "Transcode", d: "Choose presets or define your own ladder. Parallel jobs run in seconds." },
    { n: "03", t: "Deliver", d: "Stream from our global CDN or write outputs back to your bucket of choice." },
  ];
  return (
    <section id="pipeline" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
            Three steps,<br />
            <span className="italic text-muted-foreground">from raw to ready.</span>
          </h2>
          <p className="text-muted-foreground md:text-right">
            A pipeline so simple you'll forget it's there. So fast you'll wonder why anything else exists.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-foreground/80 pt-6">
              <div className="font-mono text-xs text-muted-foreground">{s.n}</div>
              <h3 className="mt-3 font-serif text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Hobby",
      price: "Free",
      sub: "Up to 5 hours/mo",
      features: ["All output formats", "1080p max", "Community support"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Studio",
      price: "$0.012",
      sub: "per minute encoded",
      features: ["Up to 4K · HDR", "Per-title encoding", "Global CDN delivery", "Priority support"],
      cta: "Start Studio",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      sub: "Volume + on-prem",
      features: ["Dedicated capacity", "SSO & audit logs", "99.99% SLA", "Solutions engineer"],
      cta: "Contact sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Pay for minutes, not machines.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "rounded-xl border p-8 " +
                (p.featured
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border bg-card")
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent-foreground">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl">{p.price}</span>
                <span className={"text-xs " + (p.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {p.sub}
                </span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={"mt-0.5 h-4 w-4 " + (p.featured ? "text-accent" : "text-foreground")} strokeWidth={1.5} />
                    <span className={p.featured ? "text-primary-foreground/90" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={p.featured ? "secondary" : "outline"}
                className="mt-8 py-2 w-full rounded-full hover:cursor-pointer hover:scale-[0.98] transition-all duration-300 ease-in-out"
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-5xl tracking-tight md:text-6xl">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Spin up your first job in under a minute. No credit card, no quotas, no nonsense.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full py-2 px-6 hover:cursor-pointer hover:scale-[0.98] transition-all duration-300 ease-in-out">
            Start transcoding
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full py-2 px-6 hover:cursor-pointer hover:scale-[0.98] transition-all duration-300 ease-in-out">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-primary">
            <Film className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-serif text-base text-foreground">muxr</span>
          <span>© 2026</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-foreground">Privacy</a>
          <a href="#" className="transition hover:text-foreground">Terms</a>
          <a href="#" className="transition hover:text-foreground">Status</a>
          <a href="#" className="transition hover:text-foreground">Twitter</a>
        </div>
      </div>
    </footer>
  );
}