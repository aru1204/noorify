import React from 'react';
import { Helmet } from 'react-helmet';
import useProducts from '../../Hooks/useProducts/useProducts';
import ProductCard from './productCard';

const Products = () => {

    const [products, refetch] = useProducts();

    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>Noorify | All Products</title>
            </Helmet>
            <div>
                <h1 className='text-2xl text-white font-semibold text-center my-5 md:my-10'>All Products ({products.length})</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pb-10 px-3'>
                {
                    products.map((product, index) => <ProductCard key={index} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;