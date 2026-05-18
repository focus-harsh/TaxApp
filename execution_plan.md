# Phased Execution Plan: TaxWise India (FY 2025–26)

Based on the Product Requirements Document (PRD), this execution plan breaks the development of the TaxWise India app into small, manageable phases. 

**Core Principle for Every Phase:** The application must be in a runnable, visual state at the end of each phase so you can open it, interact with it, and review the progress before moving to the next.

---

## Phase 1: Project Skeleton & Basic Routing
**Goal:** Set up the fundamental architecture and ensure the app loads in a browser.
*   **Tasks:**
    *   Initialize the Next.js project with TypeScript and Tailwind CSS.
    *   Set up the basic folder structure (`/components`, `/tax-engine`, `/store`, etc.).
    *   Create empty placeholder pages for the Landing Page and the Wizard flow.
    *   Set up basic routing between the landing page and the wizard.
*   **Runnable State:** You can open `localhost:3000`, see a basic landing page placeholder, click "Start", and be taken to a blank wizard page.

## Phase 2: Design System & Core Layouts
**Goal:** Establish the visual foundation and structural layout of the app.
*   **Tasks:**
    *   Configure Tailwind with the recommended calm/trustworthy color palette and typography.
    *   Build the fixed header and footer components.
    *   Build the responsive Wizard Layout (Left side for questions, Right side for the Live Preview panel).
    *   Implement "Next/Back" navigation buttons between mock steps.
*   **Runnable State:** The app looks visually styled. You can click "Next" and "Back" through a series of empty, nicely formatted screens with a static placeholder panel on the right.

## Phase 3: Tax Engine Foundation (Headless)
**Goal:** Build the core math logic independent of the UI.
*   **Tasks:**
    *   Create the `constants.ts` file containing FY 2025-26 tax slabs, deductions limits, and rebate logic.
    *   Implement pure utility functions for calculating gross salary, standard deduction, and old/new regime basic taxes.
    *   Write basic unit tests for these pure functions to ensure accuracy.
*   **Runnable State:** The UI looks exactly like Phase 2, but we can verify the tax math is correct by running tests in the terminal. The foundation is ready for UI integration.

## Phase 4: State Management & Step 1-2 (Profile & Salary)
**Goal:** Start gathering real data and connect it to the app's state.
*   **Tasks:**
    *   Set up Zustand (or similar) to manage the `wizardState`.
    *   Build the UI for Step 1 (Age, Employee Type).
    *   Build the UI for Step 2 (Monthly Salary, Bonus).
    *   Connect inputs to the global state.
*   **Runnable State:** You can type your salary into the app, click "Next", go "Back", and see that your numbers are remembered correctly.

## Phase 5: The Live Preview Panel (V1)
**Goal:** Bring the right-side panel to life with real-time feedback.
*   **Tasks:**
    *   Connect the Live Preview Panel to the global state.
    *   Implement the dynamic display of "Current Estimated Gross Salary" based on Step 2 inputs.
    *   Display a basic (incomplete) tax estimate for both regimes using the engine from Phase 3.
*   **Runnable State:** As you type your salary in the left panel, the numbers in the right panel update instantly to show estimated taxes.

## Phase 6: Core Deductions (Steps 3-5)
**Goal:** Implement the most common tax-saving mechanisms.
*   **Tasks:**
    *   Build UI for Step 3 (PF & Professional Tax).
    *   Build UI for Step 4 (Rent & HRA) and implement the HRA calculation logic.
    *   Build UI for Step 5 (80C Investments).
    *   Update the Live Preview panel to reflect these deductions.
*   **Runnable State:** You can enter rent and 80C investments, and instantly watch your taxable income and estimated tax drop in the live preview.

## Phase 7: Advanced Deductions (Steps 6-10)
**Goal:** Complete the data gathering flow.
*   **Tasks:**
    *   Build UI for Steps 6 through 10 (NPS, Health Insurance, Home Loan, Savings Interest).
    *   Integrate these inputs into the global state and tax engine.
    *   Ensure all soft validation rules (e.g., max ₹1.5L for 80C) are working.
*   **Runnable State:** The entire wizard question flow is complete. You can enter all possible financial details and see the final, accurate tax calculation in the live preview.

## Phase 8: Results Page & Recommendations
**Goal:** Deliver the final verdict to the user.
*   **Tasks:**
    *   Build the final Results Summary screen.
    *   Create visual comparison charts (bar/donut charts) comparing Old vs. New regime.
    *   Implement the "Smart Recommendations Engine" to show personalized tips (e.g., "Invest ₹40k more in 80C").
*   **Runnable State:** Upon finishing the wizard, you are presented with a clear, visual recommendation of which regime to choose and tips on how to save more.

## Phase 9: Landing Page Polish & Onboarding
**Goal:** Make the first impression count.
*   **Tasks:**
    *   Build out the actual Landing Page UI (Hero section, Trust badges, "How it works", FAQ).
    *   Ensure the transition from the Landing Page into the wizard feels seamless.
*   **Runnable State:** The app feels like a real product from the moment you hit the homepage, explaining its value clearly before asking for inputs.

## Phase 10: Final Polish, Animations, & Persistence
**Goal:** Elevate the experience from "functional" to "premium."
*   **Tasks:**
    *   Implement `localStorage` so users don't lose data on page refresh.
    *   Add Framer Motion for subtle transitions between steps and number counting animations.
    *   Perform a final pass for mobile responsiveness and accessibility (keyboard navigation).
*   **Runnable State:** The application is completely finished, perfectly polished, responsive on mobile, and ready for real users.
