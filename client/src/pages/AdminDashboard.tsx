import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LayoutDashboardIcon, LogOutIcon, RefreshCwIcon } from "lucide-react"
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="size-5 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">
              ChatBot Academy
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button render={<Link to="/" />} variant="outline" size="sm">
              View site
            </Button>
            <Button variant="outline" size="sm" onClick={() => void dispatch(logout())}>
              <LogOutIcon />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Enquiries</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {loading ? "Loading..." : `${items.length} total`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={filter || ALL} onValueChange={handleFilterChange}>
              <SelectTrigger size="sm" className="w-40" aria-label="Filter by status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All statuses</SelectItem>
                {ENQUIRY_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
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
            >
              <RefreshCwIcon />
              Refresh
            </Button>
          </div>
        </div>

        <div className="mt-6">
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
      </main>

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
