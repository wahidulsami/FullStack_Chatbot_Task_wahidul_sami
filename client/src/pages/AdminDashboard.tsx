import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  FilterIcon,
  InboxIcon,
  LogOutIcon,
  PlaneTakeoffIcon,
  RefreshCwIcon,
  SearchIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"
import EnquiryDetails from "@/components/admin/EnquiryDetails"
import EnquiryTable from "@/components/admin/EnquiryTable"
import ThemeToggle from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  setLimit,
  setPage,
  setParams,
  setSearch,
  setSorting,
  setUserTypeFilter,
} from "@/store/enquiriesSlice"
import {
  ENQUIRY_STATUSES,
  USER_TYPES,
  type Enquiry,
  type EnquiryListParams,
  type EnquiryStatus,
  type UserType,
} from "@/types/enquiry"

const ALL = "all"

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { user } = useAppSelector((state) => state.auth)
  const {
    items,
    listStatus,
    error,
    filter,
    userTypeFilter,
    search,
    page,
    limit,
    sortBy,
    sortOrder,
    pagination,
    stats,
  } = useAppSelector((state) => state.enquiries)
  const selected = useAppSelector(selectSelectedEnquiry)

  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState(() => searchParams.get("search") || "")
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(false)

  const loading = listStatus === "loading"

  // 1. On initial mount, sync state from URL parameters
  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true

    const urlPage = Number(searchParams.get("page")) || 1
    const urlLimit = Number(searchParams.get("limit")) || 20
    const urlStatus = (searchParams.get("status") || "") as EnquiryStatus | ""
    const urlUserType = (searchParams.get("userType") || "") as UserType | ""
    const urlSearch = searchParams.get("search") || ""
    const urlSortBy = (searchParams.get("sortBy") || "createdAt") as "createdAt" | "name" | "status" | "userType"
    const urlSortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

    dispatch(
      setParams({
        page: urlPage,
        limit: urlLimit,
        status: urlStatus,
        userType: urlUserType,
        search: urlSearch,
        sortBy: urlSortBy,
        sortOrder: urlSortOrder,
      })
    )

    void dispatch(
      fetchEnquiries({
        page: urlPage,
        limit: urlLimit,
        status: urlStatus,
        userType: urlUserType,
        search: urlSearch,
        sortBy: urlSortBy,
        sortOrder: urlSortOrder,
      })
    )
  }, [dispatch, searchParams])

  // Sync state back to URL parameters whenever parameters change (after initial mount)
  const updateUrlParams = (newParams: Partial<EnquiryListParams>) => {
    const nextParams = new URLSearchParams(searchParams)

    const effectivePage = newParams.page !== undefined ? newParams.page : page
    const effectiveLimit = newParams.limit !== undefined ? newParams.limit : limit
    const effectiveStatus = newParams.status !== undefined ? newParams.status : filter
    const effectiveUserType = newParams.userType !== undefined ? newParams.userType : userTypeFilter
    const effectiveSearch = newParams.search !== undefined ? newParams.search : search
    const effectiveSortBy = newParams.sortBy !== undefined ? newParams.sortBy : sortBy
    const effectiveSortOrder = newParams.sortOrder !== undefined ? newParams.sortOrder : sortOrder

    if (effectivePage > 1) nextParams.set("page", String(effectivePage))
    else nextParams.delete("page")

    if (effectiveLimit !== 20) nextParams.set("limit", String(effectiveLimit))
    else nextParams.delete("limit")

    if (effectiveStatus) nextParams.set("status", effectiveStatus)
    else nextParams.delete("status")

    if (effectiveUserType) nextParams.set("userType", effectiveUserType)
    else nextParams.delete("userType")

    if (effectiveSearch) nextParams.set("search", effectiveSearch)
    else nextParams.delete("search")

    if (effectiveSortBy !== "createdAt") nextParams.set("sortBy", effectiveSortBy)
    else nextParams.delete("sortBy")

    if (effectiveSortOrder !== "desc") nextParams.set("sortOrder", effectiveSortOrder)
    else nextParams.delete("sortOrder")

    setSearchParams(nextParams, { replace: true })
  }

  // Handle Page Change
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
    updateUrlParams({ page: newPage })
    void dispatch(fetchEnquiries({ page: newPage }))
  }

  // Handle Limit (Page Size) Change
  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit))
    updateUrlParams({ limit: newLimit, page: 1 })
    void dispatch(fetchEnquiries({ limit: newLimit, page: 1 }))
  }

  // Handle Status Filter Change
  const handleStatusFilterChange = (value: string | null) => {
    const nextStatus = !value || value === ALL ? "" : (value as EnquiryStatus)
    dispatch(setFilter(nextStatus))
    updateUrlParams({ status: nextStatus, page: 1 })
    void dispatch(fetchEnquiries({ status: nextStatus, page: 1 }))
  }

  // Handle User Type Filter Change
  const handleUserTypeFilterChange = (value: string | null) => {
    const nextUserType = !value || value === ALL ? "" : (value as UserType)
    dispatch(setUserTypeFilter(nextUserType))
    updateUrlParams({ userType: nextUserType, page: 1 })
    void dispatch(fetchEnquiries({ userType: nextUserType, page: 1 }))
  }

  // Handle Search Input Change with 350ms debouncing
  const handleSearchInputChange = (value: string) => {
    setSearchInput(value)
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }
    searchDebounceRef.current = setTimeout(() => {
      dispatch(setSearch(value))
      updateUrlParams({ search: value, page: 1 })
      void dispatch(fetchEnquiries({ search: value, page: 1 }))
    }, 350)
  }

  // Handle Column Header Sort Toggle
  const handleSortChange = (field: "createdAt" | "name" | "status" | "userType") => {
    const nextOrder: "asc" | "desc" = sortBy === field && sortOrder === "desc" ? "asc" : "desc"
    dispatch(setSorting({ sortBy: field, sortOrder: nextOrder }))
    updateUrlParams({ sortBy: field, sortOrder: nextOrder, page: 1 })
    void dispatch(fetchEnquiries({ sortBy: field, sortOrder: nextOrder, page: 1 }))
  }

  // Handle Status Update on Enquiry
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

  // Handle Delete Enquiry
  const handleDelete = async (enquiry: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from ${enquiry.name}?`)) return

    const result = await dispatch(removeEnquiry(enquiry._id))
    if (removeEnquiry.fulfilled.match(result)) {
      toast.add({
        type: "success",
        title: "Enquiry deleted",
        description: `The enquiry from ${enquiry.name} was removed.`,
      })
      // If deleted the last item on a page > 1, jump back to page - 1
      if (items.length <= 1 && page > 1) {
        handlePageChange(page - 1)
      } else {
        void dispatch(fetchEnquiries())
      }
      return
    }

    toast.add({
      type: "error",
      title: "Could not delete enquiry",
      description: result.payload ?? "Please try again.",
    })
  }

  // Refresh data
  const handleRefresh = () => {
    void dispatch(fetchEnquiries())
  }

  // Database aggregate counts for executive metric cards
  const totalCount = stats.total || items.length
  const newCount = stats.new || items.filter((e) => e.status === "New").length
  const inProgressCount =
    stats.inProgress || items.filter((e) => e.status === "In Progress" || e.status === "Contacted").length
  const closedCount = stats.closed || items.filter((e) => e.status === "Closed").length

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* ─── Refreshing Floating Fluid Island Header ──────────────── */}
      <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-2 sm:gap-3 rounded-xl border border-border/80 bg-card/85 px-3.5 sm:px-6 shadow-sm backdrop-blur-xl transition-all">
          {/* Brand Mark */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <PlaneTakeoffIcon className="size-4 sm:size-4.5 stroke-[2.2]" />
            </span>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-heading text-xs sm:text-base font-bold tracking-tight text-foreground truncate">
                DroneTV
              </span>
              <span className="rounded-xl bg-primary/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider shrink-0">
                Admin
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {user && (
              <div className="hidden lg:flex items-center gap-1.5 rounded-xl bg-muted/60 px-3 py-1 text-xs text-muted-foreground border border-border/50">
                <span className="size-1.5 rounded-xl bg-emerald-500" />
                <span className="font-medium text-foreground truncate max-w-[140px]">{user.name}</span>
              </div>
            )}

            <ThemeToggle />

            <Button
              render={<Link to="/" />}
              variant="outline"
              size="sm"
              className="rounded-xl text-xs px-2.5 sm:px-3.5 h-7 sm:h-8 border-border/80 hover:bg-muted"
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
              className="rounded-xl text-muted-foreground hover:text-destructive h-7 w-7 sm:h-8 sm:w-8"
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
            onClick={() => handleStatusFilterChange("")}
            className={`rounded-xl p-3 sm:p-4 text-left border transition-all ${
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
            onClick={() => handleStatusFilterChange("New")}
            className={`rounded-xl p-3 sm:p-4 text-left border transition-all ${
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
            onClick={() => handleStatusFilterChange("In Progress")}
            className={`rounded-xl p-3 sm:p-4 text-left border transition-all ${
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
            onClick={() => handleStatusFilterChange("Closed")}
            className={`rounded-xl p-3 sm:p-4 text-left border transition-all ${
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-1">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <FilterIcon className="size-3" />
              <span>
                {filter
                  ? `Filtered by "${filter}"`
                  : search
                    ? `Searching "${search}"`
                    : "Showing All Enquiries"}
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground">
              Admissions & Enquiries
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px] sm:w-56 sm:flex-initial">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                value={searchInput}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder="Search contact, email..."
                className="h-8 pl-8 pr-7 text-xs rounded-xl bg-card border-border/80 shadow-2xs w-full"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => handleSearchInputChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Clear search"
                >
                  <XIcon className="size-3" />
                </button>
              )}
            </div>

            {/* User Type Select */}
            <Select value={userTypeFilter || ALL} onValueChange={handleUserTypeFilterChange}>
              <SelectTrigger
                size="sm"
                className="w-28 sm:w-32 rounded-xl border-border bg-card px-2.5 text-xs font-medium shadow-2xs h-8"
                aria-label="Filter by type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value={ALL} className="text-xs">All Types</SelectItem>
                {USER_TYPES.map((type) => (
                  <SelectItem key={type} value={type} className="text-xs">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Select */}
            <Select value={filter || ALL} onValueChange={handleStatusFilterChange}>
              <SelectTrigger
                size="sm"
                className="w-32 sm:w-36 rounded-xl border-border bg-card px-2.5 text-xs font-medium shadow-2xs h-8"
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

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={handleRefresh}
              className="rounded-xl text-xs px-2.5 h-8 border-border/80 hover:bg-muted"
            >
              <RefreshCwIcon className={`size-3 mr-1 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden xs:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* ─── Double-Bezel Table Architecture (Desktop & Mobile) ───── */}
        <div className="rounded-xl p-1 sm:p-1.5 bg-muted/40 border border-border/80 shadow-xs ring-1 ring-border/20">
          <div className="rounded-[calc(1.225rem-0.25rem)] sm:rounded-[calc(1.225rem-0.375rem)] bg-card border border-border/40 overflow-hidden shadow-2xs">
            <EnquiryTable
              enquiries={items}
              loading={loading}
              error={error}
              pendingStatusId={pendingStatusId}
              pagination={pagination}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSelect={(enquiry) => dispatch(selectEnquiry(enquiry._id))}
              onStatusChange={(id, status) => void handleStatusChange(id, status)}
              onDelete={(enquiry) => void handleDelete(enquiry)}
              onRetry={handleRefresh}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              onSortChange={handleSortChange}
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
