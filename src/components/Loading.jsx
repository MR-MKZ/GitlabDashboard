import { Spinner } from "flowbite-react"
import "../styles/App.css"

export default function Loading() {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="text-center flex gap-3 text-white items-center text-xl bg-gray-secondary p-6 rounded-lg">
        <Spinner color={"purple"} size={"xl"} aria-label="Center-aligned spinner example" />
        Loading
      </div>
    </div>
  )
}
