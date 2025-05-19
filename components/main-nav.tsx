"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
  className?: string;
}

const MainNav: React.FC<MainNavProps> = ({ data, className }) => {
  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className={cn("mx-6 flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "font-sans text-sm font-bold uppercase tracking-wide relative group",
            "transition-all duration-300 ease-out",
            route.active ? "text-white" : "text-white/80 hover:text-white"
          )}
        >
          <span className="relative block">
            {route.label}
            <span
              className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-white", 
                "transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]", 
                route.active ? "w-full" : "group-hover:w-full"
              )}
            />
            
            <span
              className={cn(
                "absolute inset-0 bg-white/0",
                "transition-all duration-300 ease-out",
                "group-hover:bg-white/5 rounded-sm" 
              )}
            />
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;