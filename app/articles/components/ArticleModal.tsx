"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

const articleSchema = z.object({
 title: z.string().min(3, "Title minimal 3 karakter"),
 description: z.string().min(10, "Deskripsi minimal 10 karakter"),
 cover_image_url: z.string().url("URL gambar tidak valid"),
 category: z.number().min(1, "Pilih kategori"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleModalProps {
 show: boolean;
 onClose: () => void;
 onSubmit: (data: ArticleFormData) => void;
 initialData?: ArticleFormData;
 isEditMode: boolean;
}

export default function ArticleModal({
 show,
 onClose,
 onSubmit,
 initialData,
 isEditMode,
}: ArticleModalProps) {
 const fetchCategories = async () => {
  const res = await axios.get(
   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
  );
  return res.data.data;
 };

 const { data: categories, isLoading: isCategoriesLoading } = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
 });

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
  control,
 } = useForm<ArticleFormData>({
  resolver: zodResolver(articleSchema),
  defaultValues: {
   title: "",
   description: "",
   cover_image_url: "",
   category: 0,
  },
 });

 useEffect(() => {
  if (show) {
   if (isEditMode && initialData) {
    reset(initialData);
   } else {
    reset({
     title: "",
     description: "",
     cover_image_url: "",
     category: 0,
    });
   }
  }
 }, [show, isEditMode, initialData, reset]);

 const handleFormSubmit = async (data: ArticleFormData) => {
  await onSubmit(data);
  reset();
  onClose();
 };

 return (
  <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
   <DialogContent className='max-w-md'>
    <DialogHeader>
     <DialogTitle>{isEditMode ? "Edit Article" : "Add Article"}</DialogTitle>
     <DialogDescription>
      {isEditMode
       ? "Change the article details below"
       : "Fill in the new article data completely"}
     </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
     {/* Title */}
     <div className='space-y-1'>
      <Label htmlFor='title'>Title</Label>
      <Input id='title' placeholder='Enter title' {...register("title")} />
      {errors.title && (
       <p className='text-red-500 text-sm'>{errors.title.message}</p>
      )}
     </div>

     {/* Description */}
     <div className='space-y-1'>
      <Label htmlFor='description'>Description</Label>
      <Textarea
       id='description'
       placeholder='Enter description'
       rows={4}
       {...register("description")}
      />
      {errors.description && (
       <p className='text-red-500 text-sm'>{errors.description.message}</p>
      )}
     </div>

     {/* Cover Image */}
     <div className='space-y-1'>
      <Label htmlFor='cover_image_url'>Cover Image URL</Label>
      <Input
       id='cover_image_url'
       placeholder='https://contoh.com/gambar.jpg'
       {...register("cover_image_url")}
      />
      {errors.cover_image_url && (
       <p className='text-red-500 text-sm'>{errors.cover_image_url.message}</p>
      )}
     </div>

     {/* Category with shadcn Select */}
     <div className='space-y-1'>
      <Label>Category</Label>
      <Controller
       name='category'
       control={control}
       render={({ field }) => (
        <Select
         onValueChange={(val) => field.onChange(Number(val))}
         value={field.value ? String(field.value) : ""}
        >
         <SelectTrigger>
          <SelectValue placeholder='Select Category' />
         </SelectTrigger>
         <SelectContent>
          {isCategoriesLoading ? (
           <SelectItem value='0'>Loading...</SelectItem>
          ) : (
           categories?.map((cat: { id: number; name: string }) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
             {cat.name}
            </SelectItem>
           ))
          )}
         </SelectContent>
        </Select>
       )}
      />
      {errors.category && (
       <p className='text-red-500 text-sm'>{errors.category.message}</p>
      )}
     </div>

     {/* Buttons */}
     <div className='flex justify-end gap-2 pt-2'>
      <Button type='button' variant='secondary' onClick={onClose}>
       Cancel
      </Button>
      <Button type='submit' disabled={isSubmitting}>
       {isSubmitting && <Loader2Icon className='animate-spin w-4 h-4 mr-2' />}
       {isEditMode ? "Update" : "Add"}
      </Button>
     </div>
    </form>
   </DialogContent>
  </Dialog>
 );
}
