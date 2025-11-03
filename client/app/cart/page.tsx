"use client"
import PaymentForm from '@/components/PaymentForm';
import ShippingForm from '@/components/ShippingForm';
import useCartStore from '@/stores/cartStore';
import {  ShippingFormInputs } from '@/types';
import {  ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'

const steps = [
    {id:1,title:"Shopping Cart"},
    {id:2,title:"Shipping Address"},
    {id:3,title:"Payment Method"},
]

const CartPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const activeStep = parseInt(searchParams.get("step") || "1")
    const [shippingForm,setShippingForm] = useState<ShippingFormInputs>()
    const {cart,removeFromCart} = useCartStore()
  return (
    
    <div className='flex flex-col gap-8 items-center justify-center mt-12'>
      {/* title */}
      <h1 className='font-medium text-2xl'>Your Shopping Cart</h1>

      {/* steps */}
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-16 items-center'>
        {steps.map((step)=><div key={step.id} className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-400"}`}>
            <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}>{step.id}</div>
            <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-200"}`}>{step.title}</p>
        </div>)}
      </div>

      {/* steps and details */}
      <div className='w-full flex flex-col gap-16 lg:flex-row'>
        {/* steps */}
        <div className='w-full md:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8'>
        {/* logic:-  {activeStep === 1 ? ("products") : activeStep === 2 ? <ShippingForm/> : activeStep === 3 && shippingForm ? <PaymentForm/> : <p className='text-sm text-gray-500'>Please fill in the shipping form to continue.</p>} */}
        <Suspense fallback={<div>Loading cart...</div>}>
        {activeStep === 1 ? (cart.map((item)=>
        
        // single cart item
        <div key={item.id+item.selectedSize+item.selectedColor} className='flex items-center justify-between'>
            {/* image and details */}
            <div className='flex gap-8'>
                {/* image */}
                <div className='relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden'>
                    <Image src={item.images[item.selectedColor]} alt={item.name} fill className='object-contain' />
                </div>
                {/* item details */}
                <div className='flex flex-col justify-between'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-sm font-medium'>{item.name}</p>
                        <p className='text-xs text-gray-500'>Qunatity:{" "} {item.quantity}</p>
                        <p className='text-xs text-gray-500'>Size:{" "} {item.selectedSize}</p>
                        <p className='text-xs text-gray-500'>Color:{" "} {item.selectedColor}</p>
                    </div>
                    <p className='font-medium'>${item.price.toFixed(2)}</p>
                </div>
            </div>
            {/* delete button */}
            <button onClick={()=>removeFromCart(item)}
            className='w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer'>
                <Trash2 className='w-3 h-3'/>
            </button>
        </div>)) : activeStep === 2 ? <ShippingForm setShippingForm={setShippingForm}/> : activeStep === 3 && shippingForm ? <PaymentForm/> : <p className='text-sm text-gray-500'>Please fill in the shipping form to continue.</p>}
        </Suspense>
        </div>
        
        {/* details */}
        <div className='w-full md:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max'>
        <h3 className='font-medium text-md'>Card Details</h3>
        <div className='flex flex-col gap-4 '>
            <div className='flex justify-between text-sm'>
                <p className='text-sm text-gray-500'>Subtotal</p>
                <p className='text-sm font-medium'>{cart.reduce((acc,item)=>acc + item.price*item.quantity,0).toFixed(2)}</p>
            </div>
            <div className='flex justify-between text-sm'>
                <p className='text-sm text-gray-500'>Discount(10%)</p>
                <p className='text-sm font-medium'>$ 10</p>
            </div>
            <div className='flex justify-between text-sm'>
                <p className='text-sm text-gray-500'>Shipping Fee</p>
                <p className='text-sm font-medium'>$ 10</p>
            </div>
            <hr className='border-gray-200'/>
            <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Total</p>
                <p className='text-sm font-semibold'>{cart.reduce((acc,item)=>acc + item.price*item.quantity,0).toFixed(2)}</p>
            </div>
        </div>
           
            {activeStep === 1 && <button onClick={()=>router.push('/cart?step=2',{scroll:false})}
            className='ring-1 ring-gray-400 p-2 text-white rounded-md w-full bg-gray-800 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-900 transition-all duration-300'>
            Continue <ArrowRight className='w-3 h-3'/></button>}

        </div>
      </div>
    </div>
  )
}

export default CartPage
// TEMPORARY
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "gray",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "black",
//   },
// ];