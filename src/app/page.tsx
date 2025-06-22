// app/page.tsx (Server Component)
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

import LandingClient from './LandingClient'; // import the client component

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    redirect('/dashboard');
  }

  return <LandingClient />;
}