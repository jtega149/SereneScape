import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data: sessionData, error: loginError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    return NextResponse.json({ error: loginError.message }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Login successful',
    session: {
      access_token: sessionData.session?.access_token,
      refresh_token: sessionData.session?.refresh_token,
    },
    user: sessionData.user,
  });
}