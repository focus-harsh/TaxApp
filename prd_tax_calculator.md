# PRD — India Salaried Tax Calculator (FY 2025–26)

## Product Name
TaxWise India (working title)

## Product Vision
Build the simplest and most trustworthy Indian income tax calculator for salaried employees.

The app should help users answer one question with confidence:

> “Which tax regime saves me more money?”

The experience should feel modern, beginner-friendly, educational, transparent, and privacy-first.

Unlike traditional tax calculators, users should NOT need to know:
- CTC
- Gross salary structure
- Tax terminology
- Complex deduction names

The product should start from what people actually know:
- Monthly in-hand salary
- Rent paid
- PF deduction
- Insurance premiums
- Investments

Everything runs fully in-browser.
No data stored.
No login required.
No PDF export required.

---

# 1. Target Audience

## Primary Users
### Young salaried employees
- Age: 21–35
- First or second job
- Limited tax knowledge
- Confused between old vs new regime

### Mid-career salaried professionals
- Age: 30–50
- Have investments
- Home loan / rent / insurance
- Want optimization suggestions

### Senior salaried users
- Age: 60+
- Pension + salary cases
- Need senior citizen slab support

---

# 2. Core Product Goals

## Primary Goal
Help users confidently choose the best tax regime.

## Secondary Goals
- Make tax understandable
- Educate users in plain English
- Reduce anxiety around taxes
- Build trust through transparency
- Show real-time tax impact
- Increase completion rate

---

# 3. Non-Goals

The app WILL NOT support:
- Freelancers
- Business income
- Capital gains
- Crypto taxation
- Surcharge calculations
- Foreign income
- Agricultural income
- Partnership income
- GST
- Tax filing
- Form 16 parsing
- ITR submission
- PDF generation

Focus only on salaried individuals.

---

# 4. Product Principles

## 4.1 Human Language First
Avoid finance jargon.

Instead of:
- “Enter 80C deductions”

Use:
- “How much did you invest in tax-saving options like ELSS, PPF, LIC, EPF etc.?”

---

## 4.2 One Question At A Time
Every screen should ask ONE primary question.

This improves:
- comprehension
- mobile usability
- completion rates
- trust

---

## 4.3 Live Feedback
The right-side panel updates in real time after every answer.

Users should feel:
- progress
- momentum
- transparency

---

## 4.4 Privacy First
Everything runs client-side.

No backend required for calculations.

Display privacy message prominently:

> “Your salary and tax information never leaves your browser.”

---

# 5. Supported Platforms

## Web App
Responsive design:
- Desktop first
- Mobile optimized
- Tablet support

---

# 6. Tech Recommendations

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand or Redux Toolkit
- Framer Motion

## Charts
- Recharts

## Validation
- Zod

## Tax Engine
Pure TypeScript utility library.

No backend dependency.

---

# 7. Core User Flow

## Step 1 — Landing Page
## Step 2 — Start Wizard
## Step 3 — Salary Basics
## Step 4 — Rent & HRA
## Step 5 — PF & Retirement
## Step 6 — Investments
## Step 7 — Insurance
## Step 8 — Home Loan
## Step 9 — Other Income
## Step 10 — Summary
## Step 11 — Results & Recommendation
## Step 12 — Personalized Suggestions

---

# 8. Landing Page Requirements

## Purpose
Convince users to start.

## Hero Section
### Headline
> “Find out which tax regime saves you more money.”

### Subheadline
> “Simple questions. Real-time comparison. 100% private.”

### CTA
Primary:
- “Start Free Tax Check”

Secondary:
- “See Sample Result”

---

## Hero Visual
Mockup preview of:
- side-by-side regime comparison
- tax saved indicator
- live charts
- deduction breakdown

---

## Trust Section
Cards:
- No login needed
- Runs in browser
- FY 2025–26 updated
- Beginner friendly

---

## “How It Works” Section
3 steps:
1. Answer simple questions
2. Compare both regimes
3. Choose the better option

---

## FAQ Section
Examples:
- Do I need Form 16?
- Is my data saved?
- What if I don’t know exact numbers?
- Does this support old & new regime?

