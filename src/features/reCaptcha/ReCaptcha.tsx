import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  control: Control<T>;
};
export const ReCaptcha = <T extends FieldValues>({ control }: Props<T>) => {
  return (
    <Controller
      render={({ field }) => (
        <div>
          <ReCAPTCHA
            onChange={(value) => {
              field.onChange(value);
            }}
            sitekey={`${process.env.NEXT_PUBLIC_SITE_KEY}`}
            theme={'dark'}
          />
        </div>
      )}
      control={control}
      name={'recaptcha' as Path<T>}
    />
  );
};
