const VALID_SURFACES = new Set(["contact", "support", "wholesale"]);

const VALID_INQUIRY_TYPES = {
  contact: new Set(["product", "order", "followUp"]),
  support: new Set(["product", "order", "followUp"]),
  wholesale: new Set(["vendor", "documentation", "buyer"]),
};

const MAX_LENGTHS = {
  surface: 24,
  inquiryType: 32,
  contactName: 80,
  companyName: 120,
  email: 160,
  phone: 40,
  message: 600,
};

function cleanValue(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function addError(fieldErrors, field, message) {
  fieldErrors[field] = [...(fieldErrors[field] || []), message];
}

export function sanitizeInquiryPayload(payload) {
  const input = payload && typeof payload === "object" ? payload : {};

  return {
    surface: cleanValue(input.surface, MAX_LENGTHS.surface),
    inquiryType: cleanValue(input.inquiryType, MAX_LENGTHS.inquiryType),
    contactName: cleanValue(input.contactName, MAX_LENGTHS.contactName),
    companyName: cleanValue(input.companyName, MAX_LENGTHS.companyName),
    email: cleanValue(input.email, MAX_LENGTHS.email).toLowerCase(),
    phone: cleanValue(input.phone, MAX_LENGTHS.phone),
    message: cleanValue(input.message, MAX_LENGTHS.message),
  };
}

export function validateInquiryPayload(payload) {
  const data = sanitizeInquiryPayload(payload);
  const fieldErrors = {};

  if (!VALID_SURFACES.has(data.surface)) {
    addError(fieldErrors, "surface", "Choose a valid inquiry surface.");
  }

  const validTypes = VALID_INQUIRY_TYPES[data.surface];
  if (!validTypes || !validTypes.has(data.inquiryType)) {
    addError(fieldErrors, "inquiryType", "Choose an inquiry type.");
  }

  if (!data.email) {
    addError(fieldErrors, "email", "Add a contact email.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    addError(fieldErrors, "email", "Enter a valid contact email.");
  }

  if (!data.message) {
    addError(fieldErrors, "message", "Add a short product or support question.");
  }

  if (data.surface === "wholesale") {
    if (!data.contactName) {
      addError(fieldErrors, "contactName", "Add a contact name.");
    }

    if (!data.companyName) {
      addError(fieldErrors, "companyName", "Add a business name.");
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, data, fieldErrors };
  }

  return { ok: true, data, fieldErrors: {} };
}
