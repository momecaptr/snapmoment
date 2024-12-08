import React from 'react';

import { useDeleteSessionDeviceMutation, useGetDeviceQuery } from '@/shared/api/payment/deviceApi';
import { DeviceTypeArgs } from '@/shared/api/payment/deviceType';
import { Typography } from '@/shared/ui';

import s from '@/widget/generalInformation/devices/Devices.module.scss';

import Desktop from '../../../../public/assets/components/DescktopIcon';
import LogOut from '../../../../public/assets/components/LogOutIcon';
import Phone from '../../../../public/assets/components/PhoneIcon';

const OtherDevices = () => {
  const { data } = useGetDeviceQuery();
  const [deleteSessionDevice] = useDeleteSessionDeviceMutation();

  const otherDevices = data?.others.map((e) => {
    const date = new Date(e.lastActive);
    const options: any = {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleString('ru-RU', options);

    const handleDeleteSession = () => {
      deleteSessionDevice({ deviceId: e.deviceId } as DeviceTypeArgs);
    };

    console.log('etwtwet', typeof e.deviceId, 'sdfsd', e.deviceId);

    return (
      <div className={s.otherDeviceBox} key={e.deviceId}>
        <div className={s.iconAndDeviceInfo}>
          {e.osName === 'Windows' || e.osName === 'MacOS' ? <Desktop /> : <Phone />}

          <div className={s.device}>
            <div className={s.otherDeviceName}>{e.browserName}</div>
            <div className={s.deviceId}>ip: {e.ip}</div>
            <div className={s.deviceId}>Last visit: {formattedDate}</div>
          </div>
        </div>

        <div className={s.logOutBox} onClick={handleDeleteSession}>
          <LogOut />
          <Typography>Log Out</Typography>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Typography className={s.titleCurrentDevice} variant={'h3'}>
        Active sessions
      </Typography>
      {otherDevices}
    </div>
  );
};

export default OtherDevices;
