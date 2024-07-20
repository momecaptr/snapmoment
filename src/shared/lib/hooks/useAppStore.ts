import type { AppStore } from '@/myApp/store';

import { useStore } from 'react-redux';

export const useAppStore = useStore.withTypes<AppStore>();
