/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { articleSchema, ArticleFormData } from "../../../schemas/articleSchema";
import { useCategories } from "@/hooks/useArticles";

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
 const { data: categories, isLoading: isCategoriesLoading } = useCategories();

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
  control,
 } = useForm<ArticleFormData>({
  resolver: zodResolver(articleSchema),
  defaultValues: initialData || {
   title: "",
   description: "",
   cover_image_url: "",
   category: 0,
  },
 });
 console.log({ initialData });

 useEffect(() => {
  if (show) {
   reset(
    initialData
     ? {
        ...initialData,
        category:
         typeof initialData.category === "object"
          ? (initialData.category as any).id
          : initialData.category,
       }
     : {
        title: "",
        description: "",
        cover_image_url: "",
        category: 0,
       }
   );
  }
 }, [show, initialData, reset]);

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
     <FormField label='Title' error={errors.title?.message}>
      <Input id='title' placeholder='Enter title' {...register("title")} />
     </FormField>

     {/* Description */}
     <FormField label='Description' error={errors.description?.message}>
      <Textarea
       id='description'
       placeholder='Enter description'
       rows={4}
       {...register("description")}
      />
     </FormField>

     {/* Cover Image */}
     <FormField label='Cover Image URL' error={errors.cover_image_url?.message}>
      <Input
       id='cover_image_url'
       placeholder='https://contoh.com/gambar.jpg'
       {...register("cover_image_url")}
      />
     </FormField>

     {/* Category */}
     <FormField label='Category' error={errors.category?.message}>
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
     </FormField>

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

/** Reusable Form Field Component */
function FormField({
 label,
 error,
 children,
}: {
 label: string;
 error?: string;
 children: React.ReactNode;
}) {
 return (
  <div className='space-y-1'>
   <Label>{label}</Label>
   {children}
   {error && <p className='text-red-500 text-sm'>{error}</p>}
  </div>
 );
}
