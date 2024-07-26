export interface AuthMeGoogleResponse {
  accessToken: string;
  email: string;
}

export interface RegistrationType {
  baseUrl?: string;
  email: string;
  password: string;
  userName: string;
}

export interface LoginQuery extends Omit<RegistrationType, 'baseUrl' | 'userName'> {}

export interface GoogleOAuthQuery {
  code: string;
}

export interface RegistrationConfirmationQuery {
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

export type RecoveryPasswordResponse = {
  baseUrl?: string;
  email: string;
  recaptcha: string;
};
