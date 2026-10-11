import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "@/components/Layout"
import RequireAuth from "@/components/RequireAuth"
import AdminDashboard from "@/pages/AdminDashboard"
import AdminLogin from "@/pages/AdminLogin"
import Contact from "@/pages/Contact"
import Courses from "@/pages/Courses"
import Home from "@/pages/Home"
import Services from "@/pages/Services"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
