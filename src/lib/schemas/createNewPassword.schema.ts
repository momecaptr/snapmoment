import { z } from 'zod';

export const createNewPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .max(50, 'Пароль должен содержать не более 50 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .regex(/[^A-Za-z0-9]/, 'Пароль должен содержать хотя бы один специальный символ')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
