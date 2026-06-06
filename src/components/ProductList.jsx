import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import ProductCard from './ProductCard'

const sample = [
  {id:1, image:'https://via.placeholder.com/120', name:'Fungicide A', price:12.5, rating:4.5},
  {id:2, image:'https://via.placeholder.com/120', name:'Fertilizer B', price:8.0, rating:4.0}
]

export default function ProductList(){
  const { t } = useLanguage()
  return (
    <section className="product-list">
      <div className="filters card">
        <label>{t('products.filterByDisease')}</label>
        <select><option>{t('products.all')}</option></select>
      </div>
      <div className="products-grid">
        {sample.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
