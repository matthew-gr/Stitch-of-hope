import { getIronSession, type SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export type SessionData = { admin?: boolean };

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? 'fallback-dev-secret-please-set-SESSION_SECRET-minimum-32-chars',
  cookieName: 'soh_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  },
};

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}
