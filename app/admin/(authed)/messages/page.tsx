import { listSubmissions } from '@/lib/db/submissions';
import MessageRow from './MessageRow';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const items = await listSubmissions({ limit: 200 });

  return (
    <div>
      <p className="eyebrow">Inbox</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Messages</h1>
      <p className="mt-2 font-sans text-sm text-ink/60 max-w-lg">
        Form submissions from the contact page and product-request modals. Emails are also
        sent to your configured address.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink/20 p-10 text-center text-sm text-ink/50">
          No messages yet.
        </div>
      ) : (
        <ul className="mt-10 border border-ink/10 divide-y divide-ink/10">
          {items.map((m) => (
            <MessageRow key={m.id} message={m} />
          ))}
        </ul>
      )}
    </div>
  );
}
