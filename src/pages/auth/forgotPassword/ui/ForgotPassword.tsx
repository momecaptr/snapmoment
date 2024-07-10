'use client';

// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';

import { ModalKey, useModal } from '@/common/hooks/useModal';
import { Button } from '@/components/ui/button/Button';
import { Card } from '@/components/ui/card/Card';
import { FormTextfield } from '@/components/ui/forms/FormTextfield';
import { Typography } from '@/components/ui/typography/Typography';
import useForgotPassword from '@/pages/auth/forgotPassword/lib/hooks/useForgotPassword';
import SentEmailModal from '@/pages/auth/forgotPassword/ui/sentEmailModal/SentEmailModal';
import Link from 'next/link';

import s from './ForgotPassword.module.scss';

const ForgotPassword = () => {
  const { control, handleSubmit, isValid, onSubmit } = useForgotPassword();
  const { isOpen, setOpen } = useModal(ModalKey.Success);

  return (
    <>
      <SentEmailModal open={isOpen} setOpen={setOpen} />
      <div className={s.container}>
        <Card>
          <section className={s.content}>
            <Typography as={'h1'} variant={'h1'}>
              Forgot Password
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <FormTextfield
                className={s.formTextfield}
                control={control}
                label={'Email'}
                name={'email'}
                placeholder={'Email'}
              />
              <Typography className={s.information} variant={'regular_text_14'}>
                Enter your email address and we will send you further instructions
              </Typography>

              <Button className={s.signIn} disabled={!isValid} fullWidth>
                Send Link
              </Button>
            </form>

            <Typography as={Link} className={s.backSignIn} href={'/sign-in'} variant={'h3'}>
              Back to Sign In
            </Typography>
            {/*ключ от гугла тестовый */}
            <ReCAPTCHA sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} theme={'dark'} />
          </section>
        </Card>
      </div>{' '}
    </>
  );
};

export default ForgotPassword;
