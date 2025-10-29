import React from 'react'
import Search, { SearchCheck, SearchIcon } from "lucide-react"
const SearchBar = () => {
  return (
    <div className='hidden md:flex items-center gap-2 rounded-md ring-1 ring-gray-200 p-2 shadow-md'>
      <SearchIcon className='w-4 h-4 text-gray-400'/>
      <input id="search" placeholder='Search...' className='text-sm outline-0'/>
    </div>
  )
}

export default SearchBar
