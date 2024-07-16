import { ModalKey } from '@/shared/lib/hooks/useModal';

export interface AppSettings {
  modal: Modal;
  theme: Theme;
}
export type Theme = 'moon' | 'sun';

export interface Modal {
  isOpen: boolean;
  modalKey: ModalKey | null;
}
