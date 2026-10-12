import { CalendarIcon, EyeIcon, MailIcon, PhoneIcon, RefreshCwIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import StatusDropdown from "@/components/admin/StatusDropdown"
import type { Enquiry, EnquiryStatus } from "@/types/enquiry"

interface EnquiryTableProps {
  enquiries: Enquiry[]
  loading: boolean
  error: string | null
  pendingStatusId: string | null
  onSelect: (enquiry: Enquiry) => void
  onStatusChange: (id: string, status: EnquiryStatus) => void
  onDelete: (enquiry: Enquiry) => void
  onRetry: () => void
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function EnquiryTable({
  enquiries,
  loading,
  error,
  pendingStatusId,
  onSelect,
  onStatusChange,
  onDelete,
  onRetry,
}: EnquiryTableProps) {
  if (loading) {
    return (
      <div className="space-y-3 p-4 sm:p-6">
        {[0, 1, 2, 3].map((row) => (
          <Skeleton key={row} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-destructive/5">
        <p className="text-sm font-medium text-destructive">{error}</p>
        <Button variant="outline" className="mt-4 rounded-xl" onClick={onRetry}>
          <RefreshCwIcon className="size-3.5 mr-1" />
          Retry
        </Button>
      </div>
    )
  }

  if (enquiries.length === 0) {
    return (
      <div className="p-12 text-center space-y-1">
        <p className="text-sm font-bold text-foreground">No enquiries found</p>
        <p className="text-xs text-muted-foreground">
          New contact form and chatbot enquiries will appear here automatically.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* ─── Mobile View: Responsive Submission Cards (< md) ──────── */}
      <div className="block md:hidden divide-y divide-border/50">
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} className="p-4 space-y-3 hover:bg-muted/30 transition-colors">
            {/* Card Header: Name + Type Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => onSelect(enquiry)}
                  className="text-left font-bold text-sm text-foreground hover:text-primary transition-colors block truncate rounded-xl"
                >
                  {enquiry.name}
                </button>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 truncate">
                  <MailIcon className="size-3 shrink-0" />
                  <span className="truncate">{enquiry.email}</span>
                </div>
              </div>
              <span className="shrink-0 rounded-xl bg-primary/15 text-primary border border-primary/25 px-2 py-0.5 text-[10px] font-bold">
                {enquiry.userType}
              </span>
            </div>

            {/* Interest & Phone */}
            <div className="rounded-xl bg-muted/40 p-2.5 text-xs space-y-1 border border-border/40">
              <div className="font-medium text-foreground truncate">
                <span className="text-muted-foreground">Interest: </span>
                {enquiry.interest}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                <PhoneIcon className="size-3" />
                <span>{enquiry.phone}</span>
              </div>
            </div>

            {/* Card Footer: Status & Actions */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <StatusDropdown
                value={enquiry.status}
                pending={pendingStatusId === enquiry._id}
                onChange={(status) => onStatusChange(enquiry._id, status)}
              />

              <div className="flex items-center gap-1.5">
                <span className="hidden xs:flex items-center gap-1 text-[11px] text-muted-foreground mr-1">
                  <CalendarIcon className="size-3" />
                  {formatDate(enquiry.createdAt)}
                </span>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onSelect(enquiry)}
                  aria-label={`View enquiry from ${enquiry.name}`}
                  className="rounded-xl text-xs px-2.5 h-7 border-border/80"
                >
                  <EyeIcon className="size-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onDelete(enquiry)}
                  aria-label={`Delete enquiry from ${enquiry.name}`}
                  className="rounded-xl text-xs px-2 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2Icon className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Desktop View: Full Data Table (>= md) ─────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/60">
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Contact
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Phone
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Type
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Interest
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Status
              </TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Received
              </TableHead>
              <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground py-3.5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry._id} className="border-border/50 hover:bg-muted/40 transition-colors">
                <TableCell className="py-3">
                  <button
                    type="button"
                    onClick={() => onSelect(enquiry)}
                    className="text-left font-semibold text-foreground hover:text-primary transition-colors block max-w-[200px] truncate rounded-xl"
                  >
                    {enquiry.name}
                  </button>
                  <p className="text-xs text-muted-foreground max-w-[200px] truncate">{enquiry.email}</p>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{enquiry.phone}</TableCell>
                <TableCell className="text-xs text-foreground font-medium">
                  <span className="rounded-xl bg-muted px-2.5 py-0.5 border border-border/50">
                    {enquiry.userType}
                  </span>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                  {enquiry.interest}
                </TableCell>
                <TableCell>
                  <StatusDropdown
                    value={enquiry.status}
                    pending={pendingStatusId === enquiry._id}
                    onChange={(status) => onStatusChange(enquiry._id, status)}
                  />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(enquiry.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onSelect(enquiry)}
                      aria-label={`View enquiry from ${enquiry.name}`}
                      className="rounded-xl text-xs px-2.5 h-7 border-border/80 hover:border-primary/50"
                    >
                      <EyeIcon className="size-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onDelete(enquiry)}
                      aria-label={`Delete enquiry from ${enquiry.name}`}
                      className="rounded-xl text-xs px-2.5 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2Icon className="size-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
