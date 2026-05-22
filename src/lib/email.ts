import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  location: string;
  message?: string;
}

function getSmtpConfig() {
  const host = import.meta.env.SMTP_HOST;
  const port = Number(import.meta.env.SMTP_PORT || 587);
  const user = import.meta.env.SMTP_USER;
  const pass = import.meta.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

export function isEmailConfigured(): boolean {
  return Boolean(
    getSmtpConfig() &&
      import.meta.env.CONTACT_TO_EMAIL
  );
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const smtp = getSmtpConfig();
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL || import.meta.env.SMTP_USER;

  if (!smtp || !to || !from) {
    throw new Error(
      'Email is not configured. Copy .env.example to .env and set SMTP settings.'
    );
  }

  const transporter = nodemailer.createTransport(smtp);

  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    data.message ? `\nProject details:\n${data.message}` : null,
  ].filter(Boolean);

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email || undefined,
    subject: `New quote request — ${data.service} (${data.location})`,
    text: lines.join('\n'),
  });
}
