# AFRIQA

Turn an everyday problem into three practical actions and a seven-day plan grounded in its domain.

Live demo: https://afriqa-xi.vercel.app

Public source: https://github.com/wasko1984/afriqa

This learning proof of concept uses Next.js, TypeScript, Gemini structured generation, and runtime validation. All five result sections are required. It is an online app; there is no offline model, account system, or saved-plan history.

AFRIQA identifies the main domain—Health, Security, Education, Business, Household, Relationships, Careers, Mixed or Other—and displays that perspective on the plan. Occupation does not override the concern: a shop owner describing urgent symptoms needs health guidance. Health output is general information and care-seeking guidance, not diagnosis or treatment. Immediate danger requires help now; the seven-day schedule is conditional follow-up.

## Local setup

Use Node.js 22 and npm. Run `npm install`. Copy `.env.example` to `.env.local` if it does not already exist. Create a free Gemini API key at https://aistudio.google.com/apikey and enter it locally as `GEMINI_API_KEY`. Never commit or share the key. `GEMINI_MODEL` selects the model; free-tier availability must be checked for your account.

Run `npm run dev`, then open http://localhost:3000. AI generation requires an internet connection and usable free quota. Refreshing the results page clears the current plan because it is held only in memory.

## Verification

Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. For browser checks, install Chromium with `npx playwright install chromium` and run `npm run test:e2e`. Browser fixtures are test-only and do not prove real AI access or plan quality.

Try this fictional real-AI example:

> I run a small food business in Lagos. Orders have fallen from about 20 to 12 per day this month. I have no budget for paid advertising, but I can contact previous customers through WhatsApp. Help me decide what to do next.

Inspect the core problem, possible causes, explained urgency, exactly three actions, all seven days, realistic resource use, and a measurable success check. Compare with a sparse problem such as “My business is losing customers.” Causes should remain possible explanations, and missing context must not become invented facts.

For domain checks, try a mathematics study problem, securing your own compromised email account, sharing household chores, a respectful relationship disagreement, or improving job applications. Confirm the perspective and every plan section match the actual concern, with no unrelated business template. Review mixed problems and ambiguous wording explicitly. See `devpost/domain-verification.md` for the real-model scenarios and limitations.

## Deployment

Import the GitHub repository into Vercel as a Next.js project. Set `GEMINI_API_KEY` and `GEMINI_MODEL` as server-only environment variables. Redeploy after changing settings, then verify a real generated plan on the deployed URL. Do not prefix the key with `NEXT_PUBLIC_`.

Vercel Hobby is for personal, noncommercial projects. Keep Gemini on its free tier; no paid upgrades are part of this demo. Free quota can be exhausted. Google may use free-tier input/output to improve its products, so use fictional data and omit sensitive information. Generated recommendations are suggestions, not verified diagnoses or guaranteed outcomes.

The hackathon also requires a short demo video and public source repository. Deployment alone does not replace those deliverables.

## Current status

The learner confirms the revised live site works and is ready for hackathon delivery. The domain-aware revision passes 21 unit/render/API tests, five browser workflow tests using test-only responses, typecheck, lint and the production build. Real-model checks covered all nine domain categories, mixed concerns, a conflicting marketing instruction and urgent medical symptoms. Earlier agent network failures are retained in the verification record; their cause was not established. See `devpost/app-map.html` for a technical reference and `devpost/shipping.md` for remaining video/submission steps.

Real quality checks used fictional daily-sales, stable-stock-planning, and imminent-rent scenarios. The refined prompt produced Medium, Low, and High urgency respectively. Schema validation verifies structure, not the accuracy of advice: the model can still assume unavailable inventory or customer debts, or give an inconsistent accounting check. Review each plan against the stated situation. One real request failed with the recoverable generation message; repeating it directly succeeded, so its exact cause was not established.
