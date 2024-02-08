import Image from "next/image"

export const Products = () => {
  const products = [
    {
      label: "hellow there",
      cover: "/headshot.jpeg",
      description: "description here",
    }
  ]
  const showProducts = false
  return (
    <section>
      <h2 className="text-slate-500">Products</h2>
      {
        showProducts ? (
          <div className="grid gap-2 mt-6 md:grid-cols-2">
            {
              products.map((i, idx) => (
                <div key={idx} id="product-card" className="flex gap-4 overflow-hidden border rounded-lg bg-slate-100">
                  <div className="relative w-24 h-24 overflow-hidden aspect-square">
                    <Image src={i.cover} alt="" className="" fill />
                  </div>
                  <div className="flex flex-col flex-1 my-auto">
                    <p>{i.label}</p>
                    <p className="text-sm text-slate-500">{i.description}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : <p>No products... yet.</p>
      }
    </section >
  )
}