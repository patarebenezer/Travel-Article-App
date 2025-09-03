"use client";

import { Article } from "@/lib/types";
import Image from "next/image";
import {
 Card,
 CardHeader,
 CardContent,
 CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Pencil, Trash } from "lucide-react";

interface ArticleCardProps {
 article: {
  id: number;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  user: { username: string };
  category: { name: string };
  comments: { id: number; content: string }[];
 };
 onDetail: (id: number) => void;
 onEdit: (article: Article) => void;
 onDelete: (id: number) => void;
}

const isValidUrl = (url: string): boolean => {
 try {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol === "https:";
 } catch (_) {
  return false;
 }
};

export default function ArticleCard({
 article,
 onDetail,
 onEdit,
 onDelete,
}: ArticleCardProps) {
 const imageUrl =
  article.cover_image_url && isValidUrl(article.cover_image_url)
   ? article.cover_image_url
   : "/images/default-image.jpg";

 return (
  <Card className='overflow-hidden shadow-lg flex flex-col h-full'>
   {/* Gambar */}
   <div
    className='w-full h-56 relative cursor-pointer'
    onClick={() => onDetail(article.id)}
   >
    <Image src={imageUrl} alt={article.title} fill className='object-cover' />
   </div>

   <CardHeader>
    <Badge className='w-fit'>{article.category?.name ?? "Uncategorized"}</Badge>
    <p className='text-sm text-gray-500'>
     {new Date(article.createdAt).toLocaleDateString()} •{" "}
     {article.comments?.length} comments
    </p>
    <h2 className='text-xl font-semibold capitalize'>{article.title}</h2>
   </CardHeader>

   <CardContent className='flex-grow'>
    <p className='text-gray-700 line-clamp-3'>{article.description}</p>
   </CardContent>

   <CardFooter className='flex justify-between items-center mt-auto'>
    {/* Kiri: Avatar + Username */}
    <div className='flex items-center gap-2'>
     <Avatar>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
     </Avatar>
     <span className='font-semibold'>{article.user?.username}</span>
    </div>

    {/* Kanan: Icon Buttons */}
    <div className='flex gap-1'>
     <Button
      variant='ghost'
      size='icon'
      onClick={() => onDetail(article.id)}
      title='View Details'
     >
      <Eye className='h-4 w-4' />
     </Button>

     <Button
      variant='ghost'
      size='icon'
      onClick={() => onEdit(article)}
      title='Edit'
     >
      <Pencil className='h-4 w-4 text-yellow-600' />
     </Button>

     <Button
      variant='ghost'
      size='icon'
      onClick={() => onDelete(article.id)}
      title='Delete'
     >
      <Trash className='h-4 w-4 text-red-600' />
     </Button>
    </div>
   </CardFooter>
  </Card>
 );
}
