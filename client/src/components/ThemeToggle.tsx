import { useEffect, useState } from "react"
import { CheckIcon, LaptopIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? theme : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "relative cursor-pointer rounded-xl border-border/80 bg-background/80 hover:bg-muted/80 backdrop-blur-sm transition-transform active:scale-95"
        )}
        aria-label="Select theme mode"
        title="Select theme mode"
      >
        <SunIcon className="size-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-36 rounded-xl p-1.5 shadow-xl border border-border bg-popover/95 backdrop-blur-xl"
      >
        <DropdownMenuItem
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            activeTheme === "light"
              ? "bg-primary/15 text-primary font-bold hover:bg-primary/20"
              : "text-foreground hover:bg-muted"
          )}
          onClick={() => setTheme("light")}
        >
          <span className="flex items-center gap-2">
            <SunIcon className="size-3.5 " />
            <span>Light</span>
          </span>
          {activeTheme === "light" && <CheckIcon className="size-3.5 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            activeTheme === "dark"
              ? "bg-primary/15 text-primary font-bold hover:bg-primary/20"
              : "text-foreground hover:bg-muted"
          )}
          onClick={() => setTheme("dark")}
        >
          <span className="flex items-center gap-2">
            <MoonIcon className="size-3.5" />
            <span>Dark</span>
          </span>
          {activeTheme === "dark" && <CheckIcon className="size-3.5 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            "flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors",
            activeTheme === "system"
              ? "bg-primary/15 text-primary font-bold hover:bg-primary/20"
              : "text-foreground hover:bg-muted"
          )}
          onClick={() => setTheme("system")}
        >
          <span className="flex items-center gap-2">
            <LaptopIcon className="size-3.5 text-muted-foreground" />
            <span>System</span>
          </span>
          {activeTheme === "system" && <CheckIcon className="size-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
