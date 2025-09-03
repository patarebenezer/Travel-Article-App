import axios from "axios";
import { LoginFormData } from "@/schemas/loginSchema";
import { RegisterFormData } from "@/schemas/registerSchema";

export type AuthResponse = {
 jwt: string;
 user: {
  id: number;
  username: string;
  email: string;
 };
};

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
 const response = await axios.post<AuthResponse>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local`,
  data,
  { headers: { "Content-Type": "application/json" } }
 );
 return response.data;
};

export const registerUser = async (
 data: RegisterFormData
): Promise<AuthResponse> => {
 const response = await axios.post<AuthResponse>(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local/register`,
  data,
  { headers: { "Content-Type": "application/json" } }
 );
 return response.data;
};
