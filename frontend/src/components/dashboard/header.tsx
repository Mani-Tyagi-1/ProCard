"use client";

import { useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-4 shadow-sm backdrop-blur md:px-6">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-muted-foreground md:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch md:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
            placeholder="Search orders, products..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden md:block md:h-6 md:w-px md:bg-border/50" aria-hidden="true" />

          {/* Profile dropdown stub */}
          <div className="flex items-center gap-x-4">
            <button type="button" className="flex items-center gap-x-3 text-sm font-semibold leading-6 text-foreground">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                S
              </div>
              <span className="hidden md:block">Seller Name</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
