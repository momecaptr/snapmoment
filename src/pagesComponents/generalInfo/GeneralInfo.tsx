import React, { useState } from 'react';

import { GeneralInfoNavigation } from '@/features';
import { useMeQuery } from '@/shared/api';
import { ModalKey, useModal } from '@/shared/lib';
import { Wrapper } from '@/shared/ui';
import { AddProfilePhotoModal, GeneralInfoForms } from '@/widget';
import { AccountManagement } from '@/widget/';
import { Devices } from '@/widget/';
import { MyPayments } from '@/widget/';

import s from './GeneralInfo.module.scss';

export const GeneralInfo = () => {
  const me = useMeQuery();
  const { isOpen, setOpen } = useModal(ModalKey.ChangePhoto);
  const [activeSection, setActiveSection] = useState('General information');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Devices':
        return <Devices />;
      case 'Account Management':
        return <AccountManagement />;
      case 'My payments':
        return <MyPayments />;
      case 'General information':
      default:
        return <GeneralInfoForms isOpen={isOpen} setOpen={setOpen} />;
    }
  };

  return (
    <div>
      <AddProfilePhotoModal openViewPhoto={isOpen} setOpenViewPhoto={setOpen} />
      <Wrapper>
        <GeneralInfoNavigation setActiveSection={setActiveSection} />
        <div className={renderActiveSection().type.name === 'GeneralInfoForms' ? s.photoAndInfo : ''}>
          {renderActiveSection()}
        </div>
      </Wrapper>
    </div>
  );
};
