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
  notifications: INotificationItem[];
  totalCount: number;
  unReadCount: number;
}

const initialState: NotificationsState = {
  cursorId: null,
  error: null,
  isFetching: false,
  isOpen: false,
  notifications: [],
  totalCount: 0,
  unReadCount: 0
};

// Thunk для загрузки уведомлений
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (args: NotificationsArgs, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const { cursor = null, pageSize, sortBy = 'notifyAt', sortDirection = 'desc' } = args;
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

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

// Thunk для загрузки уведомлений для счетчика
export const fetchNotificationsForCounter = createAsyncThunk(
  'notifications/fetchNotificationsForCounter',
  async (args: NotificationsArgs, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const { cursor = null, pageSize, sortBy = 'notifyAt', sortDirection = 'desc' } = args;
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

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
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

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
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

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
        state.totalCount = action.payload.totalCount;
        state.isFetching = false;
        state.cursorId = action.payload.items[action.payload.items.length - 1]?.id;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      .addCase(fetchNotificationsForCounter.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchNotificationsForCounter.fulfilled, (state, action) => {
        if (action.payload?.items.length > 0) {
          state.unReadCount = action.payload.items.filter((notification) => !notification.isRead).length;
        } else {
          state.unReadCount = 0; // если массив пустой, устанавливаем счетчик в 0
        }
      })
      .addCase(fetchNotificationsForCounter.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((notification) => notification.id !== action.meta.arg);
        state.totalCount -= 1;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string;
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
    getNotifications: (state) => state.notifications,
    getReadNotifications: (state) => state.unReadCount,
    getTotalCount: (state) => state.totalCount,
    getUnReadCount: (state) => state.unReadCount
  }
});

export const notificationActions = slice.actions;
export const notificationSlice = slice.reducer;
export const notificationSelectors = slice.selectors;
