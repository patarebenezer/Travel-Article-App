"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
 const router = useRouter();
 const [user, setUser] = useState<{ username: string } | null>(null);

 useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
   setUser(JSON.parse(userData));
  }
 }, []);

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  router.push("/login");
 };

 return (
  <nav className='bg-white shadow p-4 flex justify-between items-center'>
   <h1
    className='text-xl font-bold cursor-pointer'
    onClick={() => router.push("/")}
   >
    Travel Article
   </h1>
   <div>
    {user && (
     <div className='flex items-center gap-4'>
      <span className='font-semibold'>Hi, {user.username}</span>
      <Button
       onClick={handleLogout}
       variant='destructive'
       size='icon'
       aria-label='Logout'
      >
       <LogOut className='h-4 w-4' />
      </Button>
     </div>
    )}
   </div>
  </nav>
 );
}
