import Image from "next/image"
import { Kanit } from "next/font/google"
import { cn } from "@/lib/shared-utils"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

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
    <section id="products" className="flex flex-col gap-10">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Products
      </h2>
      {
        showProducts ? (
          <div className="grid gap-2 md:grid-cols-2">
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