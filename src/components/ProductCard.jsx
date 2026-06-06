import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ProductCard({product}){
  const { t } = useLanguage()
  return (
    <article className="product-card card">
      <img src={product.image || 'https://via.placeholder.com/160'} alt={product.name} />
      <div className="product-body">
        <div className="product-title">{product.name}</div>
        <div className="product-meta">{product.rating} ⭐ — ₹{product.price}</div>
        <div className="product-reviews">{product.reviews? product.reviews.length : 0} reviews</div>
        <div className="product-actions">
          <button className="btn-secondary">{t('products.details')}</button>
          <button className="btn-primary">{t('products.buyNow')}</button>
        </div>
      </div>
    </article>
  )
}
