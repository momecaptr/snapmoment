import { createContext } from 'react';
import { AlertContextType } from '@/components/ui/alert/types/types';

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
