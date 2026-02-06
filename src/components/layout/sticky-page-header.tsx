"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

interface StickyPageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyPageHeader({
  children,
  className,
}: StickyPageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "max-sm:sticky max-sm:top-0 max-sm:z-30 max-sm:-mx-4 max-sm:-mt-4 max-sm:mb-3 max-sm:bg-background max-sm:px-4 max-sm:pt-4 max-sm:pb-3 max-sm:transition-shadow max-sm:duration-200",
        isScrolled && "max-sm:shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
