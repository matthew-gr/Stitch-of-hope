'use client';

import { useEffect } from 'react';

export default function Reveal() {
  useEffect(() => {
    const vh = window.innerHeight;

    // Mark anything already on-screen as visible BEFORE the hide rule activates
    document
      .querySelectorAll<HTMLElement>('.reveal')
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.classList.add('is-visible');
        }
      });

    document.documentElement.setAttribute('data-reveal-ready', 'true');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );

    const observeNew = () => {
      document
        .querySelectorAll<HTMLElement>('.reveal:not(.is-visible):not([data-observed])')
        .forEach((el) => {
          el.dataset.observed = 'true';
          io.observe(el);
        });
    };

    observeNew();

    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
