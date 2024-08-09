import { BaseResponseType } from '@/shared/api/common/model/api.types';

export const transformErrorResponse = (res: { data: BaseResponseType; status: number }) => {
  return res.data;
};
