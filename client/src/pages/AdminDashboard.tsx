import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  FilterIcon,
  InboxIcon,
  LogOutIcon,
  PlaneTakeoffIcon,
  RefreshCwIcon,
  SparklesIcon,
} from "lucide-react"
import EnquiryDetails from "@/components/admin/EnquiryDetails"
import EnquiryTable from "@/components/admin/EnquiryTable"
import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { useAppDispatch, useAppSelector, selectSelectedEnquiry } from "@/store/hooks"
import { logout } from "@/store/authSlice"
import {
  changeStatus,
  fetchEnquiries,
  removeEnquiry,
  selectEnquiry,
  setFilter,
} from "@/store/enquiriesSlice"
import { ENQUIRY_STATUSES, type Enquiry, type EnquiryStatus } from "@/types/enquiry"

const ALL = "all"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { items, listStatus, error, filter } = useAppSelector((state) => state.enquiries)
  const selected = useAppSelector(selectSelectedEnquiry)

  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null)
  const loading = listStatus === "loading"

  useEffect(() => {
    void dispatch(fetchEnquiries(filter))
  }, [dispatch, filter])

  const handleFilterChange = (value: string | null) => {
    dispatch(setFilter(!value || value === ALL ? "" : (value as EnquiryStatus)))
  }

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    setPendingStatusId(id)
    const result = await dispatch(changeStatus({ id, status }))
    setPendingStatusId(null)

    if (changeStatus.fulfilled.match(result)) {
      toast.add({
        type: "success",
        title: "Status updated",
        description: `Marked as ${result.payload.status}`,
      })
      return
    }

    toast.add({
      type: "error",
      title: "Could not update status",
      description: result.payload ?? "Please try again.",
    })
  }

  const handleDelete = async (enquiry: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from ${enquiry.name}?`)) return

    const result = await dispatch(removeEnquiry(enquiry._id))
    if (removeEnquiry.fulfilled.match(result)) {
      toast.add({
        type: "success",
        title: "Enquiry deleted",
        description: `The enquiry from ${enquiry.name} was removed.`,
      })
      return
    }

    toast.add({
      type: "error",
      title: "Could not delete enquiry",
      description: result.payload ?? "Please try again.",
    })
  }

  // Quick stats computed for metric pills
  const totalCount = items.length
  const newCount = items.filter((e) => e.status === "New").length
  const inProgressCount = items.filter((e) => e.status === "In Progress" || e.status === "Contacted").length
  const closedCount = items.filter((e) => e.status === "Closed").length

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* ─── Refreshing Floating Fluid Island Header ──────────────── */}
      <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-2 sm:gap-3 rounded-full border border-border/80 bg-card/85 px-3.5 sm:px-6 shadow-sm backdrop-blur-xl transition-all">
          {/* Brand Mark */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
              <PlaneTakeoffIcon className="size-4 sm:size-4.5 stroke-[2.2]" />
            </span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-heading text-xs sm:text-base font-bold tracking-tight text-foreground truncate">
                DroneTV
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider shrink-0">
                Admin
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {user && (
              <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs text-muted-foreground border border-border/50">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-foreground truncate max-w-[140px]">{user.name}</span>
              </div>
            )}

            <ThemeToggle />

            <Button
              render={<Link to="/" />}
              variant="outline"
              size="sm"
              className="rounded-full text-xs px-2.5 sm:px-3.5 h-7 sm:h-8 border-border/80 hover:bg-muted"
            >
              <span className="hidden xs:inline">View Site</span>
              <ExternalLinkIcon className="size-3 xs:ml-1" />
            </Button>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => void dispatch(logout())}
              title="Logout"
              aria-label="Logout"
              className="rounded-full text-muted-foreground hover:text-destructive h-7 w-7 sm:h-8 sm:w-8"
            >
              <LogOutIcon className="size-3.5 sm:size-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Dashboard Main Section ─────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-3 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Executive Metric Cards (Interactive Filter Chips) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => dispatch(setFilter(""))}
            className={`rounded-2xl p-3 sm:p-4 text-left border transition-all ${
              !filter
                ? "bg-primary/10 border-primary/50 shadow-xs ring-1 ring-primary/20"
                : "bg-card border-border/70 hover:border-border hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Total</span>
              <InboxIcon className="size-3.5" />
            </div>
            <div className="font-heading font-black text-xl sm:text-2xl text-foreground mt-1">
              {totalCount}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">All Submissions</div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setFilter("New"))}
            className={`rounded-2xl p-3 sm:p-4 text-left border transition-all ${
              filter === "New"
                ? "bg-primary/15 border-primary/60 shadow-xs ring-1 ring-primary/30"
                : "bg-card border-border/70 hover:border-border hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between text-primary text-xs font-semibold">
              <span>New</span>
              <SparklesIcon className="size-3.5" />
            </div>
            <div className="font-heading font-black text-xl sm:text-2xl text-foreground mt-1">
              {newCount}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Needs Attention</div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setFilter("In Progress"))}
            className={`rounded-2xl p-3 sm:p-4 text-left border transition-all ${
              filter === "In Progress"
                ? "bg-violet-500/15 border-violet-500/50 shadow-xs ring-1 ring-violet-500/30"
                : "bg-card border-border/70 hover:border-border hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between text-violet-600 dark:text-violet-400 text-xs font-semibold">
              <span>Active</span>
              <ClockIcon className="size-3.5" />
            </div>
            <div className="font-heading font-black text-xl sm:text-2xl text-foreground mt-1">
              {inProgressCount}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Contacted / Progress</div>
          </button>

          <button
            type="button"
            onClick={() => dispatch(setFilter("Closed"))}
            className={`rounded-2xl p-3 sm:p-4 text-left border transition-all ${
              filter === "Closed"
                ? "bg-muted border-foreground/30 shadow-xs"
                : "bg-card border-border/70 hover:border-border hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Closed</span>
              <CheckCircleIcon className="size-3.5" />
            </div>
            <div className="font-heading font-black text-xl sm:text-2xl text-foreground mt-1">
              {closedCount}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Resolved</div>
          </button>
        </div>

        {/* Controls and Title Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <FilterIcon className="size-3" />
              <span>{filter ? `Filtered by "${filter}"` : "Showing All Enquiries"}</span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground">
              Admissions & Enquiries
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Select value={filter || ALL} onValueChange={handleFilterChange}>
              <SelectTrigger
                size="sm"
                className="flex-1 sm:w-44 rounded-full border-border bg-card px-3 text-xs font-medium shadow-2xs h-8"
                aria-label="Filter by status"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={ALL} className="text-xs">All Statuses</SelectItem>
                {ENQUIRY_STATUSES.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => void dispatch(fetchEnquiries(filter))}
              className="rounded-full text-xs px-3 h-8 border-border/80 hover:bg-muted"
            >
              <RefreshCwIcon className={`size-3 mr-1 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden xs:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* ─── Double-Bezel Table Architecture (Desktop & Mobile) ───── */}
        <div className="rounded-[1.8rem] sm:rounded-[2rem] p-1 sm:p-1.5 bg-muted/40 border border-border/80 shadow-xs ring-1 ring-border/20">
          <div className="rounded-[calc(1.8rem-0.25rem)] sm:rounded-[calc(2rem-0.375rem)] bg-card border border-border/40 overflow-hidden shadow-2xs">
            <EnquiryTable
              enquiries={items}
              loading={loading}
              error={error}
              pendingStatusId={pendingStatusId}
              onSelect={(enquiry) => dispatch(selectEnquiry(enquiry._id))}
              onStatusChange={(id, status) => void handleStatusChange(id, status)}
              onDelete={(enquiry) => void handleDelete(enquiry)}
              onRetry={() => void dispatch(fetchEnquiries(filter))}
            />
          </div>
        </div>
      </main>

      {/* ─── Details Modal ─────────────────────────────────────────── */}
      {selected && (
        <EnquiryDetails
          key={selected._id}
          enquiry={selected}
          pending={pendingStatusId === selected._id}
          onClose={() => dispatch(selectEnquiry(null))}
          onStatusChange={(id, status) => void handleStatusChange(id, status)}
        />
      )}
    </div>
  )
}
