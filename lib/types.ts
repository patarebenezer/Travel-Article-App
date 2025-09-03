export interface Article {
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
}

export interface ApiResponse<T> {
 data: T;
}
