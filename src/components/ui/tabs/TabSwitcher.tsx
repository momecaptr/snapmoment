import Typography from '@/components/ui/typography/Typography';
import * as Tabs from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

import s from './tabSwitcher.module.scss';

export type Tab = {
  disabled?: boolean;
  locale: string;
  text: string;
  value: string;
};

type Props = {
  className?: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
  value: string;
};

export const TabSwitcher = ({ className, onValueChange, tabs, value }: Props) => {
  // const { t } = useTranslation()

  return (
    <div className={clsx(s.container, className)}>
      <Tabs.Root activationMode={'manual'} className={s.root} onValueChange={onValueChange} value={value}>
        <Tabs.List className={s.tabList}>
          {tabs.map((tab) => (
            <Tabs.Trigger
              className={clsx(s.trigger)}
              disabled={tab.disabled}
              key={tab.value}
              value={tab.value}
              // value={tab.locale}
            >
              <Typography className={s.tabName} variant={'subtitle2'}>
                {tab.value}
              </Typography>
              {/*<Typography variant={'subtitle2'}>{t(`${tab.locale}`)}</Typography>*/}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};