---

## Footer
- Disclaimer
- Privacy-first statement
- FY version

---

# 9. Wizard UX Requirements

## Layout
Desktop:
- Left = question area
- Right = live tax preview

Mobile:
- Question first
- Preview collapsible accordion

---

## Progress Indicator
Options:
- progress bar
- step dots
- “Step 4 of 10”

---

## Navigation
Buttons:
- Back
- Continue
- Skip this

Auto-save locally using localStorage.

---

## Input Rules
- Large touch targets
- Mobile numeric keypad
- Currency formatting
- Real-time validation

---

# 10. Live Preview Panel

## Purpose
Show users the impact of answers instantly.

## Must Include
### Current estimated taxable income
### Estimated tax under old regime
### Estimated tax under new regime
### Current savings difference
### Tax slabs visualization
### Deduction summary
### Income summary
### HRA impact
### Standard deduction
### 80C utilization

---

## Live Comparison Card
Example:

| Regime | Estimated Tax |
|---|---|
| Old | ₹82,400 |
| New | ₹61,200 |

Highlight:
> “New regime currently saves you ₹21,200”

---

## Tax Slab Table
Dynamic slab-by-slab breakdown.

Example:

| Slab | Taxable Amount | Rate | Tax |
|---|---|---|---|
| 0–4L | ₹4,00,000 | 0% | ₹0 |
| 4–8L | ₹4,00,000 | 5% | ₹20,000 |

Separate tables for both regimes.

---

# 11. Question Flow Details

# STEP 1 — Basic Profile

## Question 1
“What is your age?”

Options:
- Below 60
- 60 to 79
- 80+

Purpose:
- old regime slab selection

---

## Question 2
“What type of salaried person are you?”

Options:
- Private employee
- Government employee
- Pensioner

---

# STEP 2 — Monthly Salary Understanding

## Key Principle
Most users know monthly in-hand salary.

System should intelligently estimate annual salary.

---

## Question
“How much salary usually comes into your bank account every month?”

Input:
- monthly in-hand salary

Additional helper:
> “Use your average monthly salary after deductions.”

---

## Question
“How many salary months do you receive in a year?”

Default:
- 12

Options:
- 12
- 13
- custom

---

## Question
“Do you receive bonus, incentives, or variable pay?”

Input:
- annual amount

---

## Salary Estimation Logic
Because users may not know gross salary:

Estimated gross salary formula:

grossSalaryEstimate =
(inHandMonthly × months)
+ estimated PF
+ estimated tax deducted
+ professional tax
+ employer deductions

Allow advanced edit:
> “I know my annual gross salary”

If enabled:
- override estimate manually

---

# STEP 3 — PF & Salary Deductions

## Question
“Does your company deduct PF from salary?”

Options:
- Yes
- No
- Not sure

If Yes:

### Question
“How much PF is deducted monthly?”

If Not Sure:
System estimates:
- 12% of basic salary

---

## Question
“Does your company deduct professional tax?”

Options:
- Yes
- No
- Not sure

If Yes:
- monthly amount

Default suggestion:
- ₹200/month for many states

---

# STEP 4 — Rent & HRA

## Question
“Do you live in a rented house?”

If No:
Skip HRA flow.

---

If Yes:

## Question
“How much rent do you pay every month?”

---

## Question
“Which city do you live in?”

Options:
- Metro city
- Non-metro city

Metro cities:
- Delhi
- Mumbai
- Chennai
- Kolkata
- Ahmedabad

---

## Question
“Do you receive HRA in your salary?”

Options:
- Yes
- No
- Not sure

If Yes:

### Question
“How much HRA do you receive yearly?”

If Not Sure:
System estimates from salary.

---

## HRA Exemption Formula
HRA exemption = minimum of:
1. Actual HRA received
2. Rent paid - 10% of salary
3. 50% of salary (metro)
4. 40% of salary (non-metro)

Salary for HRA:
- basic salary + DA forming part of retirement benefits

If unavailable:
Use estimated basic salary.

