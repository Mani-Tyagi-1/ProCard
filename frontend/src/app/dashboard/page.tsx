"use client";

import { motion } from "framer-motion";
import { DollarSign, Eye, Package, ShoppingBag } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
            View Store
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Add Product
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change={20.1}
          icon={DollarSign}
          delay={0.1}
        />
        <StatCard
          title="Active Orders"
          value="+2350"
          change={180.1}
          icon={ShoppingBag}
          delay={0.2}
        />
        <StatCard
          title="Store Views"
          value="+12,234"
          change={19}
          icon={Eye}
          delay={0.3}
        />
        <StatCard
          title="Products Sold"
          value="573"
          change={-2}
          icon={Package}
          delay={0.4}
        />
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="xl:col-span-2 rounded-xl border border-border/50 bg-card p-6 shadow-sm min-h-[400px] flex items-center justify-center text-muted-foreground"
        >
          {/* Placeholder for a chart component */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">Revenue Over Time</h3>
            <p>Chart component will be rendered here.</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="xl:col-span-1"
        >
          <RecentOrders />
        </motion.div>
      </div>
    </div>
  );
}
