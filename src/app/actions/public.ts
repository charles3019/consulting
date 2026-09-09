"use server";

import { services } from "@/lib/services";
import { addConsultation, addContact } from "@/lib/db";
import {
  consultationTypes,
  consultationTimes,
  validBookingDate,
} from "@/lib/booking";

export interface PublicActionResult {
  success: boolean;
  message: string;
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validDetails(
  name: string,
  email: string,
  company: string,
  details: string,
) {
  return (
    name.length <= 100 &&
    email.length <= 150 &&
    company.length <= 150 &&
    details.length <= 10000 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

export async function submitContactInquiry(input: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service?: string;
  location?: string;
  preferredContact?: string;
  details: string;
  website?: string;
}): Promise<PublicActionResult> {
  if (!input || typeof input !== "object")
    return { success: false, message: "Please complete the contact form." };
  if (readString(input.website))
    return {
      success: false,
      message:
        "Unable to submit this form. Please leave the hidden field empty.",
    };
  const name = readString(input.name);
  const email = readString(input.email);
  const company = readString(input.company);
  const phone = readString(input.phone);
  const service = readString(input.service);
  const location = readString(input.location);
  const preferredContact = readString(input.preferredContact);
  if (
    (service &&
      !services.some((item) => item.title === service) &&
      service !== "Other") ||
    location.length > 150 ||
    (preferredContact &&
      !["Email", "Phone", "WhatsApp"].includes(preferredContact))
  ) {
    return {
      success: false,
      message:
        "Choose a listed service and contact method, and keep your location under 150 characters.",
    };
  }
  if (["Phone", "WhatsApp"].includes(preferredContact) && !phone) {
    return {
      success: false,
      message:
        "Please provide a phone number for your preferred contact method.",
    };
  }

  const details = readString(input.details);

  if (!name || !email || !details) {
    return {
      success: false,
      message: "Name, email, and project details are required.",
    };
  }

  if (!validDetails(name, email, company, details) || phone.length > 50) {
    return {
      success: false,
      message:
        "Check your email address and keep project details under 10,000 characters.",
    };
  }
  try {
    await addContact({
      name,
      email,
      company,
      phone,
      service,
      location,
      preferredContact,
      details,
    });
  } catch {
    return {
      success: false,
      message: "We couldn't save your message. Please try again shortly.",
    };
  }

  return {
    success: true,
    message:
      "Thank you for contacting ConnectForge IT Services. Our team will review your enquiry and normally respond within one business day.",
  };
}

export async function submitConsultationRequest(input: {
  type: string;
  date: number;
  time: string;
  name: string;
  email: string;
  company: string;
  details: string;
  website?: string;
}): Promise<PublicActionResult> {
  if (!input || typeof input !== "object")
    return { success: false, message: "Please complete the booking form." };
  const type = readString(input.type);
  const time = readString(input.time);
  if (readString(input.website))
    return {
      success: false,
      message:
        "Unable to submit this form. Please leave the hidden field empty.",
    };
  const name = readString(input.name);
  const email = readString(input.email);
  const company = readString(input.company);
  const details = readString(input.details);
  const date = Number(input.date);

  if (!type || !time || !name || !email || !company || !details || !date) {
    return {
      success: false,
      message: "Please complete all booking fields before submitting.",
    };
  }

  if (
    !validDetails(name, email, company, details) ||
    !consultationTypes.includes(type) ||
    !consultationTimes.includes(time) ||
    !validBookingDate(date)
  ) {
    return {
      success: false,
      message:
        "Choose a weekday from tomorrow within the next year, a listed time, and a valid email address.",
    };
  }
  try {
    await addConsultation({
      type,
      date,
      time,
      name,
      email,
      company,
      details,
    });
  } catch {
    return {
      success: false,
      message: "We couldn't save your request. Please try again shortly.",
    };
  }

  return {
    success: true,
    message:
      "Your consultation request has been received. We will contact you to confirm availability.",
  };
}
