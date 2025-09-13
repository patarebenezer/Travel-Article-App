"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { ArticlesFilterProps } from "@/app/types/article";

export default function ArticlesFilter({
 searchInput,
 setSearchInput,
 categories,
 isCategoriesLoading,
 selectedCategory,
 setSelectedCategory,
 sortOrder,
 setSortOrder,
}: ArticlesFilterProps) {
 return (
  <div className='flex flex-col justify-end md:flex-row items-stretch md:items-center gap-4 mt-6'>
   {/* Search */}
   <p className='text-gray-500'>Sort By:</p>
   <div className='relative w-full md:w-auto'>
    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
    <Input
     placeholder='Search by title...'
     value={searchInput}
     onChange={(e) => setSearchInput(e.target.value)}
     className='pl-8'
    />
   </div>
   {/* Category Filter */}
   <Select
    value={selectedCategory || "all"}
    onValueChange={(value) => {
     setSelectedCategory(value === "all" ? "" : value);
    }}
   >
    <SelectTrigger className='w-full md:w-[180px]'>
     <SelectValue placeholder='Select Category' />
    </SelectTrigger>
    <SelectContent>
     <SelectItem value='all'>All Category</SelectItem>
     {isCategoriesLoading ? (
      <SelectItem value='loading'>Loading...</SelectItem>
     ) : (
      categories?.map((cat) => (
       <SelectItem key={cat.id} value={cat.name}>
        {cat.name}
       </SelectItem>
      ))
     )}
    </SelectContent>
   </Select>

   {/* Sort */}
   <Select value={sortOrder} onValueChange={setSortOrder}>
    <SelectTrigger className='w-full md:w-[180px]'>
     <SelectValue placeholder='Sort' />
    </SelectTrigger>
    <SelectContent>
     <SelectItem value='createdAt:desc'>Latest</SelectItem>
     <SelectItem value='createdAt:asc'>Oldest</SelectItem>
    </SelectContent>
   </Select>
  </div>
 );
}
