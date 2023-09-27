'use server'

import { cookies } from 'next/headers';

export const AcceptCookieAction = (value: boolean) => {
  const cookieStore = cookies();
  cookieStore.set('accepted', `${value}`);
};

export const HiddenCookieAction = (value: boolean) => {
  const cookieStore = cookies();
  cookieStore.set('hidden', `${value}`);
};
