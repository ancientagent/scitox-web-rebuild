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
          <PrivacyPrepNotice />
          <div className="section-heading">
            <p className="eyebrow">Guided questions</p>
            <h2>Start with where you are right now.</h2>
            <p>
              Some people arrive ready to continue. Others need to understand
              the product and the privacy-aware context first. Choose the closest
              statement, and the page will narrow from there.
            </p>
          </div>
          <GuidanceAssistantDemo />
          <GuidancePreview />
        </div>
      </section>
    </div>
  );
}
