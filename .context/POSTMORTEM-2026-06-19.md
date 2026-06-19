# Postmortem — 2026-06-19 · 설문 응답 삭제 사고 (미복구)

## 사고 요약
모각작 설문(`mogakjak.netlify.app`)에서 "내가 만든 테스트 응답 2개만 삭제" 의도였으나, **다른 사람의 진짜 응답 1개가 함께 삭제됨.** 세션 종료 시점까지 **미복구.**

## 저장소 구조 (진단 결과)
- prod 설문 = **Netlify Forms** (`netlify-public/index.html` 의 `<form name="ai-mogakjak-survey" data-netlify="true">`).
- 앱의 D1 `survey_responses` 테이블(`db/schema.ts`)은 OpenAI 호스팅(`.openai/hosting.json` appgprj_)용 **별개 경로**, prod 아님.
- 즉 삭제도 복구도 **Netlify Forms 대시보드** 영역.

## 근본 원인
- Netlify Forms는 submission **개별 삭제 시 영구 삭제**(undelete 미지원). "Spam 처리"만 복구 가능.
- 일괄/다중 선택 삭제에서 테스트와 실제 응답이 섞여 같이 지워짐.

## 복구 가능 경로 (세션 종료 시점 미확정)
1. **Spam 탭 확인** — 삭제가 아니라 spam 처리였으면 "Not spam"으로 복구. (사용자 확인 미완)
2. **제출 알림 사본** — 폼에 이메일/Slack/webhook 알림이 켜져 있었으면 원본이 거기 남음. (알림 설정 여부 미확인)
3. **사전 CSV export** — 삭제 전 내보낸 게 있으면.
4. Netlify 지원팀 (영구삭제는 통상 불가).

## 방해 요인
- 이 실행환경 **외부망 차단**으로 Claude가 Netlify에 직접 접근/복구 불가 → [[lesson-sandbox-no-network]]. 사용자 셸/대시보드로만 가능.
- 로컬에 netlify CLI·토큰·site_id 없음.

## 재발 방지 규칙
1. **외부 SaaS(Netlify Forms 등) 데이터 삭제 전 반드시 백업/export 먼저.** undelete 없는 플랫폼이 다수.
2. "테스트 N개만 삭제"는 **개별 ID 지정 삭제**로. 다중선택/일괄 삭제 금지.
3. 삭제 작업은 되돌리기 어려움 — 실행 전 사용자에게 대상 명시 + 확인.

## 다음 세션 복구 액션
- [ ] 사용자: Netlify Forms `ai-mogakjak-survey` → **Spam 탭** 확인 → 있으면 "Not spam"
- [ ] 없으면: 이메일/Slack 알림 사본 탐색
- [ ] 최후: Netlify 지원팀 문의
