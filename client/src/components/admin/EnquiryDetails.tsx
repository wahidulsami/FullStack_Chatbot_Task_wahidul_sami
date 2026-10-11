import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import StatusDropdown from "@/components/admin/StatusDropdown"
import type { Enquiry, EnquiryStatus } from "@/types/enquiry"

interface EnquiryDetailsProps {
  enquiry: Enquiry
  pending?: boolean
  onClose: () => void
  onStatusChange: (id: string, status: EnquiryStatus) => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-2 sm:grid-cols-[130px_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  )
}

export default function EnquiryDetails({
  enquiry,
  pending,
  onClose,
  onStatusChange,
}: EnquiryDetailsProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading pr-8">{enquiry.name}</DialogTitle>
          <DialogDescription>{enquiry.email}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <StatusDropdown
            value={enquiry.status}
            pending={pending}
            onChange={(status) => onStatusChange(enquiry._id, status)}
          />
          <span className="text-xs text-muted-foreground">
            Received {new Date(enquiry.createdAt).toLocaleString()}
          </span>
        </div>

        <Separator />

        <dl>
          <Row label="Phone" value={enquiry.phone} />
          <Row label="Type" value={enquiry.userType} />
          <Row label="Interest" value={enquiry.interest} />
          <Row label="Last updated" value={new Date(enquiry.updatedAt).toLocaleString()} />
        </dl>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Message
          </p>
          <p className="mt-2 whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm text-foreground">
            {enquiry.message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
