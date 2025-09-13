"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useRegister } from "@/app/hooks/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { RegisterFormData, registerSchema } from "@/app/schemas/registerSchema";

export default function RegisterPage() {
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
  mode: "onChange",
 });

 const registerMutation = useRegister();

 const onSubmit = (data: RegisterFormData) => {
  registerMutation.mutate(data);
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
      <CardTitle>Register</CardTitle>
      <CardDescription>
       Create a new account to start using the app
      </CardDescription>
     </CardHeader>
     <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className='space-y-4'>
       <div>
        <Input type='text' placeholder='Username' {...register("username")} />
        {errors.username && (
         <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
        )}
       </div>
       <div>
        <Input type='email' placeholder='Email' {...register("email")} />
        {errors.email && (
         <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
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
        disabled={registerMutation.isPending}
       >
        {registerMutation.isPending ? "Loading..." : "Register"}
       </Button>
       {registerMutation.isError && (
        <p className='text-red-500 text-sm'>
         Registration failed. Please try again.
        </p>
       )}
       <p className='text-sm text-gray-600 mt-3'>
        Already have an account?{" "}
        <Link href='/login' className='text-blue-600 hover:underline'>
         Login here
        </Link>
       </p>
      </CardFooter>
     </form>
    </Card>
   </div>
  </>
 );
}
