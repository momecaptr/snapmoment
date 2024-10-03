import React from 'react';

import { Button } from '@/shared/ui';

import s from './GeneralInfoNavigation.module.scss';

type GeneralInfoNavigationProps = {
  setActiveSection: (section: string) => void;
};
const links = ['General information', 'Devices', 'Account Management', 'My payments'];

export const GeneralInfoNavigation: React.FC<GeneralInfoNavigationProps> = ({ setActiveSection }) => {
  const [activeLink, setActiveLink] = React.useState('General information');

  // ! Рефактор от Шуляка -- вынос в отдельную функцию обеспечит оптимизацию. Каждый элемент от map будет ссылаться на эту функцию, а на создавать новую функцию для каждого элемента.
  // const handleClick = (link: string) => {
  //   setActiveLink(link);
  //   setActiveSection(link);
  // };

  const handleClick = (link: string) => () => {
    setActiveLink(link);
    setActiveSection(link);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.boxAllLine}>
        {links.map((link, index) => (
          <div className={s.boxLinkLine} key={index}>
            <Button
              className={`${s.link} ${activeLink === link ? s.activeLink : ''}`}
              // onClick={() =>handleClick(link)}
              onClick={handleClick(link)}
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
