'use client';
import type { AppStore } from '@/app/store';

import { useStore } from 'react-redux';

export const useAppStore = useStore.withTypes<AppStore>();
