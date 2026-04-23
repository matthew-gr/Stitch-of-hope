import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Stitch of Hope — Handcrafted in Kigali, Rwanda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  // Inline the logo as a data URL so Satori can render it at any size
  const logoData = await readFile(join(process.cwd(), 'public/images/Logo.jpg'));
  const logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* Hairline frame — quiet editorial touch */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 48,
            bottom: 48,
            left: 48,
            border: '1px solid rgba(31,31,31,0.08)',
          }}
        />

        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={logoSrc}
          width={520}
          height={520}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size },
  );
}
