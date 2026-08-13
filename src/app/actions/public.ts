'use server'

import { addConsultation, addContact } from "@/lib/db";

export interface PublicActionResult {
  success: boolean;
  message: string;
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactInquiry(input: {
  name: string;
  email: string;
  company: string;
  phone: string;
  details: string;
}): Promise<PublicActionResult> {
  const name = readString(input.name);
  const email = readString(input.email);
  const company = readString(input.company);
  const phone = readString(input.phone);
  const details = readString(input.details);

  if (!name || !email || !details) {
    return {
      success: false,
      message: "Name, email, and project details are required.",
    };
  }

  await addContact({
    name,
    email,
    company,
    phone,
    details,
  });

  return {
    success: true,
    message: "Your message has been captured in the CMS inbox.",
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
}): Promise<PublicActionResult> {
  const type = readString(input.type);
  const time = readString(input.time);
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

  await addConsultation({
    type,
    date,
    time,
    name,
    email,
    company,
    details,
  });

  return {
    success: true,
    message: "Your consultation request has been saved to the CMS.",
  };
}
