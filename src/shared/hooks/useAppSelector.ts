'use client'
import type { RootState } from '@/app/store';

import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
