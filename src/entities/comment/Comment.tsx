import { ReactNode } from 'react';

import avatarMock from '@/../public/avatar-mock.jpg';
import { Button } from '@/shared/button/Button';
import { Typography } from '@/shared/typography/Typography';
import Image from 'next/image';

import s from './Comment.module.scss';
type Props = {
  children?: ReactNode;
  isViewComments: boolean;
  setIsViewComments: (isViewComments: boolean) => void;
};

export const Comment = ({ children, isViewComments, setIsViewComments }: Props) => {
  const setIsViewCommentsHandler = () => {
    setIsViewComments(!isViewComments);
  };

  return (
    <div className={s.comment}>
      <Image alt={'avatarMock'} className={s.commentUserPhoto} src={avatarMock} />

      <div className={s.commentBody}>
        <div className={s.commentTextBlock}>
          <div className={s.commentText}>
            <Typography as={'span'} className={s.commentUserName} variant={'bold_text_14'}>
              {/*userName*/}
              URLProfile
            </Typography>{' '}
            <Typography as={'span'} variant={'regular_text_14'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Typography>
          </div>
          <div>{children}</div>
        </div>
        <div className={s.commentInfo}>
          <Typography className={s.timeAgo} variant={'small_text'}>
            {/*реализовать логику min hour day days*/}
            22 min ago
          </Typography>
          {/*если авторизовани-показать*/}
          <Typography className={s.likeCounts} variant={'semi_bold_small_text'}>
            Like : 1
          </Typography>
          <Typography as={'button'} className={s.answerBtn} variant={'semi_bold_small_text'}>
            Answer
          </Typography>
        </div>

        <div className={s.answers}>
          {isViewComments ? (
            <>
              <Button className={s.viewAnswerBtn} onClick={setIsViewCommentsHandler} variant={'text'}>
                <div className={s.rectangle}></div>
                Hide Answers
              </Button>
              <Typography variant={'small_text'}>сделать комметарий</Typography>
            </>
          ) : (
            <Button className={s.viewAnswerBtn} onClick={setIsViewCommentsHandler} variant={'text'}>
              <div className={s.rectangle}></div>
              View Answers (кол-во)
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
