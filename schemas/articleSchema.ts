import { z } from "zod";

export const articleSchema = z.object({
 title: z.string().min(3, "Title minimal 3 karakter"),
 description: z.string().min(10, "Deskripsi minimal 10 karakter"),
 cover_image_url: z.string().url("URL gambar tidak valid"),
 category: z.number().min(1, "Pilih kategori"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
