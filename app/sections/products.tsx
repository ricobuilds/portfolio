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
    <section id="products">
      <h2 className="flex items-center gap-2 text-slate-500">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-anchor"><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" /></svg></span>
        Products
      </h2>
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
        ) : <p className="pt-6">No products... yet.</p>
      }
    </section >
  )
}