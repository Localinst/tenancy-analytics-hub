
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  Users, 
  Receipt, 
  Menu, 
  X, 
  Home, 
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isActive }: SidebarItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal px-4 py-6",
          isActive 
            ? "bg-primary/10 text-primary hover:bg-primary/20" 
            : "hover:bg-secondary"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const routes = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/properties", label: "Properties", icon: Building2 },
    { path: "/tenants", label: "Tenants", icon: Users },
    { path: "/transactions", label: "Transactions", icon: Receipt },
  ];
  
  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 md:w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <h1 className={cn("font-semibold text-lg", !isOpen && "md:hidden")}>
                Rent Manager
              </h1>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="hidden md:flex"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              {routes.map((route) => (
                <SidebarItem
                  key={route.path}
                  icon={route.icon}
                  label={route.label}
                  to={route.path}
                  isActive={location.pathname === route.path}
                />
              ))}
            </div>
          </nav>
          
          {/* Sidebar footer */}
          <div className="border-t border-sidebar-border py-4 px-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 font-normal px-4 py-6 hover:bg-secondary"
            >
              <LogOut className="h-5 w-5" />
              <span className={cn(!isOpen && "md:hidden")}>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
