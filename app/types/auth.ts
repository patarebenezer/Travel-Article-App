export type AuthResponse = {
 jwt: string;
 user: {
  id: number;
  username: string;
  email: string;
 };
};
