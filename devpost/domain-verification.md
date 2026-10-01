# Domain-aware planning verification

The shared problem-to-plan workflow now asks Gemini to identify the central domain and tailor every section to it. The label is validated by Zod and displayed in the result. It is the model's interpretation, not an independently verified classification.

## Real model scenarios

Fictional examples were sent to the configured Gemini Flash-Lite model using the production prompt and schema. Valid responses were inspected for domain relevance; transient failures were recorded and retried explicitly during verification, not automatically hidden by the app.

| Example | Observed domain | Relevance observed |
| --- | --- | --- |
| Recurring mild headaches and clinic preparation | Health | Symptom diary, study environment and clinical assessment |
| Unauthorized access to the user's own email | Security | Session revocation, password change, MFA and account audit |
| Mathematics exam with 30 minutes daily and no tutor budget | Education | Practice problems, topic prioritization and free support |
| Food business losing orders, no advertising budget | Business | Customer feedback, WhatsApp engagement and cash tracking |
| Three adults sharing household chores | Household | Task list, fair rotation and timed cleaning routine |
| Partner disagreement without threats or abuse | Relationships | Respectful check-in, listening and shared boundaries |
| Graduate applications without interview invitations | Careers | CV evidence, portfolio and targeted networking |
| Community tree-planting event without equipment | Other | Site permission, resource identification and responsibilities |
| Exam preparation plus anxiety affecting sleep | Mixed | Study routine and professional wellbeing support |
| Shop owner with current severe chest pain and breathing difficulty | Health | Immediate emergency help rather than serving customers |
| Mathematics concern plus instruction to replace the task with marketing prose | Education | Structured learning plan retained; marketing instruction ignored |

The initial batch returned eight schema-valid responses and three timeout/connection failures. Retesting the remaining scenarios through the actual local API returned complete plans. A failed real browser generation was also observed during the connection interruption; the error did not become fabricated success. A subsequent provider connectivity probe succeeded. No speculative change to the adapter or timeout limits was made.

The emergency example initially included a shop-closing action and example emergency numbers. This exposed domain drift within an otherwise health-focused plan. The prompt was refined to keep all acute-health actions medical/safety focused, omit unprovided emergency numbers, and make later days conditional on professional assessment. Emergency escalation is consistent with [NHS emergency-care guidance](https://www.nhs.uk/conditions/heart-attack/); AFRIQA does not reproduce UK contact numbers for users in unspecified locations. Defensive account-protection principles are grounded in [CISA's MFA guidance](https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication).

Retesting the refined emergency prompt returned Health/High with three medical-safety actions: seek emergency help, ask someone nearby to assist, and communicate symptoms to responders. It assigned no shop duties or emergency telephone numbers; later days followed clinician guidance. This is an observed example, not a guarantee of all future outputs.

## What these checks establish

Domain-field rejection/preservation tests and browser perspective checks protect the data/UI contract. Real-model examples assess the content, which fixture-based tests cannot establish. A finite set of successful examples cannot guarantee future classification, advice quality or prompt-injection resistance. Runtime validation ensures structure and counts; it does not validate diagnoses, urgency calibration or feasibility. Health output remains general information and care-seeking guidance, not diagnosis or treatment.

Repeat these scenarios when changing the prompt/model. Inspect causes, all three actions, every day and success checks; a correct label alone is insufficient. Prioritize immediate help for urgent situations, respect stated constraints and reject invented facts.
