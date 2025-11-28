
"use client";

import { WithChildren } from "@/lib/types";
import { useState } from "react";
import { DashboardSidebar } from "./_components/layout";

export default function DashboardLayout({ children }: WithChildren) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Header dengan Hamburger */}
        <div className="lg:hidden sticky top-0 z-30 bg-background border-b p-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 hover:bg-accent rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
