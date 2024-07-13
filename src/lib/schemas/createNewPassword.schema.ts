import { z } from 'zod';

export const createNewPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password mismatch',
    path: ['confirmPassword']
  });

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
