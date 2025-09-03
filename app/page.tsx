"use client";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticlesPage from "./articles/page";

export default function Home() {
 const router = useRouter();

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
   router.push("/login");
  }
 }, [router]);
 return (
  <>
   <Navbar />
   <div className='w-10/12 mx-auto mt-4'>
    <ArticlesPage />
   </div>
  </>
 );
}
