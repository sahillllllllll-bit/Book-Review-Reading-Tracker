"use client";
import { BookOpen, Search, Moon, Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { useBooks } from "@/context/BookContext";
import profileCover from "../assets/profile.jpg";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useBooks();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 p-4 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-6 w-6 sm:h-8 w-8 text-primary" />
            <h1 className="text-lg sm:text-2xl font-bold">BookTracker</h1>
            <Badge variant="secondary" className="hidden sm:inline ml-2">
              Pro
            </Badge>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Search Icon (Visible on small), Full Search on sm+ */}
            <div className="sm:hidden">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="hidden sm:block relative w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search books, authors, genres..."
                className="pl-12 w-full h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Theme Toggle - Hidden on small */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-12 w-12"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Add Book Button - Hidden on small */}
            <Button className="hidden sm:flex h-12">
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>

            {/* Avatar - Always Visible */}
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={profileCover} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
