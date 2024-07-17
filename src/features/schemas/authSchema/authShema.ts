import { z } from 'zod';

// Сообщения об ошибках
const errorMessages = {
  invalidEmail: 'Invalid email address',
  passwordLowercase: 'Password must contain at least one lowercase letter',
  passwordMaxLength: 'Your password must be between 6 and 20 characters',
  passwordMinLength: 'Password must be at least 6 characters long',
  passwordMismatch: 'Password mismatch',
  passwordNumber: 'Password must contain at least one number',
  passwordSpecialChar: 'Password must contain at least one special character',
  passwordUppercase: 'Password must contain at least one uppercase letter',
  required: 'Required',
  usernameMaxLength: 'Maximum number of characters is 30'
};

// Общие правила для полей
const commonPasswordRules = z
  .string()
  .min(6, { message: errorMessages.passwordMinLength })
  .max(20, { message: errorMessages.passwordMaxLength })
  .regex(/[A-Z]/, { message: errorMessages.passwordUppercase })
  .regex(/[a-z]/, { message: errorMessages.passwordLowercase })
  .regex(/[0-9]/, { message: errorMessages.passwordNumber })
  .regex(/[^A-Za-z0-9]/, { message: errorMessages.passwordSpecialChar });

const commonEmailRules = z
  .string()
  .min(1, { message: errorMessages.required })
  .email({ message: errorMessages.invalidEmail });

const commonUsernameRules = z
  .string()
  .min(1, { message: errorMessages.required })
  .max(30, { message: errorMessages.usernameMaxLength });

// Схемы валидации
export const createNewPasswordSchema = z
  .object({
    confirmPassword: commonPasswordRules,
    password: commonPasswordRules
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages.passwordMismatch,
    path: ['confirmPassword']
  });

export const forgotPasswordSchema = z.object({
  email: commonEmailRules
});

export const signInSchema = z.object({
  email: commonEmailRules,
  password: commonPasswordRules
});

export const signUpSchema = z
  .object({
    confirmPassword: commonPasswordRules,
    email: commonEmailRules,
    password: commonPasswordRules,
    rememberMe: z.boolean(),
    username: commonUsernameRules
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages.passwordMismatch,
    path: ['confirmPassword']
  });

// Типы данных
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>;
