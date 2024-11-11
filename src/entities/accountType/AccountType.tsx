import React from 'react';

import { accountVariants } from '@/shared/lib';
import { Card, Radio, Typography } from '@/shared/ui';

type AccountTypeSectionProps = {
  classForCard: string;
  classForRadioRoot: string;
  classForTitle: string;
  handleOpenBusinessMenu: () => void;
  handleSwitchPersonal: () => void;
  isRemoteEqualsBusinessAccount: boolean;
  localAccountVariant: string | undefined;
};
export const AccountType = (props: AccountTypeSectionProps) => {
  const {
    classForCard,
    classForRadioRoot,
    classForTitle,
    handleOpenBusinessMenu,
    handleSwitchPersonal,
    isRemoteEqualsBusinessAccount,
    localAccountVariant
  } = props;

  return (
    <>
      <Typography className={classForTitle} variant={'bold_text_16'}>
        {'Account type:'}
      </Typography>
      <Card className={classForCard}>
        <Radio.Root className={classForRadioRoot}>
          <Radio.Item
            checked={localAccountVariant === accountVariants.personal}
            disabled={isRemoteEqualsBusinessAccount}
            onClick={handleSwitchPersonal}
            value={accountVariants.personal}
          >
            <Typography variant={'regular_text_14'}>{accountVariants.personal}</Typography>
          </Radio.Item>
          <Radio.Item
            checked={localAccountVariant === accountVariants.business}
            onClick={handleOpenBusinessMenu}
            value={accountVariants.business}
          >
            <Typography variant={'regular_text_14'}>{accountVariants.business}</Typography>
          </Radio.Item>
        </Radio.Root>
      </Card>
    </>
  );
};
