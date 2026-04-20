import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export function formatProjectBrief({
  service,
  budget,
  timeline,
  projectGoals,
  projectDetails,
  message,
}) {
  return [
    `Service: ${service || 'Not specified'}`,
    `Budget: ${budget || 'Not specified'}`,
    `Timeline: ${timeline || 'Not specified'}`,
    `Project goals: ${projectGoals || 'Not specified'}`,
    'Project details:',
    projectDetails || message || 'Not provided',
  ].join('\n\n');
}

export async function sendContactEmail({
  name,
  email,
  service,
  budget,
  timeline,
  projectGoals,
  projectDetails,
  message,
}) {
  if (!isEmailConfigured()) {
    throw new Error('EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_* in .env.local.');
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: name,
      reply_to: email,
      budget: budget || 'Not specified',
      message: formatProjectBrief({
        service,
        budget,
        timeline,
        projectGoals,
        projectDetails,
        message,
      }),
      to_email: 'grozavradustefan@gmail.com',
    },
    { publicKey: PUBLIC_KEY }
  );
}
