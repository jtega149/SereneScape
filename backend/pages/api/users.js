import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const { method, url } = req;

  // Signup
  if (method === 'POST' && url.endsWith('/signup')) {
    const { email, password, name } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Optionally insert user profile into your 'users' table
    await supabase.from('users').insert([{ email, name }]);

    return res.status(201).json({ message: 'Signup successful', user: authData.user });
  }

  // Login
  if (method === 'POST' && url.endsWith('/login')) {
    const { email, password } = req.body;

    const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      return res.status(401).json({ error: loginError.message });
    }

    return res.status(200).json({
      message: 'Login successful',
      session: sessionData.session,
      user: sessionData.user,
    });
  }

  // Get all users (test only — not recommended in production)
  if (method === 'GET') {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // Default
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}