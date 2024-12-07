import {
  INotificationItem,
  NotificationsArgs,
  NotificationsResponse
} from '@/shared/api/notifications/notificationsTypes';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface NotificationsState {
  cursorId: null | number;
  error: null | string;
  isFetching: boolean;
  isOpen: boolean;
  notReadCount: number;
  notifications: INotificationItem[];
  totalCount: number;
}

const initialState: NotificationsState = {
  cursorId: null,
  error: null,
  isFetching: false,
  isOpen: false,
  notReadCount: 0,
  notifications: [],
  totalCount: 0
};

// Thunk для загрузки уведомлений
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (args: NotificationsArgs, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const { cursor = null, pageSize, sortBy = 'notifyAt', sortDirection = 'desc' } = args;
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('accessToken') as string);

    try {
      const response = await axios.get<NotificationsResponse>(
        `https://inctagram.work/api/v1/notifications/${cursor}?pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
          }
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для отметки уведомлений как прочитанных
export const markNotificationsAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (ids: number[], { rejectWithValue }) => {
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('accessToken') as string);

    try {
      await axios.put(
        'https://inctagram.work/api/v1/notifications/mark-as-read',
        { ids },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
          }
        }
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk для удаления уведомления
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id: number, { rejectWithValue }) => {
    const ACCESS_TOKEN = JSON.parse(localStorage.getItem('accessToken') as string);

    try {
      await axios.delete(`https://inctagram.work/api/v1/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const existingIds = new Set(state.notifications.map((notice) => notice.id));
        const newNotifications = action.payload.items.filter((item) => !existingIds.has(item.id));

        state.notifications = [...state.notifications, ...newNotifications];

        /*state.notifications = [...state.notifications, ...action.payload.items];*/
        state.totalCount = action.payload.totalCount;
        state.isFetching = false;
        state.cursorId = action.payload.items[action.payload.items.length - 1]?.id;

        state.notReadCount = action.payload.notReadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isFetching = false;
        state.notifications = state.notifications.filter((notification) => notification.id !== action.meta.arg);
        state.totalCount -= 1;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isFetching = false;
      })
      .addCase(markNotificationsAsRead.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        state.isFetching = false;
        const readIds = new Set(action.meta.arg);

        // Создаем новый массив с обновленными уведомлениями
        const updatedNotifications = state.notifications.map((notification) => {
          if (readIds.has(notification.id)) {
            return { ...notification, isRead: true };
          }

          return notification;
        });

        // Обновляем состояние с новым массивом уведомлений
        state.notifications = updatedNotifications;
        state.notReadCount -= readIds.size;
      })
      .addCase(markNotificationsAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isFetching = false;
      });
  },
  initialState: initialState,
  name: 'notifications',
  reducers: {
    addNewNotification: (state, action: PayloadAction<INotificationItem>) => {
      state.notifications.unshift(action.payload);
    },
    changeDropDownState: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    }
  },
  selectors: {
    getCursorId: (state) => state.cursorId,
    getHasMore: (state) => state.notifications.length < state.totalCount,
    getIsFetching: (state) => state.isFetching,
    getIsOpen: (state) => state.isOpen,
    getNotReadCount: (state) => state.notReadCount,
    getNotifications: (state) => state.notifications,
    getTotalCount: (state) => state.totalCount
  }
});

export const notificationActions = slice.actions;
export const notificationSlice = slice.reducer;
export const notificationSelectors = slice.selectors;
