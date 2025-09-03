import {
 useInfiniteQuery,
 useMutation,
 useQuery,
 useQueryClient,
} from "@tanstack/react-query";
import {
 fetchArticles,
 fetchCategories,
 createArticle,
 updateArticle,
 deleteArticle,
} from "@/services/articleService";

export const useCategories = () => {
 return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
};

export const useArticles = (filters: {
 title?: string;
 category?: string;
 sortOrder?: string;
}) => {
 return useInfiniteQuery({
  queryKey: ["articles", filters],
  queryFn: ({ pageParam }) => fetchArticles({ pageParam, ...filters }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
   const { page, pageCount } = lastPage.meta.pagination;
   return page < pageCount ? page + 1 : undefined;
  },
 });
};

export const useArticleMutations = () => {
 const queryClient = useQueryClient();

 const create = useMutation({
  mutationFn: createArticle,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
 });

 const update = useMutation({
  mutationFn: updateArticle,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
 });

 const remove = useMutation({
  mutationFn: deleteArticle,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articles"] }),
 });

 return { create, update, remove };
};
