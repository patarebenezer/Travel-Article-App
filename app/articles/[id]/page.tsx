"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useArticleDetail } from "@/app/hooks/useArticleDetail";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/components/Navbar";
import ShareButtons from "@/app/articles/components/ShareButtons";
import ArticleDetailSkeleton from "@/app/articles/components/ArticleDetailSkeleton";

export default function ArticleDetailPage() {
 const { id } = useParams();
 const router = useRouter();
 const [showFull, setShowFull] = useState(false);

 const { data: article, isLoading, isError } = useArticleDetail(id as string);

 if (isLoading) return <ArticleDetailSkeleton />;
 if (isError || !article)
  return <p className='text-center mt-10 text-red-500'>Gagal memuat artikel</p>;

 const shareUrl = typeof window !== "undefined" ? window.location.href : "";

 return (
  <>
   <Navbar />
   <div className='max-w-4xl mx-auto p-4'>
    {/* Tombol Kembali */}
    <Button
     variant='outline'
     onClick={() => router.back()}
     className='mb-4 flex items-center gap-2'
    >
     <ArrowLeft className='h-4 w-4' /> Back
    </Button>

    {/* Cover Image */}
    <div className='w-full h-80 relative rounded-lg overflow-hidden shadow-md mb-6'>
     <Image
      src={article.cover_image_url}
      alt={article.title}
      fill
      style={{ objectFit: "cover" }}
     />
    </div>

    {/* Title & Meta */}
    <h1 className='text-3xl font-bold mb-2'>{article.title}</h1>
    <p className='text-gray-500 mb-4'>
     {new Date(article.createdAt).toLocaleDateString()}
    </p>

    {/* Description */}
    <div className='text-lg text-gray-700 mb-6'>
     {showFull ? article.description : article.description.slice(0, 500)}
     {article.description.length > 500 && (
      <Button
       variant='link'
       onClick={() => setShowFull(!showFull)}
       className='text-blue-600 ml-2 p-0 h-auto'
      >
       {showFull ? "Tampilkan lebih sedikit" : "... Lihat selengkapnya"}
      </Button>
     )}
    </div>

    {/* Share Buttons */}
    <ShareButtons url={shareUrl} title={article.title} />
   </div>
  </>
 );
}
