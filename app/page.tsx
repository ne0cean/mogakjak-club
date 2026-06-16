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
    <main className="min-h-screen bg-[#f7f7f2] text-[#191919]">
      <section className="relative overflow-hidden bg-[#101513] text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-workshop.png"
          alt="노트북으로 각자의 작업을 하는 작은 모임"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.48]"
        />
        <div className="absolute inset-0 bg-[#101513]/55" />
        <div className="relative mx-auto flex min-h-[620px] max-w-6xl flex-col justify-between px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/86">
            <span className="rounded-md border border-white/24 bg-white/10 px-3 py-1">
              총 3회
            </span>
            <span className="rounded-md border border-white/24 bg-white/10 px-3 py-1">
              월 1회
            </span>
            <span className="rounded-md border border-white/24 bg-white/10 px-3 py-1">
              함께 작업
            </span>
          </div>

          <div className="max-w-3xl pb-8">
            <p className="mb-4 text-base font-semibold text-[#9ee6c5]">
              AI 툴로 각자의 일을 조금씩 앞으로 보내는 시간
            </p>
            <h1 className="text-5xl font-bold leading-tight text-white">
              AI모각작
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/90">
              한 달에 한 번 모여 AI 툴로 각자 해보고 싶은 작업을 진행하고,
              과정과 고민을 나누는 작업 모임입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#survey"
                className="rounded-md bg-[#ff6f61] px-5 py-3 text-base font-bold text-white transition hover:bg-[#f45b50] focus:outline-none focus:ring-2 focus:ring-[#9ee6c5]"
              >
                사전설문 시작하기
              </a>
              <a
                href="#themes"
                className="rounded-md border border-white/36 bg-white/10 px-5 py-3 text-base font-bold text-white transition hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-[#9ee6c5]"
              >
                회차별 테마 보기
              </a>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/22 pt-5 text-sm text-white/88 sm:grid-cols-3">
            <p>
              <strong className="block text-white">일시</strong>
              6/20, 7/18, 8/29 토요일 14:00-18:00
            </p>
            <p>
              <strong className="block text-white">장소</strong>
              시청역 5층 오아시스덕수궁
            </p>
            <p>
              <strong className="block text-white">디파짓</strong>
              6만원
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold text-[#0c7b61]">
              함께 모이는 사람들
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              서로 다른 배경에서, 각자의 작업을 가져옵니다
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4b4b45]">
              공공, 금융/보험, 제조/화학, 콘텐츠/기획, 창업, 개발/AI 실무 등
              다양한 맥락의 사람들이 모입니다. 중요한 건 같은 직무가 아니라,
              각자 미뤄두었던 일을 AI와 함께 실제로 움직여보려는 마음입니다.
            </p>
          </div>

          <div className="grid gap-5">
            <div>
              <h3 className="text-lg font-bold text-[#20201d]">
                이런 배경이 섞여 있어요
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {participantContexts.map((context) => (
                  <span
                    key={context}
                    className="rounded-md border border-[#d9ddd0] bg-white px-3 py-2 text-sm font-bold text-[#34342f]"
                  >
                    {context}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#20201d]">
                이런 마음으로 모였어요
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {motivationThemes.map((theme) => (
                  <li
                    key={theme}
                    className="rounded-md bg-[#f7f7f2] px-3 py-3 text-sm font-semibold leading-6 text-[#3b3b35]"
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-bold text-[#0c7b61]">회차별 테마</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              매번 조금씩 다르게, 그래도 내 작업을 중심에 두고
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4b4b45]">
              완성된 결과물을 가져오는 모임이 아니라, 하고 싶은 작업을
              실제로 시도해보는 모임입니다. 서로 다른 직장과 커뮤니티 맥락에서
              나온 고민을 같이 보고, AI를 내 일에 붙이는 감각을 함께 키웁니다.
            </p>
          </div>

          <div className="grid gap-4">
            {sessions.map((session, index) => (
              <article
                key={session.date}
                className="grid gap-4 rounded-lg border border-[#d9ddd0] bg-white p-5 shadow-sm sm:grid-cols-[92px_1fr]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#e3f7ec] text-lg font-bold text-[#0b6f58]">
                  {index + 1}회
                </div>
                <div>
                  <p className="text-sm font-bold text-[#ff6f61]">
                    {session.date} 토요일
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{session.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#56564f]">
                    {session.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold text-[#0c7b61]">운영 방식</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">
                룰은 없고, 같이 몰입하기 좋은 리듬만 있습니다
              </h2>
            </div>
            <ul className="grid gap-3">
              {rhythms.map((rhythm) => (
                <li
                  key={rhythm}
                  className="rounded-lg border border-[#e2e4dc] bg-[#fbfbf7] p-4 text-base leading-8 text-[#34342f]"
                >
                  {rhythm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="survey" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold text-[#0c7b61]">사전설문</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              첫 모임 전에 가볍게 알려주세요
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4b4b45]">
              답변은 1회차 진행 흐름을 잡는 데만 사용합니다. 이름이나 연락처는
              받지 않습니다.
            </p>
          </div>
          <SurveyForm />
        </div>
      </section>
    </main>
  );
}
