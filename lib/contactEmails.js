const BRAND = {
  bg: '#080808',
  surface: '#111111',
  elevated: '#1A1A1A',
  paper: '#F7F4EF',
  text: '#F0F0F0',
  muted: '#888888',
  darkText: '#101828',
  softDark: '#4C5563',
  accent: '#7C3AED',
  accentLight: '#A78BFA',
};

const PROFILE = {
  name: 'Radu-Stefan',
  title: 'Software Developer',
  location: 'Chisinau, Moldova',
  email: 'grozavradustefan@gmail.com',
  github: 'https://github.com/RaduscaWP',
  instagram: 'https://www.instagram.com/radusca_/',
};

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cleanLine(value, maxLength) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function valueOrFallback(value, fallback = 'Not specified') {
  const text = String(value || '').trim();
  return text || fallback;
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Chisinau',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function sourceLabel(source) {
  if (source === 'hero') return 'Home hero form';
  if (source === 'contact') return 'Contact page form';
  return 'Portfolio form';
}

function mailtoHref(address, subject) {
  const normalizedAddress = String(address || '').trim();
  return `mailto:${encodeURIComponent(normalizedAddress)}?subject=${encodeURIComponent(subject)}`;
}

function detailCell(label, value, align = 'left') {
  return `
    <td style="width:50%;padding:14px 12px;border-bottom:1px solid #E5E0D8;vertical-align:top;text-align:${align};">
      <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:10px;line-height:1.4;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#4F46E5;">${escapeHtml(label)}</div>
      <div style="margin-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;font-weight:700;color:${BRAND.darkText};">${escapeHtml(valueOrFallback(value))}</div>
    </td>
  `;
}

function ownerRow(label, value) {
  return `
    <tr>
      <td style="padding:11px 14px;border-bottom:1px solid #262626;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(label)}</td>
      <td style="padding:11px 14px;border-bottom:1px solid #262626;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color:${BRAND.text};">${escapeHtml(valueOrFallback(value))}</td>
    </tr>
  `;
}