Estimated basic salary:
- 40% to 50% of gross salary

Developer Note:
Allow manual override.

---

# STEP 5 — 80C Investments

## Question
“Did you invest in tax-saving options this year?”

Examples shown:
- PPF
- ELSS
- LIC
- EPF
- Tax-saving FD
- Sukanya Samriddhi

---

## Input
Total 80C investments.

Validation:
- Max deduction allowed = ₹1,50,000

---

## Education Tip
> “In old regime, up to ₹1.5L can reduce taxable income.”

---

# STEP 6 — NPS

## Question
“Did you invest in NPS?”

Two sections:
- Your contribution
- Employer contribution

---

## Employee NPS
Section 80CCD(1B)
Max additional deduction:
₹50,000

---

## Employer NPS
Under new regime:
Employer contribution allowed.

Limits:
- 14% for government employees
- 10% for others

Developer must support configurable limits.

---

# STEP 7 — Health Insurance (80D)

## Question
“Did you pay for health insurance?”

Options:
- Self/family
- Parents
- Both

---

## Deduction Limits
### Self/family
- ₹25,000
- ₹50,000 if senior citizen

### Parents
- ₹25,000
- ₹50,000 if senior citizen

---

## Questions
- Premium paid for self/family
- Premium paid for parents
- Are parents senior citizens?

---

# STEP 8 — Home Loan

## Question
“Do you have a home loan?”

If Yes:

### Question
“How much home loan interest did you pay this year?”

---

## Rules
Old regime:
- Self-occupied property interest deduction up to ₹2L

New regime:
- No deduction for self-occupied property

---

## Additional Question
“Is the property self-occupied or rented out?”

For MVP:
Support only self-occupied.

---

# STEP 9 — Savings Interest & FD Interest

## Question
“Did you earn bank interest or FD interest?”

Inputs:
- Savings account interest
- FD interest

---

## Rules
### Savings interest
Section 80TTA:
- up to ₹10,000 deduction (non-senior)

Section 80TTB:
- up to ₹50,000 deduction (senior citizens)

---

# STEP 10 — Other Common Deductions

## Professional Tax
Allowed in old regime.

---

## Standard Deduction
Auto applied.

FY 2025–26:
- New regime = ₹75,000
- Old regime = ₹50,000

---

# 12. Tax Logic — FY 2025–26

# IMPORTANT
All calculations must be unit tested thoroughly.

Use paise-safe arithmetic.
Avoid floating point inaccuracies.

Recommended:
- integer rupee calculations

---

# 13. New Tax Regime Slabs (FY 2025–26)

| Income Range | Tax Rate |
|---|---|
| ₹0 – ₹4,00,000 | 0% |
| ₹4,00,001 – ₹8,00,000 | 5% |
| ₹8,00,001 – ₹12,00,000 | 10% |
| ₹12,00,001 – ₹16,00,000 | 15% |
| ₹16,00,001 – ₹20,00,000 | 20% |
| ₹20,00,001 – ₹24,00,000 | 25% |
| Above ₹24,00,000 | 30% |

