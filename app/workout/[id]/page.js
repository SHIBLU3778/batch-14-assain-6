"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Bookmark } from "lucide-react";
import Loader from "@/components/Loader";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanProvider";

export default function WorkoutDetailPage({ params }) {
  const { id } = params;
  const { addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    getWorkoutById(id)
      .then((data) => {
        if (!cancelled) setWorkout(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <Loader label="Loading workout…" />;
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">
          Workout not found
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          That lift doesn&apos;t exist, or the link is off.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-semibold text-black"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* left - big image */}
        <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-base-border bg-black sm:h-96 md:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* right - everything else */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm text-gray-400">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* key specs panel */}
          <div className="mt-6 divide-y divide-base-border rounded-xl border border-base-border bg-base-card">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="uppercase tracking-wide text-gray-500">
                  {spec.label}
                </span>
                <span className="font-medium text-white">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* instructions */}
          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              className="flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-display text-sm font-semibold text-black"
            >
              <CalendarPlus size={16} />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center justify-center gap-2 rounded-lg border border-base-border px-5 py-3 font-display text-sm font-semibold text-white"
            >
              <Bookmark size={16} />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
