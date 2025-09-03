import { useQuery } from "@tanstack/react-query";
import { fetchArticleDetail } from "@/services/articleService";

export function useArticleDetail(documentId: string) {
 return useQuery({
  queryKey: ["article-detail", documentId],
  queryFn: () => fetchArticleDetail(documentId),
  enabled: !!documentId,
 });
}
