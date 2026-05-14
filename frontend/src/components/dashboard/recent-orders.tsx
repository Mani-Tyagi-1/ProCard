"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Order {
  _id: string;
  productId: {
    _id: string;
    title: string;
    images: string[];
    price: number;
  };
  buyerDetails: {
    fullName: string;
    phone: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-500",
  Processing: "bg-blue-500/10 text-blue-500",
  Shipped: "bg-purple-500/10 text-purple-500",
  Pending: "bg-amber-500/10 text-amber-500",
  Cancelled: "bg-destructive/10 text-destructive",
  Refunded: "bg-muted text-muted-foreground",
};

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border/50 bg-card shadow-sm p-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/10 text-destructive p-6 shadow-sm">
        {error}
      </div>
    );
  }

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No orders found.
                </td>
              </tr>
            ) : orders.map((order, i) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={order._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                  ORD-{order._id.substring(order._id.length - 6).toUpperCase()}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="font-medium text-foreground">{order.buyerDetails.fullName}</div>
                  <div className="text-xs">{order.buyerDetails.phone}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {order.productId?.images?.[0] && (
                      <img src={order.productId.images[0]} alt="" className="w-8 h-8 rounded object-cover border border-border/50 shrink-0" />
                    )}
                    <span className="line-clamp-1">{order.productId?.title || 'Unknown Product'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                      statusStyles[order.status] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-foreground whitespace-nowrap">
                  ${order.totalAmount.toFixed(2)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
