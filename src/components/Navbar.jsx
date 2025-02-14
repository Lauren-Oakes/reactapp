import React from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className="font-bold bg-gray-200 border-1 flex items-center gap-4 p-4">
        <Link to="/">GithubSearch</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/products">Products</Link>
        <Link to="/mortgage">Mortgage Calculator</Link>
        <Link to="/tip">Tip Calculator</Link>
      
    </div>
  )
}
