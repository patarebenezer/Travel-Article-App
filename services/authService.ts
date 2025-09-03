import { api } from "@/lib/api";
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
 const response = await api.post<AuthResponse>("/auth/local", data);
 return response.data;
};

export const registerUser = async (
 data: RegisterFormData
): Promise<AuthResponse> => {
 const response = await api.post<AuthResponse>("/auth/local/register", data);
 return response.data;
};
