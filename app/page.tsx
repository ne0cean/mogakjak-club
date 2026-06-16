import SurveyForm from "./survey-form";

const sessions = [
  {
    date: "6/20",
    title: "내가 해보고 싶은 작업을 정하고 AI와 시작하기",
    body: "막연한 아이디어를 오늘 해볼 수 있는 작업으로 좁히고, 각자의 일과 생활에 AI를 어디에 붙이면 좋을지 함께 찾아봅니다.",
  },
  {
    date: "7/18",
    title: "작업 중 막힌 지점 풀어보기",
    body: "각자 해본 과정을 나누고, 프롬프트와 도구 선택, 작업 범위, 실행 순서를 조정하면서 병목을 같이 풀어봅니다.",
  },
  {
    date: "8/29",
    title: "결과와 배운 점 나누고 다음 루틴 만들기",
    body: "완성 여부보다 시도한 과정과 배운 점을 정리하고, 혼자서도 이어갈 수 있는 작업 루틴을 만듭니다.",
  },
];

const rhythms = [
  "룰은 없습니다. 노트북과 열린 마음, 그리고 약간의 들뜬 기분만 챙겨오세요.",
  "매 시간 10분씩 쉬면서 집중력을 다시 채웁니다.",
  "고민이나 막히는 지점은 바로 공유합니다. 같이 보면 의외로 빨리 풀릴 때가 많습니다.",
  "새로 발견한 툴, 프롬프트, 방식이 있다면 자유롭게 나눕니다.",
  "서로 다른 업종과 맥락을 짧게 설명하고, 질문은 편하게 주고받습니다.",
  "각자의 작업 속도와 몰입 시간을 존중합니다.",
];

const participantContexts = [
  "공공/지자체",
  "금융/보험",
  "제조/화학",
  "콘텐츠/기획",
  "창업",
  "개발/AI 실무",
  "마케팅/영업",
];

