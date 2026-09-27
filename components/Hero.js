import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
      <div>
        <p className="font-display text-sm tracking-[0.2em] text-accent">
          WORKOUT LIBRARY
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
          Train With Intent.
          <br />
          Log Every Set.
        </h1>
        <p className="mt-5 max-w-md text-sm text-gray-400 sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-display text-sm font-semibold tracking-wide text-black transition-transform hover:-translate-y-0.5"
        >
          BROWSE WORKOUTS
          <ArrowDown size={16} />
        </a>
      </div>

      <div className="mx-auto w-full max-w-sm md:ml-auto">
        <Image
          src="/assets/banner.png"
          alt="FitLog banner"
          width={334}
          height={334}
          className="w-full rounded-2xl border border-base-border"
          priority
        />
      </div>
    </section>
  );
}
