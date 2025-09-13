// app/types/article.ts

import { ArticleFormData } from "@/app/schemas/articleSchema";

export interface ApiResponse<T> {
 data: T;
}

export type UpdateArticlePayload = {
 id: number;
 data: ArticleFormData;
};

export type Article = {
 id: number;
 title: string;
 description: string;
 cover_image_url: string;
 createdAt: string;
 user: {
  username: string;
 };
 category?: {
  name: string;
 };
 comments: {
  id: number;
  content: string;
 }[];
};

export type Category = {
 id: number;
 name: string;
};

export type ArticleModalProps = {
 show: boolean;
 onClose: () => void;
 onSubmit: (data: ArticleFormData) => void;
 initialData?: ArticleFormData;
 isEditMode: boolean;
};

export type ArticleCardProps = {
 article: Article;
 onDetail: (id: number) => void;
 onEdit: (article: Article) => void;
 onDelete: (id: number) => void;
};

export type FormFieldProps = {
 label: string;
 error?: string;
 children: React.ReactNode;
};

export type ArticlesFilterProps = {
 searchInput: string;
 setSearchInput: (value: string) => void;
 categories: Category[] | undefined;
 isCategoriesLoading: boolean;
 selectedCategory: string;
 setSelectedCategory: (value: string) => void;
 sortOrder: string;
 setSortOrder: (value: string) => void;
};

export type ShareButtonsProps = {
 url: string;
 title: string;
};

export type ArticleFilters = {
 title?: string;
 category?: string;
 sortOrder?: string;
};

export const defaultArticleFormData: ArticleFormData = {
 title: "",
 description: "",
 cover_image_url: "",
 category: 0,
};
