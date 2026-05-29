import * as React from 'react';

export function EmailTemplate({ email, message }: { email: string; message: string }) {
  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: '#f7f7f9',
        padding: '32px',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto',
        color: '#222',
        border: '1px solid #e0e0e0',
      }}
    >
      <div style={{ borderBottom: '2px solid #0078d4', marginBottom: '24px', paddingBottom: '8px' }}>
        <h2 style={{ margin: 0, color: '#0078d4', fontWeight: 600 }}>Contact Form Submission</h2>
      </div>
      <table style={{ width: '100%', marginBottom: '24px' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 500, padding: '8px 0' }}>Email:</td>
            <td style={{ padding: '8px 0' }}>{email}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div style={{ fontWeight: 500, marginBottom: '8px' }}>Message:</div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '16px',
            whiteSpace: 'pre-line',
          }}
        >
          {message}
        </div>
      </div>
      <div style={{ marginTop: '32px', fontSize: '13px', color: '#888' }}>
        <em>This email was generated automatically from your website contact form.</em>
      </div>
    </div>
  );
}