import { signIn } from "@/auth";
import { Film, Check } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#100f0c] text-foreground relative overflow-hidden font-sans">
      {/* Background ambient radial glowing gradients for design specification compliance */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[450px] max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.13_70/0.05),transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] bg-[radial-gradient(circle_at_bottom_right,oklch(0.75_0.13_70/0.03),transparent_70%)]" />

      {/* Left Column: Branding / Marketing (Forced Dark Theme) */}
      <div 
        className="relative hidden md:flex flex-col justify-between p-12 overflow-hidden border-r border-zinc-900"
        style={{ backgroundColor: "#09090b", borderColor: "#18181b" }}
      >
        {/* Subtle grid mesh background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Left ambient glow — added alongside the existing mesh div */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-[280px] w-[360px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)]" />

        {/* Architectural 4x4 Grid Background Overlay */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <div 
              key={i} 
              className="border-b border-r border-zinc-900/60 relative"
            >
              {/* Subtle ambient amber pulse inside specific boxes */}
              {(i === 5 || i === 10) && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.75_0.13_70/0.06),transparent_60%)] animate-pulse" />
              )}
              {/* Subtle architectural crosshairs/nodes on the corners of some boxes */}
              {(i === 1 || i === 6 || i === 8 || i === 15) && (
                <div className="absolute top-0 left-0 h-1 w-1 rounded-full bg-amber-500/35 -translate-x-0.5 -translate-y-0.5" />
              )}
            </div>
          ))}
        </div>

        {/* Top Branding Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500">
            <Film className="h-5 w-5 text-black" />
          </div>
          <span className="font-serif text-2xl tracking-tight text-white">Muxr</span>
        </div>

        {/* Center Marketing Statement & Highlights */}
        <div className="space-y-10 relative z-10 max-w-lg my-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Next-Gen Transcoder Node</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl leading-tight tracking-tight text-white">
              Transcode your media at the speed of light.
            </h1>
            <p className="text-zinc-400 text-sm lg:text-base leading-relaxed">
              Experience zero-config, highly-optimized container conversions, adaptive bitrate packaging, and client-side pipeline visualizers.
            </p>
          </div>

          {/* Feature Highlights */}
          <ul className="space-y-4 text-sm">
            {[
              "Automated multi-bitrate HLS (.m3u8) stream generation",
              "Lossless production rendering including Apple ProRes codec",
              "Secure client-side sandbox and high-throughput cloud cluster",
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </div>
                <span className="text-zinc-300 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer info */}
        <div className="text-xs text-zinc-500/80 relative z-10">
          © 2026 Muxr. Built for developers and creators.
        </div>
      </div>

      {/* Right Column: Google Sign-in Card (Light Theme in Contrast to Left Branding Column) */}
      <div className="flex items-center justify-center p-8 relative z-10 bg-[#fafaf9] text-zinc-900 overflow-hidden">
        {/* Light grid mesh background - increased line opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Architectural Grid Overlay for Right Column (Light Theme) - increased opacity and border visibility */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-60">
          {Array.from({ length: 16 }).map((_, i) => (
            <div 
              key={i} 
              className="border-b border-r border-zinc-300/80 relative"
            >
              {/* Subtle ambient amber pulse inside specific boxes - increased opacity */}
              {(i === 6 || i === 9) && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.09),transparent_60%)] animate-pulse" />
              )}
              {/* Subtle architectural nodes/crosshairs on the corners of some boxes - increased size and opacity */}
              {(i === 2 || i === 5 || i === 11 || i === 12) && (
                <div className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-amber-500/45 -translate-x-0.75 -translate-y-0.75" />
              )}
            </div>
          ))}
        </div>

        {/* Warm ambient glows for light theme - increased opacity for better visibility */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-[240px] w-[240px] bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 h-[160px] w-[280px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_70%)]" />

        <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-200/80 bg-white/70 backdrop-blur-xl shadow-xl shadow-zinc-200/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-all duration-300 relative z-10">
          <div className="space-y-8 text-center">
            {/* Logo display on mobile */}
            <div className="flex md:hidden items-center justify-center gap-2.5 mb-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500">
                <Film className="h-4.5 w-4.5 text-black" />
              </div>
              <span className="font-serif text-xl tracking-tight text-zinc-900">Muxr</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl tracking-tight text-zinc-900">Welcome Back</h2>
              <p className="text-xs lg:text-sm text-zinc-500 leading-relaxed">
                Authenticate using Google to access your dashboard, presets, and cloud resources.
              </p>
            </div>

            <div className="pt-2">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {redirectTo: "/"});
                }}
              >
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 sm:gap-3.5 rounded-xl bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-950 py-3 sm:py-3.5 px-3 sm:px-6 font-sans text-xs sm:text-sm font-semibold hover:cursor-pointer hover:scale-[0.99] active:scale-[0.98] shadow-sm transition-all duration-150 outline-none focus:ring-2 focus:ring-amber-500/50 whitespace-nowrap"
                >
                  {/* Google Vector Icon */}
                  <svg
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>
            </div>
          </div>

          {/* Legal / Policy links */}
          <p className="mt-8 text-center text-xs text-zinc-500 leading-normal max-w-[280px] mx-auto">
            By signing in, you agree to our{" "}
            <a href="#" className="underline text-zinc-500 hover:text-zinc-900 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-zinc-500 hover:text-zinc-900 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}