"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="space-y-6 max-w-5xl pb-10">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products"
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Product</h1>
          <p className="text-muted-foreground mt-1">
            Create a new product listing for your store.
          </p>
        </div>
      </div>

      <form className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* General Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">General Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                <input
                  id="name"
                  placeholder="e.g. Premium Wireless Headphones"
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your product..."
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Pricing & Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Pricing & Inventory</h2>
            </div>
            <div className="p-6 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">Stock</label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Product Media</h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Product Status</label>
                <select
                  id="status"
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="md:col-span-3 flex justify-end gap-4 border-t border-border/50 pt-6"
        >
          <Link
            href="/dashboard/products"
            className="px-6 py-2 rounded-lg font-medium hover:bg-muted transition-colors text-foreground"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" />
            Save Product
          </button>
        </motion.div>
      </form>
    </div>
  );
}
