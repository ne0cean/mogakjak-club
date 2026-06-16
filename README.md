# AI모각작 사전설문

AI모각작 시즌 안내와 사전설문을 담은 Sites 배포용 웹페이지입니다.

## Stack

- vinext
- Next app router
- Cloudflare D1
- Drizzle

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run db:generate
npm run build
```

설문 응답은 `DB` D1 binding의 `survey_responses` 테이블에 저장됩니다.
