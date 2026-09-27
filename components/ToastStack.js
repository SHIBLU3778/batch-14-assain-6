"use client";

import { usePlan } from "@/context/PlanProvider";
import { CheckCircle2 } from "lucide-react";

export default function ToastStack() {
  const { toasts } = usePlan();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-lg border border-base-border bg-base-card px-4 py-3 text-sm text-white shadow-lg shadow-black/40 animate-in"
        >
          <CheckCircle2 size={16} className="text-accent shrink-0" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
