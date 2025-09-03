"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import {
 useArticles,
 useCategories,
 useArticleMutations,
} from "@/hooks/useArticles";
import ArticleModal, { ArticleFormData } from "./components/ArticleModal";
import ArticlesFilter from "./components/ArticlesFilter";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";
import ArticleSkeletonCard from "./components/ArticleSkeletonCard";
import ArticlesGrid from "./components/ArticlesGrid";
import { Plus } from "lucide-react";

export default function ArticlesPage() {
 const [showModal, setShowModal] = useState(false);
 const [isEditMode, setIsEditMode] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [initialData, setInitialData] = useState<ArticleFormData | undefined>(
  undefined
 );
 const [searchInput, setSearchInput] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");
 const [sortOrder, setSortOrder] = useState("createdAt:desc");

 const debouncedSearch = useDebounce(searchInput, 500);

 const {
  data,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
 } = useArticles({
  title: debouncedSearch,
  category: selectedCategory,
  sortOrder,
 });

 const { data: categories, isLoading: isCategoriesLoading } = useCategories();
 const { create, update, remove } = useArticleMutations();

 const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
 const [deleteId, setDeleteId] = useState<number | null>(null);

 const loadMoreRef = useRef<HTMLDivElement | null>(null);

 // Infinite Scroll
 useEffect(() => {
  if (!hasNextPage || !loadMoreRef.current) return;
  const observer = new IntersectionObserver((entries) => {
   if (entries[0].isIntersecting) fetchNextPage();
  });
  observer.observe(loadMoreRef.current);
  return () => observer.disconnect();
 }, [hasNextPage, fetchNextPage]);

 // Refetch when filter changes
 useEffect(() => {
  refetch();
 }, [debouncedSearch, selectedCategory, sortOrder, refetch]);

 const handleSubmit = (data: ArticleFormData) => {
  if (isEditMode && editId) {
   update.mutate({ id: editId, data });
   toast.success("Article updated successfully");
  } else {
   create.mutate(data);
   toast.success("Article created successfully");
  }
  resetModalState();
 };

 const resetModalState = () => {
  setShowModal(false);
  setIsEditMode(false);
  setEditId(null);
  setInitialData(undefined);
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
     {Array.from({ length: 3 }).map((_, i) => (
      <ArticleSkeletonCard key={i} />
     ))}
    </div>
   ) : (
    <ArticlesGrid
     data={data}
     onEditArticle={(article) => {
      setIsEditMode(true);
      setEditId(article.id);
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
      {[...Array(3)].map((_, i) => (
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

   <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Delete Article?</DialogTitle>
     </DialogHeader>
     <DialogFooter>
      <Button variant='outline' onClick={() => setOpenConfirmDialog(false)}>
       Cancel
      </Button>
      <Button
       variant='destructive'
       onClick={() => {
        if (deleteId) remove.mutate(deleteId);
        setOpenConfirmDialog(false);
       }}
      >
       Delete
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </>
 );
}
