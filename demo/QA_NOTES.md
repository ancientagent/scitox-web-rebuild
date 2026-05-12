# SciTOX Demo QA Notes

Last checked: May 12, 2026.

Method:
- Served the static demo with the local preview script.
- Checked `http://127.0.0.1:4173/demo/` and a temporary QA port for the guidance endpoint recheck.
- Used automated browser checks for desktop and mobile states.
- Rechecked the live guidance endpoint and visible "Run backend check" interaction after the LLM assistant scaffold was added.

Checks completed:
- Demo page returned `200`.
- Prompt-pack document link returned `200`.
- Desktop viewport rendered at `1440 x 1100`.
- Mobile viewport rendered at `390 x 844`.
- Mobile menu opened and displayed all navigation links.
- Product tabs updated the product preview.
- Guidance choices updated the suggested next step.
- Backend guidance endpoint returned a safe escalation result with missing owner data when no LLM credentials/source mappings were configured.
- "Run backend check" posted to `/api/guidance/recommend` and displayed `human_follow_up` in the demo.
- Product detail drawer opened and closed.
- Prompt-pack link opened `docs/AGENT_SERVICE_BUILD_PROMPTS.md`.
- Browser console reported no errors after favicon was added.
- Browser console reported no errors after the guidance endpoint interaction.
- Network log showed `/api/guidance/recommend` returned `200`.
- Demo link check confirmed all local anchors and file links resolve.

Known boundaries:
- Forms are mock UI only.
- Product names, product data, purchase paths, support promises, privacy/security language, and claims remain review-gated.
- Authorize.net is represented as the owner-confirmed current checkout path, but enabled methods, integration type, fraud settings, refund/dispute handling, and Webflow handoff remain review items.
- The guidance assistant is a live feature target, but product recommendations require approved backend source data, LLM provider configuration, privacy review, and claims review.
- Secure support, encrypted messaging, assisted checkout, crypto/onramp checkout, and autonomous checkout are architecture options only until owner/tool/payment/privacy review is complete.
- This is not a Webflow export and is not final website copy.
