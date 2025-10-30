"use client"
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ShoppingCartIcon = () => {
  return (
    <div>
      <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className='absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full h-4 w-4 flex items-center justify-center text-xs font-medium'>0</span>
      </Link>
    </div>
  )
}

export default ShoppingCartIcon
