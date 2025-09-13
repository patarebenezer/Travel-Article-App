/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/app/lib/api";
import { ArticleFormData } from "@/app/schemas/articleSchema";
import { Article, UpdateArticlePayload } from "@/app/types/article";
import { AxiosResponse } from "axios";

const isValidUrl = (url: string): boolean => {
 try {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol === "https:";
 } catch (_) {
  return false;
 }
};

export const fetchArticles = async ({
 pageParam = 1,
 title,
 category,
 sortOrder,
}: any) => {
 const response = await api.get("/articles", {
  params: {
   "pagination[page]": pageParam,
   "pagination[pageSize]": 6,
   ...(title && { "filters[title][$eqi]": title }),
   ...(category && { "filters[category][name][$eqi]": category }),
   ...(sortOrder && { "sort[0]": sortOrder }),
   "populate[user]": "*",
   "populate[category]": "*",
   "populate[comments][populate][user]": "*",
  },
 });
 return response.data;
};

export const fetchCategories = async () => {
 const response = await api.get("/categories");
 return response.data.data;
};

export const createArticle = async (data: ArticleFormData) => {
 return api.post("/articles", {
  data: { ...data, category: Number(data.category) },
 });
};

export const updateArticle = async ({
 id,
 data,
}: UpdateArticlePayload): Promise<Article> => {
 const response: AxiosResponse<{ data: Article }> = await api.put(
  `/articles/${id}`,
  {
   data: { ...data, category: Number(data.category) },
  }
 );

 return response.data.data;
};

export const deleteArticle = async (id: number) => {
 return api.delete(`/articles/${id}`);
};

export const fetchArticleDetail = async (documentId: string) => {
 const response = await api.get(`/articles/${documentId}`);

 const item = response.data.data;

 const imageUrl =
  item.cover_image_url && isValidUrl(item.cover_image_url)
   ? item.cover_image_url
   : "/images/default-image.jpg";

 return {
  id: item.id,
  documentId: item.documentId.toString(),
  title: item.title,
  description: item.description,
  cover_image_url: imageUrl,
  createdAt: item.createdAt,
 };
};
