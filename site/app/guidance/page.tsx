import { GuidanceAssistantDemo } from "@/components/GuidanceAssistantDemo";
import { GuidancePreview } from "@/components/GuidancePreview";
import { PrivacyPrepNotice } from "@/components/PrivacyPrepNotice";
import { WelcomeGreeting } from "@/components/WelcomeGreeting";

export default function GuidancePage() {
  return (
    <div className="page-flow">
      <WelcomeGreeting context="guidance" />
      <section className="content-band content-band--dark" id="quick-guidance">
        <div className="band-inner">
          <GuidanceAssistantDemo />
          <PrivacyPrepNotice />
          <GuidancePreview />
        </div>
      </section>
    </div>
  );
}
