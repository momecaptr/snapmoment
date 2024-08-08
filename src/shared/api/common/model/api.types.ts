export interface GoogleOAuthResponse {
  accessToken: string;
  email: string;
}

export interface RegistrationArgs {
  baseUrl?: string;
  email: string;
  password: string;
  userName: string;
}

export interface LoginArgs extends Omit<RegistrationArgs, 'baseUrl' | 'userName'> {}

export interface LoginResponse {
  accessToken: string;
}

export interface GoogleOAuthArgs {
  code: string;
}

export interface CheckRecoveryCodeResponse {
  email: string;
}

export interface CheckRecoveryCodeArgs {
  recoveryCode: string;
}

export interface RegistrationConfirmationArgs {
  confirmationCode: string;
}

export interface BaseResponseType {
  error: string;
  messages: Message[];
  statusCode: number;
}

export interface Message {
  field: string;
  message: string;
}

export interface ResendEmailArgs {
  baseUrl: string;
  email: string;
}

export type RecoveryPasswordArgs = {
  baseUrl?: string;
  email: string;
  recaptcha: string;
};

export interface CreateNewPasswordArgs {
  newPassword: string;
  recoveryCode: string;
}

export interface MeResponse {
  email: string;
  isBlocked: boolean;
  userId: number;
  userName: string;
}
