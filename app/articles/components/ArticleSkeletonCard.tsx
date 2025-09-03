"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleSkeletonCard() {
 return (
  <Card className='overflow-hidden shadow-lg flex flex-col h-full'>
   {/* Gambar */}
   <Skeleton className='w-full h-56' />

   <div className='p-4 flex flex-col gap-2'>
    {/* Badge */}
    <Skeleton className='h-5 w-24 rounded-full' />

    {/* Tanggal & Komentar */}
    <Skeleton className='h-4 w-32' />

    {/* Judul */}
    <Skeleton className='h-6 w-3/4' />

    {/* Deskripsi */}
    <Skeleton className='h-4 w-full' />
    <Skeleton className='h-4 w-5/6' />
    <Skeleton className='h-4 w-4/6' />
   </div>

   {/* Footer */}
   <div className='flex justify-between items-center px-4 pb-4 mt-auto'>
    <div className='flex items-center gap-2'>
     <Skeleton className='h-10 w-10 rounded-full' />
     <Skeleton className='h-4 w-16' />
    </div>
    <div className='flex gap-2'>
     <Skeleton className='h-8 w-8 rounded-md' />
     <Skeleton className='h-8 w-8 rounded-md' />
     <Skeleton className='h-8 w-8 rounded-md' />
    </div>
   </div>
  </Card>
 );
}
