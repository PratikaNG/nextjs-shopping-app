"use client"
import useCartStore from '@/stores/cartStore'
import { ProductType } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ProductCard = ({product}:{product:ProductType}) => {
    const [productType,setProductType] = useState({
        size:product.sizes[0],
        color:product.colors[0]
    })

    const handleProductType = ({type,value}:{type:"size" | "color",value:string}) =>{
        setProductType((prev)=>({...prev,[type]:value}))
    }

    const {addToCart} = useCartStore()
    const handleAddToCart = () =>{
        addToCart({...product,quantity:1,
            selectedSize:productType.size,
            selectedColor:productType.color})
        toast.success("Product added to cart!")
    }
  return (
    <div className='shadow-lg rounded-lg overflow-hidden'>
        {/* image */}
        <Link href={`/products/${product.id}`}>
        <div className='relative aspect-2/3'>
            <Image src={product.images[productType.color]} alt={product.name} fill 
            className='object-cover hover:scale-105 transition-all duration-300'/>
        </div>
        </Link>
        {/* product detail */}
        <div className='flex flex-col gap-4 p-4'>
            <h1 className='font-medium'>{product.name}</h1>
            <p className='text-sm text-gray-500'>{product.shortDescription} </p>
            {/* product types */}
            <div className='flex items-center gap-4 text-xs'>
                {/* sizes */}
                <div className='flex flex-col gap-1 '>
                    <span className='text-gray-500'>Size</span>
                    <select name='size' id='size' className='ring ring-gray-300 rounded-md px-2 py-1 text-gray-500' onChange={(e)=>handleProductType({type:"size",value:e.target.value})}>
                        {product.sizes.map((item)=><option value={item} key={item} >{item.toUpperCase()}</option>)}
                    </select>
                </div>
                {/* colors */}
                <div className='flex flex-col gap-1'>
                    <span className='text-gray-500'>Color</span>
                    <div className='flex items-center gap-2'> 
                        {product.colors.map((item)=>
                        <div key={item}
                        className={`cursor-pointer border-1 ${productType.color === item ? "border-gray-400" : "bg-gray-200"} rounded-full p-[1.2px]`}
                        onClick={(e)=>handleProductType({type:"color",value:item})}>
                            <div className='w-[14px] h-[14px] rounded-full' style={{backgroundColor:item}}/>
                        </div>)}
                    </div>
                </div>
            </div>
            {/* price and add to cart button */}
            <div className='flex justify-between items-center'>
                <p className='font-medium'>${product.price.toFixed(2)}</p>
                <button onClick={handleAddToCart}
                className='ring-1 ring-gray-400 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-gray-400 transition-all duration-300 flex items-center gap-2'>
                <span><ShoppingCart/> </span>Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
