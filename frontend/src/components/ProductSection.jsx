import React from 'react'
import bgImage from '../assets/4.png'
import ProductCard from './ProductCard'

const products = [
    {images:'#', name:"product name", description:"dkfdlf ldfjf dlfjd fdjfdk"},
    {images:'#', name:"product name", description:"dkfdlf ldfjf dlfjd fdjfdk"},
    {images:'#', name:"product name", description:"dkfdlf ldfjf dlfjd fdjfdk"},
    {images:'#', name:"product name", description:"dkfdlf ldfjf dlfjd fdjfdk"},
]

function ProductSection() {
  return (
    <div id='product' className='relative w-full min-h-screen md:py-10'>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
        </div>

        <div className='z-30 w-full tracking-wide md:tracking-wider relative top-10 md:top-6 flex flex-col text-4xl md:text-5xl items-center justify-center gap-3 mb-20'>
        <p className='flex gap-3'>
            <span className='font-bold text-orange-500 text-stroke'>MADE</span>
            <span className='font-bold text-blue-900 text-stroke'>IN</span>
            <span className='font-bold text-green-500 text-stroke'>INDIA</span>
        </p>
        <p className='font-bold text-blue-900'>PRODUCTS</p>
        </div>

        <div className='w-full relative z-30 flex flex-wrap items-center justify-center gap-10 pb-8'>
            {
                products.map((product,idx)=>(
                    <ProductCard product={product} key={`${product.name}-${idx}`}/>
                ))
            }
        </div>
        
    </div>
  )
}

export default ProductSection