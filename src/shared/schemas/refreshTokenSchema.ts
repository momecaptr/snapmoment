import { z } from 'zod';

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string()
});

export const RefreshTokenResponseSchemaMeta = z.object({
  status: z.number()
});
