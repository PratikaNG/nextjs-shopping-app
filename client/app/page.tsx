import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = async ({searchParams}:{searchParams:Promise<{category:string}>}) => {
  const category = (await searchParams).category
  return (
    <div className=''>
      {/* aspect-3/1 means height will be 3 times smaller that the width */}
      <div className="relative aspect-3/1 mb-12">
         <Image src="/featured.png" alt="Featured Product" fill />
         {/* <Image src="/featured.png" alt="Featured Product" fill className="hover:scale-105 transition-all duration-300"/> */}
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  )
}

export default Homepage
