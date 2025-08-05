import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-light mb-4">404</h1>
          <h2 className="text-2xl font-light mb-6">Page Not Found</h2>
          <p className="text-lg font-light text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            className="glass-primary border-line-primary text-primary hover:bg-primary/5 px-8 py-3 font-light rounded-full border"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}