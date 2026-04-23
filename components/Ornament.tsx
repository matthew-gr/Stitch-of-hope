export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 text-ink/30 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-24 md:w-40 bg-ink/20" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>
      <span className="h-px w-24 md:w-40 bg-ink/20" />
    </div>
  );
}
