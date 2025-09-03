import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ArticleDetail {
 id: number;
 documentId: string;
 title: string;
 description: string;
 cover_image_url: string;
 createdAt: string;
}

const isValidUrl = (url: string): boolean => {
 try {
  const parsedUrl = new URL(url);
  return parsedUrl.protocol === "https:";
 } catch (_) {
  return false;
 }
};

const fetchArticleDetail = async (
 documentId: string
): Promise<ArticleDetail> => {
 const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

 const response = await axios.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${documentId}`,
  {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  }
 );

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

export function useArticleDetail(documentId: string) {
 return useQuery({
  queryKey: ["article-detail", documentId],
  queryFn: () => fetchArticleDetail(documentId),
  enabled: !!documentId,
 });
}
