import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useHandleLogout } from "../api";
import { useAuthQuery } from "../useAuthQuery";

export function AuthDropdown() {
  const { data } = useAuthQuery();
  const { mutate: logout } = useHandleLogout();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const user = data?.data;

  const isAvailable = ["admin", "reseller"];

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <a
          href={"/login"}
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-foreground hover:text-foreground p-2 rounded-full hover:bg-accent/50 transition-colors"
      >
        {/* Avatar or User Icon */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>

        {/* User Name (hidden on mobile) */}
        <span className="block text-sm font-medium">
          {user.username}
        </span>

        {/* Chevron Icon */}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-64 bg-popover rounded-md shadow-md border border-border z-20">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground mt-1">
                    {user.role_name}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile */}
            <a href="/profile">
              <button className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <UserCircle className="h-4 w-4 mr-3 text-muted-foreground" />
                View Profile
              </button>
            </a>
            <div className="border-t border-border">
              {isAvailable.includes(user.role_name) && (
                <a href="/dashboard">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <LayoutDashboard className="h-4 w-4 mr-3 text-muted-foreground" />
                    Dashboard
                  </button>
                </a>
              )}
            </div>
            {/* Logout Section */}
            <div className="border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3 text-destructive" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
