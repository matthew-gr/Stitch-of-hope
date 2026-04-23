import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stitch of Hope — Handcrafted in Kigali, Rwanda';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          backgroundColor: '#FAF7F2',
          color: '#1F1F1F',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Decorative frame */}
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(31,31,31,0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 7,
            textTransform: 'uppercase',
            color: '#8A8275',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          }}
        >
          Muraho — welcome
        </div>

        {/* Main heading */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <div style={{ fontSize: 118, fontWeight: 300 }}>Made by hand.</div>
          <div style={{ fontSize: 118, fontWeight: 300, fontStyle: 'italic', marginTop: 4 }}>
            Made with purpose.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: '#3A3A3A',
              fontFamily: 'Helvetica, Arial, sans-serif',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Premium apparel, bags &amp; home goods — crafted in Kigali by women artisans.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid rgba(31,31,31,0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 12,
                height: 12,
                transform: 'rotate(45deg)',
                border: '1px solid #1F1F1F',
              }}
            />
            <div style={{ fontSize: 32 }}>Stitch of Hope</div>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#8A8275',
              fontFamily: 'Helvetica, Arial, sans-serif',
            }}
          >
            Kigali · Rwanda
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
