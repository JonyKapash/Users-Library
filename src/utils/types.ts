export interface UsersStore {
  users: Array<User>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
}
