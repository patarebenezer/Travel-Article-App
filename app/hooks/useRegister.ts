import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/services/authService";
import { RegisterFormData } from "@/app/schemas/registerSchema";
import { AuthResponse } from "@/app/types/auth";

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
