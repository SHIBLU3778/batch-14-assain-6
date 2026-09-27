export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Upstream fitlog API returned", res.status, "for id", id);
      return Response.json(
        { message: "Workout not found" },
        { status: res.status === 404 ? 404 : 502 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Fetching fitlog API failed:", err);
    return Response.json(
      { message: err.message || "Could not reach upstream API" },
      { status: 502 }
    );
  }
}
