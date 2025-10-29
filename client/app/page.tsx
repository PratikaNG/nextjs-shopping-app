import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = () => {
  return (
    <div className=''>
      {/* aspect-3/1 means height will be 3 times smaller that the width */}
      <div className="relative aspect-3/1 mb-12">
         <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList/>
    </div>
  )
}

export default Homepage
