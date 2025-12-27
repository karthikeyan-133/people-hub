import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock,
  FileText,
  DollarSign,
  BarChart3,
  Building2,
  Settings,
  LogOut,
  FileCheck,
  Car,
  Truck,
  Gift,
  Banknote,
  AlertOctagon,
  Heart,
  ClipboardCheck,
  TrendingUp,
  Receipt,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Leave Management", href: "/leave", icon: CalendarDays },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Visa & Documents", href: "/visa-documents", icon: FileCheck },
  { name: "Driving Licence", href: "/driving-licence", icon: Car },
  { name: "Vehicles", href: "/vehicles", icon: Truck },
  { name: "Company Expenses", href: "/expenses", icon: Receipt },
  { name: "Company Assets", href: "/assets", icon: Package },
  { name: "Benefits & Gratuity", href: "/benefits", icon: Gift },
  { name: "Payroll & WPS", href: "/payroll-wps", icon: Banknote },
  { name: "Disciplinary", href: "/disciplinary", icon: AlertOctagon },
  { name: "Health Insurance", href: "/health-insurance", icon: Heart },
  { name: "Compliance & Audit", href: "/compliance", icon: ClipboardCheck },
  { name: "Performance", href: "/performance", icon: TrendingUp },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Users className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">HR Portal</h1>
          <p className="text-xs text-muted-foreground">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-3 py-4">
        {bottomNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
