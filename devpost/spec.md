---
doc: spec
status: approved
---

# AFRIQA — Technical Spec

## How This Works, In Plain Language
Next.js serves the welcome page and a separate results page. When the owner submits a problem, the browser sends it to AFRIQA's server. The server sends Gemini instructions plus a schema: a description of the fields the answer must contain. Gemini returns a structured plan; the server checks it before sending it to the browser. Only a complete, valid plan opens the results page. Failure keeps the input and offers Retry.

One project contains the interface and server code. There is no database or stored history. Gemini uses the free tier and the demo targets Vercel Hobby, with no paid upgrades.

## The Core Journey Through the System
Implements `prd.md > The Core Journey`.
1. `/` renders the welcome note and labeled textarea.
2. Submission trims and validates the input, sets a loading state, and sends `POST /api/plan` with `{ problem }`.
3. The server checks input independently, builds the instructions, and requests structured JSON from Gemini.
4. The server parses and validates the response, including exactly three actions and ordered Days 1–7.
5. The browser stores the validated plan in a React context mounted in the root layout, then navigates to `/results`.
6. Failures show a friendly message and Retry on the entry page. Retry reuses the last submitted problem. No automatic repeated AI calls.
7. Visiting or refreshing `/results` without an in-memory plan shows a link back to the entry page.

