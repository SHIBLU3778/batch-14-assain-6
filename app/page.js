"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";
import SortDropdown from "@/components/SortDropdown";
import { getAllWorkouts } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("duration");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getAllWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch((err) => {
        // log the real error to the console - the message on screen stays
        // generic but this is what actually tells us CORS vs network vs 500
        console.error("getAllWorkouts failed:", err);
        if (!cancelled) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  // re-sort a copy of the list whenever sortBy or the data changes
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "caloriesBurned") return a.caloriesBurned - b.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating; // higher rating first
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase">
              The Library
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {!loading && !error && (
            <SortDropdown value={sortBy} onChange={setSortBy} />
          )}
        </div>

        <div className="mt-8">
          {loading && <Loader label="Loading workouts…" />}

          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-sm text-red-400">
                Couldn&apos;t load the library right now.
              </p>
              <p className="max-w-md text-xs text-gray-500">{error}</p>
              <button
                onClick={() => setRetryCount((c) => c + 1)}
                className="rounded-lg border border-base-border px-4 py-2 text-xs font-medium text-gray-300 hover:text-white"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
