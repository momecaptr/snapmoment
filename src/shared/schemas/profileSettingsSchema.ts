import { z } from 'zod';
export const profileSettingsSchema = z.object({
  aboutMe: z.string().min(0, { message: 'About Me is required' }).max(200, { message: 'About Me is too long' }),
  dateOfBirth: z.string().date(),
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(50, { message: 'First Name is too long' })
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'First name can only contain letters from the Latin or Cyrillic alphabet'
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .max(50, { message: 'Last Name is too long' })
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'Last name can only contain letters from the Latin or Cyrillic alphabet'
    }),
  username: z
    .string()
    .min(6, { message: 'Username is required' })
    .max(30, { message: 'Username is too long' })
    .regex(/^[0-9a-zA-Z_-]+$/, {
      message: 'Username can only contain letters, numbers, underscores, and hyphens'
    })
});

export type profileSettingsSchemaType = z.infer<typeof profileSettingsSchema>;
