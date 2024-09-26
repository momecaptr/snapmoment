// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Typography } from '@/shared/ui';
import { CreatePostImgProps } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { createPostModalFilters } from '@/widget/sideBar/lib/createPostModalFilters';
import { createImage } from '@/widget/sideBar/lib/cropImage';
import { clsx } from 'clsx';
import Image from 'next/image';

import s from './FiltersSection.module.scss';

type Props = {
  className?: string;
  imgIndex: number;
};
export const FiltersSection = (props: Props) => {
  const { className, imgIndex } = props;
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');

  async function transformImage(img: CreatePostImgProps) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const modifiedImage = await createImage(img.url as string); // Тут без разницы, url или buferUrl потому что на этапе кроппирования мы сохранили обрезку как в url, так и в buferUrl. То есть что url, что buferUrl - значения не имеет

    canvas.width = modifiedImage.width;
    canvas.height = modifiedImage.height;

    ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height);

    if (ctx) {
      ctx.filter = img.filter;
    }

    ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((result) => resolve(result), 'image/jpeg'));

    const objectUrl = blob ? URL.createObjectURL(blob) : null;

    return {
      croppedAreaPx: img.croppedAreaPx,
      id: img.id,
      url: objectUrl
    };
  }

  // ИСПОЛЬЗУЕМ useEffect потому что функция сохранения картинки с фильтром асинхронная и чтобы обеспечить моментальное ее срабатывание, делаем useEffect
  // Когда не использовал, картинка обновляляась только на второй клик.
  useEffect(() => {
    if (selectedFilter !== 'none') {
      const img = allPostImages[imgIndex];

      transformImage(img).then((transformedImage) => {
        console.log({ transformedImage });
        dispatch(createPostActions.setFinalBuferImg({ imgIndex, transformedImage }));
      });
    }
  }, [selectedFilter]);

  const handleFilterChange = (style: string) => {
    setSelectedFilter(style);
    // Сохраняем значение фильтра в стейте на всякий случай
    dispatch(createPostActions.setFilter({ imgFilter: style, imgIndex }));
  };

  return (
    <div className={s.container}>
      {createPostModalFilters.map((filter) => {
        const isSelected = selectedFilter === filter.style;

        return (
          // <div className={s.wrapper} key={filter.name}>
          <div key={filter.name}>
            <Image
              alt={`Photo # ${imgIndex}`}
              className={clsx(s.image, isSelected && s.active)}
              height={100}
              onClick={() => handleFilterChange(filter.style)}
              src={allPostImages[imgIndex].url}
              style={{ filter: filter.style }}
              width={100}
              priority
              unoptimized
            />
            <Typography className={s.text} variant={'regular_text_16'}>
              {filter.name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
