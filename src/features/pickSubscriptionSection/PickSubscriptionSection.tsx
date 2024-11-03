// Feature
import React from 'react';

import { subscriptionVariantsArray, subscriptionsTextOptions } from '@/shared/lib';
import { Card, Radio, Typography } from '@/shared/ui';

type PickSubscriptionSectionProps = {
  classForCard: string;
  classForRadioRoot: string;
  classForTitle: string;
  handlePickSubscriptionType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isRemoteEqualsBusinessAccount: boolean;
};
export const PickSubscriptionSection = (props: PickSubscriptionSectionProps) => {
  const { classForCard, classForRadioRoot, classForTitle, handlePickSubscriptionType, isRemoteEqualsBusinessAccount } =
    props;

  return (
    <>
      {/*<Typography className={s.blockTitle} variant={'bold_text_16'}>*/}
      <Typography className={classForTitle} variant={'bold_text_16'}>
        {isRemoteEqualsBusinessAccount ? 'Change your subscription' : 'Your subscription costs'}
      </Typography>
      {/*<Card className={s.cardBox}>*/}
      <Card className={classForCard}>
        {/*<Radio.Root className={s.radioRoot}>*/}
        <Radio.Root className={classForRadioRoot}>
          {subscriptionVariantsArray.map((variant) => (
            <Radio.Item data-sub={variant} key={variant} onClick={handlePickSubscriptionType} value={variant}>
              <Typography variant={'regular_text_14'}>{subscriptionsTextOptions[variant]}</Typography>
            </Radio.Item>
          ))}
        </Radio.Root>
      </Card>
    </>
  );
};
