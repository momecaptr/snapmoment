import { z } from 'zod';

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
});
