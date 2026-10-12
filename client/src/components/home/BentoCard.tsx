import type { ReactNode } from "react"
import { cn } from "cn"

export type BentoCardProps = {
  className?: string
  innerClassName?: string
  children: ReactNode
}

export default function BentoCard({ className, innerClassName, children }: BentoCardProps) {
  return (
    <div
      className={cn(
        "h-full min-w-0 overflow-hidden rounded-xl border border-border/80 bg-muted/40 p-1.5 shadow-xs",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-full min-w-0 flex-col overflow-hidden rounded-[calc(1.225rem-0.375rem)] border border-border/40 bg-card p-4 sm:p-6 lg:p-8",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
