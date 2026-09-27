"use client";

import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import Loader from "@/components/Loader";
import PlanItemCard from "@/components/PlanItemCard";
import SortDropdown from "@/components/SortDropdown";
import { usePlan } from "@/context/PlanProvider";

export default function MyPlanPage() {
  const { plan, saved, isReady } = usePlan();
  const [tab, setTab] = useState("plan"); // "plan" | "saved"
  const [sortBy, setSortBy] = useState("duration");

  // metrics only reflect Today's Plan, not the saved list
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const list = tab === "plan" ? plan : saved;

  const sortedList = [...list].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return a[sortBy] - b[sortBy];
  });

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-sm text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* metrics summary */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Exercises" value={plan.length} />
        <MetricCard label="Minutes" value={totalMinutes} />
        <MetricCard label="Calories" value={totalCalories} />
      </div>

      {/* tabs */}
      <div className="mt-8 flex gap-2 border-b border-base-border">
        <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-end gap-2">
          <span className="text-xs text-gray-500">Sort By</span>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {!isReady && <Loader label="Loading workouts…" />}

        {isReady && list.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-base-border py-16 text-center">
            <Dumbbell size={28} className="text-gray-500" />
            <h3 className="font-display text-lg font-semibold uppercase">
              Nothing here yet
            </h3>
            <p className="max-w-xs text-sm text-gray-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-semibold text-black"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {isReady && list.length > 0 && (
          <div className="flex flex-col gap-4">
            {sortedList.map((workout) => (
              <PlanItemCard key={workout.id} workout={workout} tab={tab} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-xl border border-base-border bg-base-card p-4 text-center">
      <p className="font-display text-2xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-gray-500">
        {label}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2 font-display text-sm tracking-wide ${
        active
          ? "border-accent text-accent"
          : "border-transparent text-gray-500 hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}
