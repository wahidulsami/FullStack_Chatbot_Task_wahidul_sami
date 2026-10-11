import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import StatusDropdown from "@/components/admin/StatusDropdown"
import { cn } from "cn"
import type { Enquiry, EnquiryStatus } from "@/types/enquiry"

interface EnquiryDetailsProps {
  enquiry: Enquiry
  pending?: boolean
  onClose: () => void
  onStatusChange: (id: string, status: EnquiryStatus) => void
}

const COLLAPSED_MESSAGE_CHARS = 240

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-2 sm:grid-cols-[130px_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm break-words text-foreground">{value}</dd>
    </div>
  )
}

export default function EnquiryDetails({
  enquiry,
  pending,
  onClose,
  onStatusChange,
}: EnquiryDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const [domOverflow, setDomOverflow] = useState(false)
  const messageRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = messageRef.current
    if (!el) return

    const update = () => setDomOverflow(el.scrollHeight > el.clientHeight + 1)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [enquiry._id, enquiry.message])

  useEffect(() => {
    if (!expanded) return
    const el = messageRef.current
    if (!el) return
    el.scrollIntoView({ block: "nearest" })
  }, [expanded])

  // Character count is the reliable trigger; DOM overflow is a bonus check.
  const needsToggle = enquiry.message.length > COLLAPSED_MESSAGE_CHARS || domOverflow

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
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
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Message
            </p>
            <span className="text-xs text-muted-foreground">
              {enquiry.message.length} characters
            </span>
          </div>

          <div className="relative mt-2">
            <p
              ref={messageRef}
              className={cn(
                "rounded-lg bg-muted p-4 text-sm break-words whitespace-pre-wrap text-foreground",
                !expanded && "max-h-40 overflow-hidden"
              )}
            >
              {enquiry.message}
            </p>

            {!expanded && needsToggle && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-lg bg-gradient-to-t from-muted to-transparent" />
            )}
          </div>

          {needsToggle && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? (
                <>
                  <ChevronUpIcon />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDownIcon />
                  Show more
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
