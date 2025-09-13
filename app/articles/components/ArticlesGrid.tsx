/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import ArticleCard from "@/app/articles/components/ArticleCard";

export default function ArticlesGrid({
 data,
 onEditArticle,
 onDeleteArticle,
}: {
 data: any;
 onEditArticle: (article: any) => void;
 onDeleteArticle: (article: any) => void;
}) {
 const router = useRouter();

 const handleDetail = (documentId: string) => {
  router.push(`/articles/${documentId}`);
 };

 const articles = data?.pages.flatMap((page: any) => page.data) || [];

 if (articles.length === 0) {
  return (
   <p className='text-center mt-10 text-gray-500'>
    No articles found. Try adjusting your search or filters.
   </p>
  );
 }

 return (
  <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
   {articles.map((article: any) => (
    <ArticleCard
     key={article.id}
     article={article}
     onDetail={() => handleDetail(article.documentId)}
     onEdit={() => onEditArticle(article)}
     onDelete={() => onDeleteArticle(article.documentId)}
    />
   ))}
  </div>
 );
}
