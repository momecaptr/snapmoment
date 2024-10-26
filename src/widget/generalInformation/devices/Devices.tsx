import React from 'react';

import { useDeleteTerminateDeviceMutation, useGetDeviceQuery } from '@/shared/api/payment/deviceApi';
import { Button, Typography } from '@/shared/ui';
import OtherDevices from '@/widget/generalInformation/devices/OtherDevices';
import Brave from '@/widget/generalInformation/devices/icon/browserIcon/Brave';
import Chrome from '@/widget/generalInformation/devices/icon/browserIcon/Chrome';
import Edge from '@/widget/generalInformation/devices/icon/browserIcon/Exploer';
import Firefox from '@/widget/generalInformation/devices/icon/browserIcon/FireFox';
import Opera from '@/widget/generalInformation/devices/icon/browserIcon/Opera';
import Safari from '@/widget/generalInformation/devices/icon/browserIcon/Safari';
import Yandex from '@/widget/generalInformation/devices/icon/browserIcon/Yandex';

import s from './Devices.module.scss';

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