const motivationThemes = [
  "미루던 AI 작업을 실제로 진척시키기",
  "반복 업무를 자동화할 실마리 찾기",
  "개인 프로젝트나 에이전트 고도화하기",
  "프롬프트와 툴 사용법을 서로 공유하기",
  "다른 사람들의 활용 방식을 가까이서 보기",
  "혼자서는 어려운 몰입 환경과 데드라인 만들기",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111111]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-workshop.png"
          alt="노트북으로 각자의 작업을 하는 작은 모임"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        <div className="relative mx-auto flex min-h-[660px] max-w-6xl flex-col justify-between px-5 py-10 sm:px-8 lg:px-10">
          <p
            className="font-mono text-[11px] uppercase text-white/40"
            style={{ letterSpacing: "0.18em" }}
          >
            AI Co-working Club &nbsp;·&nbsp; 2025 &nbsp;·&nbsp; 총 3회
          </p>

          <div className="max-w-3xl pb-8">
            <h1
              className="text-[clamp(60px,11vw,108px)] font-bold leading-none text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              AI모각작
            </h1>
            <p
              className="mt-4 text-[clamp(15px,2.8vw,21px)] font-light text-white/65"
              style={{ letterSpacing: "-0.01em" }}
            >
              AI 툴로 각자의 일을 조금씩 앞으로 보내는 시간
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-white/75 sm:text-base">
              한 달에 한 번 모여 각자 해보고 싶은 작업을 AI와 함께 진행하고,
              과정과 고민을 나누는 클럽입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#survey"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#111111] transition hover:bg-white/90"
              >
                사전설문 시작하기
              </a>
              <a
                href="#themes"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                회차별 테마 보기
              </a>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/12 pt-5 sm:grid-cols-3">
            <p>
              <span
                className="font-mono text-[10px] uppercase text-white/35 block mb-1"
                style={{ letterSpacing: "0.16em" }}
              >
                일시
              </span>
              <span className="text-sm text-white/85">
                6/20, 7/18, 8/29 토요일 14:00–18:00
              </span>
            </p>
            <p>
              <span
                className="font-mono text-[10px] uppercase text-white/35 block mb-1"
                style={{ letterSpacing: "0.16em" }}
              >
                장소
              </span>
              <span className="text-sm text-white/85">시청역 5층 오아시스덕수궁</span>
            </p>
            <p>
              <span
                className="font-mono text-[10px] uppercase text-white/35 block mb-1"
                style={{ letterSpacing: "0.16em" }}
              >
                디파짓
              </span>
              <span className="text-sm text-white/85">6만원</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 함께 모이는 사람들 (white canvas) ── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p
              className="font-mono text-[11px] uppercase text-[#aaa]"
              style={{ letterSpacing: "0.18em" }}
            >
              함께 모이는 사람들
            </p>
            <h2
              className="mt-4 text-[clamp(26px,3.8vw,38px)] font-bold leading-tight text-[#111]"
              style={{ letterSpacing: "-0.025em" }}
            >
              서로 다른 배경에서, 각자의 작업을 가져옵니다
            </h2>
            <p className="mt-5 text-[15px] leading-8 text-[#666]">
              공공, 금융/보험, 제조/화학, 콘텐츠/기획, 창업, 개발/AI 실무 등
              다양한 맥락의 사람들이 모입니다. 중요한 건 같은 직무가 아니라,
              각자 미뤄두었던 일을 AI와 함께 실제로 움직여보려는 마음입니다.
            </p>
          </div>

          <div className="grid gap-8">
            <div>
              <p
                className="font-mono text-[10px] uppercase text-[#bbb] mb-3"
                style={{ letterSpacing: "0.16em" }}
              >
                이런 배경이 섞여 있어요
              </p>
              <div className="flex flex-wrap gap-2">
                {participantContexts.map((ctx) => (
                  <span
                    key={ctx}
                    className="rounded-full border border-[#e0e0e0] px-4 py-1.5 text-sm font-medium text-[#333]"
                  >
                    {ctx}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p
                className="font-mono text-[10px] uppercase text-[#bbb] mb-3"
                style={{ letterSpacing: "0.16em" }}
              >
                이런 마음으로 모였어요
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {motivationThemes.map((theme) => (
                  <li
                    key={theme}
                    className="rounded-xl bg-[#f4f4f2] px-4 py-3 text-sm font-medium leading-6 text-[#444]"
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 회차별 테마 (LIME color block) ── */}
      <section
        id="themes"
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-10"
      >
        <div className="rounded-3xl bg-[#C9EE6B] px-8 py-14 sm:px-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <p
                className="font-mono text-[11px] uppercase text-black/35"
                style={{ letterSpacing: "0.18em" }}
              >
                회차별 테마
              </p>
              <h2
                className="mt-4 text-[clamp(24px,3.4vw,34px)] font-bold leading-tight text-[#111]"
                style={{ letterSpacing: "-0.025em" }}
              >
                매번 조금씩 다르게, 그래도 내 작업을 중심에 두고
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-black/55">
                완성된 결과물을 가져오는 모임이 아니라, 하고 싶은 작업을
                실제로 시도해보는 모임입니다. 서로 다른 맥락에서 나온 고민을
                같이 보고, AI를 내 일에 붙이는 감각을 함께 키웁니다.
              </p>
            </div>

            <div className="grid gap-3">
              {sessions.map((session, index) => (
                <article
                  key={session.date}
                  className="grid gap-4 rounded-2xl bg-white/60 p-5 sm:grid-cols-[72px_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111] text-sm font-bold text-white">
                    {index + 1}회
                  </div>
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase text-black/40"
                      style={{ letterSpacing: "0.14em" }}
                    >
                      {session.date} 토요일
                    </p>
                    <h3
                      className="mt-1 text-base font-bold text-[#111]"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {session.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#555]">
                      {session.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 운영 방식 (NAVY color block) ── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-[#0D1021] px-8 py-14 text-white sm:px-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p
                className="font-mono text-[11px] uppercase text-white/30"
                style={{ letterSpacing: "0.18em" }}
              >
                운영 방식
              </p>
              <h2
                className="mt-4 text-[clamp(24px,3.4vw,34px)] font-bold leading-tight text-white"
                style={{ letterSpacing: "-0.025em" }}
              >
                룰은 없고, 같이 몰입하기 좋은 리듬만 있습니다
              </h2>
            </div>
            <ul className="grid gap-2.5">
              {rhythms.map((rhythm) => (
                <li
                  key={rhythm}
                  className="rounded-2xl border border-white/8 bg-white/5 px-5 py-4 text-sm leading-7 text-white/65"
                >
                  {rhythm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 사전설문 (CREAM color block) ── */}
      <section
        id="survey"
        className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:px-10"
      >
        <div className="rounded-3xl bg-[#FEF6E4] px-8 py-14 sm:px-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
            <div>
              <p
                className="font-mono text-[11px] uppercase text-[#aaa]"
                style={{ letterSpacing: "0.18em" }}
              >
                사전설문
              </p>
              <h2
                className="mt-4 text-[clamp(24px,3.4vw,34px)] font-bold leading-tight text-[#111]"
                style={{ letterSpacing: "-0.025em" }}
              >
                첫 모임 전에 가볍게 알려주세요
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-[#666]">
                답변은 1회차 진행 흐름을 잡는 데만 사용합니다. 이름이나
                연락처는 받지 않습니다.
              </p>
            </div>
            <SurveyForm />
          </div>
        </div>
      </section>
    </main>
  );
}
