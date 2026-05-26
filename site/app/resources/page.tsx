import Link from "next/link";
import { Section } from "@/components/Section";

const startHereCards = [
  {
    title: "What SciTOX is for",
    body:
      "SciTOX is for people whose prescribed medication or private medical circumstances may be misunderstood in ordinary hiring or workplace screening situations.",
  },
  {
    title: "What SciTOX is not for",
    body:
      "SciTOX is not for state, federal, court-ordered, probation, parole, DOT, government-regulated, or otherwise legally mandated screening situations.",
  },
  {
    title: "What happens next",
    body:
      "If SciTOX fits your situation, product guidance asks a few focused questions and points you toward guidance or support.",
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
      "SciTOX is for people who want a privacy-aware product guidance path when prescribed medication or private medical context could create stigma, confusion, or unfair assumptions in an ordinary workplace or hiring setting.",
  },
  {
    question: "Who should not use SciTOX?",
    answer:
      "Do not use SciTOX to compromise, interfere with, or work around a state, federal, court-ordered, probation, parole, DOT, government-regulated, or otherwise legally mandated screening process. If a screening process is legally mandated, review official requirements or speak with a qualified professional.",
  },
  {
    question: "Why does prescribed medication create privacy concern?",
    answer:
      "A lawful prescription can still reveal private medical information. For some people, that disclosure can create concern about stigma, assumptions, extra scrutiny, or improper treatment. Legal protections may apply, but this page is educational and does not determine anyone's rights or claims.",
  },
  {
    question: "Why mention ADHD?",
    answer:
      "ADHD is one clear example of a common medical context where prescribed stimulant medication may be lawful and clinically appropriate, while still carrying social stigma. The point is not that every ADHD-related workplace issue is legally actionable. The point is that medication privacy can matter.",
  },
  {
    question: "Can an employer ask about medication?",
    answer:
      "Rules depend on the stage of employment, the job, and the reason for the question. EEOC guidance says the ADA restricts medical questions and medical exams, and that prescription medication questions can be disability-related inquiries. Use official resources or qualified professionals for legal questions.",
  },
  {
    question: "Does HIPAA protect my information from an employer?",
    answer:
      "Not always. HHS explains that HIPAA generally applies to covered health care providers and health plans, not most employer actions, and that employment records are generally not protected by the HIPAA Privacy Rule.",
  },
  {
    question: "What if I think I was treated unfairly?",
    answer:
      "Keep a clear record of dates, notices, policies, messages, screening instructions, and decisions. Review official EEOC or state civil rights resources, and consider speaking with an employment attorney or qualified professional.",
  },
  {
    question: "What if I am an active or returning client?",
    answer:
      "Active or returning clients should use support for order, product, timing, or follow-up questions.",
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
      <Section eyebrow="Knowledge center" title="Understand whether SciTOX is the right next step.">
        <p>
          Start here if you want context before moving into product guidance.
          This page explains medication-related stigma, workplace privacy
          concerns, screening boundaries, and official resources.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Start here</p>
            <h2>First, make sure this is the right kind of situation.</h2>
            <p>
              SciTOX is meant for privacy-sensitive product guidance in ordinary
              workplace or hiring contexts, not legally mandated screening.
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
            <h2>There are official resources behind these concerns.</h2>
            <p>
              Prescribed medication, disability-related questions, and workplace
              medical privacy are real topics with government resources behind
              them. The goal here is education, not fear.
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
            <p className="eyebrow">FAQ</p>
            <h2>Direct answers without pressure.</h2>
            <p>
              These answers are educational. They are not legal advice, medical
              advice, or a guarantee about any workplace outcome.
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
            <h2>If something feels wrong, keep a clear record.</h2>
            <p>
              Documentation can help you understand what happened and prepare for
              a conversation with an official agency or qualified professional.
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
            <h2>Use official sources for rights and policy questions.</h2>
            <p>
              These links are here so you can review the source material directly.
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
            <h2>Education is not advice.</h2>
            <p>
              This Knowledge Center is for general educational information only.
              It is not legal advice, medical advice, or a substitute for a
              qualified professional. Screening rules, employer policies, and
              legal protections vary by situation.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Ready to continue</h2>
              <p>
                If this situation fits, move into product guidance and answer a
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
