export interface UsersStore {
  users: Array<User>;
  isGetUsersInProgress: boolean;
  error: string | null | undefined;
}

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    country: string;
  };
  id: string;
}
