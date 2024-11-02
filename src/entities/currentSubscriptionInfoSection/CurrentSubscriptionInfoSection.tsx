import React from 'react';

import { useGetCurrentPaymentSubscriptionQuery } from '@/shared/api/device/paymentApi';
import { getNormalDateFormat } from '@/shared/lib';
import { Card, Typography } from '@/shared/ui';

type Props = {
  classForCard: string;
  classForText: string;
  classForTitle: string;
};

export const CurrentSubscriptionInfoSection = (props: Props) => {
  const { classForCard, classForText, classForTitle } = props;
  const { data, isLoading } = useGetCurrentPaymentSubscriptionQuery();

  const { formattedDate, formattedDateEnd } = getNormalDateFormat(
    data?.data[0] ?? { dateOfPayment: '', endDateOfSubscription: '' }
  );

  return (
    <>
      <Typography className={classForTitle} variant={'bold_text_16'}>
        {'Current Subscription:'}
      </Typography>
      <Card className={classForCard}>
        <div>
          <Typography className={classForText} variant={'regular_text_14'}>
            {'Expire at'}
          </Typography>
          <Typography variant={'medium_text_14'}>{formattedDate}</Typography>
        </div>
        <div>
          <Typography className={classForText} variant={'regular_text_14'}>
            {'Next payment'}
          </Typography>
          <Typography variant={'medium_text_14'}>{formattedDateEnd}</Typography>
        </div>
      </Card>
    </>
  );
};
