/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api";

const getToken = () =>
 typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const fetchArticles = async ({
 pageParam = 1,
 title,
 category,
 sortOrder,
}: any) => {
 const token = getToken();
 const response = await axios.get(`${API_BASE}/articles`, {
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
 });
 return response.data;
};

export const fetchCategories = async () => {
 const response = await axios.get(`${API_BASE}/categories`);
 return response.data.data;
};

export const createArticle = async (data: any) => {
 const token = getToken();
 return axios.post(
  `${API_BASE}/articles`,
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
  `${API_BASE}/articles/${id}`,
  { data: { ...data, category: Number(data.category) } },
  { headers: { Authorization: `Bearer ${token}` } }
 );
};

export const deleteArticle = async (id: number) => {
 const token = getToken();
 return axios.delete(`${API_BASE}/articles/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
 });
};
