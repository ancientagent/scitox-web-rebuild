import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

const startHereCards = [
  {
    title: "What SciTOX is for",
    body:
      "SciTOX is being positioned for people whose prescribed medication or private medical circumstances may be misunderstood in ordinary hiring or workplace screening situations. [REVIEW REQUIRED]",
  },
  {
    title: "What SciTOX is not for",
    body:
      "SciTOX is not intended for state, federal, court-ordered, probation, parole, DOT, government-regulated, or otherwise legally mandated screening situations.",
  },
  {
    title: "What happens next",
    body:
      "If the situation fits, guidance should ask a few focused questions and route the visitor toward product guidance or support without collecting more context than needed. [REVIEW REQUIRED]",
  },
];

const researchCards = [
  {
    label: "Adult ADHD context",
    value: "15.5M",
    body:
      "CDC estimated that 15.5 million U.S. adults, or 6.0%, had a current ADHD diagnosis in 2023. About one third of adults with ADHD reported stimulant medication use in the previous year.",
    href: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7340a1.htm",
    source: "CDC",
  },
  {
    label: "Medical questions",
    value: "ADA",
    body:
      "EEOC guidance explains that disability-related inquiries and medical exams are restricted by stage of employment, and questions about prescription medication can be disability-related.",
    href: "https://www.eeoc.gov/laws/guidance/questions-and-answers-enforcement-guidance-disability-related-inquiries-and-medical",
    source: "EEOC",
  },
  {
    label: "HIPAA limits",
    value: "HHS",
    body:
      "HHS explains that HIPAA generally does not protect employment records, even when the information in those records is health-related.",
    href: "https://www.hhs.gov/hipaa/for-individuals/employers-health-information-workplace/index.html",
    source: "HHS",
  },
];

const faqItems = [
  {
    question: "What is SciTOX for?",
    answer:
      "SciTOX is for people who want a privacy-aware product guidance path when prescribed medication or private medical context could create stigma, confusion, or unfair assumptions in an ordinary workplace or hiring setting. This wording needs owner and legal-sensitive review before launch. [REVIEW REQUIRED]",
  },
  {
    question: "Who should not use SciTOX?",
    answer:
      "SciTOX should not be used to compromise, interfere with, or work around a state, federal, court-ordered, probation, parole, DOT, government-regulated, or otherwise legally mandated screening process. If a screening process is legally mandated, the responsible next step is to review official requirements or speak with a qualified professional.",
  },
  {
    question: "Why does prescribed medication create privacy concern?",
    answer:
      "A lawful prescription can still reveal private medical information. For some people, that disclosure can create concern about stigma, assumptions, extra scrutiny, or improper treatment. The Knowledge Center should explain this without claiming that every employer will discriminate or that any specific outcome is guaranteed.",
  },
  {
    question: "Why mention ADHD?",
    answer:
      "ADHD is one clear example of a common medical context where prescribed stimulant medication may be lawful and clinically appropriate, while still carrying social stigma. CDC adult ADHD data gives useful context, but the page should avoid suggesting that every ADHD-related employment issue is legally actionable.",
  },
  {
    question: "Can an employer ask about medication?",
    answer:
      "Rules depend on the stage of employment, the job, and the reason for the question. EEOC guidance says the ADA restricts medical questions and medical exams, and that prescription medication questions can be disability-related inquiries. This page should point users to official resources rather than giving legal advice.",
  },
  {
    question: "Does HIPAA protect my information from an employer?",
    answer:
      "Not always. HHS explains that HIPAA generally applies to covered health care providers and health plans, not most employer actions, and that employment records are generally not protected by the HIPAA Privacy Rule. This is exactly why the page should explain privacy carefully instead of overpromising it.",
  },
  {
    question: "What if I think I was treated unfairly?",
    answer:
      "Keep a clear record of dates, notices, policies, messages, screening instructions, and decisions. Review official EEOC or state civil rights resources, and consider speaking with an employment attorney or qualified professional. SciTOX should not tell a visitor that they have a legal claim.",
  },
  {
    question: "What if I am an active or returning client?",
    answer:
      "The onboarding flow should route active or returning clients to support paths for order, product, timing, or follow-up questions instead of making them read first-time educational content.",
  },
];

