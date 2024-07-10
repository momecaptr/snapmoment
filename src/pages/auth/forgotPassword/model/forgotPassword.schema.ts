import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Required' }).email()
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
