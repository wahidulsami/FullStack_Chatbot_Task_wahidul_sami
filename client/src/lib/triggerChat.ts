export function triggerChat(): void {
  const chatButton = document.querySelector<HTMLButtonElement>(
    'button[aria-label*="Open chat"]',
  )
  chatButton?.click()
}
