import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster, toast } from "@/components/ui/toast"
import { onSessionExpired } from "@/services/api"
import { store } from "@/store"
import { restoreSession, sessionExpired } from "@/store/authSlice"

onSessionExpired(() => {
  store.dispatch(sessionExpired())
  toast.add({
    type: "warning",
    title: "Session expired",
    description: "Please sign in again to continue.",
  })
})

store.dispatch(restoreSession())

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Toaster>
          <App />
        </Toaster>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
