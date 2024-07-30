import { BaseResponseType } from '@/shared/api';

export const transformErrorResponse = (res: { data: BaseResponseType; status: number }) => {
  return res.data;
};
