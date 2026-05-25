import { GuidanceAssistantDemo } from "@/components/GuidanceAssistantDemo";
import { GuidancePreview } from "@/components/GuidancePreview";
import { WelcomeGreeting } from "@/components/WelcomeGreeting";

export default function GuidancePage() {
  return (
    <div className="page-flow">
      <WelcomeGreeting context="guidance" />
      <section className="content-band content-band--dark" id="quick-guidance">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guided questions</p>
            <h2>Answer what you know. Skip what you do not.</h2>
            <p>
              This route is meant to feel calm and practical. It can suggest a
              simple next step, or move the conversation to support when more
              context is needed.
            </p>
          </div>
          <GuidanceAssistantDemo />
          <GuidancePreview />
        </div>
      </section>
    </div>
  );
}
