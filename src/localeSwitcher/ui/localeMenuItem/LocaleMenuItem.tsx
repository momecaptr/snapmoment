/*import Typography from '@/components/ui/Typography/Typography';*/
import { Typography } from '@/components/ui/typography/Typography';
import { FullName } from '@/localeSwitcher/lib/hooks/useLangData';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from '@/localeSwitcher/ui/LocaleSwitcher.module.scss';

type DropdownMenuItemProps = {
  fullName: FullName;
  icon: string;
  isoCode: string;
  onSelect: () => void;
};

const LocaleMenuItem = (props: DropdownMenuItemProps) => {
  const { fullName, icon, onSelect } = props;

  return (
    <DropdownMenu.Item asChild>
      <div
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSelect();
          }
        }}
        className={s.boxContent}
        onClick={onSelect}
      >
        <div className={s.dropItemFlag}>{icon}</div>
        <Typography className={s.dropdownText} variant={'medium_text_14'}>
          {fullName}
        </Typography>
      </div>
    </DropdownMenu.Item>
  );
};

export default LocaleMenuItem;
