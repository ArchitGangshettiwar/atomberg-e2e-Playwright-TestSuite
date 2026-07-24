# Atomberg E2E Test Suite

Playwright end-to-end tests for [atomberg.com](https://atomberg.com), covering two flows:

1. **Product search and filtering** (`tests/search.spec.ts`)
2. **Add to cart and cart management** (`tests/cart.spec.ts`)

## Framework choice

**Playwright + TypeScript**
- Built-in auto-waiting on actionability (visible, enabled, stable) — removes the need for manual sleeps in almost all cases
- First-class `getByRole` locators, which align with accessibility semantics and are more resilient to markup changes than raw CSS selectors
- Native trace viewer and HTML reporter for debugging failures without extra tooling
- A single config file for parallelism, retries, and reporting, which is helpful for keeping load against a live production site controlled and predictable

## Project structure

```
atomberg-e2e/
├── pages/                  # Page Object Model — one class per page/section
│   ├── HomePage.ts
│   ├── SearchResultsPage.ts
│   ├── CategoryPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── tests/
│   ├── search.spec.ts      # search + filtering scenarios
│   └── cart.spec.ts        # add to cart + cart management scenarios
├── playwright.config.ts
├── package.json
└── .github/workflows/playwright.yml   # CI: runs on push/PR, uploads HTML report
```

Each Page Object exposes only the locators and actions relevant to that page/section, so test files read as a sequence of user intentions rather than raw selector chains. Locators were captured with `playwright codegen` against the live site and then refactored out of a flat recorded script into these reusable classes.

## Setup

```bash
git clone <this-repo-url>
cd atomberg-e2e
npm install
npx playwright install --with-deps
```

## Running the tests

Run everything headless:
```bash
npm test
```

Run headed (watch the browser):
```bash
npm run test:headed
```

Run a single file:
```bash
npx playwright test tests/search.spec.ts
```

View the HTML report after a run:
```bash
npm run report
```
## CI

`.github/workflows/playwright.yml` runs the suite on every push and pull request to `main`, installs Chromium only (to keep CI time down), and uploads the HTML report as a build artifact regardless of pass/fail.

## Known limitations

- Selectors are based on the site's markup as of the recording date; if Atomberg changes copy or component structure (e.g. "No products found" wording, button labels), locators will need updating.
- Tests intentionally avoid checkout/payment steps and account registration/login, since those require real transactions or verified credentials and were out of scope for this suite.
