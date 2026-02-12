Updated the Feedback Studio content container so the selected `div.p-6.pt-0` area now explicitly uses the requested base visual treatment (transparent background + base typography) via design-system/Tailwind classes, while keeping all existing layout/content behavior unchanged in that UI section.

- Key file touched: `src/components/feedback/FeedbackTab.tsx:526`

Verification steps:
- Run typecheck: `npx tsc --noEmit` (passes).
- Open the Visual Feedback modal and inspect the `CardContent` container (`div.p-6.pt-0`) to confirm it retains `pt-0 px-6 pb-6` behavior and now applies base text styling (`text-base`, `font-normal`, `leading-6`) with transparent background.
- Confirm the targeted text remains present in this area: region selection hint, browser recording warning, and recorder header/actions.