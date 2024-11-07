interface DataProps {
  [key: string]: any
}

function StructuredData(data: DataProps) {
  return (
    <script
      key="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data.data) }}
    />
  )
}

export { StructuredData }