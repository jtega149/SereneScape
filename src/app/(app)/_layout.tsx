import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/signup');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect('/signup');
  }

  return <>{children}</>;
}
