/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getToken = () =>
 typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const fetchArticles = async ({
 pageParam = 1,
 title,
 category,
 sortOrder,
}: any) => {
 const token = getToken();
 const response = await axios.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`,
  {
   headers: { Authorization: `Bearer ${token}` },
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
  }
 );
 return response.data;
};

export const fetchCategories = async () => {
 const response = await axios.get(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
 );
 return response.data.data;
};

export const createArticle = async (data: any) => {
 const token = getToken();
 return axios.post(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`,
  { data: { ...data, category: Number(data.category) } },
  { headers: { Authorization: `Bearer ${token}` } }
 );
};

export const updateArticle = async ({
 id,
 data,
}: {
 id: number;
 data: any;
}) => {
 const token = getToken();
 return axios.put(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`,
  { data: { ...data, category: Number(data.category) } },
  { headers: { Authorization: `Bearer ${token}` } }
 );
};

export const deleteArticle = async (id: number) => {
 const token = getToken();
 return axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
 });
};
