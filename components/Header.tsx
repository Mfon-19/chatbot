import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-end items-center p-4 bg-white">
      <div className="space-x-2">
        <Button variant="outline" >Login</Button>
        <Button>Sign up</Button>
      </div>
    </header>
  )
}

