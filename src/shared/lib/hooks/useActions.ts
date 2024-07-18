'use client';
import { useMemo } from 'react';

import { useAppDispatch } from '@/shared/lib';
// import { AlertActions } from '@/shared/ui';
// Импорт сверху ломает билд
// import { AlertActions } from '@/shared/ui/alert';
// Этот импорт сверху тоже ломает билд
import { AlertActions } from '@/shared/ui/alert/model/alertSlice';
// А вот этот работает
import { bindActionCreators } from 'redux';

const actionsAll = {
  ...AlertActions
};

type AllActions = typeof actionsAll;
type AllActionsBindDispatch = RemapActionCreators<AllActions>;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators<AllActions, AllActionsBindDispatch>(actionsAll, dispatch), [dispatch]);
};

type RemapActionCreators<T extends Record<string, any>> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>;
};
