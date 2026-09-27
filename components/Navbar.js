"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanProvider";

const NAV_LINKS = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-base-border bg-base-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* logo, left side */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-lg font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* nav links, middle - hidden on small screens, tucked into a simple row instead */}
        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm tracking-wide transition-colors ${
                  isActive ? "text-accent" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* badges, right side - both go to /my-plan */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-black"
          >
            Plan <span>{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-gray-500 px-3 py-1.5 text-xs font-semibold text-white"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </div>
      </div>

      {/* mobile nav row */}
      <nav className="flex justify-center gap-6 border-t border-base-border py-2 md:hidden">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-sm ${
                isActive ? "text-accent" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
