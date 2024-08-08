import * as React from 'react';
import { ReactNode, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

import avatarMock from '@/../public/avatar-mock.jpg';
import { Answer } from '@/entities';
import { useGetAnswersWithPaginationQuery } from '@/shared/api';
import { CommentsViewModel } from '@/shared/api/public/publicTypes';
import { Button, Typography } from '@/shared/ui';
import Image from 'next/image';

import s from './Comment.module.scss';

type Props = {
  children?: ReactNode;
  comment: CommentsViewModel;
  isAuth: boolean;
};

export const Comment = ({ children, comment, isAuth }: Props) => {
  const [isViewComments, setIsViewComments] = useState(false);

  const { data: answers, isFetching } = useGetAnswersWithPaginationQuery({
    commentId: comment.id,
    postId: comment.postId
  });

  const setIsViewCommentsHandler = () => {
    setIsViewComments(!isViewComments);
  };

  return (
    <div className={s.comment}>
      <Image
        alt={'avatarMock'}
        className={s.commentUserPhoto}
        height={100}
        src={comment.from.avatars[0]?.url || avatarMock}
        width={100}
      />

      <div className={s.commentBody}>
        <div className={s.commentTextBlock}>
          <div className={s.commentText}>
            <Typography as={'span'} className={s.commentUserName} variant={'bold_text_14'}>
              {comment.from.username}
            </Typography>{' '}
            <Typography as={'span'} variant={'regular_text_14'}>
              {comment.content}
            </Typography>
          </div>
          {children}
        </div>
        <div className={s.commentInfo}>
          <Typography className={s.timeAgo} variant={'small_text'}>
            <ReactTimeAgo date={new Date(comment.createdAt)} />
          </Typography>
          {isAuth && (
            <>
              <Typography className={s.likeCounts} variant={'semi_bold_small_text'}>
                Like : {comment.likeCount}
              </Typography>
              <Typography as={'button'} className={s.answerBtn} variant={'semi_bold_small_text'}>
                Answer
              </Typography>
            </>
          )}
        </div>

        {comment.answerCount > 1 && (
          <div className={s.answers}>
            {isViewComments ? (
              <>
                <Button className={s.viewAnswerBtn} onClick={setIsViewCommentsHandler} variant={'text'}>
                  <div className={s.rectangle}></div>
                  Hide Answers
                </Button>

                {!isFetching &&
                  answers?.items?.map((answer) => (
                    <Answer answer={answer} isAuth={isAuth} key={answer.id}>
                      {/*{isAuth && <ToggleLike />}*/}
                    </Answer>
                  ))}
              </>
            ) : (
              <Button className={s.viewAnswerBtn} onClick={setIsViewCommentsHandler} variant={'text'}>
                <div className={s.rectangle}></div>
                View Answers ({comment.answerCount})
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
