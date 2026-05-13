"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const orders = [
  { id: "ORD-001", customer: "John Doe", product: "Premium Sneakers", total: "$129.00", status: "Delivered", date: "Today" },
  { id: "ORD-002", customer: "Jane Smith", product: "Wireless Earbuds", total: "$89.99", status: "Processing", date: "Yesterday" },
  { id: "ORD-003", customer: "Michael Johnson", product: "Smart Watch", total: "$199.50", status: "Shipped", date: "Oct 24" },
  { id: "ORD-004", customer: "Emily Davis", product: "Leather Wallet", total: "$45.00", status: "Delivered", date: "Oct 23" },
  { id: "ORD-005", customer: "Chris Wilson", product: "Mechanical Keyboard", total: "$150.00", status: "Pending", date: "Oct 22" },
];

const statusStyles = {
  Delivered: "bg-emerald-500/10 text-emerald-500",
  Processing: "bg-blue-500/10 text-blue-500",
  Shipped: "bg-purple-500/10 text-purple-500",
  Pending: "bg-amber-500/10 text-amber-500",
};

export function RecentOrders() {
  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Order ID</th>
              <th scope="col" className="px-6 py-4 font-medium">Customer</th>
              <th scope="col" className="px-6 py-4 font-medium">Product</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {orders.map((order, i) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                key={order.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {order.product}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium",
                      statusStyles[order.status as keyof typeof statusStyles]
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-foreground">
                  {order.total}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
