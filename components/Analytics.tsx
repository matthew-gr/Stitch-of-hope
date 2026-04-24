import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

const GA_ID = 'G-4LT78HFH4S';

export default function Analytics() {
  return (
    <>
      <VercelAnalytics />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
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
