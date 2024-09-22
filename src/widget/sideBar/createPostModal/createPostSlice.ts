import {
  CreatePostImgProps,
  CroppedAreaPx,
  UpdateImgAspect,
  UpdateImgCrop,
  UpdateImgZoom
} from '@/widget/sideBar/createPostModal/createPost';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

const slice = createSlice({
  initialState: {
    allPostImages: [] as CreatePostImgProps[]
  },
  name: 'createPost',
  reducers: {
    addPostImgs(state, action: PayloadAction<{ imageUrl: string }>) {
      const existingPhoto = state.allPostImages.find((img) => img.imageUrl === action.payload.imageUrl);

      if (!existingPhoto) {
        const imgDataToSave: CreatePostImgProps = {
          aspect: { text: '1:1', value: 1 },
          crop: { x: 0, y: 0 },
          croppedAreaPx: null,
          id: v1(),
          imageUrl: action.payload.imageUrl,
          originalImageUrl: '',
          zoom: 1
        };

        state.allPostImages.unshift(imgDataToSave);
      }
    },
    deletePhoto(state, action: PayloadAction<{ id: string }>) {
      state.allPostImages = state.allPostImages.filter((img) => img.id !== action.payload.id);
    },
    setAllPostImgs(state, action: PayloadAction<{ images: CreatePostImgProps[] }>) {
      state.allPostImages = action.payload.images.map((el) => ({ ...el }));
    },
    updateAspect(state, action: PayloadAction<UpdateImgAspect>) {
      const imgIndex = state.allPostImages.findIndex((img) => img.id === action.payload.id);

      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          aspect: action.payload.aspect
        };
      }
    },
    updateCrop(state, action: PayloadAction<UpdateImgCrop>) {
      const imgIndex = state.allPostImages.findIndex((img) => img.id === action.payload.id);

      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          crop: action.payload.crop
        };
      }
    },
    updateCroppedAreaPixels(state, action: PayloadAction<{ croppedAreaPx: CroppedAreaPx; id: string }>) {
      const img = state.allPostImages.find((el) => el.id === action.payload.id);

      if (img) {
        img.croppedAreaPx = action.payload.croppedAreaPx;
      }
    },
    updateZoom(state, action: PayloadAction<UpdateImgZoom>) {
      const imgIndex = state.allPostImages.findIndex((img) => img.id === action.payload.id);

      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          zoom: action.payload.zoom
        };
      }
    }
  },
  selectors: {
    allPostImages: (sliceState) => sliceState.allPostImages,
    soloImg: (sliceState, id: string) => sliceState.allPostImages.find((el) => el.id === id)
  }
});

export const createPostSlice = slice.reducer;
export const createPostActions = slice.actions;
export const createPostSelectors = slice.selectors;
