import { Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border/40 bg-card/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-primary">
            <Film className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-serif text-base text-foreground">muxr</span>
          <span>© 2026</span>
        </div>
        <div className="flex gap-6">
          <a href="/" className="transition hover:text-foreground">Landing Page</a>
          <a href="#" className="transition hover:text-foreground">Privacy</a>
          <a href="#" className="transition hover:text-foreground">Terms</a>
          <a href="#" className="transition hover:text-foreground">Status</a>
        </div>
      </div>
    </footer>
  );
}