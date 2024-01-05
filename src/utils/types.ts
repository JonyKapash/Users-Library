export interface UsersStore {
  users: Array<User>;
  isGetUsersInProgress: boolean;
  error: string | null | undefined;
}

export interface User {
  title: string;
  first: string;
  last: string;
  email: string;
  picture: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: number;
  id: string;
}
