import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';



export async function POST(req: NextRequest) {

  const supabase = await createClient()
  //testing purposes
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_KEY?.slice(0, 8)); // Mask for safety

  const { email, password, name } = await req.json();

  console.log(email, password, name)

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  console.log(authError)

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: 'Signup successful', user: authData.user },
    { status: 201 }
  );
}