import { useEffect, useRef } from 'react';

import { ManagerOptions, Socket, SocketOptions, io } from 'socket.io-client';

interface UseSocketOptions {
  events?: { [event: string]: (data: any) => void }; // Обработчики событий, например RECEIVE_MESSAGE, UPDATE_MESSAGE и др.
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
  params?: Partial<ManagerOptions & SocketOptions>;
  url: string;
}

/**
 * Хук `useSocket` предназначен для управления подключением и взаимодействием с сервером через socket.io.
 * Он автоматически устанавливает соединение с сервером, подписывается на указанные события и обрабатывает подключение и ошибки.
 *
 * ### Принцип работы
 * 1. **Подключение к серверу**:
 *    Создаётся соединение с сервером по указанному `url` с дополнительными параметрами `params`.
 *    Соединение сохраняется в `socketRef`, чтобы сохранять его между рендерами компонента.
 *
 * 2. **Обработчики событий**:
 *    Хук позволяет передать объект `events`, где ключ — название события (например, RECEIVE_MESSAGE), а значение — функция-обработчик.
 *    Помимо этого, можно указать обработчики `onConnect`, `onDisconnect` и `onError`.
 *
 * 3. **Очистка ресурсов**:
 *    При размонтировании компонента отключаются все подписки на события, и соединение с сервером закрывается для предотвращения утечек памяти.
 *
 * ### Пример использования
 * ```typescript
 * const MyComponent = () => {
 *   useSocket({
 *     url: 'https://inctagram.work',
 *     params: { query: { accessToken: 'your_access_token_here' } },
 *     events: {
 *       RECEIVE_MESSAGE: (data) => console.log('Received message:', data),
 *       MESSAGE_DELETED: (data) => console.log('Message deleted:', data),
 *       ERROR: (error) => console.error('Socket error:', error),
 *     },
 *     onConnect: () => console.log('Connected to WebSocket server'),
 *     onDisconnect: () => console.log('Disconnected from WebSocket server'),
 *   });
 *
 *   return <div>Socket.io Example</div>;
 * };
 * ```
 *
 * @param {UseSocketOptions} options - Объект с параметрами для настройки соединения socket.io.
 * @returns {Socket | null} - Возвращает текущий экземпляр сокета для возможного прямого взаимодействия.
 */
export const useSocket = (options: UseSocketOptions): Socket | null => {
  const { events, onConnect, onDisconnect, onError, params, url } = options;
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, params);

    socketRef.current = socket;

    // Устанавливаем стандартные обработчики подключения и ошибок
    if (onConnect) {
      socket.on('connect', onConnect);
    }
    if (onDisconnect) {
      socket.on('disconnect', onDisconnect);
    }
    if (onError) {
      socket.on('error', onError);
    }

    // Устанавливаем обработчики для всех переданных событий
    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    }

    // Очистка обработчиков и отключение сокета при размонтировании
    return () => {
      if (onConnect) {
        socket.off('connect', onConnect);
      }
      if (onDisconnect) {
        socket.off('disconnect', onDisconnect);
      }
      if (onError) {
        socket.off('error', onError);
      }

      if (events) {
        Object.keys(events).forEach((event) => {
          socket.off(event);
        });
      }

      socket.disconnect();
    };
  }, [url, params, events, onConnect, onDisconnect, onError]);

  return socketRef.current;
};
