import { z } from 'zod';
export const GeneralInfoFormschema = z.object({
  AboutMe: z.string().min(1, { message: 'About Me is required' }),
  Date: z.string().min(1, { message: 'Date is required' }),
  FirstName: z.string().min(1, { message: 'First Name is required' }),
  LastName: z.string().min(1, { message: 'Last Name is required' }),
  Username: z.string().min(1, { message: 'Username is required' })
});

export type GeneralInfoFormschemaType = z.infer<typeof GeneralInfoFormschema>;
