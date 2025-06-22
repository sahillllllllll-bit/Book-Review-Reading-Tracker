"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Library from "./pages/Library"
import Reviews from "./pages/Reviews"
import Social from "./pages/Social"
import { BookProvider } from "./context/BookContext"
import { ThemeProvider } from "./context/ThemeContext"
import "./index.css"

export default function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Router>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/library" element={<Library />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/social" element={<Social />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </Router>
      </BookProvider>
    </ThemeProvider>
  )
}