Source references used during PRD research indicate FY 2025–26 revised slabs announced after Budget 2025. ([cleartax.in](https://cleartax.in/s/income-tax-rebate-us-87a?utm_source=chatgpt.com))

---

# 14. Old Tax Regime Slabs

## Below 60

| Income Range | Tax Rate |
|---|---|
| ₹0 – ₹2,50,000 | 0% |
| ₹2,50,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

---

## Senior Citizens (60–79)

| Income Range | Tax Rate |
|---|---|
| ₹0 – ₹3,00,000 | 0% |
| ₹3,00,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

---

## Super Senior (80+)

| Income Range | Tax Rate |
|---|---|
| ₹0 – ₹5,00,000 | 0% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

---

# 15. Section 87A Rebate Rules

## New Regime
FY 2025–26:
- rebate up to ₹60,000
- taxable income up to ₹12,00,000

Effectively zero tax up to:
- ₹12,75,000 salary for salaried users after ₹75k standard deduction

Sources referenced during research. ([cleartax.in](https://cleartax.in/s/income-tax-rebate-us-87a?utm_source=chatgpt.com))

---

## Old Regime
- rebate up to ₹12,500
- taxable income up to ₹5,00,000

---

# 16. Marginal Relief Logic

## New Regime
If income slightly exceeds ₹12 lakh taxable income:

Tax should not exceed:
(excess income above ₹12 lakh)

Implement marginal relief logic carefully.

Example:
If taxable income = ₹12,05,000
Then total tax cannot exceed ₹5,000.

Apply cess afterward.

---

# 17. Health & Education Cess

Apply:
- 4% cess

Formula:
cess = incomeTax × 0.04

Final tax:
incomeTax + cess

---

# 18. Calculation Order

# OLD REGIME FLOW

Gross Salary
→ Less exempt allowances
→ Less standard deduction
→ Income from salary
→ Add other income
→ Less deductions
→ Taxable income
→ Slab tax
→ Rebate
→ Cess
→ Final tax

---

# NEW REGIME FLOW

Gross Salary
→ Less standard deduction
→ Add other income
→ Less allowed deductions
→ Taxable income
→ Slab tax
→ Rebate
→ Marginal relief
→ Cess
→ Final tax

---

# 19. Allowed Deductions Matrix

| Deduction | Old | New |
|---|---|---|
| Standard deduction | Yes | Yes |
| HRA | Yes | No |
| 80C | Yes | No |
| 80D | Yes | No |
| Home loan interest | Yes | No |
| Professional tax | Yes | No |
| Employee NPS 80CCD(1B) | Yes | No |
| Employer NPS contribution | Yes | Yes |
| 80TTA | Yes | No |
| 80TTB | Yes | Yes |

---

# 20. Validation Rules

## Numeric Validation
- No negative values
- Max sensible limits
- Currency formatting

---

## Soft Validation
If rent > salary:
Show warning.

If investments unusually high:
Show review warning.

---

## Smart Suggestions
If user enters:
- ₹3L under 80C

System explains:
> “Only ₹1.5L is allowed under Section 80C.”

---

# 21. Results Page Requirements

# PRIMARY RESULT

Large headline:

> “Pick the New Regime”

Subheadline:

> “You save ₹23,420 compared to old regime.”

---

# Result Cards

| Category | Old | New |
|---|---|---|
| Taxable income | | |
| Total deductions | | |
| Income tax | | |
| Cess | | |
| Final tax | | |
| Net savings | | |

---

# Visual Comparison
Charts:
- bar chart
- donut chart
- deduction composition
- tax breakdown

---

# 22. Personalized Education Section

## Purpose
Explain tax in simple language.

Examples:

> “Your rent helped reduce your taxable income significantly under old regime.”

> “You are not using full 80C limit. Investing ₹40,000 more could reduce taxes further.”

> “New regime is better because your deductions are relatively low.”

---

# 23. Smart Recommendations Engine

## Recommendation Rules

### If 80C < 1.5L
Suggest:
- ELSS
- PPF
- EPF
- LIC

---

### If no NPS
Suggest:
- NPS additional ₹50k deduction

---

### If no health insurance
Suggest:
- 80D benefits

---

### If HRA high
Explain:
- old regime advantage

---

### If deductions minimal
Recommend:
- new regime

---

# 24. Edge Cases

## Edge Case 1
Income exactly at rebate threshold.

## Edge Case 2
Income slightly above rebate threshold.

## Edge Case 3
No deductions.

## Edge Case 4
Very high HRA.

## Edge Case 5
Senior citizen deductions.

## Edge Case 6
User skips multiple fields.

## Edge Case 7
Zero tax after rebate.

## Edge Case 8
Monthly in-hand estimate inaccurate.

Must allow manual salary override.

---

# 25. Accessibility Requirements

- Keyboard navigable
- Proper labels
- High contrast
- Screen reader support
- Mobile friendly

---

# 26. Performance Requirements

- First load under 2 seconds
- Tax recalculation under 100ms
- No server round trips

---

# 27. Privacy Requirements

## Mandatory
No salary data leaves browser.

Display:

> “Your calculations stay on your device.”

---

## No Analytics On Inputs
Never send:
- salary
- deductions
- tax values

---

# 28. State Management Model

## Recommended Structure

wizardState:
- profile
- salary
- hra
- investments
- deductions
- results

---

# 29. Tax Engine Architecture

## Functions

calculateGrossIncome()
calculateHRAExemption()
calculate80C()
calculate80D()
calculateOldRegimeTax()
calculateNewRegimeTax()
apply87ARebate()
applyMarginalRelief()
calculateCess()
compareRegimes()

---

# 30. Testing Requirements

## Unit Tests
Must cover:
- every slab
- rebate boundaries
- cess
- HRA logic
- deduction caps
- senior citizen logic
- marginal relief

---

## Snapshot Tests
For UI states.

---

## E2E Tests
Wizard completion flow.

---

# 31. Suggested UI Components

## Components
- HeroSection
- WizardLayout
- QuestionCard
- FAQAccordion
- TaxPreviewPanel
- SlabBreakdownTable
- RegimeComparisonCard
- RecommendationCard
- ProgressIndicator

---

# 32. FAQ Content Per Step

Each step should include mini FAQ accordion.

Examples:

## HRA FAQ
Q: What if I don’t know my HRA?
A: Use estimate or salary slip.

Q: Is HRA available in new regime?
A: Usually no.

---

## 80C FAQ
Q: What counts under 80C?
A: PPF, ELSS, EPF, LIC, tuition fees, etc.

---

# 33. Mobile UX Requirements

## Sticky Bottom Actions
- Back
- Continue

---

## Collapsible Preview
Users can expand/collapse.

---

## Large Numeric Keyboard
Use inputMode=numeric.

---

# 34. Error Handling

## Validation Errors
Human language only.

Bad:
- Invalid numeric value.

Good:
- “Please enter a valid amount.”

---

# 35. Design System Guidelines

## Style
- Modern
- Minimal
- Trustworthy
- Calm
- Spacious

---

## Avoid
- crowded screens
- heavy gradients everywhere
- finance dashboard clutter

---

## Recommended Palette
- White
- Neutral gray
- Indigo or blue accent
- Green for savings
- Red for warnings

---

## Typography
- Clean sans-serif
- Large readable headings
- Comfortable spacing

---

# 36. Animations

Use subtle animations:
- progress transitions
- panel updates
- number counters
- chart transitions

Avoid excessive motion.

---

# 37. Future Enhancements (Not MVP)

- Form 16 upload
- AI assistant
- Regional languages
- Tax planning simulator
- Investment planner
- Historical comparison
- Save/share results
- Dark mode
- Salary breakup analyzer

---

# 38. Developer Notes

## IMPORTANT
Tax laws change frequently.

All slabs/deductions should be configurable via:
- constants file
- JSON config

Avoid hardcoding tax values across app.

---

# 39. Recommended File Structure

/src
  /components
  /features
  /tax-engine
  /utils
  /constants
  /hooks
  /types

---

# 40. Suggested Tax Constants Structure

export const TAX_CONFIG = {
  fy: '2025-26',
  oldRegime: {},
  newRegime: {},
  deductions: {},
  rebate: {},
  cess: 0.04,
}

---

# 41. Final Product Experience Goal

When a user finishes the flow, they should feel:

- “I finally understand taxes.”
- “This was surprisingly easy.”
- “I trust this calculator.”
- “Now I know which regime to choose.”

The product should feel:
- transparent
- educational
- modern
- calm
- intelligent
- beginner-friendly

NOT like a government form.

---

# 42. Compliance & Disclaimer

Display disclaimer:

> “This calculator is for educational and estimation purposes only. Final tax liability may vary based on your exact salary structure and applicable tax laws.”

---

# 43. Sources Used During Research

FY 2025–26 tax slab and rebate references were cross-checked using multiple publicly available taxation resources and government guidance pages during preparation of this PRD. ([cleartax.in](https://cleartax.in/s/income-tax-rebate-us-87a?utm_source=chatgpt.com))

