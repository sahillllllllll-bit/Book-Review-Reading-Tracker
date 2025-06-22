"use client"
import { BookOpen, Search, Moon, Sun, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/context/ThemeContext"
import { useBooks } from "@/context/BookContext"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { searchQuery, setSearchQuery } = useBooks()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 p-4 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-12  w-12 text-primary" />
            <h1 className="text-4xl pl-2 font-bold">BookTracker</h1>
            <Badge variant="secondary" className="ml-2">
              Pro
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search books, authors, genres..."
                className="pl-12 w-80 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="icon" className="h-12 w-12" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button className="h-12">
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>

            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
