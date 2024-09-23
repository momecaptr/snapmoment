import {
  CreatePostImgProps,
  CreatePostModalSections,
  CroppedAreaPx,
  UpdateImgAspect,
  UpdateImgCrop,
  UpdateImgZoom
} from '@/widget/sideBar/createPostModal/createPost';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

const slice = createSlice({
  initialState: {
    activeSection: 'Cropping' as CreatePostModalSections,
    allPostImages: [] as CreatePostImgProps[]
  },
  name: 'createPost',
  reducers: {
    addPostImgs(state, action: PayloadAction<{ imageUrl: string }>) {
      // const existingPhoto = state.allPostImages.find((img) => img.imageUrl === action.payload.imageUrl);

      // if (!existingPhoto) {
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
      // }
    },
    deletePhoto(state, action: PayloadAction<{ id: string }>) {
      state.allPostImages = state.allPostImages.filter((img) => img.id !== action.payload.id);
    },
    setActiveSection(state, action: PayloadAction<{ section: CreatePostModalSections }>) {
      state.activeSection = action.payload.section;
    },
    setAllPostImgs(state, action: PayloadAction<{ images: CreatePostImgProps[] }>) {
      state.allPostImages = action.payload.images.map((el) => ({ ...el }));
    },
    setAspect(state, action: PayloadAction<UpdateImgAspect>) {
      const imgIndex = state.allPostImages.findIndex((img) => img.id === action.payload.id);

      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          aspect: action.payload.aspect
        };
      }
    },
    setCrop(state, action: PayloadAction<UpdateImgCrop>) {
      const imgIndex = state.allPostImages.findIndex((img) => img.id === action.payload.id);

      if (imgIndex !== -1) {
        state.allPostImages[imgIndex] = {
          ...state.allPostImages[imgIndex],
          crop: action.payload.crop
        };
      }
    },
    setCroppedAreaPixels(state, action: PayloadAction<{ croppedAreaPx: CroppedAreaPx; id: string }>) {
      const img = state.allPostImages.find((el) => el.id === action.payload.id);

      if (img) {
        img.croppedAreaPx = action.payload.croppedAreaPx;
      }
    },
    setImgUrlFromCroppedToOriginalUrl(
      state,
      action: PayloadAction<{ croppedAreaPx: CroppedAreaPx; id: string; imageUrl: string | undefined }[]>
    ) {
      const payload = action.payload;

      payload.forEach((photo) => {
        const { croppedAreaPx, id, imageUrl } = photo;
        const index = state.allPostImages.findIndex((img) => img.id === id);

        if (index !== -1) {
          if (imageUrl != null) {
            // Тут нужно засэтать либо originalImageUrl, либо imageUrl, либо оба.
            // Если только originalImageUrl, то это обеспечит нам дать пользователю возможность сделать шаг "назад" и выбрать другую область для кропа исходя из оригинально загруженного. Поэтому я так и сделаю.
            state.allPostImages[index].originalImageUrl = imageUrl;
          }
          state.allPostImages[index].croppedAreaPx = croppedAreaPx;
        }
      });
    },
    // Вот этот action я убрал, потому что он нужен только для того, чтобы сделать лишнее действие для сэта нового imageUrl каждого элемента. Это действие можно выполнить в  setImgUrlFromCroppedToOriginalUrl
    // setOriginalImageUrl(state, action: PayloadAction<{ imageUrl: string }>) {
    //   state.allPostImages.map((img) =>
    //     img.imageUrl === action.payload.imageUrl ? { ...img, originalImageUrl: action.payload.imageUrl } : img
    //   );
    // },
    setZoom(state, action: PayloadAction<UpdateImgZoom>) {
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
    activeSection: (sliceState) => sliceState.activeSection,
    allPostImages: (sliceState) => sliceState.allPostImages,
    soloImg: (sliceState, id: string) => sliceState.allPostImages.find((el) => el.id === id)
  }
});

export const createPostSlice = slice.reducer;
export const createPostActions = slice.actions;
export const createPostSelectors = slice.selectors;