export function buildOwnerNotificationEmail(payload) {
  const clientName = valueOrFallback(payload.name, 'Potential client');
  const service = valueOrFallback(payload.projectType, 'General Inquiry');
  const domain = cleanLine(payload.domain, 90);
  const description = valueOrFallback(payload.description, 'No project details provided.');
  const descriptionHtml = escapeHtml(description).replaceAll('\n', '<br>');
  const submittedAt = formatDate(payload.submittedAt);
  const replyHref = escapeHtml(mailtoHref(payload.email, `Re: ${payload.reference}`));
  const domainRow = domain ? ownerRow('Domain', domain) : '';

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#050505;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050505;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid #262626;border-radius:22px;overflow:hidden;background:${BRAND.surface};">
            <tr>
              <td style="padding:24px 26px;background:${BRAND.bg};border-bottom:1px solid #262626;">
                <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.accentLight};">New portfolio request</div>
                <h1 style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.1;color:${BRAND.text};">${escapeHtml(service)}</h1>
                <div style="margin-top:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:12px;color:${BRAND.muted};">Reference ${escapeHtml(payload.reference)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 26px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  ${ownerRow('Client', clientName)}
                  ${ownerRow('Email', payload.email)}
                  ${domainRow}
                  ${ownerRow('Budget', payload.budget)}
                  ${ownerRow('Timeline', payload.timeline)}
                  ${ownerRow('Source', sourceLabel(payload.source))}
                  ${ownerRow('Submitted', `${submittedAt} Chisinau time`)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px 24px;">
                <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${BRAND.accentLight};">Project details</div>
                <div style="margin-top:10px;padding:16px 18px;border:1px solid #262626;border-radius:16px;background:${BRAND.elevated};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${BRAND.text};">${descriptionHtml}</div>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:20px;">
                  <tr>
                    <td style="border-radius:999px;background:${BRAND.accent};">
                      <a href="${replyHref}" style="display:inline-block;padding:12px 18px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;">Reply to client</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New portfolio request - ${service}`,
    `Reference: ${payload.reference}`,
    '',
    `Client: ${clientName}`,
    `Email: ${payload.email}`,
    ...(domain ? [`Domain: ${domain}`] : []),
    `Budget: ${valueOrFallback(payload.budget)}`,
    `Timeline: ${valueOrFallback(payload.timeline)}`,
    `Source: ${sourceLabel(payload.source)}`,
    `Submitted: ${submittedAt} Chisinau time`,
    '',
    'Project details:',
    description,
  ].join('\n');

  return { html, text };
}

export function buildClientConfirmationEmail(payload) {
  const clientName = valueOrFallback(payload.name, 'there');
  const service = valueOrFallback(payload.projectType, 'General Inquiry');
  const submittedAt = formatDate(payload.submittedAt);
  const siteUrl = payload.siteUrl || '';
  const replyEmail = payload.replyEmail || PROFILE.email;
  const replyHref = escapeHtml(mailtoHref(replyEmail, `Re: ${payload.reference}`));
  const dashboardHref = siteUrl ? escapeHtml(siteUrl) : escapeHtml(PROFILE.github);
  const currentYear = new Date(payload.submittedAt).getFullYear();

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#ECECF1;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ECECF1;padding:0 12px 28px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:${BRAND.paper};border-radius:0 0 18px 18px;overflow:hidden;box-shadow:0 18px 50px rgba(8,8,8,0.16);">
            <tr>
              <td style="height:188px;padding:0;background:${BRAND.bg};">
                <table role="presentation" width="100%" height="188" cellspacing="0" cellpadding="0" style="background:radial-gradient(ellipse at 25% 20%, rgba(124,58,237,0.42), transparent 38%),linear-gradient(135deg,#080808 0%,#111111 54%,#171026 100%);">
                  <tr>
                    <td style="padding:30px 28px;vertical-align:bottom;">
                      <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;line-height:1.8;color:#A78BFA;">const request = "${escapeHtml(service)}";<br>status.queue("review");<br>deploy.response("within_24h");</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:9px 14px;background:${BRAND.accent};font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;">Project request</td>
            </tr>
            <tr>
              <td style="padding:24px 24px 10px;background:${BRAND.paper};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="width:42%;vertical-align:top;">
                      <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#3F3F46;">From</div>
                      <div style="margin-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1;font-weight:800;color:#061120;">Your brief</div>
                      <div style="margin-top:7px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#384152;">${escapeHtml(clientName)}</div>
                    </td>
                    <td align="center" style="width:16%;vertical-align:middle;">
                      <div style="display:inline-block;width:34px;height:34px;border:1px solid #D8B4FE;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:32px;color:${BRAND.accent};">&rarr;</div>
                    </td>
                    <td align="right" style="width:42%;vertical-align:top;">
                      <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#3F3F46;">To</div>
                      <div style="margin-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1;font-weight:800;color:#061120;">Build queue</div>
                      <div style="margin-top:7px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#384152;">Radu-Stefan</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 4px;background:${BRAND.paper};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px dashed #D7D0C6;border-bottom:1px dashed #D7D0C6;border-collapse:collapse;">
                  <tr>
                    ${detailCell('Service', service)}
                    ${detailCell('Submitted', `${submittedAt} Chisinau`, 'right')}
                  </tr>
                  <tr>
                    ${detailCell('Budget', payload.budget)}
                    ${detailCell('Timeline', payload.timeline, 'right')}
                  </tr>
                  <tr>
                    ${detailCell('Reply ETA', 'Within 24h')}
                    ${detailCell('Status', 'Queued for review', 'right')}
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 24px 24px;background:${BRAND.paper};">
                <div style="font-family:'JetBrains Mono',Consolas,monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#687080;">Reference</div>
                <div style="margin-top:9px;font-family:'JetBrains Mono',Consolas,monospace;font-size:18px;letter-spacing:2px;font-weight:800;color:#061120;word-break:break-word;">${escapeHtml(payload.reference)}</div>
                <p style="max-width:440px;margin:18px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${BRAND.softDark};">Thanks for reaching out. I received your request and will review the details personally before replying with the next step.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 24px;background:#08111F;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1;font-weight:800;color:#FFFFFF;">${PROFILE.name}</div>
                      <div style="margin-top:7px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;font-weight:800;letter-spacing:1.7px;text-transform:uppercase;color:#C026D3;">${PROFILE.title}</div>
                      <div style="margin-top:13px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#DDE6F4;">
                        <a href="${replyHref}" style="color:#FFFFFF;text-decoration:none;">${escapeHtml(replyEmail)}</a><br>
                        <a href="${escapeHtml(PROFILE.github)}" style="color:#FFFFFF;text-decoration:none;">GitHub</a> &nbsp; <span style="color:#667085;">/</span> &nbsp;
                        <a href="${escapeHtml(PROFILE.instagram)}" style="color:#FFFFFF;text-decoration:none;">Instagram</a>
                      </div>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="border-radius:999px;background:${BRAND.accent};">
                            <a href="${replyHref}" style="display:inline-block;padding:11px 16px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;color:#FFFFFF;text-decoration:none;">Reply</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:14px 20px;background:#050A12;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#AEB7C6;">
                &copy; ${currentYear} ${PROFILE.name} &middot; ${PROFILE.location}<br>
                Reference ${escapeHtml(payload.reference)} &middot; Submitted from ${escapeHtml(sourceLabel(payload.source))}
              </td>
            </tr>
          </table>
          <div style="max-width:640px;padding:12px 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#6B7280;text-align:center;">
            This confirmation was sent because your email was used on <a href="${dashboardHref}" style="color:#4F46E5;text-decoration:none;">Radu-Stefan's portfolio</a>.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Request received - ${payload.reference}`,
    '',
    `Hi ${clientName},`,
    `I received your ${service} request and queued it for review.`,
    '',
    `Service: ${service}`,
    `Budget: ${valueOrFallback(payload.budget)}`,
    `Timeline: ${valueOrFallback(payload.timeline)}`,
    `Status: Queued for review`,
    `Reply ETA: Within 24h`,
    `Submitted: ${submittedAt} Chisinau time`,
    '',
    `Reference: ${payload.reference}`,
    '',
    `Reply directly to this email or write to ${replyEmail}.`,
    `${PROFILE.github}`,
    `${PROFILE.instagram}`,
    '',
    `${PROFILE.name}`,
    `${PROFILE.title}`,
    `${PROFILE.location}`,
  ].join('\n');

  return { html, text };
}
