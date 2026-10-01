---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Enter a business problem and receive a real structured plan**
  Becomes usable: A running AFRIQA app with welcome/input, real Gemini generation, and a separate results page containing every required section.
  Why now: Proves free AI access and the distinctive problem-to-action workflow early; scaffolding is included in this working step.
  PRD ref: `prd.md > The Core Journey`, `Structured Plan`, `Look and Feel`
  Spec ref: `spec.md > Stack`, `Components`, `Data Model`, `Gemini API`, `File Structure`
  Build: Install dependencies and scaffold the agreed Next.js project; create the schema, prompt, server adapter, API route, form, active-plan context, and results view. Add a secret-free environment example. Confirm free model access with a real request as soon as the locally configured key is available. Implement the approved palette and layout and basic recoverable errors.
  Verify (mechanical): Run schema tests, typecheck, lint, and production build. Start the app, submit the fictional food-business problem to real Gemini, verify all five sections, exactly three actions, ordered Days 1–7, and practical measurable recommendations. Do not count fixtures as real AI evidence.
  Learner check: Open localhost:3000, enter a business problem, submit, and inspect whether the results fit the situation. Inspect the generation schema and a real response to see how structured output works.
  Commit: `Build real problem-to-plan workflow`

- [x] **2. Recover from errors and verify the complete journey**
  Becomes usable: Empty/oversized input, loading, failed generation, Retry, and results refresh all behave clearly; the workflow is usable on phone and desktop.
  Why now: Once real generation is proven, protect the complete journey against the failures most likely to interrupt the demo.
  PRD ref: `prd.md > Problem Submission`, `Generation Failure and Retry`, `States and Boundaries`, `Acceptance Criteria`
  Spec ref: `spec.md > Plan API Route`, `Plan Schema and Validation`, `Verification Approach`, `Important Failure Modes`
  Build: Finish bounded requests and safe error mapping, input retention and Retry, loading/accessibility, and missing-result guidance. Add focused API and Playwright checks with explicitly test-only fixtures. Review real sparse/contextual inputs and contrasted urgency scenarios. Refine readability based on early learner feedback.
  Verify (mechanical): Run unit/API tests, typecheck, lint, production build, and browser workflow tests. Confirm Retry retains the failed problem, invalid output never appears as success, results refresh guides back, and responsive pages remain readable. Review real plans for constraints and usefulness.
  Learner check: Try blank input, generate a plan, revisit results after refresh, and report confusing behavior. Check the phone-width layout.
  Commit: `Verify retries validation and responsive workflow`

- [x] **3. Publish and verify the Vercel demo**
  Becomes usable: Others can open the deployed app and generate a real plan; public source includes setup and verification instructions.
  Why now: Publish only after the local workflow and failure paths have passed checks, so deployment tests a known working app.
  PRD ref: `prd.md > Acceptance Criteria`, `What We're Building`
  Spec ref: `spec.md > Where It Runs and How Someone Tries It`, `Vercel and GitHub`
  Build: Write README instructions, inspect intended public files/history for secrets and private context, create/push the project repository using available authorized access, configure Vercel Hobby and server-only environment variables, and deploy. Coordinate account sign-in and local secret entry without requesting credentials in chat. Never enable paid plans.
  Verify (mechanical): Check public repository content and deployed routes; complete real generation on the deployed URL and verify missing-result/error behavior. Record actual URL and outcomes; do not claim deployment without evidence.
  Learner check: Open the deployed URL, generate your demo plan, and explore the app freely before final readiness confirmation.
  Commit: `Document and verify published AFRIQA demo`

## Hands-on Checkpoints

- [x] Early usable behavior explored — learner tried the real workflow and reported "is working"; no changes requested.
- [ ] Final kick-the-tires exploration and feedback completed — after deployment, or explicitly revised checkpoint if account access delays publishing.

## Final Review

- [ ] Domain-specific revision requested after the learner reported the deployed app works perfectly: update prompt/schema/display and verify real cross-domain outputs, then have the learner retry the live app.

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — inspect actual structured generation and validation evidence, or connect prior slice-1 practice to the reusable takeaway.
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate.
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse.

Activity and evidence: Pending build; learning focus is schema-guided generation and how it differs from runtime validation.
Route and stops: Planned `lib/plan-schema.ts`, `lib/plan-prompt.ts`, `lib/gemini.ts`; record actual symbols after implementation.
Edit outcome: Not yet offered.
Reflection: Not yet offered; personal answer belongs only in the ignored learner profile.
Activity mode: Focused investigation for an experienced plan-first learner.

## Revisions

- Domain revision committed/pushed as `a360bbc`; the live homepage returned 200 with the new wording. Deployed generation checks returned the recoverable 502 message, while two remote browser page loads timed out. A subsequent local provider probe also failed with APIConnectionError. Live end-to-end success of the revision is not established. Added credential-free server diagnostics (`kind`, numeric provider status and invalid schema field names only) to distinguish provider/connection failures from invalid output; no user input, response content or key is logged. Learner assistance with Vercel logs is requested.

