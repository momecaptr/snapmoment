import React from 'react';

/**
 * Функция для обработки изображения (менее 20 мб) и отброса ошибок.
 * В передаваемые параметры нужно передать file - изображение из input, в setPreview - функцию сэттинга стейта изображений, в setError функцию сэттинга стейта ошибок
 * @param file
 * @param setPreviews добавляет изображение к уже имеющемуся в state для изображений
 * @param setError
 */
export const processImage = (
  file: File,
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>,
  setError: (message: null | string) => void
) => {
  const isValidSize = file.size <= 20 * 1024 * 1024; // 20MB
  const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);

  if (!isValidSize) {
    setError('Error! Photo size must be less than 20 MB!');
    setPreviews([]);

    return false;
  }

  if (!isValidType) {
    setError('Error! The format of the uploaded photo must be PNG or JPEG');
    setPreviews([]);

    return false;
  }

  setError(null);
  const objectUrl = URL.createObjectURL(file);

  setPreviews((prev) => [...prev, objectUrl]);

  return true;
};
