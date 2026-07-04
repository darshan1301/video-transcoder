"use client";
/* eslint-disable @next/next/no-img-element */

import { Film, Menu, X, LogOut } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";


export default function Nav() {
  
  const [isOpen, setIsOpen] = useState(false);
  const {data: session, update, status} = useSession()
  console.log("SESSION" , session)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-primary">
            <Film className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl">Muxr</span>
        </Link>
        {status === "authenticated" && <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/" className="transition hover:text-foreground">Home</Link>
          <Link href="/upload" className="transition hover:text-foreground">Upload</Link>
          {/* <Link href="/pricing" className="transition hover:text-foreground">Pricing</Link> */}
          <Link href="/dashboard" className="transition hover:text-foreground">Dashboard</Link>
        </nav>}
        <div className="flex items-center gap-2">
          {status !== "authenticated" ? <>
          <Button variant="ghost" size="sm" asChild className="hidden rounded-full px-4 py-2 sm:inline-flex hover:cursor-pointer border-none">
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex rounded-full hover:cursor-pointer px-4">
            <Link href="/signup">Start free</Link>
          </Button>
          </> : <>
          <div className="hidden sm:flex items-center gap-3">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                className="h-8 w-8 rounded-full object-cover border border-border"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold border border-border">
                {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
              className="hover:cursor-pointer px-2 sm:px-3 py-2 border-none rounded-l flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block text-xs font-medium">Sign out</span>
            </Button>
          </div>
          </>
          }
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-muted md:hidden hover:cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100 border-b border-border/60" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden min-h-0 bg-background/90 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 px-6 py-6 text-sm text-muted-foreground">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)} 
              className="transition hover:text-foreground py-1 font-medium border-b border-border/20"
            >
              Home
            </Link>
            <Link 
              href="/upload" 
              onClick={() => setIsOpen(false)} 
              className="transition hover:text-foreground py-1 font-medium border-b border-border/20"
            >
              Upload
            </Link>
            {/* <Link 
              href="/pricing" 
              onClick={() => setIsOpen(false)} 
              className="transition hover:text-foreground py-1 font-medium border-b border-border/20"
            >
              Pricing
            </Link> */}
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)} 
              className="transition hover:text-foreground py-1 font-medium border-b border-border/20"
            >
              Dashboard
            </Link>
            {status !== "authenticated" ? (
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-border/20 sm:hidden">
                <Button variant="ghost" size="sm" asChild className="w-full rounded-full border-none justify-center hover:cursor-pointer">
                  <Link href="/signin" onClick={() => setIsOpen(false)}>Sign in</Link>
                </Button>
                <Button size="sm" asChild className="w-full justify-center rounded-full hover:cursor-pointer">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Start free</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2 pt-2 sm:hidden border-t border-border/20 pt-4">
                <div className="flex items-center gap-3 px-1 py-2">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-8 w-8 rounded-full border border-border object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-semibold">
                      {session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-foreground truncate">{session?.user?.name || "User"}</span>
                    <span className="text-[10px] text-muted-foreground truncate">{session?.user?.email}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="hover:cursor-pointer justify-start px-2 border-none rounded-full flex items-center gap-2 text-muted-foreground hover:text-foreground w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-xs font-medium">Sign out</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}