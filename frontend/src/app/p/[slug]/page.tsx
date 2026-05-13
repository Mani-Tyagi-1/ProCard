'use client';

import { motion } from 'framer-motion';
import { Share2, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

// Using use() for modern Next.js async params handling in Client Components if needed, 
// though for a pure UI demo we can just read them normally or assume static.
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  // Mock product data for UI demonstration
  const product = {
    title: 'Premium Aesthetic Desk Mat',
    price: 1299,
    originalPrice: 1999,
    description: 'Transform your workspace with our ultra-premium, spill-resistant desk mat. Crafted with vegan leather and an anti-slip base to keep your setup looking pristine.',
    sellerName: 'Alex Johnson',
    rating: 4.9,
    reviews: 128,
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      
      {/* Navbar (Minimal for Product Page) */}
      <nav className="fixed top-0 w-full z-50 p-4 flex justify-end pointer-events-none">
        <button className="size-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors">
          <Share2 className="size-5" />
        </button>
      </nav>

      <div className="max-w-5xl mx-auto md:py-12 md:px-6 md:grid md:grid-cols-2 md:gap-12">
        
        {/* Product Images (Mobile: full width, Desktop: rounded) */}
        <div className="w-full aspect-[4/5] md:aspect-square bg-gradient-to-tr from-indigo-900/50 to-purple-900/50 md:rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            [Product Image Placeholder]
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="size-4 fill-yellow-500" />
              <span className="font-medium text-foreground">{product.rating}</span>
            </span>
            <span>({product.reviews} reviews)</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-extrabold">₹{product.price}</span>
            <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
              SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                {product.sellerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sold by</p>
                <p className="font-semibold">{product.sellerName}</p>
              </div>
              <div className="ml-auto">
                <ShieldCheck className="size-6 text-green-400" />
              </div>
            </div>
          </div>

          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="size-5 text-green-400" /> 100% Secure Payments
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="size-5 text-green-400" /> Fast Delivery across India
            </li>
          </ul>

          {/* Desktop Buy Button */}
          <div className="hidden md:block">
            <Link 
              href={`/checkout/${resolvedParams.slug}`}
              className="w-full flex items-center justify-center py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
        <Link 
          href={`/checkout/${resolvedParams.slug}`}
          className="w-full flex items-center justify-center py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20"
        >
          Buy Now
        </Link>
      </div>

    </div>
  );
}
