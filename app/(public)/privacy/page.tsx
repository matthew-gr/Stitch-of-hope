import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Stitch of Hope collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy · Stitch of Hope',
    description:
      'How Stitch of Hope collects, uses, and protects your personal information.',
    url: '/privacy',
    type: 'website' as const,
  },
};

const CONTACT_EMAIL = 'dalton.hardage15@gmail.com';
const DSAR_LINK = 'https://app.termly.io/dsar/a57d4f26-1749-4ea3-8623-312668ce774f';

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto:');
  return (
    <a
      href={href}
      className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors"
      {...(external && href.startsWith('http')
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
    </a>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 mt-16 mb-5 font-display font-light text-2xl md:text-[28px] text-ink leading-tight"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 font-display font-light text-xl text-ink leading-snug">
      {children}
    </h3>
  );
}

function InShort({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 italic text-ink/60">
      <span className="not-italic font-medium text-ink/80">In short: </span>
      {children}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <section className="max-w-[880px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-8">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display font-light text-5xl md:text-6xl text-ink leading-[1.05]">
          Privacy Policy
        </h1>
        <p className="mt-5 font-sans text-sm text-mist">
          Last updated April 23, 2026
        </p>
      </section>

      <article className="max-w-[880px] mx-auto px-6 md:px-12 pb-24 md:pb-32 font-sans text-[15px] text-ink/75 leading-[1.75]">
        <p>
          This Privacy Notice for <strong>Stitch of Hope LTD</strong> (doing business as
          Stitch of Hope) ("<strong>we</strong>," "<strong>us</strong>," or "
          <strong>our</strong>"), describes how and why we might access, collect, store,
          use, and/or share ("<strong>process</strong>") your personal information when
          you use our services ("<strong>Services</strong>"), including when you:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>
            Visit our website at{' '}
            <A href="https://stitch-of-hope.com">https://stitch-of-hope.com</A>, or any
            website of ours that links to this Privacy Notice
          </li>
          <li>
            Engage with us in other related ways, including any marketing or events
          </li>
        </ul>
        <p className="mt-6">
          <strong>Questions or concerns?</strong> Reading this Privacy Notice will help
          you understand your privacy rights and choices. We are responsible for making
          decisions about how your personal information is processed. If you do not
          agree with our policies and practices, please do not use our Services. If you
          still have any questions or concerns, please contact us at{' '}
          <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>.
        </p>

        {/* SUMMARY */}
        <H2 id="summary">Summary of key points</H2>
        <p className="italic text-ink/60">
          This summary provides key points from our Privacy Notice, but you can find
          more details about any of these topics by clicking the link following each
          key point or by using our{' '}
          <A href="#toc">table of contents</A> below.
        </p>

        <p className="mt-5">
          <strong>What personal information do we process?</strong> When you visit, use,
          or navigate our Services, we may process personal information depending on
          how you interact with us and the Services, the choices you make, and the
          products and features you use.
        </p>
        <p className="mt-4">
          <strong>Do we process any sensitive personal information?</strong> We do not
          process sensitive personal information.
        </p>
        <p className="mt-4">
          <strong>Do we collect any information from third parties?</strong> We do not
          collect any information from third parties.
        </p>
        <p className="mt-4">
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services, communicate
          with you, for security and fraud prevention, and to comply with law. We may
          also process your information for other purposes with your consent.
        </p>
        <p className="mt-4">
          <strong>In what situations and with which parties do we share personal
          information?</strong> We may share information in specific situations and
          with specific third parties.
        </p>
        <p className="mt-4">
          <strong>How do we keep your information safe?</strong> We have adequate
          organizational and technical processes and procedures in place to protect
          your personal information. However, no electronic transmission over the
          internet or information storage technology can be guaranteed to be 100%
          secure.
        </p>
        <p className="mt-4">
          <strong>What are your rights?</strong> Depending on where you are located
          geographically, the applicable privacy law may mean you have certain rights
          regarding your personal information.
        </p>
        <p className="mt-4">
          <strong>How do you exercise your rights?</strong> The easiest way to exercise
          your rights is by submitting a{' '}
          <A href={DSAR_LINK}>data subject access request</A>, or by contacting us.
          We will consider and act upon any request in accordance with applicable data
          protection laws.
        </p>

        {/* TABLE OF CONTENTS */}
        <H2 id="toc">Table of contents</H2>
        <ol className="list-decimal pl-6 space-y-2 marker:text-mist">
          <li><A href="#infocollect">What information do we collect?</A></li>
          <li><A href="#infouse">How do we process your information?</A></li>
          <li><A href="#whoshare">When and with whom do we share your personal information?</A></li>
          <li><A href="#cookies">Do we use cookies and other tracking technologies?</A></li>
          <li><A href="#inforetain">How long do we keep your information?</A></li>
          <li><A href="#infosafe">How do we keep your information safe?</A></li>
          <li><A href="#infominors">Do we collect information from minors?</A></li>
          <li><A href="#privacyrights">What are your privacy rights?</A></li>
          <li><A href="#DNT">Controls for Do-Not-Track features</A></li>
          <li><A href="#policyupdates">Do we make updates to this notice?</A></li>
          <li><A href="#contact">How can you contact us about this notice?</A></li>
          <li><A href="#request">How can you review, update, or delete the data we collect from you?</A></li>
        </ol>

        {/* 1 */}
        <H2 id="infocollect">1. What information do we collect?</H2>
        <H3>Personal information you disclose to us</H3>
        <InShort>We collect personal information that you provide to us.</InShort>
        <p className="mt-4">
          We collect personal information that you voluntarily provide to us when you
          express an interest in obtaining information about us or our products and
          Services, when you participate in activities on the Services, or otherwise
          when you contact us.
        </p>
        <p className="mt-4">
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your interactions with
          us and the Services, the choices you make, and the products and features you
          use. The personal information we collect may include the following:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>names</li>
          <li>phone numbers</li>
          <li>email addresses</li>
        </ul>
        <p className="mt-4">
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </p>
        <p className="mt-4">
          All personal information that you provide to us must be true, complete, and
          accurate, and you must notify us of any changes to such personal information.
        </p>

        <H3>Information automatically collected</H3>
        <InShort>
          Some information — such as your Internet Protocol (IP) address and/or browser
          and device characteristics — is collected automatically when you visit our
          Services.
        </InShort>
        <p className="mt-4">
          We automatically collect certain information when you visit, use, or navigate
          the Services. This information does not reveal your specific identity (like
          your name or contact information) but may include device and usage
          information, such as your IP address, browser and device characteristics,
          operating system, language preferences, referring URLs, device name, country,
          location, information about how and when you use our Services, and other
          technical information. This information is primarily needed to maintain the
          security and operation of our Services, and for our internal analytics and
          reporting purposes.
        </p>
        <p className="mt-4">
          Like many businesses, we also collect information through cookies and similar
          technologies.
        </p>
        <p className="mt-4">The information we collect includes:</p>
        <ul className="list-disc pl-6 mt-3 space-y-3">
          <li>
            <em>Log and Usage Data.</em> Log and usage data is service-related,
            diagnostic, usage, and performance information our servers automatically
            collect when you access or use our Services and which we record in log
            files. Depending on how you interact with us, this log data may include
            your IP address, device information, browser type, and settings, and
            information about your activity in the Services.
          </li>
          <li>
            <em>Device Data.</em> We collect device data such as information about your
            computer, phone, tablet, or other device you use to access the Services.
          </li>
          <li>
            <em>Location Data.</em> We collect location data such as information about
            your device's location, which can be either precise or imprecise. You can
            opt out by disabling your location setting on your device.
          </li>
        </ul>

        <H3>Google API</H3>
        <p className="mt-4">
          Our use of information received from Google APIs will adhere to{' '}
          <A href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </A>
          , including the{' '}
          <A href="https://developers.google.com/terms/api-services-user-data-policy#limited-use">
            Limited Use requirements
          </A>
          .
        </p>

        {/* 2 */}
        <H2 id="infouse">2. How do we process your information?</H2>
        <InShort>
          We process your information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply with
          law. We may also process your information for other purposes with your
          consent.
        </InShort>
        <p className="mt-4">
          <strong>We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:</strong>
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-3">
          <li>
            <strong>To deliver and facilitate delivery of services to the user.</strong>{' '}
            We may process your information to provide you with the requested service.
          </li>
          <li>
            <strong>To respond to user inquiries and offer support.</strong> We may
            process your information to respond to your inquiries and solve any
            potential issues you might have with the requested service.
          </li>
          <li>
            <strong>To send administrative information to you.</strong> We may process
            your information to send you details about our products and services,
            changes to our terms and policies, and other similar information.
          </li>
          <li>
            <strong>To fulfill and manage your orders.</strong> We may process your
            information to fulfill and manage your orders, payments, returns, and
            exchanges made through the Services.
          </li>
          <li>
            <strong>To request feedback.</strong> We may process your information when
            necessary to request feedback and to contact you about your use of our
            Services.
          </li>
          <li>
            <strong>To send you marketing and promotional communications.</strong> We
            may process the personal information you send to us for our marketing
            purposes, if this is in accordance with your marketing preferences. You can
            opt out of our marketing emails at any time. For more information, see{' '}
            <A href="#privacyrights">What are your privacy rights?</A> below.
          </li>
          <li>
            <strong>To deliver targeted advertising.</strong> We may process your
            information to develop and display personalized content and advertising
            tailored to your interests, location, and more.
          </li>
          <li>
            <strong>To post testimonials.</strong> We post testimonials on our Services
            that may contain personal information.
          </li>
          <li>
            <strong>To protect our Services.</strong> We may process your information
            as part of our efforts to keep our Services safe and secure, including
            fraud monitoring and prevention.
          </li>
          <li>
            <strong>To evaluate and improve our Services, products, marketing, and
            your experience.</strong> We may process your information when we believe
            it is necessary to identify usage trends, determine the effectiveness of
            our promotional campaigns, and to evaluate and improve our Services.
          </li>
          <li>
            <strong>To identify usage trends.</strong> We may process information about
            how you use our Services to better understand how they are being used so
            we can improve them.
          </li>
          <li>
            <strong>To determine the effectiveness of our marketing and promotional
            campaigns.</strong> We may process your information to better understand
            how to provide marketing and promotional campaigns that are most relevant
            to you.
          </li>
          <li>
            <strong>To comply with our legal obligations.</strong> We may process your
            information to comply with our legal obligations, respond to legal
            requests, and exercise, establish, or defend our legal rights.
          </li>
        </ul>

        {/* 3 */}
        <H2 id="whoshare">
          3. When and with whom do we share your personal information?
        </H2>
        <InShort>
          We may share information in specific situations described in this section
          and/or with the following third parties.
        </InShort>
        <p className="mt-4">
          We may need to share your personal information in the following situations:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-3">
          <li>
            <strong>Business Transfers.</strong> We may share or transfer your
            information in connection with, or during negotiations of, any merger,
            sale of company assets, financing, or acquisition of all or a portion of
            our business to another company.
          </li>
          <li>
            <strong>When we use Google Maps Platform APIs.</strong> We may share your
            information with certain Google Maps Platform APIs (e.g., Google Maps API,
            Places API). Google Maps uses GPS, Wi-Fi, and cell towers to estimate your
            location. GPS is accurate to about 20 meters, while Wi-Fi and cell towers
            help improve accuracy when GPS signals are weak, like indoors. This data
            helps Google Maps provide directions, but it is not always perfectly
            precise.
          </li>
        </ul>

        {/* 4 */}
        <H2 id="cookies">4. Do we use cookies and other tracking technologies?</H2>
        <InShort>
          We may use cookies and other tracking technologies to collect and store your
          information.
        </InShort>
        <p className="mt-4">
          We may use cookies and similar tracking technologies (like web beacons and
          pixels) to gather information when you interact with our Services. Some
          online tracking technologies help us maintain the security of our Services,
          prevent crashes, fix bugs, save your preferences, and assist with basic site
          functions.
        </p>
        <p className="mt-4">
          We also permit third parties and service providers to use online tracking
          technologies on our Services for analytics and advertising, including to
          help manage and display advertisements, to tailor advertisements to your
          interests, or to send abandoned shopping cart reminders (depending on your
          communication preferences). The third parties and service providers use
          their technology to provide advertising about products and services tailored
          to your interests which may appear either on our Services or on other
          websites.
        </p>

        <H3>Google Analytics</H3>
        <p className="mt-4">
          We may share your information with Google Analytics to track and analyze the
          use of the Services. The Google Analytics Advertising Features that we may
          use include Google Analytics Demographics and Interests Reporting. To opt
          out of being tracked by Google Analytics across the Services, visit{' '}
          <A href="https://tools.google.com/dlpage/gaoptout">
            https://tools.google.com/dlpage/gaoptout
          </A>
          . You can opt out of Google Analytics Advertising Features through{' '}
          <A href="https://adssettings.google.com/">Ads Settings</A> and Ad Settings
          for mobile apps. Other opt-out means include{' '}
          <A href="http://optout.networkadvertising.org/">
            http://optout.networkadvertising.org/
          </A>{' '}
          and{' '}
          <A href="http://www.networkadvertising.org/mobile-choice">
            http://www.networkadvertising.org/mobile-choice
          </A>
          . For more information on the privacy practices of Google, please visit the{' '}
          <A href="https://policies.google.com/privacy">
            Google Privacy &amp; Terms page
          </A>
          .
        </p>

        {/* 5 */}
        <H2 id="inforetain">5. How long do we keep your information?</H2>
        <InShort>
          We keep your information for as long as necessary to fulfill the purposes
          outlined in this Privacy Notice unless otherwise required by law.
        </InShort>
        <p className="mt-4">
          We will only keep your personal information for as long as it is necessary
          for the purposes set out in this Privacy Notice, unless a longer retention
          period is required or permitted by law (such as tax, accounting, or other
          legal requirements).
        </p>
        <p className="mt-4">
          When we have no ongoing legitimate business need to process your personal
          information, we will either delete or anonymize such information, or, if
          this is not possible (for example, because your personal information has
          been stored in backup archives), then we will securely store your personal
          information and isolate it from any further processing until deletion is
          possible.
        </p>

        {/* 6 */}
        <H2 id="infosafe">6. How do we keep your information safe?</H2>
        <InShort>
          We aim to protect your personal information through a system of
          organizational and technical security measures.
        </InShort>
        <p className="mt-4">
          We have implemented appropriate and reasonable technical and organizational
          security measures designed to protect the security of any personal
          information we process. However, despite our safeguards and efforts to
          secure your information, no electronic transmission over the Internet or
          information storage technology can be guaranteed to be 100% secure, so we
          cannot promise or guarantee that hackers, cybercriminals, or other
          unauthorized third parties will not be able to defeat our security and
          improperly collect, access, steal, or modify your information. Although we
          will do our best to protect your personal information, transmission of
          personal information to and from our Services is at your own risk. You
          should only access the Services within a secure environment.
        </p>

        {/* 7 */}
        <H2 id="infominors">7. Do we collect information from minors?</H2>
        <InShort>
          We do not knowingly collect data from or market to children under 18 years
          of age.
        </InShort>
        <p className="mt-4">
          We do not knowingly collect, solicit data from, or market to children under
          18 years of age, nor do we knowingly sell such personal information. By
          using the Services, you represent that you are at least 18 or that you are
          the parent or guardian of such a minor and consent to such minor dependent's
          use of the Services. If we learn that personal information from users less
          than 18 years of age has been collected, we will deactivate the account and
          take reasonable measures to promptly delete such data from our records. If
          you become aware of any data we may have collected from children under age
          18, please contact us at{' '}
          <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>.
        </p>

        {/* 8 */}
        <H2 id="privacyrights">8. What are your privacy rights?</H2>
        <InShort>
          You may review, change, or terminate your account at any time, depending on
          your country, province, or state of residence.
        </InShort>

        <H3>Withdrawing your consent</H3>
        <p className="mt-4">
          If we are relying on your consent to process your personal information,
          which may be express and/or implied consent depending on the applicable law,
          you have the right to withdraw your consent at any time. You can withdraw
          your consent at any time by contacting us by using the contact details
          provided in the section <A href="#contact">How can you contact us about
          this notice?</A> below.
        </p>
        <p className="mt-4">
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will it
          affect the processing of your personal information conducted in reliance on
          lawful processing grounds other than consent.
        </p>

        <H3>Opting out of marketing and promotional communications</H3>
        <p className="mt-4">
          You can unsubscribe from our marketing and promotional communications at any
          time by clicking on the unsubscribe link in the emails that we send,
          replying "STOP" or "UNSUBSCRIBE" to the SMS messages that we send, or by
          contacting us using the details provided in the section{' '}
          <A href="#contact">How can you contact us about this notice?</A> below. You
          will then be removed from the marketing lists. However, we may still
          communicate with you — for example, to send you service-related messages
          that are necessary for the administration and use of your account, to
          respond to service requests, or for other non-marketing purposes.
        </p>

        <H3>Cookies and similar technologies</H3>
        <p className="mt-4">
          Most web browsers are set to accept cookies by default. If you prefer, you
          can usually choose to set your browser to remove cookies and to reject
          cookies. If you choose to remove cookies or reject cookies, this could
          affect certain features or services of our Services.
        </p>
        <p className="mt-4">
          If you have questions or comments about your privacy rights, you may email
          us at <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>.
        </p>

        {/* 9 */}
        <H2 id="DNT">9. Controls for Do-Not-Track features</H2>
        <p className="mt-4">
          Most web browsers and some mobile operating systems and mobile applications
          include a Do-Not-Track ("DNT") feature or setting you can activate to
          signal your privacy preference not to have data about your online browsing
          activities monitored and collected. At this stage, no uniform technology
          standard for recognizing and implementing DNT signals has been finalized.
          As such, we do not currently respond to DNT browser signals or any other
          mechanism that automatically communicates your choice not to be tracked
          online. If a standard for online tracking is adopted that we must follow in
          the future, we will inform you about that practice in a revised version of
          this Privacy Notice.
        </p>

        {/* 10 */}
        <H2 id="policyupdates">10. Do we make updates to this notice?</H2>
        <InShort>
          Yes, we will update this notice as necessary to stay compliant with relevant
          laws.
        </InShort>
        <p className="mt-4">
          We may update this Privacy Notice from time to time. The updated version
          will be indicated by an updated "Revised" date at the top of this Privacy
          Notice. If we make material changes to this Privacy Notice, we may notify
          you either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this Privacy Notice
          frequently to be informed of how we are protecting your information.
        </p>

        {/* 11 */}
        <H2 id="contact">11. How can you contact us about this notice?</H2>
        <p className="mt-4">
          If you have questions or comments about this notice, you may email us at{' '}
          <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A> or contact us by
          post at:
        </p>
        <address className="not-italic mt-4 pl-4 border-l border-ink/15 text-ink/80">
          Stitch of Hope LTD<br />
          KN 7 Ave, Biryogo<br />
          Kigali, Rwanda
        </address>

        {/* 12 */}
        <H2 id="request">
          12. How can you review, update, or delete the data we collect from you?
        </H2>
        <p className="mt-4">
          You have the right to request access to the personal information we collect
          from you, details about how we have processed it, correct inaccuracies, or
          delete your personal information. You may also have the right to withdraw
          your consent to our processing of your personal information. These rights
          may be limited in some circumstances by applicable law. To request to
          review, update, or delete your personal information, please{' '}
          <A href={DSAR_LINK}>fill out and submit a data subject access request</A>.
        </p>

        <hr className="my-16 border-ink/10" />
        <p className="text-xs text-mist">
          This Privacy Policy was prepared using{' '}
          <A href="https://termly.io/products/privacy-policy-generator/">
            Termly's Privacy Policy Generator
          </A>
          .
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="eyebrow text-mist hover:text-ink transition-colors"
          >
            ← Back home
          </Link>
        </p>
      </article>
    </>
  );
}
