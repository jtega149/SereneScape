import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';

export async function POST(req: NextRequest) {

   const supabase = await createClient();

   const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bai_score } = await req.json();

  if (typeof bai_score !== 'number') {
    return NextResponse.json({ error: 'Invalid score format' }, { status: 400 });
  }

  const { error: insertError } = await supabase
    .from('bai_scores')
    .insert([{ user_id: user.id, bai_score }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Score added successfully' }, { status: 200 });
}