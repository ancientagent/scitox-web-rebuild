const prepItems = [
  {
    label: "Limited questions",
    body: "This step asks only enough to understand the request.",
  },
  {
    label: "No payment details",
    body: "The questions never ask for card, bank, or payment information.",
  },
  {
    label: "Support fallback",
    body: "If the fit is not simple, the next step is support instead of a guess.",
  },
];

export function PrivacyPrepNotice() {
  return (
    <article className="privacy-prep" aria-label="Privacy preparation">
      <div className="privacy-prep__intro">
        <p className="tag">Privacy prep</p>
        <h2>Give us a second to keep this simple.</h2>
        <p>
          Before the questions start, this step keeps the request focused and
          avoids asking for details that do not belong in this step.
        </p>
      </div>
      <div className="privacy-prep__items">
        {prepItems.map((item) => (
          <div className="privacy-prep__item" key={item.label}>
            <span aria-hidden="true" />
            <div>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
