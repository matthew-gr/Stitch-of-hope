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
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 80,
          backgroundColor: '#FAF7F2',
          color: '#1F1F1F',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
        }}
      >
        {/* Thin decorative frame */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            bottom: 40,
            left: 40,
            border: '1px solid rgba(31,31,31,0.1)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#8A8275',
            fontFamily: 'Helvetica, Arial, sans-serif',
            marginBottom: 40,
          }}
        >
          Muraho — welcome
        </div>

        {/* Main heading — centered, sized to fit safely in any crop */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
          }}
        >
          Made by hand.
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            marginTop: 6,
          }}
        >
          Made with purpose.
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#3A3A3A',
            fontFamily: 'Helvetica, Arial, sans-serif',
            marginTop: 44,
            maxWidth: 780,
            lineHeight: 1.4,
          }}
        >
          Handcrafted apparel, bags &amp; home goods — sewn by women artisans in Kigali, Rwanda.
        </div>

        {/* Footer: decorative diamond + brand + locale */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 54,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              transform: 'rotate(45deg)',
              border: '1px solid rgba(31,31,31,0.4)',
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#1F1F1F',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 500,
            }}
          >
            Stitch of Hope
          </div>
          <div
            style={{
              width: 10,
              height: 10,
              transform: 'rotate(45deg)',
              border: '1px solid rgba(31,31,31,0.4)',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
