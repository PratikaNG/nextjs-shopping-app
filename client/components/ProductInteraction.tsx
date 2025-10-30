"use client"
import useCartStore from '@/stores/cartStore'
import { ProductType } from '@/types'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ProductInteraction = ({product,selectedSize,selectedColor}:{product:ProductType,selectedSize:string,selectedColor:string}) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const handleTypeChange = (type:string,value:string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(type,value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const [quantity,setQuantity] = useState(1)
    const handleQuantityChange = (type:"inc" | "dec") =>{
        if(type === "inc"){setQuantity(prev => prev+1)}
        else{
            if(quantity > 1){
                setQuantity(prev => prev-1)
            }
        }
    }

    const {addToCart} = useCartStore()

    const handleAddToCart = () =>{
        addToCart({...product,quantity,selectedSize,selectedColor})
        toast.success("Product added to cart")
    }
    return (
    <div className='flex flex-col gap-4 mt-4'>
      {/* size */}
      <div className='flex flex-col gap-3 text-xs'>
        <span className='text-gray-500'>Size</span>
        <div className='flex items-center gap-2'>
        {product.sizes.map((item)=><div className={`cursor-pointer border p-[2px] ${selectedSize === item ? "border-gray-600" :"border-gray-300"}`} key={item}>
            <div 
            className={`w-6 h-6 ${selectedSize === item ? "bg-black text-white" :"bg-white text-black"} text-center flex items-center justify-center`}
            onClick={()=>handleTypeChange("size",item)}>
                {item.toUpperCase()}
                </div>
        </div>)}
        </div>
      </div>
      {/* color */}
      <div className='flex flex-col gap-3 text-sm'>
        <span className='text-gray-500'>Color</span>
        <div className='flex items-center gap-2'>
        {product.colors.map((item)=>
        <div className={`cursor-pointer border p-[2px] ${selectedColor === item ? "border-gray-600" :"border-gray-300"}`} key={item}>
            <div 
            className="w-6 h-6"
            style={{backgroundColor:item}}
            onClick={()=>handleTypeChange("color",item)}/>
        </div>)}
        </div>
      </div>
      {/* quantity */}
      <div className='flex flex-col gap-3 text-sm'>
        <span className='text-gray-500'>Quantity</span>
        <div className='flex items-center gap-2'>
            <button className='cursor-pointer border border-gray-300 p-1'
            onClick={()=>handleQuantityChange("dec")}>
                <Minus className='h-4 w-4'/></button>
            <span>{quantity}</span>
            <button className='cursor-pointer border border-gray-300 p-1'
            onClick={()=>handleQuantityChange("inc")}>
                <Plus className='h-4 w-4'/></button>
        </div>
      </div>
       {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  )
}

export default ProductInteraction
