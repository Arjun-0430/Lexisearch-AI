
"use server";

import { findUserByEmail, passwords } from "@/lib/data";
import type { User } from "@/lib/types";

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

  // Example MFA requirement for Platform Super Admin
  if (user.role === 'Platform Super Admin' && password) {
    return { user, mfaRequired: true };
  }

  return { user };
}
