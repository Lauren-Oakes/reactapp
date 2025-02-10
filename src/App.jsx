
import React from 'react'
import { Route, Routes } from 'react-router'
import Counter from './pages/Counter'
import Products from './pages/Products'
import GithubSearch from './pages/GithubSearch'
import Layout from './components/Layout'
import Mortgage from './pages/Mortgage'

export default function App() {
  return (

    <Routes>
      <Route element={<Layout />}>
      <Route index element={<GithubSearch />} />
      <Route path='/counter' element={<Counter />} />
      <Route path='/products' element={<Products />} />
      <Route path='/mortgage' element={<Mortgage />} />
      </Route>
    </Routes>
  )
}

