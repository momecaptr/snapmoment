// @flow
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Typography } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { createPostModalFilters } from '@/widget/sideBar/lib/createPostModalFilters';
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

  console.log({ filter: allPostImages[0].filter, imgIndex });
  const handleFilterChange = (style: string) => {
    dispatch(createPostActions.setFilter({ imgFilter: style, imgIndex }));
  };

  return (
    <div className={s.container}>
      {createPostModalFilters.map((filter) => {
        return (
          <div className={s.wrapper} key={filter.name}>
            <div className={s.imageWrapper}>
              <Image
                alt={`Photo # ${imgIndex}`}
                className={s.image}
                height={100}
                onClick={() => handleFilterChange(filter.style)}
                src={allPostImages[imgIndex].url}
                style={{ filter: filter.style }}
                width={100}
                priority
              />
            </div>

            <Typography className={s.text} variant={'regular_text_16'}>
              {filter.name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
