import * as React from "react"
import { cn } from "cn"

export type ContainerProps = React.ComponentProps<"div">

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}
