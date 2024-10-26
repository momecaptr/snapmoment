export interface DeviceType {
  current: Current;
  others: Other[];
}

export interface Current {
  browserName: string;
  browserVersion: string;
  deviceId: number;
  deviceName: string;
  deviceType: string;
  ip: string;
  lastActive: string;
  osName: string;
  osVersion: string;
}

export interface Other {
  browserName: string;
  browserVersion: string;
  deviceId: number;
  deviceName: string;
  deviceType: string;
  ip: string;
  lastActive: string;
  osName: string;
  osVersion: string;
}

export interface DeviceTypeArgs {
  deviceId: number;
}
