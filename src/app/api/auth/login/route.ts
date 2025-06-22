import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';

export async function POST(req: NextRequest) {

  const supabase = await createClient()
  const { email, password } = await req.json();

  const { data: sessionData, error: loginError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (loginError) {
    console.log(loginError)
    return NextResponse.json({ error: loginError.message }, { status: 401 });
  }

  const name = sessionData.user?.user_metadata?.name || '';

  return NextResponse.json({
    message: 'Login successful',
    session: {
      access_token: sessionData.session?.access_token,
      refresh_token: sessionData.session?.refresh_token,
    },
    user: {
      email: sessionData.user?.email,
      name,
    }
  });
}