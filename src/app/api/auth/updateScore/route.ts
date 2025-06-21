// src/app/api/auth/updateScore/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bai_score } = await req.json();

  if (typeof bai_score !== 'number') {
    return NextResponse.json({ error: 'Invalid score format' }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ bai_score })
    .eq('email', user.email);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Score updated successfully' }, { status: 200 });
}