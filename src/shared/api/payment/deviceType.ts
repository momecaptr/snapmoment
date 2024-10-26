export interface DeviceType {
  current: Current;
  others: Other[];
}

export interface Current {
  deviceId: number;
  ip: string;
  lastActive: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  osName: string;
  osVersion: string;
  deviceType: string;
}

export interface Other {
  deviceId: number;
  ip: string;
  lastActive: string;
  browserName: string;
  browserVersion: string;
  deviceName: string;
  osName: string;
  osVersion: string;
  deviceType: string;
}

export interface DeviceTypeArgs {
  deviceId: number;
}
