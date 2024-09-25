// @flow
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import PersonOutline from '@/../public/assets/components/PersonOutline';
import { Input, TextArea, Typography } from '@/shared/ui';

import s from './PublicationSection.module.scss';

type Props = {
  className?: string;
};
export const PublicationSection = (props: Props) => {
  const { className } = props;
  const [textArea, setTextArea] = useState('');
  // todo Сделать запрос за данными о пользователе (Me запрос, полагаю, где должны быть userName, avatar, может email

  // Здесь и отправлять запрос на публикацию
  // todo Валидацию zod сделать
  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setTextArea(value);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={s.container}>
      <div className={s.upperSection}>
        <div className={s.userData}>
          {/*{profileData?.avatars[0] ? (*/}
          {/*  <Image alt={'postImg'} className={s.avatar} src={profileData.avatars[0].url} />*/}
          {/*) : (*/}
          {/*  <PersonOutline className={s.avatar} />*/}
          {/*)}*/}
          <PersonOutline className={s.avatar} />
          {/*<Typography variant={'h3'}>{profileData?.userName}</Typography>*/}
          <Typography variant={'h3'}>ИМЯ ПОЛЬЗОВАТЕЛЯ</Typography>
        </div>

        <div className={s.textAreaWrapper}>
          <TextArea
            classNameTextAreaSize={s.textAreaSize}
            counterValue={`${textArea.length}/500`}
            label={'Add publication descriptions'}
            maxLength={500}
            onChange={handleChangeText}
            placeholder={'Text-area'}
            value={textArea}
            resize
          />
        </div>
      </div>
      <div className={s.locationBox}>
        <Input
          label={'Add location'}
          style={{ background: 'transparent', border: '1px solid #4C4C4C' }}
          type={'location'}
        />
      </div>
    </div>
  );
};
