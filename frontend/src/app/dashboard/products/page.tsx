"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your store's inventory and product listings.
          </p>
        </div>
        <Link href="/dashboard/products/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm w-fit">
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-border/50 bg-card p-8 min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm"
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No products found</h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          Get started by adding your first product. You can manage inventory, pricing, and variations.
        </p>
        <Link href="/dashboard/products/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm inline-block mt-2">
          Add New Product
        </Link>
      </motion.div>
    </div>
  );
}
