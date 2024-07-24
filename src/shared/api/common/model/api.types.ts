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

export interface GoogleOAuthQuery {
  code: string;
}

export interface RegistrationConfirmationQuery {
  confirmationCode: string;
}

export interface QueryError {
  error: string;
  messages: Message[];
  statusCode: number;
}

export interface Message {
  field: string;
  message: string;
}
