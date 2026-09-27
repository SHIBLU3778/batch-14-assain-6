// always run this fresh on the server, never try to statically cache it
export const dynamic = "force-dynamic";

// this runs on the server, so it never hits the browser's CORS wall -
// the external worker API just doesn't send Access-Control-Allow-Origin,
// so calling it straight from the client fetch() gets blocked
export async function GET() {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Upstream fitlog API returned", res.status);
      return Response.json(
        { message: `Upstream API responded with ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    // this catches network-level failures (DNS, timeout, connection refused etc)
    // that would otherwise crash the route with an unhandled 500
    console.error("Fetching fitlog API failed:", err);
    return Response.json(
      { message: err.message || "Could not reach upstream API" },
      { status: 502 }
    );
  }
}
