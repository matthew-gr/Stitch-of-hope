import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

const GA_ID = 'G-MSD8QRQ6CS';

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
