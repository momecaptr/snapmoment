import * as React from 'react';
import { ReactNode } from 'react';

import avatarMock from '@/../public/avatar-mock.jpg';
import { TimeAgo } from '@/features/timeAgo/TimeAgo';
import { AnswerItems } from '@/shared/api/public/publicTypes';
import { Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './Answer.module.scss';

type Props = {
  answer: AnswerItems;
  children?: ReactNode;
  isAuth: boolean;
};

export const Answer = ({ answer, children, isAuth }: Props) => {
  return (
    <div className={s.answer}>
      <Image
        alt={'reviewer photo'}
        className={s.answerUserPhoto}
        height={100}
        src={answer.from.avatars[0]?.url || avatarMock}
        width={100}
      />

      <div className={s.answerBody}>
        <div className={s.answerTextBlock}>
          <div className={s.answerText}>
            <Typography as={'span'} className={s.answerUserName} variant={'bold_text_14'}>
              {answer.from.username}
            </Typography>{' '}
            <Typography as={'span'} variant={'regular_text_14'}>
              {answer.content}
            </Typography>
          </div>

          {children}
        </div>

        <div className={s.answerInfo}>
          <TimeAgo time={answer.createdAt} />

          {isAuth && (
            <>
              <Typography className={s.likeCounts} variant={'semi_bold_small_text'}>
                Like : {answer.likeCount}
              </Typography>
              <Typography as={'button'} className={s.answerBtn} variant={'semi_bold_small_text'}>
                Answer
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
