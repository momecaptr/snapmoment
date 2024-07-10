import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: 'Required' }).email()
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
export default ForgotPasswordSchema;
