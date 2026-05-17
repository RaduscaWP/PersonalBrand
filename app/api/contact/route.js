import { Resend } from 'resend';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'grozavradustefan@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const CONTACT_FROM_NAME = process.env.CONTACT_FROM_NAME || 'Radu Portfolio';
const CONTACT_FROM = `${CONTACT_FROM_NAME} <${CONTACT_FROM_EMAIL}>`;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(req) {
  try {
    const { projectType, budget, timeline, email, description } = await req.json();

    if (!email) return Response.json({ error: 'Email required' }, { status: 400 });
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: 'Email delivery is not configured yet. Add a Resend API key first.' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const ownerNotification = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Request: ${projectType} - ${budget || 'Budget TBD'}`,
      html: `
        <h2 style="font-family:sans-serif">New Portfolio Request</h2>
        <table style="font-family:sans-serif; border-collapse:collapse">
          <tr><td style="padding:6px 12px;color:#888">Service</td><td style="padding:6px 12px"><strong>${escapeHtml(projectType)}</strong></td></tr>
          <tr><td style="padding:6px 12px;color:#888">Budget</td><td style="padding:6px 12px">${escapeHtml(budget || 'Not specified')}</td></tr>
          <tr><td style="padding:6px 12px;color:#888">Timeline</td><td style="padding:6px 12px">${escapeHtml(timeline || 'Not specified')}</td></tr>
          <tr><td style="padding:6px 12px;color:#888">Client Email</td><td style="padding:6px 12px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        </table>
        ${description ? `<p style="font-family:sans-serif;margin-top:16px"><strong>Description:</strong><br>${escapeHtml(description).replaceAll('\n', '<br>')}</p>` : ''}
      `,
    });

    if (ownerNotification.error) {
      throw new Error(ownerNotification.error.message || 'Failed to send owner notification');
    }

    const clientConfirmation = await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: "Got your request - I'll reply within 24h",
      html: `
        <div style="font-family:sans-serif; max-width:500px">
          <h2>Hey! Got your request.</h2>
          <p>Thanks for reaching out about your <strong>${escapeHtml(projectType)}</strong> project.</p>
          <p>I review every request personally and will get back to you within 24 hours.</p>
          <p style="color:#888; font-size:13px">Budget: ${escapeHtml(budget || 'TBD')} - Timeline: ${escapeHtml(timeline || 'TBD')}</p>
          <br>
          <p>- Radu</p>
          <p style="font-size:12px; color:#999">Reply directly to this email to reach me.</p>
        </div>
      `,
    });

    if (clientConfirmation.error) {
      throw new Error(clientConfirmation.error.message || 'Failed to send confirmation email');
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
