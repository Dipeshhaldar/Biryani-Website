import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../services/api';
import type { Product } from '../types';

export const Menu: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (fetchError) {
        console.error('Failed to fetch products:', fetchError);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-300">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="rounded-3xl border border-white/10 bg-surface2 p-10 shadow-xl card-border text-center">
            <h1 className="text-3xl font-bold mb-4">Menu unavailable</h1>
            <p className="text-gray-400 mb-6">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-brand font-semibold uppercase tracking-[0.4em] mb-2">Kilo Biryani</p>
            <h1 className="text-4xl md:text-5xl font-bold">Explore the Menu</h1>
            <p className="text-gray-400 mt-2">Choose from our signature biryani plates and KG servings.</p>
          </div>
          <div>
            <p className="inline-flex items-center rounded-full border border-brand/40 bg-white/5 px-4 py-2 text-brand text-sm font-semibold">
              Bold, smoky, golden flavors
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-surface2 rounded-3xl shadow-xl p-10 text-center card-border">
            <p className="text-gray-400">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};