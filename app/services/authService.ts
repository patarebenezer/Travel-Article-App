import { api } from "@/app/lib/api";
import { AuthResponse } from "@/app/types/auth";
import { LoginFormData } from "@/app/schemas/loginSchema";
import { RegisterFormData } from "@/app/schemas/registerSchema";

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
