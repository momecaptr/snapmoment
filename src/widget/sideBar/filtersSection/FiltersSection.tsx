// @flow
import * as React from 'react';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Typography } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { createPostModalFilters } from '@/widget/sideBar/lib/createPostModalFilters';
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

  const handleFilterChange = (style: string) => {
    dispatch(createPostActions.setFilter({ imgFilter: style, imgIndex }));
    setSelectedFilter(style);
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
