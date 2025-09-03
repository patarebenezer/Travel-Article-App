import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
 darkMode: ["class"],
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}" // ✅ tambahkan ini
 ],
 theme: {
  extend: {},
 },
 plugins: [
  tailwindcssAnimate // ✅ pakai import di JS
 ],
};

export default config;