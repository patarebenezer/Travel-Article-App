/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import ArticleCard from "./ArticleCard";

export default function ArticlesGrid({
 data,
 onEditArticle,
 onDeleteArticle,
}: {
 data: any;
 onEditArticle: (article: any) => void;
 onDeleteArticle: (id: number) => void;
}) {
 const router = useRouter();

 const handleDetail = (documentId: string) => {
  router.push(`/articles/${documentId}`);
 };

 return (
  <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
   {data?.pages.flatMap((page: any) =>
    page.data.map((article: any) => (
     <ArticleCard
      key={article.id}
      article={article}
      onDetail={() => handleDetail(article.documentId)}
      onEdit={() => onEditArticle(article)}
      onDelete={() => onDeleteArticle(article.id)}
     />
    ))
   )}
  </div>
 );
}
