"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { AxiosError } from "axios";
import {
 useArticles,
 useCategories,
 useArticleMutations,
} from "@/app/hooks/useArticles";
import { useDebounce } from "@/app/hooks/useDebounce";
import { ArticleFormData } from "@/app/schemas/articleSchema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ArticleModal from "@/app/articles/components/ArticleModal";
import ArticlesFilter from "@/app/articles/components/ArticlesFilter";
import ArticlesGrid from "@/app/articles/components/ArticlesGrid";
import ArticleSkeletonCard from "@/app/articles/components/ArticleSkeletonCard";
import ConfirmDialog from "@/app/components/ConfirmDialog";

const handleAxiosError = (error: unknown, defaultMessage: string) => {
 const axiosError = error as AxiosError<{ error: { message: string } }>;
 toast.error(axiosError.response?.data?.error?.message || defaultMessage);
};

const SKELETON_COUNT = 3;

export default function ArticlesPage() {
 const [showModal, setShowModal] = useState(false);
 const [isEditMode, setIsEditMode] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [initialData, setInitialData] = useState<ArticleFormData>();
 const [searchInput, setSearchInput] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");
 const [sortOrder, setSortOrder] = useState("createdAt:desc");
 const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
 const [deleteId, setDeleteId] = useState<number | null>(null);

 const debouncedSearch = useDebounce(searchInput, 500);
 const loadMoreRef = useRef<HTMLDivElement | null>(null);

 const {
  data,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
 } = useArticles({
  title: debouncedSearch,
  category: selectedCategory,
  sortOrder,
 });

 const { data: categories, isLoading: isCategoriesLoading } = useCategories();
 const { create, update, remove } = useArticleMutations();

 // Infinite Scroll
 useEffect(() => {
  if (!hasNextPage || !loadMoreRef.current) return;
  const observer = new IntersectionObserver((entries) => {
   if (entries[0].isIntersecting) fetchNextPage();
  });
  observer.observe(loadMoreRef.current);
  return () => observer.disconnect();
 }, [hasNextPage, fetchNextPage]);

 const resetModalState = () => {
  setShowModal(false);
  setIsEditMode(false);
  setEditId(null);
  setInitialData(undefined);
 };

 const handleSubmit = (data: ArticleFormData) => {
  if (isEditMode && editId) {
   update.mutate(
    { id: editId, data },
    {
     onSuccess: () => {
      toast.success("Article updated successfully");
      resetModalState();
     },
     onError: (error) => handleAxiosError(error, "Failed to update article"),
    }
   );
  } else {
   create.mutate(data, {
    onSuccess: () => {
     toast.success("Article created successfully");
     resetModalState();
    },
    onError: (error) => handleAxiosError(error, "Failed to create article"),
   });
  }
 };

 if (isError)
  return (
   <p className='text-center mt-10 text-red-500'>Failed to load articles</p>
  );

 return (
  <>
   <Card className='w-full p-6'>
    <h2 className='text-2xl font-semibold mb-2'>Blog</h2>
    <p className='text-gray-600 mb-4 lg:w-1/2 w-full'>
     Discover travel tips and stories that help you plan the perfect trip. From
     hidden gems to top destinations, explore guides, tips, and real experiences
     to make your journey unforgettable.
    </p>
    <Button
     onClick={() => {
      resetModalState();
      setShowModal(true);
     }}
     className='flex items-center gap-2'
    >
     <Plus className='h-4 w-4' />
     Add Article
    </Button>
    <ArticlesFilter
     searchInput={searchInput}
     setSearchInput={setSearchInput}
     categories={categories}
     isCategoriesLoading={isCategoriesLoading}
     selectedCategory={selectedCategory}
     setSelectedCategory={setSelectedCategory}
     sortOrder={sortOrder}
     setSortOrder={setSortOrder}
    />
   </Card>

   {isLoading ? (
    <div className='p-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
     {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <ArticleSkeletonCard key={i} />
     ))}
    </div>
   ) : (
    <ArticlesGrid
     data={data}
     onEditArticle={(article) => {
      setIsEditMode(true);
      setEditId(article.documentId);
      setInitialData(article);
      setShowModal(true);
     }}
     onDeleteArticle={(id) => {
      setDeleteId(id);
      setOpenConfirmDialog(true);
     }}
    />
   )}

   <div ref={loadMoreRef} className='text-center py-6'>
    {isFetchingNextPage ? (
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
       <ArticleSkeletonCard key={i} />
      ))}
     </div>
    ) : hasNextPage ? (
     <p className='text-gray-500'>Scroll to load more</p>
    ) : null}
   </div>

   <ArticleModal
    show={showModal}
    onClose={resetModalState}
    onSubmit={handleSubmit}
    initialData={initialData}
    isEditMode={isEditMode}
   />

   <ConfirmDialog
    open={openConfirmDialog}
    title='Delete Article?'
    onOpenChange={setOpenConfirmDialog}
    onConfirm={() => {
     if (deleteId) {
      remove.mutate(deleteId, {
       onSuccess: () => {
        toast.success("Article deleted successfully");
       },
       onError: (error) => handleAxiosError(error, "Failed to delete article"),
      });
     }
     setOpenConfirmDialog(false);
    }}
   />
  </>
 );
}
