import React from 'react';

import { useDeleteTerminateDeviceMutation, useGetDeviceQuery } from '@/shared/api/payment/deviceApi';
import { Button, Typography } from '@/shared/ui';
import OtherDevices from '@/widget/generalInformation/devices/OtherDevices';

import s from './Devices.module.scss';

import Brave from '../../../../public/assets/components/BraveBrowserIcon';
import Chrome from '../../../../public/assets/components/ChromeBrowserIcon';
import Edge from '../../../../public/assets/components/ExploerBrowserIcon';
import Firefox from '../../../../public/assets/components/FireFoxBrowserIcon';
import Opera from '../../../../public/assets/components/OperaBrowserIcon';
import Safari from '../../../../public/assets/components/SafariBrowserIcon';
import Yandex from '../../../../public/assets/components/YandexBrowserIcon';

export const Devices = () => {
  const { data } = useGetDeviceQuery();
  const [deleteTerminateDevice] = useDeleteTerminateDeviceMutation();

  let browserName: React.ReactNode;

  switch (data?.current.browserName) {
    case 'Chrome':
      browserName = <Chrome />;
      break;
    case 'Firefox':
      browserName = <Firefox />;
      break;
    case 'Safari':
      browserName = <Safari />;
      break;
    case 'Edge':
      browserName = <Edge />;
      break;
    case 'Yandex':
      browserName = <Yandex />;
      break;
    case 'Opera':
      browserName = <Opera />;
      break;
    case 'Brave':
      browserName = <Brave />;
      break;
    default:
      browserName = <Chrome />;
      break;
  }

  return (
    <>
      <div>
        <Typography className={s.titleCurrentDevice} variant={'h3'}>
          Current device
        </Typography>
        <div className={s.deviceBox}>
          <div>{browserName}</div>
          {data && (
            <div className={s.device}>
              <div className={s.deviceName}>{data.current.browserName}</div>
              <div className={s.deviceId}>{data.current.ip}</div>
            </div>
          )}
        </div>
      </div>
      <div className={s.buttonBox}>
        <Button onClick={() => deleteTerminateDevice()} variant={'outlined'}>
          Terminate all other session
        </Button>
      </div>

      <OtherDevices />
    </>
  );
};
