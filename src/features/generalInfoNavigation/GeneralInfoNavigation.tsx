import React from 'react';

import { Button } from '@/shared/ui';

import s from './GeneralInfoNavigation.module.scss';

type GeneralInfoNavigationProps = {
  setActiveSection: (section: string) => void;
};

export const GeneralInfoNavigation: React.FC<GeneralInfoNavigationProps> = ({ setActiveSection }) => {
  const [activeLink, setActiveLink] = React.useState('General information');

  const handleClick = (link: string) => {
    setActiveLink(link);
    setActiveSection(link);
  };

  const links = ['General information', 'Devices', 'Account Management', 'My payments'];

  return (
    <div className={s.wrapper}>
      <div className={s.boxAllLine}>
        {links.map((link, index) => (
          <div className={s.boxLinkLine} key={index}>
            <Button
              className={`${s.link} ${activeLink === link ? s.activeLink : ''}`}
              onClick={() => handleClick(link)}
              variant={'text'}
            >
              {link}
            </Button>
            <span className={`${s.line} ${activeLink === link ? s.activeLine : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
