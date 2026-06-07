"use client";

import { FormEvent, useMemo, useState } from "react";
import { validateInquiryPayload } from "@/lib/inquiries/validation.mjs";

type Surface = "contact" | "support" | "wholesale";

type FieldErrors = Record<string, string[]>;

type InquiryFormProps = {
  surface: Surface;
};

const formConfig = {
  contact: {
    eyebrow: "Contact",
    title: "Send a focused question.",
    helper:
      "Choose the reason for your note and share only what is needed to understand the request.",
    submitLabel: "Send question",
    options: [
      { value: "product", label: "Product question" },
      { value: "order", label: "Order or shipping" },
      { value: "followUp", label: "Human follow-up" },
    ],
  },
  support: {
    eyebrow: "Support",
    title: "Ask for product support.",
    helper:
      "Use this when your product or order question needs more context.",
    submitLabel: "Send support request",
    options: [
      { value: "product", label: "Product support" },
      { value: "order", label: "Order or shipping" },
      { value: "followUp", label: "Human follow-up" },
    ],
  },
  wholesale: {
    eyebrow: "Partner inquiry",
    title: "Send a business inquiry.",
    helper:
      "Use this for wholesale, documentation, or buyer follow-up questions.",
    submitLabel: "Send partner inquiry",
    options: [
      { value: "vendor", label: "Partner inquiry" },
      { value: "documentation", label: "Documentation question" },
      { value: "buyer", label: "Buyer follow-up" },
    ],
  },
} as const;

const initialPayload = {
  contactName: "",
  companyName: "",
  email: "",
  phone: "",
  message: "",
};

function fieldError(fieldErrors: FieldErrors, field: string) {
  return fieldErrors[field]?.[0] || "";
}

export function InquiryForm({ surface }: InquiryFormProps) {
  const config = formConfig[surface];
  const [inquiryType, setInquiryType] = useState<string>(config.options[0].value);
  const [payload, setPayload] = useState(initialPayload);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isWholesale = surface === "wholesale";
  const requestPayload = useMemo(
    () => ({
      surface,
      inquiryType,
      ...payload,
    }),
    [inquiryType, payload, surface],
  );

  function updateField(field: keyof typeof initialPayload, value: string) {
    setPayload((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    const localValidation = validateInquiryPayload(requestPayload);
    if (!localValidation.ok) {
      setFieldErrors(localValidation.fieldErrors as FieldErrors);
      setStatus("error");
      setStatusMessage("Please complete the required fields.");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localValidation.data),
      });
      const responseBody = await response.json();

      if (!response.ok || !responseBody.ok) {
        setFieldErrors(responseBody.fieldErrors || {});
        setStatus("error");
        setStatusMessage("The message could not be sent right now. Please try again later.");
        return;
      }

      setStatus("success");
      setStatusMessage("Your message was received.");
    } catch {
      setStatus("error");
      setStatusMessage("The message could not be sent right now. Please try again later.");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div>
        <p className="tag">{config.eyebrow}</p>
        <h2>{config.title}</h2>
        <p>{config.helper}</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Inquiry type</span>
          <select
            name="inquiryType"
            onChange={(event) => setInquiryType(event.target.value)}
            value={inquiryType}
          >
            {config.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError(fieldErrors, "inquiryType") ? (
            <em>{fieldError(fieldErrors, "inquiryType")}</em>
          ) : null}
        </label>

        <label className="field">
          <span>Contact name</span>
          <input
            name="contactName"
            onChange={(event) => updateField("contactName", event.target.value)}
            type="text"
            value={payload.contactName}
          />
          {fieldError(fieldErrors, "contactName") ? (
            <em>{fieldError(fieldErrors, "contactName")}</em>
          ) : null}
        </label>

        {isWholesale ? (
          <label className="field field--wide">
            <span>Business name</span>
            <input
              name="companyName"
              onChange={(event) => updateField("companyName", event.target.value)}
              type="text"
              value={payload.companyName}
            />
            {fieldError(fieldErrors, "companyName") ? (
              <em>{fieldError(fieldErrors, "companyName")}</em>
            ) : null}
          </label>
        ) : null}

        <label className="field">
          <span>Contact email</span>
          <input
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            value={payload.email}
          />
          {fieldError(fieldErrors, "email") ? (
            <em>{fieldError(fieldErrors, "email")}</em>
          ) : null}
        </label>

        <label className="field">
          <span>Phone</span>
          <input
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            type="tel"
            value={payload.phone}
          />
        </label>

        <label className="field field--wide">
          <span>Short question</span>
          <textarea
            name="message"
            onChange={(event) => updateField("message", event.target.value)}
            rows={5}
            value={payload.message}
          />
          {fieldError(fieldErrors, "message") ? (
            <em>{fieldError(fieldErrors, "message")}</em>
          ) : null}
        </label>
      </div>

      <div className="form-note">
        <p>
          Keep the message focused. Do not include sensitive details unless they
          are needed for the team to understand the request.
        </p>
      </div>

      <div className="form-actions">
        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Sending" : config.submitLabel}
        </button>
        {statusMessage ? (
          <p className={`form-status form-status--${status}`}>{statusMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
