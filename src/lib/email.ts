import "server-only";
import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
}

function getFrom(): string {
  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error("EMAIL_FROM is not configured");
  return from;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSubject(str: string): string {
  return str.replace(/[\r\n]/g, " ");
}

export async function sendContactEmail(fields: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) throw new Error("CONTACT_TO_EMAIL is not configured");

  const resend = getResend();
  const timestamp = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
  });

  const text = [
    `Contact Form Submission`,
    `Received: ${timestamp}`,
    ``,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "(not provided)"}`,
    `Subject: ${fields.subject}`,
    ``,
    `Message:`,
    fields.message,
  ].join("\n");

  const html = [
    `<h2>Contact Form Submission</h2>`,
    `<p><strong>Received:</strong> ${escapeHtml(timestamp)}</p>`,
    `<table style="border-collapse:collapse">`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Name</td><td style="padding:4px 0">${escapeHtml(fields.name)}</td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a></td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Phone</td><td style="padding:4px 0">${escapeHtml(fields.phone || "(not provided)")}</td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Subject</td><td style="padding:4px 0">${escapeHtml(fields.subject)}</td></tr>`,
    `</table>`,
    `<h3>Message</h3>`,
    `<p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>`,
  ].join("\n");

  await resend.emails.send({
    from: getFrom(),
    to,
    subject: sanitizeSubject(`[Parish Contact] ${fields.subject}`),
    text,
    html,
  });
}

export async function sendPrayerRequestEmail(fields: {
  name: string;
  email: string;
  intention: string;
  wantsContact: boolean;
}) {
  const to = process.env.PRAYER_TO_EMAIL;
  if (!to) throw new Error("PRAYER_TO_EMAIL is not configured");

  const resend = getResend();
  const timestamp = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
  });

  const text = [
    `Prayer Request`,
    `Received: ${timestamp}`,
    ``,
    `Name: ${fields.name || "(anonymous)"}`,
    `Email: ${fields.email || "(not provided)"}`,
    `Wants contact: ${fields.wantsContact ? "Yes" : "No"}`,
    ``,
    `Intention:`,
    fields.intention,
  ].join("\n");

  const html = [
    `<h2>Prayer Request</h2>`,
    `<p><strong>Received:</strong> ${escapeHtml(timestamp)}</p>`,
    `<table style="border-collapse:collapse">`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Name</td><td style="padding:4px 0">${escapeHtml(fields.name || "(anonymous)")}</td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Email</td><td style="padding:4px 0">${fields.email ? `<a href="mailto:${escapeHtml(fields.email)}">${escapeHtml(fields.email)}</a>` : "(not provided)"}</td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">Wants contact</td><td style="padding:4px 0">${fields.wantsContact ? "Yes" : "No"}</td></tr>`,
    `</table>`,
    `<h3>Intention</h3>`,
    `<p style="white-space:pre-wrap">${escapeHtml(fields.intention)}</p>`,
  ].join("\n");

  await resend.emails.send({
    from: getFrom(),
    to,
    subject: sanitizeSubject(`[Parish Prayer Request]${fields.name ? ` from ${fields.name}` : ""}`),
    text,
    html,
  });
}
