"use client";

import { FormEvent, useState } from "react";

const tools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "Copilot",
  "Cursor",
  "Notion AI",
  "Midjourney",
  "DALL·E / 이미지 생성 툴",
  "Runway / 영상 생성 툴",
  "잘 모르겠음",
  "기타",
];

const goals = [
  "내 작업을 실제로 진척시키기",
  "업무 자동화 실마리 찾기",
  "개인 프로젝트 고도화하기",
  "AI 툴을 써보는 감각 익히기",
  "프롬프트 작성법 배우기",
  "막힌 문제를 같이 해결하기",
  "다른 사람들의 활용 방식 보기",
  "꾸준히 작업할 환경 만들기",
  "기타",
];

const topics = [
  "글쓰기/기획",
  "자료조사/정리",
  "업무 자동화",
  "플랫폼/에이전트 만들기",
  "디자인/이미지",
  "PPT/콘텐츠 기획",
  "영상/콘텐츠 제작",
  "코딩/웹/클라우드",
  "공부/학습",
  "아직 잘 모르겠음",
  "기타",
];

const experiences = [
  "거의 처음",
  "몇 번 써봤음",
  "업무/작업에 종종 씀",
  "자주 쓰고 있음",
];

function getAll(formData: FormData, key: string) {
  return formData.getAll(key).map(String).filter(Boolean);
}

