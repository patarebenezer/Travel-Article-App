import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
 url: string;
 title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
 return (
  <div className='flex flex-wrap gap-3 mb-6'>
   <Button
    asChild
    className='bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2'
   >
    <a
     href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
     )}`}
     target='_blank'
     rel='noopener noreferrer'
    >
     <Facebook className='h-4 w-4' /> Facebook
    </a>
   </Button>

   <Button
    asChild
    className='bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2'
   >
    <a
     href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
     )}&text=${encodeURIComponent(title)}`}
     target='_blank'
     rel='noopener noreferrer'
    >
     <Twitter className='h-4 w-4' /> Twitter
    </a>
   </Button>

   <Button
    asChild
    className='bg-green-500 hover:bg-green-600 text-white flex items-center gap-2'
   >
    <a
     href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
     target='_blank'
     rel='noopener noreferrer'
    >
     <MessageCircle className='h-4 w-4' /> WhatsApp
    </a>
   </Button>

   <Button
    asChild
    className='bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-2'
   >
    <a
     href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
     )}&title=${encodeURIComponent(title)}`}
     target='_blank'
     rel='noopener noreferrer'
    >
     <Linkedin className='h-4 w-4' /> LinkedIn
    </a>
   </Button>
  </div>
 );
}
