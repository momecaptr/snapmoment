import { AspectRatioVals } from '../service/createPostSliceTypes';

export const aspectRatios: AspectRatioVals[] = [
  { text: 'Original', value: 1 / 1 },
  { text: '1:1', value: 1 / 1 },
  { text: '4:5', value: 4 / 5 },
  { text: '16:9', value: 16 / 9 }
];

type FilterType = {
  class: string;
  name: string;
  style: string;
};

export const createPostModalFilters: FilterType[] = [
  {
    class: 'filter-normal',
    name: 'Normal',
    style: 'none'
  },
  {
    class: 'filter-clarendon',
    name: 'Clarendon',
    style: 'sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)'
  },

  {
    class: 'filter-gingham',
    name: 'Gingham',
    style: 'hue-rotate(150deg)'
  },

  {
    class: 'filter-lark',
    name: 'Lark',
    style: 'sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)'
  },
  {
    class: 'filter-lofi',
    name: 'Lo-fi',
    style: 'saturate(1.1) contrast(1.5)'
  },
  {
    class: 'filter-reyes',
    name: 'Reyes',
    style: 'sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)'
  },
  {
    class: 'filter-maven',
    name: 'Maven',
    style: 'contrast(200%)'
  },
  {
    class: 'filter-mayfair',
    name: 'Mayfair',
    style: 'contrast(1.1) brightness(1.15) saturate(1.1)'
  },
  {
    class: 'filter-moon',
    name: 'Moon',
    style: 'brightness(1.4) contrast(.95) saturate(0) sepia(.35)'
  }
];

export const direction = {
  back: 'Back',
  next: 'Next'
} as const;

export const modalSection = {
  addPost: 'Add Post',
  cropping: 'Cropping',
  filters: 'Filters',
  publication: 'Publication'
} as const;
