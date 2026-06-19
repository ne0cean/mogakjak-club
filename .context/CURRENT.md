# CURRENT — mogakjak-club

## Pre-flight Gate — 2026-06-19 debrief
- [ ] **외부망 차단 환경** 인지 — Supabase/Netlify/원격 직접 불가. 사용자 셸 `!`로 우회 (memory: lesson-sandbox-no-network)
- [ ] **데이터 삭제 전 백업** — Netlify Forms 등 undelete 없는 SaaS. POSTMORTEM-2026-06-19 참조
- [ ] 설문 복구 미완 — POSTMORTEM-2026-06-19.md "다음 세션 복구 액션" 먼저

## Status
신규 프로젝트. A-Team 자동 스캐폴딩 적용됨.
스택: Next 16 + React 19 + drizzle-orm(D1) + vinext, netlify-public 정적(Netlify Forms).

## 다음 세션 — 좌석 아바타("mingle") 통합
> 토이는 **flair 쪽에 빌드 완료**(connectome/flair/src/app/mingle): SVG 평면도 + 좌석 탭 + AI 아바타 + 탭 프로필. 디자인=밝은 미니멀(파스텔/모노). 21석 정렬+의자모양 완료.
- [ ] flair/mingle 의 페이지·로직을 mogakjak `app/` 으로 이식 (DB는 Supabase→**D1/drizzle 재작성** 필요)
- [ ] 정적 netlify-public 아닌 **동적 app(vinext+D1)** 쪽에 붙여야 함 (좌석=읽기/쓰기 동적)
- [ ] 진입점(버튼/페이지) 이어붙이기 — **배포 전 먼저 사용자에게 보여주고** 결정
- [ ] 실제 AI 로고: `! npm i simple-icons` 설치 후 공식 로고로 교체 (Cursor/Grok/v0는 패키지 유무 확인)

## In Progress Files
- (없음 — mingle은 flair 쪽 빌드, 통합 미착수)

## Next Tasks
- [ ] 위 "좌석 아바타 통합" 4단계
- [ ] 설문 복구 (POSTMORTEM)
- [ ] 프로젝트 초기 설정

## Blockers
- 설문 응답 1개 삭제·미복구 (POSTMORTEM-2026-06-19)
- 실제 로고: simple-icons 미설치 (사용자 `! npm i` 대기)
- flair/mingle DB 컬럼(pos_x/pos_y/heading) prod Supabase 미적용 — 단 통합 시 D1로 재작성하므로 무관
