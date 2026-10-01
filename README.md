# AFRIQA

Turn a small-business problem into three practical actions and a seven-day plan.

This learning proof of concept uses Next.js, TypeScript, Gemini structured generation, and runtime validation. All five result sections are required. It is an online app; there is no offline model, account system, or saved-plan history.

## Local setup

Use Node.js 22 and npm. Run `npm install`. Copy `.env.example` to `.env.local` if it does not already exist. Create a free Gemini API key at https://aistudio.google.com/apikey and enter it locally as `GEMINI_API_KEY`. Never commit or share the key. `GEMINI_MODEL` selects the model; free-tier availability must be checked for your account.

Run `npm run dev`, then open http://localhost:3000. AI generation requires an internet connection and usable free quota. Refreshing the results page clears the current plan because it is held only in memory.

## Verification

Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. For browser checks, install Chromium with `npx playwright install chromium` and run `npm run test:e2e`. Browser fixtures are test-only and do not prove real AI access or plan quality.

Try this fictional real-AI example:

> I run a small food business in Lagos. Orders have fallen from about 20 to 12 per day this month. I have no budget for paid advertising, but I can contact previous customers through WhatsApp. Help me decide what to do next.

Inspect the core problem, possible causes, explained urgency, exactly three actions, all seven days, realistic resource use, and a measurable success check. Compare with a sparse problem such as “My business is losing customers.” Causes should remain possible explanations, and missing context must not become invented facts.

## Deployment

Import the GitHub repository into Vercel as a Next.js project. Set `GEMINI_API_KEY` and `GEMINI_MODEL` as server-only environment variables. Redeploy after changing settings, then verify a real generated plan on the deployed URL. Do not prefix the key with `NEXT_PUBLIC_`.

Vercel Hobby is for personal, noncommercial projects. Keep Gemini on its free tier; no paid upgrades are part of this demo. Free quota can be exhausted. Google may use free-tier input/output to improve its products, so use fictional data and omit sensitive information. Generated recommendations are suggestions, not verified diagnoses or guaranteed outcomes.

The hackathon also requires a short demo video and public source repository. Deployment alone does not replace those deliverables.

## Current status

Implementation is in progress. Twelve unit/render tests, four browser workflow tests using test-only responses, typecheck, lint, and the production build passed. Desktop and phone layouts were inspected. Gemini Flash-Lite returned real schema-valid plans; the actual API returned 200 and a browser submission reached the real results page with all seven days. Learner feedback, further quality checks, commits, and deployment remain pending. See `devpost/checklist.md` for the actual build state.
