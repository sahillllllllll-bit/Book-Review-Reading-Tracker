import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBooks } from "@/context/BookContext"

export default function WordCloud() {
  const { genres } = useBooks()

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Genre Explorer</CardTitle>
        <p className="text-muted-foreground">Discover your reading patterns across different genres</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-center items-center min-h-[350px] p-8">
          {genres.map((genre, i) => (
            <Button
              key={genre.name}
              variant="ghost"
              className={`hover:scale-110 transition-transform duration-300 animate-pulse hover:bg-primary/10 px-6 py-3`}
              style={{
                fontSize: `${genre.size}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "2s",
              }}
            >
              {genre.name}
              <Badge variant="secondary" className="ml-3 text-sm">
                {genre.count}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
