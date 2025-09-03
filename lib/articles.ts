/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchArticles = async ({
 pageParam = 1,
 title,
 category,
 sortOrder,
}: any) => {
 const token = localStorage.getItem("token");
 const res = await axios.get(`${API_URL}/api/articles`, {
  headers: { Authorization: `Bearer ${token}` },
  params: {
   "pagination[page]": pageParam,
   "pagination[pageSize]": 6,
   ...(title ? { "filters[title][$eqi]": title } : {}),
   ...(category ? { "filters[category][name][$eqi]": category } : {}),
   ...(sortOrder ? { "sort[0]": sortOrder } : {}),
   "populate[user]": "*",
   "populate[category]": "*",
   "populate[comments][populate][user]": "*",
  },
 });
 return res.data;
};

export const createArticle = async (data: any) => {
 const token = localStorage.getItem("token");
 return axios.post(
  `${API_URL}/api/articles`,
  { data },
  {
   headers: { Authorization: `Bearer ${token}` },
  }
 );
};

export const updateArticle = async ({
 id,
 data,
}: {
 id: number;
 data: any;
}) => {
 const token = localStorage.getItem("token");
 return axios.put(
  `${API_URL}/api/articles/${id}`,
  { data },
  {
   headers: { Authorization: `Bearer ${token}` },
  }
 );
};

export const deleteArticle = async (id: number) => {
 const token = localStorage.getItem("token");
 return axios.delete(`${API_URL}/api/articles/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
 });
};
