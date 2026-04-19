import emailjs from '@emailjs/browser';

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendContactEmail({ name, email, message, budget }) {
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
      message,
      to_email: 'grozavradustefan@gmail.com',
    },
    { publicKey: PUBLIC_KEY }
  );
}
