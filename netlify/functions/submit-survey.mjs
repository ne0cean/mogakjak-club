import { getStore } from "@netlify/blobs";

const VALID_EXPERIENCES = new Set([
  "거의 처음",
  "몇 번 써봤음",
  "업무/작업에 종종 씀",
  "자주 쓰고 있음",
]);

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const text = await req.text();
    const params = new URLSearchParams(text);

    const desiredWork = (params.get("desiredWork") || "").trim();
    const blocker = (params.get("blocker") || "").trim();
    const experience = (params.get("experience") || "").trim();
    const tools = params.getAll("tools[]").filter(Boolean);
    const toolsOther = (params.get("toolsOther") || "").trim().slice(0, 160);
    const goals = params.getAll("goals[]").filter(Boolean);
    const goalsOther = (params.get("goalsOther") || "").trim().slice(0, 160);
    const firstSessionTopics = params.getAll("firstSessionTopics[]").filter(Boolean);
    const firstSessionTopicsOther = (params.get("firstSessionTopicsOther") || "").trim().slice(0, 160);

    if (!desiredWork || desiredWork.length > 800) {
      return new Response(JSON.stringify({ error: "해보고 싶은 작업을 입력해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!blocker || blocker.length > 800) {
      return new Response(JSON.stringify({ error: "궁금하거나 막히는 지점을 입력해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!VALID_EXPERIENCES.has(experience)) {
      return new Response(JSON.stringify({ error: "AI 툴 사용 경험을 선택해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!tools.length) {
      return new Response(JSON.stringify({ error: "AI 툴을 하나 이상 선택해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!goals.length) {
      return new Response(JSON.stringify({ error: "얻고 싶은 것을 하나 이상 선택해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!firstSessionTopics.length) {
      return new Response(JSON.stringify({ error: "1회차 주제를 하나 이상 선택해주세요." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const store = getStore("survey-responses");
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await store.setJSON(id, {
      id,
      desiredWork,
      blocker,
      experience,
      tools,
      toolsOther,
      goals,
      goalsOther,
      firstSessionTopics,
      firstSessionTopicsOther,
      submittedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Survey submission error:", err);
    return new Response(JSON.stringify({ error: "저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
