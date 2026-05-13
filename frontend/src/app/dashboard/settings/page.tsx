"use client";

import { Save } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm"
      >
        <div className="p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold text-foreground">Store Details</h2>
          <p className="text-sm text-muted-foreground">Update your store information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-2">
            <label htmlFor="storeName" className="text-sm font-medium">Store Name</label>
            <input
              id="storeName"
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g. Acme Clothing"
              defaultValue="ProCard Store"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="supportEmail" className="text-sm font-medium">Support Email</label>
            <input
              id="supportEmail"
              type="email"
              className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="support@example.com"
              defaultValue="support@procard.com"
            />
          </div>
        </div>
        <div className="p-6 border-t border-border/50 bg-muted/20 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
