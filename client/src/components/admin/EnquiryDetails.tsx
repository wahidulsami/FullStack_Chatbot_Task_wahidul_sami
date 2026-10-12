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
    <div className="grid gap-1 py-2 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4 min-w-0">
      <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0">
        {label}
      </dt>
      <dd className="text-sm break-all [overflow-wrap:anywhere] min-w-0 text-foreground font-medium">
        {value}
      </dd>
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [expanded])

  // Character count is the reliable trigger; DOM overflow is a bonus check.
  const needsToggle = enquiry.message.length > COLLAPSED_MESSAGE_CHARS || domOverflow

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto overflow-x-hidden sm:max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-8 shadow-2xl min-w-0">
        <DialogHeader className="space-y-1 min-w-0">
          <DialogTitle className="font-heading text-xl sm:text-2xl font-bold text-foreground pr-8 break-all [overflow-wrap:anywhere]">
            {enquiry.name}
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-muted-foreground break-all [overflow-wrap:anywhere]">
            {enquiry.email}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <StatusDropdown
            value={enquiry.status}
            pending={pending}
            onChange={(status) => onStatusChange(enquiry._id, status)}
          />
          <span className="text-xs text-muted-foreground">
            Received {new Date(enquiry.createdAt).toLocaleString()}
          </span>
        </div>

        <Separator className="my-2" />

        <dl className="divide-y divide-border/40 min-w-0">
          <Row label="Phone" value={enquiry.phone} />
          <Row label="Type" value={enquiry.userType} />
          <Row label="Interest" value={enquiry.interest} />
          <Row label="Last updated" value={new Date(enquiry.updatedAt).toLocaleString()} />
        </dl>

        <div className="space-y-2 pt-2 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Submitted Message
            </p>
            <span className="text-xs text-muted-foreground font-mono">
              {enquiry.message.length} chars
            </span>
          </div>

          <div className="relative mt-2 min-w-0 max-w-full">
            <p
              ref={messageRef}
              className={cn(
                "rounded-xl border border-border/60 bg-muted/50 p-4 text-sm break-all [overflow-wrap:anywhere] whitespace-pre-wrap text-foreground leading-relaxed min-w-0 max-w-full",
                !expanded && "max-h-40 overflow-hidden"
              )}
            >
              {enquiry.message}
            </p>

            {!expanded && needsToggle && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-xl bg-gradient-to-t from-muted/90 to-transparent" />
            )}
          </div>

          {needsToggle && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 rounded-xl text-xs"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? (
                <>
                  <ChevronUpIcon className="size-3.5 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDownIcon className="size-3.5 mr-1" />
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
