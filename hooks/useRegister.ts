import { useMutation } from "@tanstack/react-query";
import { registerUser, AuthResponse } from "@/services/authService";
import { RegisterFormData } from "@/schemas/registerSchema";
import { useRouter } from "next/navigation";

export function useRegister() {
 const router = useRouter();

 return useMutation<AuthResponse, Error, RegisterFormData>({
  mutationFn: registerUser,
  onSuccess: (data) => {
   localStorage.setItem("token", data.jwt);
   localStorage.setItem("user", JSON.stringify(data.user));
   router.push("/");
  },
  onError: () => {
   console.error("Registration failed");
  },
 });
}
