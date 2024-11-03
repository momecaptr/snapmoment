export const createPostModalDirections = {
  back: 'Back',
  next: 'Next'
} as const;

export const createPostModalSections = {
  addPost: 'Add Post',
  cropping: 'Cropping',
  filters: 'Filters',
  publication: 'Publication'
} as const;

// export type Sections = 'Cropping' | 'Filters' | 'Publication';
export type CreatePostModalSections = (typeof createPostModalSections)[keyof typeof createPostModalSections];
export type NextBackDirection = (typeof createPostModalDirections)[keyof typeof createPostModalDirections];
