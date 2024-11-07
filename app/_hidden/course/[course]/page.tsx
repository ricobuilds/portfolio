export default function Page({ params }: { params: { course: string } }) {
  return (
    <div>
      <h1>Hello from {params.course} </h1>
    </div>
  )
}