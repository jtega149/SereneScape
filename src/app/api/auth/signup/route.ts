import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';


export async function POST(req: NextRequest) {
  //testing purposes
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_KEY?.slice(0, 8)); // Mask for safety

  const { email, password, name } = await req.json();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  await supabase.from('users').insert([{ email, name }]);

  return NextResponse.json(
    { message: 'Signup successful', user: authData.user },
    { status: 201 }
  );
}