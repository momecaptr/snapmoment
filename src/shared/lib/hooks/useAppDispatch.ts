import type { AppDispatch } from '@/myApp/store';

import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
