"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data.map((i) => ({
    href: `/category/${i.id}`,
    label: i.name,
    active: pathname === `/category/${i.id}`,
  }));
  return (
    <nav className="mx-6 items-center space-x-4 lg:space-x-6">
      {routes.map((i) => (
        <Link
          href={i.href}
          key={i.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            i.active ? "text-black" : "text-neutral-600"
          )}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
