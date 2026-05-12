# SciTOX Demo QA Notes

Last checked: May 12, 2026.

Method:
- Served the static demo with the local preview script.
- Checked `http://127.0.0.1:4173/demo/`.
- Used automated browser checks for desktop and mobile states.

Checks completed:
- Demo page returned `200`.
- Prompt-pack document link returned `200`.
- Desktop viewport rendered at `1440 x 1100`.
- Mobile viewport rendered at `390 x 844`.
- Mobile menu opened and displayed all navigation links.
- Product tabs updated the product preview.
- Guidance choices updated the suggested next step.
- Product detail drawer opened and closed.
- Prompt-pack link opened `docs/AGENT_SERVICE_BUILD_PROMPTS.md`.
- Browser console reported no errors after favicon was added.
- Demo link check confirmed all local anchors and file links resolve.

Known boundaries:
- Forms are mock UI only.
- Product names, product data, purchase paths, support promises, privacy/security language, and claims remain review-gated.
- Secure support, encrypted messaging, assisted checkout, and autonomous checkout are architecture options only until owner/tool/payment/privacy review is complete.
- This is not a Webflow export and is not final website copy.
