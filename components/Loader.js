export default function Loader({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
      <div className="loader-spin h-8 w-8 rounded-full border-2 border-base-border border-t-accent" />
      <p className="font-display text-sm tracking-wide">{label}</p>
    </div>
  );
}
