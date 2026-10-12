import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn"
import type { PaginationMeta } from "@/types/enquiry"

interface PaginationProps {
  pagination: PaginationMeta
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  pageSizeOptions?: number[]
  className?: string
  disabled?: boolean
}

export default function Pagination({
  pagination,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [10, 20, 50, 100],
  className,
  disabled = false,
}: PaginationProps) {
  const { page, limit, total, totalPages, hasNextPage, hasPrevPage } = pagination

  // Calculate current record range
  const startRecord = total === 0 ? 0 : (page - 1) * limit + 1
  const endRecord = Math.min(page * limit, total)

  // Generate page numbers with ellipses
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "ellipsis")[] = [1]

    if (page > 3) {
      pages.push("ellipsis")
    }

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis")
    }

    pages.push(totalPages)
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-card/60 border-t border-border/60 text-xs",
        className
      )}
    >
      {/* Left: Record Range and Page Size Selector */}
      <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
        <div className="text-muted-foreground font-medium">
          {total === 0 ? (
            <span>No records</span>
          ) : (
            <span>
              Showing <span className="font-semibold text-foreground">{startRecord}</span> to{" "}
              <span className="font-semibold text-foreground">{endRecord}</span> of{" "}
              <span className="font-semibold text-foreground">{total}</span> records
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
          <span className="text-muted-foreground text-[11px] hidden xs:inline">Rows per page:</span>
          <Select
            value={String(limit)}
            onValueChange={(val) => onLimitChange(Number(val))}
            disabled={disabled}
          >
            <SelectTrigger
              size="sm"
              className="h-8 w-18 rounded-xl border-border bg-background px-2.5 text-xs font-semibold shadow-2xs"
              aria-label="Select records per page"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {pageSizeOptions.map((opt) => (
                <SelectItem key={opt} value={String(opt)} className="text-xs">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center justify-center gap-1 w-full sm:w-auto">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={!hasPrevPage || disabled}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="h-8 rounded-xl px-2.5 text-xs font-semibold border-border hover:bg-muted active:scale-[0.98] transition-all disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-3.5 mr-1" />
          <span>Prev</span>
        </Button>

        {/* Page Number Pills (Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-1 mx-1">
          {pageNumbers.map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-1 text-muted-foreground font-semibold select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                type="button"
                disabled={disabled}
                onClick={() => onPageChange(p)}
                aria-label={`Go to page ${p}`}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "size-8 rounded-xl text-xs font-semibold transition-all active:scale-[0.96]",
                  p === page
                    ? "bg-primary text-primary-foreground font-bold shadow-xs cursor-default"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border/60"
                )}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Current page indicator on mobile */}
        <div className="md:hidden px-2 text-xs font-semibold text-muted-foreground">
          Page {page} of {totalPages}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNextPage || disabled}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="h-8 rounded-xl px-2.5 text-xs font-semibold border-border hover:bg-muted active:scale-[0.98] transition-all disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRightIcon className="size-3.5 ml-1" />
        </Button>
      </div>
    </div>
  )
}
