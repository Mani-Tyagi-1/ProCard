"use client";

import { Search, UserPlus, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Customer {
  _id: string; // phone
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders/customers");
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

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

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-medium">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : customers.length === 0 ? (
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
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Orders</th>
                  <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {customers.map((customer, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    key={customer._id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{customer.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            Last order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground font-medium">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[200px]">
                        <p className="text-foreground truncate">{customer.address}</p>
                        <p className="text-xs text-muted-foreground">{customer.pincode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
                        {customer.totalOrders} {customer.totalOrders === 1 ? 'Order' : 'Orders'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-primary text-base">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
