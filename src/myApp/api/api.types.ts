export interface AuthMeGoogleResponse {
  accessToken: string;
  email: string;
}

export interface RegistrationType {
  // baseUrl: string;
  email: string;
  password: string;
  userName: string;
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
