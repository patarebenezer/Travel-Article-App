# 🧳 Travel Article App

A **Travel Article App** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Query**.  
This app allows users to **view travel articles**, **filter by category**, and **perform CRUD operations** (Create, Read, Update, Delete) on articles.

## 🚀 Features

✅ User Authentication (Login & Register)  
✅ Protected Routes (JWT-based)  
✅ Article Management (Add, Edit, Delete)  
✅ Infinite Scroll for Articles  
✅ Search & Filter by Category  
✅ Responsive Design (Mobile, Tablet, Desktop)  
✅ Skeleton Loading State  
✅ Share Article on Social Media  
✅ **API Integration** using Axios with Interceptors  
✅ Toast Notifications for Success & Error  
✅ Ready for **Vercel Deployment**

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Query (TanStack Query)**
- **Axios** (with token interceptor)
- **React Hook Form + Zod** (Form validation)
- **React Hot Toast** (Notifications)

---

## 🔑 Environment Variables

Create a `.env.local` file in the root folder and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

> ✅ For security, **do not commit `.env.local`**. Instead, create an `.env.example` for sharing.

---

## 🛠 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/travel-article-app.git
cd travel-article-app
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## ✅ Available Scripts

- **`npm run dev`** – Start development server
- **`npm run build`** – Build for production
- **`npm start`** – Run production build
- **`npm run lint`** – Check linting errors

---

## 📂 Folder Structure

```
travel-article-app/
│
├── app/               # App Router pages & layout
├── components/        # Reusable UI components
├── hooks/             # Custom hooks (React Query, Debounce)
├── lib/               # Axios instance & helpers
├── services/          # API service functions
├── schemas/           # Zod validation schemas
├── public/            # Static assets
└── styles/            # Global styles
```

---

## 🔍 How It Works

- **React Query** handles fetching, caching, and updating articles.
- **Axios interceptor** adds JWT token from `localStorage` automatically.
- **Infinite scroll** implemented using `IntersectionObserver`.
- **Validation** powered by **React Hook Form + Zod**.
- **Responsive UI** built with **Tailwind CSS** and **shadcn/ui** components.

---

## 🌍 Deployment on Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) → Import Project.
3. Add your environment variables in **Vercel Dashboard** → **Settings → Environment Variables**.
4. Deploy and enjoy 🚀

---

## 📸 Screenshots

_Add screenshots of your app here (Home page, Article detail, etc.)_

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
