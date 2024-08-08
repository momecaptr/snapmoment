export interface PersonalInformationArgs {
  aboutMe: string;
  city: string;
  country: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  region: string;
  userName: string;
}

export interface GetPersonalInformationUserResponse {
  aboutMe: string;
  avatars: Avatar[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  firstName: string;
  id: number;
  lastName: string;
  region: string;
  userName: string;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}
