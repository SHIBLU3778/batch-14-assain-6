import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold uppercase">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-400">
        Looks like this page skipped leg day. It&apos;s not here.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-semibold text-black"
      >
        Back to workouts
      </Link>
    </div>
  );
}
