import { getDb } from "@/db";
import { surveyResponses } from "@/db/schema";

const validExperiences = new Set([
  "거의 처음",
  "몇 번 써봤음",
  "업무/작업에 종종 씀",
  "자주 쓰고 있음",
]);

function textField(value: unknown, label: string, maxLength: number) {
  if (typeof value !== "string") {
    throw new Error(`${label}을 입력해주세요.`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label}을 입력해주세요.`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${label}은 ${maxLength}자 이내로 입력해주세요.`);
  }

  return trimmed;
}

function optionalTextField(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function stringList(value: unknown, label: string) {
  if (!Array.isArray(value)) {
    throw new Error(`${label}을 하나 이상 선택해주세요.`);
  }

  const list = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!list.length) {
    throw new Error(`${label}을 하나 이상 선택해주세요.`);
  }

  return Array.from(new Set(list)).slice(0, 16);
}

function routeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${message}\n${detail}`;

  if (
    combined.includes("no such table") ||
    combined.includes("survey_responses")
  ) {
    return "설문 응답 테이블을 찾을 수 없습니다. 배포 전에 D1 마이그레이션이 적용되어야 합니다.";
  }

  return message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const desiredWork = textField(payload.desiredWork, "해보고 싶은 작업", 800);
    const blocker = textField(payload.blocker, "궁금하거나 막히는 지점", 800);
    const experience = textField(payload.experience, "AI 툴 사용 경험", 80);

    if (!validExperiences.has(experience)) {
      return Response.json(
        { error: "AI 툴 사용 경험을 선택해주세요." },
        { status: 400 }
      );
    }

    const db = getDb();
    const [response] = await db
      .insert(surveyResponses)
      .values({
        desiredWork,
        blocker,
        experience,
        tools: stringList(payload.tools, "AI 툴"),
        toolsOther: optionalTextField(payload.toolsOther, 160),
        goals: stringList(payload.goals, "얻고 싶은 것"),
        goalsOther: optionalTextField(payload.goalsOther, 160),
        firstSessionTopics: stringList(
          payload.firstSessionTopics,
          "1회차에서 다뤄보고 싶은 주제"
        ),
        firstSessionTopicsOther: optionalTextField(
          payload.firstSessionTopicsOther,
          160
        ),
      })
      .returning({ id: surveyResponses.id });

    return Response.json({ id: response.id }, { status: 201 });
  } catch (error) {
    const message = routeError(error);
    const status = error instanceof Error ? 400 : 500;
    return Response.json({ error: message }, { status });
  }
}
