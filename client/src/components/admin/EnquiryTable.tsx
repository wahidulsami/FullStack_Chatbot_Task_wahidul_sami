import { EyeIcon, RefreshCwIcon, Trash2Icon } from "lucide-react"
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
      <div className="space-y-3 rounded-xl border border-border bg-card p-6">
        {[0, 1, 2].map((row) => (
          <Skeleton key={row} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <p className="text-sm font-medium text-destructive">{error}</p>
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          <RefreshCwIcon />
          Retry
        </Button>
      </div>
    )
  }

  if (enquiries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <p className="text-sm font-semibold text-foreground">No enquiries found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          New contact form submissions will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Received</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => (
            <TableRow key={enquiry._id}>
              <TableCell>
                <button
                  type="button"
                  onClick={() => onSelect(enquiry)}
                  className="text-left font-semibold text-foreground hover:text-primary"
                >
                  {enquiry.name}
                </button>
                <p className="text-xs text-muted-foreground">{enquiry.email}</p>
              </TableCell>
              <TableCell className="text-muted-foreground">{enquiry.phone}</TableCell>
              <TableCell className="text-muted-foreground">{enquiry.userType}</TableCell>
              <TableCell className="max-w-[200px] truncate text-muted-foreground">
                {enquiry.interest}
              </TableCell>
              <TableCell>
                <StatusDropdown
                  value={enquiry.status}
                  pending={pendingStatusId === enquiry._id}
                  onChange={(status) => onStatusChange(enquiry._id, status)}
                />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(enquiry.createdAt)}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1.5">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onSelect(enquiry)}
                    aria-label={`View enquiry from ${enquiry.name}`}
                  >
                    <EyeIcon />
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="xs"
                    onClick={() => onDelete(enquiry)}
                    aria-label={`Delete enquiry from ${enquiry.name}`}
                  >
                    <Trash2Icon />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
