export default function Page({ params }: { params: { tutorial: string } }) {
  return (
    <div>
      <h1>Hello from {params.tutorial} </h1>
    </div>
  )
}