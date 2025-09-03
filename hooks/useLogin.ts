import { useMutation } from "@tanstack/react-query";
import { loginUser, AuthResponse } from "@/services/authService";
import { LoginFormData } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";

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
