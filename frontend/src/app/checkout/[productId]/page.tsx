'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

export default function CheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = use(params);
  const [step, setStep] = useState<1 | 2>(1); // 1: Address, 2: OTP

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 px-6 h-16 flex items-center">
        <Link href={`/p/${resolvedParams.productId}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
          <span className="font-medium">Back</span>
        </Link>
        <div className="mx-auto flex items-center gap-2">
          <ShieldCheck className="size-5 text-green-400" />
          <span className="font-semibold text-sm">Secure Checkout</span>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8 md:grid md:grid-cols-[1.5fr_1fr] md:gap-12">
        
        {/* Left Column: Forms */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Delivery Details</h1>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Phone Number (For OTP & Tracking)</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Full Address</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">City</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">PIN Code</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full mt-8 flex items-center justify-center py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98]"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <h3 className="text-lg font-semibold mb-2">Verify your number</h3>
                  <p className="text-sm text-muted-foreground mb-6">We've sent a 6-digit OTP to your phone number.</p>
                  
                  <div className="flex justify-center gap-2 mb-6">
                    {[1,2,3,4,5,6].map((i) => (
                      <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center text-xl font-bold bg-background border border-white/20 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">Didn't receive it? <button className="text-primary hover:underline">Resend OTP</button></p>

                  <button 
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-transform active:scale-[0.98] shadow-lg shadow-green-500/20"
                  >
                    <CreditCard className="size-5" />
                    Pay ₹1,299
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="hidden md:block">
          <div className="sticky top-24 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="size-16 rounded-xl bg-indigo-900/50 flex-shrink-0" />
              <div>
                <p className="font-medium line-clamp-2 text-sm mb-1">Premium Aesthetic Desk Mat</p>
                <p className="text-muted-foreground text-sm">Qty: 1</p>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹1,299</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg pt-4 border-t border-white/10">
              <span>Total</span>
              <span>₹1,299</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
