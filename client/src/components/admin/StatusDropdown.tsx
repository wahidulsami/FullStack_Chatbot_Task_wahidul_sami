import { LoaderCircleIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/types/enquiry"

const statusStyles: Record<EnquiryStatus, string> = {
  New: "border-primary/30 bg-primary/10 text-primary",
  Contacted: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  "In Progress": "border-violet-500/30 bg-violet-500/10 text-violet-600",
  Closed: "border-border bg-muted text-muted-foreground",
}

interface StatusDropdownProps {
  value: EnquiryStatus
  pending?: boolean
  onChange: (status: EnquiryStatus) => void
}

export default function StatusDropdown({ value, pending, onChange }: StatusDropdownProps) {
  return (
    <Select
      value={value}
      disabled={pending}
      onValueChange={(next) => next && onChange(next as EnquiryStatus)}
    >
      <SelectTrigger
        size="sm"
        aria-label="Enquiry status"
        className={`h-7 gap-1 rounded-full border px-2.5 text-xs font-semibold ${statusStyles[value]}`}
      >
        {pending && <LoaderCircleIcon className="size-3 animate-spin" />}
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        {ENQUIRY_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
