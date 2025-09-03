import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
 title: "Travel Articles",
 description: "Website Travel Article dengan Login & Register",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang='en' suppressHydrationWarning>
   <body className='bg-gray-100'>
    <Providers>
     {children}
     <Toaster position='top-center' reverseOrder={false} />
    </Providers>
   </body>
  </html>
 );
}
