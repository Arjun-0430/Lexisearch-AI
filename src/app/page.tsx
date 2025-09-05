import { redirect } from 'next/navigation';

export default function Home() {
  // For now, we redirect to login. In a real app, you would check for an active session.
  redirect('/login');
  return null;
}
