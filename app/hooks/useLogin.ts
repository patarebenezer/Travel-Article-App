import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/services/authService";
import { LoginFormData } from "@/app/schemas/loginSchema";
import { AuthResponse } from "@/app/types/auth";

export function useLogin() {
 const router = useRouter();

 return useMutation<AuthResponse, Error, LoginFormData>({
  mutationFn: loginUser,
  onSuccess: (data) => {
   localStorage.setItem("token", data.jwt);
   localStorage.setItem("user", JSON.stringify(data.user));
   router.push("/");
  },
  onError: () => {
   console.error("Login failed");
  },
 });
}
