"use server";

import { findUserByEmail } from "@/lib/data";
import type { User } from "@/lib/types";

// Dummy passwords for mock users
const passwords: Record<string, string> = {
    'admin@global-legal.com': 'password123',
    'superadmin@global-legal.com': 'superpass123',
    'user@global-legal.com': 'userpass123'
};

export async function loginAction(formData: FormData): Promise<{ user?: User, error?: string, mfaRequired?: boolean }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Artificial delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = findUserByEmail(email);

  if (!user) {
    return { error: 'Invalid email or password.' };
  }
  
  if (password && passwords[email] !== password) {
      return { error: 'Invalid email or password.' };
  }

  if (user.isSuperAdmin && password) {
    return { user, mfaRequired: true };
  }

  return { user };
}
