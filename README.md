# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
twelve lifts, check out the full details for each one, and build out
"today's plan" — track what you're doing, mark it done, and see your
minutes/calories add up as you go.

Built for the B14-A6-Fit-Log assignment.

## Live

- Live Link: _add after deploying_
- GitHub Repo: _add after pushing_

## Tech used

- **Next.js 14** (App Router) — pages, routing, everything
- **React** — components + hooks
- **Tailwind CSS** — all the styling, dark theme with an accent lime color
- **lucide-react** — icons
- **Cloudflare Worker API** (`api.abcz.workers.dev/api/fitlog`) — workout data
- **localStorage** — keeps Today's Plan / Saved lists around after a reload

## Features

1. **Full workout library** — fetched live from the API, shown as a
   responsive 3-column grid with category tags, equipment, and a
   duration/calories/rating stats row on every card.
2. **Sort dropdown** — re-sort the library by Duration, Calories, or Rating
   without reloading anything.
3. **Workout detail pages** — two-column layout with a specs panel and
   numbered step-by-step instructions for each lift.
4. **Today's Plan + Saved, with a live badge counter** — add a workout from
   its detail page, mark it done, or remove it, and the navbar badges plus
   the Exercises/Minutes/Calories summary update instantly. Capped at 5
   lifts a day, matching the subtitle on the My Plan page.
5. **Toast notifications** everywhere something changes (added, saved,
   removed, done) so it's obvious the click actually registered.
6. **Loading + empty states** on both the library and My Plan pages, and a
   custom 404 page for any route that doesn't exist.
7. Fully **responsive** — the grid, navbar, and hero all adapt down to
   mobile.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/                 routes (home, workout/[id], my-plan, not-found)
components/          Navbar, Footer, WorkoutCard, PlanItemCard, etc.
context/             PlanProvider - today's plan / saved state + localStorage
lib/                 api.js - fetch helpers for the fitlog API
public/assets/       logo + banner images
```
