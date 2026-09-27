"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanProvider";

export default function PlanItemCard({ workout, tab }) {
  const { removeFromPlan, removeFromSaved, toggleDone } = usePlan();

  const handleRemove = () => {
    if (tab === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeFromSaved(workout.id);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-base-border bg-base-card p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-black sm:w-28">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-sm font-semibold uppercase ${
            workout.done ? "text-gray-500 line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-lg border border-base-border px-3 py-2 text-xs font-medium text-gray-300 hover:text-white"
        >
          View Details
        </Link>

        {tab === "plan" && (
          <button
            onClick={() => toggleDone(workout.id)}
            title="Mark as Done"
            className="rounded-lg border border-base-border p-2 text-gray-300 hover:text-accent"
          >
            <Check size={15} />
          </button>
        )}

        <button
          onClick={handleRemove}
          title="Remove"
          className="rounded-lg border border-base-border p-2 text-gray-300 hover:text-red-400"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