const officialResources = [
  {
    title: "Medical questions and exams",
    source: "EEOC",
    body: "Employment-stage rules for medical questions, disability-related inquiries, and medical exams.",
    href: "https://www.eeoc.gov/pre-employment-inquiries-and-medical-questions-examinations",
  },
  {
    title: "Filing a discrimination charge",
    source: "EEOC",
    body: "Official starting point for workers who believe they experienced workplace discrimination.",
    href: "https://www.eeoc.gov/filing-charge-discrimination",
  },
  {
    title: "HIPAA and employers",
    source: "HHS",
    body: "Plain-language explanation of what HIPAA does and does not cover in workplace settings.",
    href: "https://www.hhs.gov/hipaa/for-individuals/employers-health-information-workplace/index.html",
  },
  {
    title: "Adult ADHD facts",
    source: "CDC",
    body: "Federal public health context on adult ADHD diagnosis and treatment patterns.",
    href: "https://www.cdc.gov/adhd/php/adults/index.html",
  },
  {
    title: "Prescribed medication and ADA context",
    source: "ADA.gov",
    body: "Official ADA discussion of opioid use disorder, recovery, and prescribed medication context.",
    href: "https://www.ada.gov/topics/opioid-use-disorder/",
  },
  {
    title: "DOT drug and alcohol testing",
    source: "U.S. DOT",
    body: "Official transportation drug and alcohol testing program resources for safety-sensitive roles.",
    href: "https://www.transportation.gov/odapc",
  },
  {
    title: "Federal workplace drug testing",
    source: "SAMHSA",
    body: "Federal workplace drug testing resources and technical standards.",
    href: "https://www.samhsa.gov/workplace/drug-testing-resources",
  },
  {
    title: "Background checks",
    source: "FTC",
    body: "Employer obligations and applicant rights when background checks are used.",
    href: "https://www.ftc.gov/business-guidance/resources/background-checks-what-employers-need-know",
  },
];

const documentationSteps = [
  "Save job postings, screening notices, policies, emails, and written decisions.",
  "Write down dates, names, and what was said while details are still fresh.",
  "Ask for instructions or decisions in writing when appropriate.",
  "Use official agency resources or qualified professionals for legal questions.",
];

export default function ResourcesPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Knowledge center"
        title="Understand whether SciTOX is the right next step."
        actions={
          <>
            <StatusTag tone="review">Educational only</StatusTag>
            <StatusTag tone="owner">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          This is the information-first path for visitors who want context before
          moving into product guidance. It should explain medication-related
          stigma, workplace privacy concerns, screening boundaries, and official
          resources without giving legal or medical advice.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Start here</p>
            <h2>Make the boundary clear before asking for action.</h2>
            <p>
              The Knowledge Center should help a first-time visitor decide
              whether they belong in product guidance, support, or an official
              resource path.
            </p>
          </div>
          <div className="path-grid">
            {startHereCards.map((card) => (
              <article className="route-card" key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--dark">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Medication, privacy, and stigma</p>
            <h2>Use evidence to normalize the concern without turning it into fear.</h2>
            <p>
              The point is not to tell visitors they have been wronged. The point
              is to show that prescribed medication, disability-related questions,
              and workplace medical privacy are real topics with official sources
              behind them.
            </p>
          </div>
          <div className="knowledge-stat-grid">
            {researchCards.map((card) => (
              <article className="knowledge-stat-card" key={card.label}>
                <p className="tag">{card.label}</p>
                <strong>{card.value}</strong>
                <p>{card.body}</p>
                <a href={card.href} rel="noreferrer" target="_blank">
                  Source: {card.source}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">FAQ direction</p>
            <h2>Answer the hard questions directly and carefully.</h2>
            <p>
              These answers are written to educate and route. They should remain
              neutral, source-aware, and reviewed before public launch.
            </p>
          </div>
          <div className="knowledge-faq-list">
            {faqItems.map((item) => (
              <details className="knowledge-faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Practical recordkeeping</p>
            <h2>Give users something useful to do without telling them what to claim.</h2>
            <p>
              A calm documentation checklist helps visitors protect their own
              context, prepare for professional advice, and avoid acting from
              panic.
            </p>
          </div>
          <div className="knowledge-checklist">
            {documentationSteps.map((step) => (
              <div className="knowledge-checklist__item" key={step}>
                <span aria-hidden="true" />
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Official resources</p>
            <h2>Let government and agency sources carry the authority.</h2>
            <p>
              These links should stay visible so SciTOX does not appear to be
              inventing legal conclusions or replacing qualified professional
              guidance.
            </p>
          </div>
          <div className="knowledge-resource-grid">
            {officialResources.map((resource) => (
              <a
                className="knowledge-resource-card"
                href={resource.href}
                key={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.source}</span>
                <h2>{resource.title}</h2>
                <p>{resource.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--dark">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Important boundary</p>
            <h2>This page should educate. It should not advise.</h2>
            <p>
              The Knowledge Center is for general educational information only.
              It is not legal advice, medical advice, or a substitute for a
              qualified professional. Screening rules, employer policies, and
              legal protections vary by situation.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Ready to continue</h2>
              <p>
                If this situation fits, move into the guided path and answer a
                few focused questions.
              </p>
              <Link className="text-link" href="/guidance">
                Start guidance
              </Link>
            </article>
            <article>
              <h2>Need more context</h2>
              <p>
                If the situation is unclear, sensitive, or already connected to
                an order, support is the better next step.
              </p>
              <Link className="text-link" href="/support">
                Open support
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
