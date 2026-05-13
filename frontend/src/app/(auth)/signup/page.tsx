'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20">
        <ArrowLeft className="size-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-3xl z-10 shadow-2xl shadow-black/50"
      >
        <div className="flex justify-center mb-8">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Zap className="size-6 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Create your Seller Account</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">Join thousands of sellers making money on social media.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Alex Johnson"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 9876543210"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
            />
          </div>
          
          <button 
            type="button"
            className="w-full bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-3 mt-6 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Get OTP
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
