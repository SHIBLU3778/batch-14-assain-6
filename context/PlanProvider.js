"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";
const PLAN_CAP = 5; // "cap of five lifts for today" - from the subtitle on My Plan

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // localStorage isn't available during SSR so we only touch it after mount
  const hasLoaded = useRef(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (err) {
      // if localStorage is messed up somehow just start fresh instead of crashing
      console.warn("Couldn't read saved plan from localStorage", err);
    }
    hasLoaded.current = true;
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    if (!hasLoaded.current) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved]);

  function showToast(message) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    // auto remove after a couple seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }

  function addToPlan(workout) {
    if (plan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      showToast("Today's plan is full (max 5)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    showToast("Added to today's plan");
  }

  function addToSaved(workout) {
    if (saved.some((w) => w.id === workout.id)) {
      showToast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from today's plan");
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from saved");
  }

  function toggleDone(id) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    showToast("Marked as done");
  }

  const value = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    planCap: PLAN_CAP,
    toasts,
    showToast,
    isReady,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }
  return ctx;
}
