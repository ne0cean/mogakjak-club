import { getStore } from "@netlify/blobs";

export default async function handler(req) {
  // Simple token auth: ?token=ADMIN_TOKEN env var
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (token !== adminToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  try {
    const store = getStore("survey-responses");
    const { blobs } = await store.list();

    const responses = await Promise.all(
      blobs.map(async ({ key }) => {
        const data = await store.get(key, { type: "json" });
        return data;
      })
    );

    // Sort by submittedAt descending
    responses.sort((a, b) =>
      new Date(b?.submittedAt ?? 0) - new Date(a?.submittedAt ?? 0)
    );

    return new Response(JSON.stringify(responses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("get-responses error:", err);
    return new Response(JSON.stringify({ error: "Failed to load responses" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
