"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardContent,
 CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/loginSchema";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  mode: "onChange",
 });

 const loginMutation = useLogin();

 const onSubmit = (data: LoginFormData) => {
  loginMutation.mutate(data);
 };

 // ✅ Redirect if already logged in
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
   window.location.replace("/");
  }
 }, []);

 return (
  <>
   <Navbar />
   <div className='flex justify-center items-center h-screen bg-gray-100'>
    <Card className='w-[400px] py-6'>
     <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Sign in to your account to continue</CardDescription>
     </CardHeader>
     <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='space-y-4'>
       <div>
        <Input type='email' placeholder='Email' {...register("identifier")} />
        {errors.identifier && (
         <p className='text-red-500 text-sm mt-1'>
          {errors.identifier.message}
         </p>
        )}
       </div>
       <div>
        <Input
         type='password'
         placeholder='Password'
         {...register("password")}
        />
        {errors.password && (
         <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
       </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
       <Button
        type='submit'
        className='w-full'
        disabled={loginMutation.isPending}
       >
        {loginMutation.isPending ? "Loading..." : "Login"}
       </Button>
       {loginMutation.isError && (
        <p className='text-red-500 text-sm'>Login failed. Please try again.</p>
       )}
       <p className='text-sm text-gray-600 mt-3'>
        Don&apos;t have an account?{" "}
        <Link href='/register' className='text-blue-600 hover:underline'>
         Register here
        </Link>
       </p>
      </CardFooter>
     </form>
    </Card>
   </div>
  </>
 );
}
