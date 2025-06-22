import { useLocation } from "react-router-dom"
import Header from "./Header"
import Navigation from "./Navigation"

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-8 py-12 max-w-[1600px]">
        <Navigation />
        <main className="mt-12">{children}</main>
      </div>
    </div>
  )
}
