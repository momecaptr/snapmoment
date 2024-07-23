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
