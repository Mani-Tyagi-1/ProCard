"use client";

import { Download } from "lucide-react";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { motion } from "framer-motion";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage your orders, fulfillment, and returns.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors shadow-sm w-fit border border-border/50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <RecentOrders />
      </motion.div>
    </div>
  );
}
