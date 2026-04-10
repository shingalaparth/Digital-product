import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex justify-center animate-in fade-in slide-in-from-top-4 duration-1000"
    >
      <ol className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-widest text-muted backdrop-blur-sm sm:px-6 sm:text-[11px]">
        <li>
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.href + index} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-20" aria-hidden />
              {isLast ? (
                <span className="font-semibold text-primary/90">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-primary">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
