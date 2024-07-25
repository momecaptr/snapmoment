export interface GetUserProfile {
  aboutMe?: any;
  city?: any;
  dateOfBirth?: any;
  firstName?: any;
  lastName?: any;
  userName: string;
}

export interface UpdateUserProfileArgs {
  aboutMe?: string;
  city?: string;
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  userName: string;
}