function ChoiceGroup({
  legend,
  name,
  options,
  type,
  required,
}: {
  legend: string;
  name: string;
  options: string[];
  type: "checkbox" | "radio";
  required?: boolean;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-bold text-[#20201d]">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-12 items-center gap-3 rounded-md border border-[#dde0d6] bg-white px-3 py-2 text-sm font-semibold text-[#30302b] transition hover:border-[#0c7b61]"
          >
            <input
              className="h-4 w-4 accent-[#0c7b61]"
              name={name}
              required={required && type === "radio"}
              type={type}
              value={option}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function SurveyForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem("ai-mogakjak-submitted") === "true"
        ? "submitted"
        : "idle"
  );
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedTools = getAll(formData, "tools");
    const selectedGoals = getAll(formData, "goals");
    const selectedTopics = getAll(formData, "firstSessionTopics");

    if (!selectedTools.length || !selectedGoals.length || !selectedTopics.length) {
      setError("복수 선택 문항은 하나 이상 골라주세요.");
      return;
    }

    setStatus("submitting");

    const response = await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        desiredWork: String(formData.get("desiredWork") ?? ""),
        blocker: String(formData.get("blocker") ?? ""),
        experience: String(formData.get("experience") ?? ""),
        tools: selectedTools,
        toolsOther: String(formData.get("toolsOther") ?? ""),
        goals: selectedGoals,
        goalsOther: String(formData.get("goalsOther") ?? ""),
        firstSessionTopics: selectedTopics,
        firstSessionTopicsOther: String(
          formData.get("firstSessionTopicsOther") ?? ""
        ),
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setError(payload?.error ?? "응답을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.");
      setStatus("idle");
      return;
    }

    window.localStorage.setItem("ai-mogakjak-submitted", "true");
    form.reset();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="rounded-lg border border-[#cdebdc] bg-[#f1fbf5] p-6">
        <p className="text-sm font-bold text-[#0c7b61]">응답 완료</p>
        <h3 className="mt-2 text-2xl font-bold text-[#181916]">
          저장되었어요. 첫 모임에서 만나요.
        </h3>
        <p className="mt-4 text-base leading-8 text-[#3f473f]">
          1회차에는 해보고 싶은 작업 하나만 가볍게 가져오면 됩니다.
          6/20 토요일 14:00, 시청역 5층 오아시스덕수궁에서 시작합니다.
        </p>
        <button
          className="mt-5 rounded-md border border-[#0c7b61] px-4 py-2 text-sm font-bold text-[#0c7b61] transition hover:bg-white"
          type="button"
          onClick={() => {
            window.localStorage.removeItem("ai-mogakjak-submitted");
            setStatus("idle");
          }}
        >
          다시 작성하기
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-7 rounded-lg border border-[#d9ddd0] bg-[#fbfbf7] p-5 shadow-sm sm:p-6"
      onSubmit={onSubmit}
    >
      <label className="block space-y-2">
        <span className="text-lg font-bold text-[#20201d]">
          이번 시즌에 해보고 싶은 작업은 무엇인가요?
        </span>
        <textarea
          className="min-h-28 w-full rounded-md border border-[#d8dace] bg-white p-3 text-base leading-7 outline-none transition focus:border-[#0c7b61] focus:ring-2 focus:ring-[#bcebd7]"
          maxLength={800}
          name="desiredWork"
          required
          placeholder="예: 반복 업무 자동화, 플랫폼/에이전트 만들기, 자료조사 정리, 콘텐츠/PPT 기획, 이미지 작업, 개발/클라우드 프로젝트"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-lg font-bold text-[#20201d]">
          지금 가장 궁금하거나 막히는 지점은 무엇인가요?
        </span>
        <textarea
          className="min-h-28 w-full rounded-md border border-[#d8dace] bg-white p-3 text-base leading-7 outline-none transition focus:border-[#0c7b61] focus:ring-2 focus:ring-[#bcebd7]"
          maxLength={800}
          name="blocker"
          required
          placeholder="예: 어떤 툴을 써야 할지 모르겠음, 프롬프트가 원하는 대로 안 나옴, 혼자서는 시작이 잘 안 됨, 범위를 어디까지 잡아야 할지 애매함"
        />
      </label>

      <ChoiceGroup
        legend="AI 툴 사용 경험은 어느 정도인가요?"
        name="experience"
        options={experiences}
        required
        type="radio"
      />

      <ChoiceGroup
        legend="써봤거나 관심 있는 AI 툴은 무엇인가요?"
        name="tools"
        options={tools}
        type="checkbox"
      />
      <input
        className="w-full rounded-md border border-[#d8dace] bg-white p-3 text-base outline-none transition focus:border-[#0c7b61] focus:ring-2 focus:ring-[#bcebd7]"
        maxLength={160}
        name="toolsOther"
        placeholder="기타 AI 툴이 있다면 적어주세요"
      />

      <ChoiceGroup
        legend="이번 모임에서 얻고 싶은 것은 무엇인가요?"
        name="goals"
        options={goals}
        type="checkbox"
      />
      <input
        className="w-full rounded-md border border-[#d8dace] bg-white p-3 text-base outline-none transition focus:border-[#0c7b61] focus:ring-2 focus:ring-[#bcebd7]"
        maxLength={160}
        name="goalsOther"
        placeholder="기타 기대하는 것이 있다면 적어주세요"
      />

      <ChoiceGroup
        legend="1회차에서 특히 다뤄보고 싶은 주제는 무엇인가요?"
        name="firstSessionTopics"
        options={topics}
        type="checkbox"
      />
      <input
        className="w-full rounded-md border border-[#d8dace] bg-white p-3 text-base outline-none transition focus:border-[#0c7b61] focus:ring-2 focus:ring-[#bcebd7]"
        maxLength={160}
        name="firstSessionTopicsOther"
        placeholder="기타 주제가 있다면 적어주세요"
      />

      {error ? (
        <p className="rounded-md border border-[#f0b4ad] bg-[#fff4f2] px-3 py-2 text-sm font-semibold text-[#9b2c22]">
          {error}
        </p>
      ) : null}

      <button
        className="w-full rounded-md bg-[#0c7b61] px-5 py-4 text-base font-bold text-white transition hover:bg-[#096b55] disabled:cursor-not-allowed disabled:bg-[#8ba59a]"
        disabled={status === "submitting"}
        type="submit"
      >
        {status === "submitting" ? "저장 중..." : "제출하기"}
      </button>
    </form>
  );
}
