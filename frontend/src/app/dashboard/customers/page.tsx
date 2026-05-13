"use client";

import { Search, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your customer database.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm w-fit">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-border/50 bg-card p-8 min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm"
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No customers yet</h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          When you receive your first order, the customer details will appear here automatically.
        </p>
      </motion.div>
    </div>
  );
}
