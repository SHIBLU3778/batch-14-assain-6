import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-base-border bg-base-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-base font-semibold tracking-wide">
            FITLOG
          </span>
        </div>
        <p className="text-center text-xs text-gray-400 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
