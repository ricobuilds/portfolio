export default function DocumentPage({ params }: { params: { document: string } }) {
  return (
    <div className="">{params.document}</div>
  )
}