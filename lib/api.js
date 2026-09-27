// these call our own Next.js route handlers (see app/api/fitlog), which
// proxy the actual request to the worker API from the server side.
// calling api.abcz.workers.dev directly from the browser fails because
// it doesn't return CORS headers - going through our own backend sidesteps that

export async function getAllWorkouts() {
  const res = await fetch("/api/fitlog", { cache: "no-store" });

  if (!res.ok) {
    // our route handler sends back { message } on failure - use that
    // instead of a generic string so we actually know what broke
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `Failed to load workouts (${res.status})`);
  }

  return res.json();
}

export async function getWorkoutById(id) {
  const res = await fetch(`/api/fitlog/${id}`, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || "Workout not found");
  }

  return res.json();
}
