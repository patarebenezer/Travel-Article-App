import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetailSkeleton() {
 return (
  <div className='flex flex-col space-y-3 max-w-4xl mx-auto p-4'>
   <Skeleton className='h-[320px] w-full rounded-xl' />
   <div className='space-y-2 mt-4'>
    <Skeleton className='h-8 w-3/4' />
    <Skeleton className='h-4 w-1/3' />
   </div>
   <div className='space-y-2 mt-4'>
    <Skeleton className='h-4 w-full' />
    <Skeleton className='h-4 w-5/6' />
    <Skeleton className='h-4 w-2/3' />
   </div>
  </div>
 );
}