- Final domain-aware production build, typecheck and lint passed, alongside the 21 automated tests. Five browser checks passed on the production app. Publishing the revision and checking its real deployed browser response are the remaining agent steps; learner retry follows.

- Domain revision verification: 21 unit/render/API tests and five browser workflow tests passed. Real fictional examples produced all nine supported domain categories with relevant actions; a conflicting marketing instruction remained an Education plan. Timeout/connection interruptions were retained as failures and explicitly retested. The urgent shop-owner example was Health/High; after refining a distracting shop task, retesting produced only medical/safety actions, immediate help, and clinician-guided follow-up. See `domain-verification.md` for evidence and limitations. Final production build, publishing verification and learner retry are tracked separately until complete.

- The learner reported the deployed app is working perfectly and requested domain-specific analysis for medical, security, education, business, household, love/relationships, jobs/careers and other problems. This explicitly expands the original business-focused boundary within the same two-page workflow. Scope, PRD and spec were updated; final readiness is pending this requested revision. The new required domain field was tested failing before implementation; semantic relevance is checked with real model responses rather than prompt-text assertions.

- Vercel demo verified at `https://afriqa-xi.vercel.app`: homepage HTTP 200; real deployed generation returned all required sections, three actions and ordered Days 1–7. An unintercepted browser submission reached `/results`, showed the actions and Day 7, rejected blank input, and displayed return guidance after refresh. No credentials were transmitted in chat. Final learner exploration/readiness confirmation and learning wrap-up remain pending.

- GitHub publishing succeeded to `https://github.com/wasko1984/afriqa`. GitHub's unauthenticated API confirmed the repository is public, with default branch `master`; the remote branch matches verified commit `dba6118`. Local credential files and the learner profile are untracked, and the configured Gemini key was absent from both published commit diffs. Vercel deployment and deployed real-AI verification remain pending.

- Slice 2 verification: 18 unit/render/API tests passed, including malformed/oversized input, configuration and timeout mapping; four browser tests passed, including refreshing a generated result and Retry with the original submission. Typecheck, lint and production build passed. Real fictional scenarios exposed overestimated urgency and weak accounting advice; the prompt now grounds urgency, distinguishes sales from cash/profit, and discourages unsupported targets. Retesting returned schema-valid Medium/Low/High plans for unknown impact, stable planning and an imminent rent deadline. Semantic quality remains imperfect: occasional assumptions or inconsistent cash checks survive structural validation. One 502 could not be reproduced directly; no speculative adapter fix was made.
- Publishing access check: no Git remote or GitHub/Vercel CLI is configured. The Computer Use runtime failed to initialize with a missing kernel-assets path. Account sign-in and repository details are required to finish publishing; no deployed URL exists yet.

- Slice 1 passed real-provider and browser verification, received the learner's successful hands-on check, and was committed as `1f0082a`. Earlier progress notes below describe the installation and API investigation at those times.

- Real Gemini generation is now verified through the actual API (200 with a complete validated plan) and the browser (separate results and Day 7 visible, without response interception). The fictional Lagos food-business example produced concrete WhatsApp feedback/outreach actions; offers still require the owner's affordability judgment. A read-only independent review found no critical/important bugs. The early hands-on learner check remains pending, so slice 1 is not yet committed or checked complete.

- The user configured the local Gemini key. Restricted outbound requests failed to connect; an unrestricted provider call reached Google but gemini-3.8-flash returned temporary overload (503). A documented free alternative, gemini-3.1-flash-lite, returned a completed response that passed the full schema. The configured/default model now uses Flash-Lite. Actual app-endpoint and browser real-AI verification are next; no paid upgrade occurred.

- Slice 1 is in progress: schema and API tests passed (11 tests), but dependencies did not finish installing. npm reported network ECONNRESET, then ENOSPC during Next.js extraction. Installation was stopped. The welcome page remains a placeholder; browser and real-AI checks have not run. No slice is complete or committed. Free disk space and repair the dependency installation before continuing. The local Gemini key is not yet configured.
- With user consent, the incomplete node_modules folder was removed. A subsequent disk check showed 9 GB available, so dependency installation resumed without deleting the npm cache. An ignored .env.local template is ready for local key entry.
- Dependencies are now installed. The welcome form, real-provider adapter, separate results, validation, Retry, and responsive styling are implemented. All 12 unit/render tests, typecheck, lint, and production build passed. Four browser scenarios reported successful assertions with test-only responses; the managed-server run hung during cleanup, so it was stopped and a rerun against an independently started production server is pending. Desktop and phone screenshots were inspected; phone results had no horizontal overflow. Real AI, learner feedback, commits, and publishing remain incomplete because the local Gemini key is still empty. No slice is checked complete.
- The browser rerun against the independent production server completed with exit 0: all four workflow tests passed. The real API without a configured key returned the expected 503 configuration error. The local app is running at http://localhost:3000; restart it after entering the Gemini key. Real-provider generation and quality checks remain required before slice 1 can be committed and checked complete.