## Stack
- **Next.js App Router, React, TypeScript:** learner accepted the recommendation; two routes and a server endpoint in one Vercel project. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [route handlers](https://nextjs.org/docs/app/getting-started/route-handlers).
- **Plain CSS:** implements the approved visual direction without a component framework.
- **Google Gen AI JavaScript SDK (`@google/genai`):** server-only Gemini integration. [Structured output examples](https://ai.google.dev/gemini-api/docs/structured-output).
- **Zod 4:** runtime validation and TypeScript types; derive the provider JSON schema from the same base schema where supported. Use application refinements for nonblank text and day ordering. [Zod documentation](https://zod.dev/).
- **Node.js 22 and npm:** locally observed Node v22.22.0 and npm 10.9.4. Next.js documentation requires Node 20.9 or newer.
- **Verification:** focused validation/API tests using Vitest, and browser workflow checks using Playwright. [Vitest](https://vitest.dev/guide/), [Playwright](https://playwright.dev/docs/intro).

Exact package versions are not installed yet. Resolve supported stable versions during build, verify SDK compatibility, and commit the lockfile. Do not claim package installation or model access has been verified by this specification.

## Where It Runs and How Someone Tries It
### Local Development and Recording
From the project root: `npm install`, create `.env.local` from the secret-free `.env.example`, set the key locally, then `npm run dev`. Open `http://localhost:3000`. Local execution still requires internet for AI generation.

Environment variables: `GEMINI_API_KEY` (secret), `GEMINI_MODEL` (verified demo model `gemini-3.1-flash-lite`). Neither receives a `NEXT_PUBLIC_` prefix. Keep `.env.local` ignored; never paste keys in chat or commit them.

Planned checks: `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:e2e`. For production-mode local verification: `npm run build` then `npm run start`.

### Vercel Demo
Connect the public GitHub repository to Vercel, choose the Next.js preset, and set both environment variables in project settings. Deploy after local checks, then verify the deployed real-AI flow. Vercel and Google AI Studio accounts remain to be configured; only GitHub is confirmed ready.

Use the free Hobby plan for a personal, noncommercial learning demo. Do not enable paid plans or billing. [Vercel Next.js](https://vercel.com/docs/frameworks/nextjs), [Hobby plan](https://vercel.com/docs/plans/hobby), [environment variables](https://vercel.com/docs/environment-variables).

The required short demo video and public GitHub repository remain deliverables; a deployed URL does not replace them.

## Look and Feel
Implements `prd.md > Look and Feel` and `Screens and Layout`.
CSS variables: ivory background `#F7F5EF`, navy text `#14243A`, teal accent `#087F78`, white card surfaces. Use a system sans-serif stack, generous spacing, rounded cards, visible focus outlines, and readable contrast. Avoid external font downloads. Narrow screens stack cards; desktop uses wider action-card layouts. Display priority as readable text with an accent badge; do not rely on color alone.

## Components
### Welcome Page and Problem Form
`app/page.tsx` and `components/problem-form.tsx` implement `prd.md > Welcome and Problem Entry` and `Problem Submission`. Accept 1–3,000 characters after trimming; enforce the same bound on server. Show a clear validation message for blank/oversized input. Announce loading/error states accessibly and disable duplicate submissions. Keep editable input and the last submitted snapshot distinct so Retry uses the failed request's text.

### Active Plan Provider
`components/plan-provider.tsx` stores the current validated plan and submitted problem in React memory. Wrap both routes through `app/layout.tsx`. Navigation between routes retains data; hard refresh or closing the tab clears it. No localStorage, cookies, plan URLs, or database.
Implements `prd.md > States and Boundaries`.

### Results Page and Plan View
`app/results/page.tsx` and `components/plan-view.tsx` render validated data as text: summary and priority, possible causes, numbered actions, seven-day timeline, success check, assumptions/missing context, and optional resources. React text rendering handles user/model content; do not insert arbitrary model HTML. Missing plan shows guidance back to `/`.
Implements `prd.md > Decision and Action Plan`, `Structured Plan`.

### Plan API Route
`app/api/plan/route.ts` uses the Node runtime. Validate JSON and input before contacting Gemini. Return `{ plan }` on success; otherwise `{ error: { code, message } }` with a suitable status. Use 400 for invalid input, 429 for provider quota limits, 502 for invalid/provider failure, 504 for timeout, and 503 for missing configuration. Do not expose raw provider errors or secrets. Return `Cache-Control: no-store`.
Implements `prd.md > Generation Failure and Retry`.

### Gemini Adapter and Prompt
`lib/gemini.ts` owns the provider call, timeout, response extraction, and validation. `lib/plan-prompt.ts` owns concise instructions: grounded interpretation, possible causes, urgency explanation, feasible prioritized tasks, seven days, measurable progress, and missing-context disclosure. Treat the entered problem as user data, not instructions to replace the schema or task. No browsing, retrieval, tools, or follow-up conversation.
Implements `prd.md > Structured Plan`.

### Plan Schema and Validation
`lib/plan-schema.ts` exports the shared base schema, provider-compatible JSON schema, runtime refinements, and inferred TypeScript type. Provider schema guides generation; application validation remains authoritative. Reject malformed JSON, blank required strings, wrong counts, duplicated/missing/out-of-order days, invalid priority, refusals, and incomplete responses. Never pad a deficient plan with fabricated tasks.
Implements `prd.md > Structured Plan`, `Acceptance Criteria`.

## Data Model
All properties are required in the base object; arrays for assumptions/resources may be empty when not applicable.
- `coreProblem`: nonblank string.
- `possibleCauses`: 1–5 nonblank strings, worded as possibilities.
- `priority`: `{ level: 'Low' | 'Medium' | 'High', explanation: nonblank string }`.
- `actions`: exactly 3 objects `{ title, task, successCheck }`, all nonblank strings, in priority order.
- `sevenDayPlan`: exactly 7 objects `{ day: integer, task, successCheck }`, day sequence 1 through 7 and nonblank text.
- `successCheck`: nonblank overall progress measure.
- `assumptions`: nonblank strings identifying missing context or provisional assumptions; may be empty when none apply.
- `resources`: 0–3 objects `{ title, content }`, nonblank strings; directly usable text rather than an external-resource library.

The form owns input and request state; context owns only the active problem/plan. The server handles data for the request without application persistence. Google receives the submitted text under its free-tier data terms; in-memory application storage does not imply the provider retains nothing.

## External Services and Dependencies
### Gemini API
Use the JavaScript SDK's `client.interactions.create` backed by `POST https://generativelanguage.googleapis.com/v1beta/interactions`.
- Authentication: `x-goog-api-key` using the server-only key.
- Request: model from `GEMINI_MODEL`, input containing instructions and the problem, `store: false`, and `response_format: { type: 'text', mime_type: 'application/json', schema: planJsonSchema }`.
- Response: SDK `output_text` containing the generated JSON, subject to completed-response/refusal checks. Confirm exact SDK response typing in the installed version before implementation.
- Use one foreground, nonstreaming request per submission. Bound provider calls to 45 seconds and the browser request to 55 seconds; allow a 60-second route duration if the selected Vercel runtime permits it. Verify those platform settings during build rather than relying on defaults.
- Demo model: `gemini-3.1-flash-lite`, verified on real structured generation and listed with free input/output on the pricing page. The initial `gemini-3.8-flash` candidate returned temporary overload. Keep the model configurable and check account quota; do not activate billing or quietly switch to paid service.
- Rate limits are account/model dependent and visible in AI Studio. Quota errors offer Retry and guidance to wait; no automatic retry loop or paid fallback.
- Google lists Nigeria as an available region. Free-tier content may be used to improve products. Use fictional business data in testing/demo and show a brief input note that the problem is sent to an AI service and sensitive details should be omitted.

[Structured outputs](https://ai.google.dev/gemini-api/docs/structured-output), [Interactions](https://ai.google.dev/gemini-api/docs/interactions-overview), [pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), [regions](https://ai.google.dev/gemini-api/docs/available-regions).

### Vercel and GitHub
Vercel serves pages and the server route; GitHub hosts public source. The API key belongs in Vercel settings. No third-party database, analytics, or rate-limit service is required. Free-tier quota can be exhausted by public requests; document that limitation and avoid promising production-scale availability. Account-specific access, hosting limits, and deployment are unverified until build/ship.

## File Structure
```text
A-BUILD/
  app/
    layout.tsx                # Shared layout and active-plan provider
    page.tsx                  # Welcome/input route
    globals.css               # Approved palette and responsive layout
    results/page.tsx          # Separate results route
    api/plan/route.ts         # Server validation and AI request endpoint
  components/
    problem-form.tsx          # Input, loading, error, Retry
    plan-provider.tsx         # Active workflow data in browser memory
    plan-view.tsx             # Structured result cards and timeline
  lib/
    plan-schema.ts            # Types, generation schema, runtime checks
    plan-prompt.ts            # Contextual decision-plan instructions
    gemini.ts                 # Server-only provider integration
  tests/
    plan-schema.test.ts       # Reject missing/blank sections and bad counts/days
    plan-api.test.ts          # Validation, quota, invalid output, timeout
    workflow.spec.ts          # Browser navigation, errors, Retry, missing result
  devpost/
    learner-profile.md        # Ignored personal learning context
    scope.md                  # Approved scope
    prd.md                    # Approved product behavior
    spec.md                   # This blueprint
    checklist.md              # Created by 5-build
  .env.example                # Variable names only; no real credentials
  .gitignore                  # Preserve rules; ignore secrets/build outputs
  package.json                # Dependencies and verification scripts
  package-lock.json           # Exact resolved versions
  tsconfig.json               # TypeScript configuration
  next-env.d.ts               # Next.js type declarations
  next.config.ts              # Minimal application configuration
  eslint.config.mjs           # Lint configuration
  vitest.config.ts            # Focused unit/API test setup
  playwright.config.ts        # Browser test setup
  README.md                   # Setup, limits, run/test/deploy and demo instructions
```
Existing course material remains in place. Generated dependency/build directories are omitted.

## Verification Approach
Implements `prd.md > Acceptance Criteria`.
1. Early real-provider smoke check confirms free access, schema compatibility, response extraction, and completion time. This is an investigation, not a claim already verified.
2. Focused automated tests exercise incomplete/blank output, wrong action counts, missing/duplicate days, invalid input, provider failure, and quota/timeout handling.
3. Browser tests use clearly labeled test fixtures for deterministic navigation, loading, Retry/input retention, and missing-result checks. Fixtures never replace the real AI demo or appear as live generation.
4. Run real generation with sparse customer-loss input and with a fictional Nigerian food-business example including a no-paid-advertising constraint. Check all sections, actionable specificity, resource fit, possible-cause wording, and measurable progress. Do not require exact wording or guaranteed outcomes. Use contrasted urgency scenarios to assess priority variation.
5. Verify mobile/desktop readability, keyboard focus, production build, and deployed end-to-end generation. Record actual outcomes and limitations.

## Important Failure Modes
- Missing key or inaccessible free model: clear setup error; investigate free access before further AI build work. No simulated success.
- Network, timeout, or quota failure: retain submitted input and offer Retry; quotas may require waiting.
- Incomplete/refused/unusable response: reject it, show an error, and offer Retry rather than display a partial plan as success.
- Results refresh without data: return-to-entry guidance; no promised persistence.

## What Was Simplified and Why
One Next.js project, one AI service, memory-only workflow data, no database/accounts, no streaming, and no autonomous tools keep the two-page proof of concept small. Offline generation and adaptive follow-up remain deferred per the approved scope. Generated resources are short text within the plan.

## Decisions and Open Issues
- Build discovery: gemini-3.8-flash returned temporary high demand. The configured/default model is now gemini-3.1-flash-lite, verified on a real structured request and documented with free-tier access. Restricted outbound network access required an unrestricted test. This preserves the chosen free Gemini provider and product behavior.
- Learner accepted Next.js, TypeScript, CSS, and a server-side AI workflow. Gemini free tier supersedes the initial OpenAI recommendation because the learner has no budget; no paid upgrades are authorized.
- Learner's learning focus is generating structured output. During build, inspect the plan schema and one real response, then compare it with an invalid test response. Explain how schema-guided generation and runtime validation serve different roles; document the evidence without claiming mastery.
- Implementation details proposed by this blueprint: Zod validation, memory-only React context, 3,000-character limit, nonstreaming requests, model candidate, timeout limits, and test tools. Approval of this draft adopts them.
- Build prerequisites: configure free Google AI Studio and Vercel accounts and provide the API key through local settings. GitHub is already available. No credentials are requested in chat.
- Early investigation: verify account-specific model availability/quota, installed SDK shape, compatible stable dependency versions, and hosting duration. These are concrete build checks, not unresolved product choices; paid service is not a fallback.
- No additional product-defining questions remain before review.
