'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Share2, Smartphone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">KwikSell</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              The fastest way to sell on social media
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Share a link. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Get paid instantly.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Create beautiful product cards in seconds. Share them on WhatsApp, Instagram, or anywhere else. Your buyers can checkout instantly—no signups required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Start Selling for Free
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#demo"
                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-md w-full sm:w-auto"
              >
                View Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for creators & resellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to turn your social media audience into paying customers, without the friction of a traditional online store.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg"
            >
              <div className="size-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
                <Zap className="size-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1-Click Checkout</h3>
              <p className="text-muted-foreground">Buyers enter their details and pay instantly. No account creation or password management needed.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg"
            >
              <div className="size-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Share2 className="size-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Anywhere</h3>
              <p className="text-muted-foreground">Every product gets a beautiful, SEO-optimized link that looks perfect when shared on WhatsApp or Instagram.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg"
            >
              <div className="size-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="size-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-muted-foreground">Integrated directly with Razorpay. Accept UPI, Cards, and Netbanking securely with instant settlements.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-12 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="size-3 text-white" />
            </div>
            <span className="font-bold">KwikSell</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 KwikSell Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
