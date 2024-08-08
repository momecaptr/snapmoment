import { ModalKey } from '@/shared/lib';

export interface AppSettings {
  isPhotoInState: boolean;
  modal: Modal;
  theme: Theme;
}
export type Theme = 'moon' | 'sun';

export interface Modal {
  isOpen: boolean;
  modalKey: ModalKey[];
}
