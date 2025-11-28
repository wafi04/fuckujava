
"use client";
import { ChevronLeft, ChevronRight, PieChart, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { menuItems, MenuItems } from "@/data/menuItems";

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname  = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(pathname);
  const { push } = useRouter();

  const handleItemClick = (itemId: string, href: string) => {
    push(href);
    setActiveItem(itemId);
    // Tutup sidebar di mobile setelah klik
    onMobileClose?.();
  };

  const MenuItem = ({ item }: { item: MenuItems }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        onClick={() => handleItemClick(item.id, item.href)}
        className={`w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200 group ${
          isCollapsed ? "justify-center px-2" : "justify-start px-3 py-2"
        }`}
        title={isCollapsed ? item.label : ""}
      >
        <Icon
          className={`flex-shrink-0 ${
            isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
          }`}
        />
        {!isCollapsed && (
          <span className="flex-1 text-left truncate">{item.label}</span>
        )}
      </Button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r bg-background transition-all duration-300 fixed left-0 h-screen z-30 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <PieChart className="h-4 w-4 text-primary-foreground" />
                </div>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex-shrink-0"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-background border-r z-50 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <PieChart className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold">Dashboard</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={onMobileClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </aside>

      {/* Spacer untuk desktop agar konten tidak tertutup sidebar */}
      <div
        className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      />
    </>
  );
}
