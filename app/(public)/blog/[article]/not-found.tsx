export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 h-full text-center">
      <div className="m-auto">
        <h2 className="font-semibold text-7xl">Oops!</h2>
        <p>{"The article you're looking for doesn't exist, has been updated or was removed."}</p>
      </div>
    </main>
  )
}