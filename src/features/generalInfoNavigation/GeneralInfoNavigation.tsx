import React, { useState } from 'react';

import Link from 'next/link';

import s from './GeneralInfoNavigation.module.scss';

const GeneralInfoNavigation = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  const links = ['General information', 'Devices', 'Account Management', 'My payments'];

  return (
    <div className={s.wrapper}>
      <div className={s.boxAllLine}>
        {links.map((link, index) => (
          <div className={s.boxLinkLine} key={index}>
            <Link
              className={`${s.link} ${activeLink === link ? s.activeLink : ''}`}
              href={'/'}
              onClick={() => handleClick(link)}
            >
              {link}
            </Link>
            <span className={`${s.line} ${activeLink === link ? s.activeLine : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfoNavigation;
