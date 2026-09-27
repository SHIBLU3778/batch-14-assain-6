import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-base-border bg-base-card transition-colors hover:border-accent/60"
    >
      <div className="relative h-44 w-full overflow-hidden bg-black">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-semibold uppercase leading-snug">
          {workout.name}
        </h3>

        <p className="text-xs text-gray-500">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
