import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { productService } from '../services/api';
import type { Product } from '../types';
import { Link } from 'react-router-dom';

export const AdminProducts: FC = () => {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  // Add product form
  const [name, setName]                       = useState('');
  const [description, setDescription]         = useState('');
  const [imageFile, setImageFile]             = useState<File | null>(null);
  const [imagePreview, setImagePreview]       = useState<string | null>(null);
  const [pricePlate, setPricePlate]           = useState('');
  const [priceHalfKg, setPriceHalfKg]         = useState('');
  const [priceKg, setPriceKg]                 = useState('');
  const [message, setMessage]                 = useState('');
  const [productLoading, setProductLoading]   = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAdd = async () => {
    const plate  = Number(pricePlate);
    const halfKg = Number(priceHalfKg);
    const kg     = Number(priceKg);

    if (!name || !description || !imageFile || plate <= 0 || halfKg <= 0 || kg <= 0) {
      setMessage('❌ Please fill all fields and select an image.');
      return;
    }

    setProductLoading(true);
    setMessage('Uploading image...');

    try {
      console.log('📤 Uploading:', imageFile.name);
      const uploadRes = await productService.uploadImage(imageFile);
      console.log('✅ Cloudinary URL:', uploadRes.url);

      setMessage('Saving product...');
      await productService.create({
        name,
        description,
        image:     uploadRes.url,
        prices:    { plate, halfKg, kg },
        available: true,
      });

      setMessage('✅ Product added successfully!');
      setName('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setPricePlate('');
      setPriceHalfKg('');
      setPriceKg('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add product: ' + (err as Error).message);
    } finally {
      setProductLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productService.delete(id);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Link to="/admin" className="text-sm text-gray-400 hover:text-brand transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        {/* ── Add Product Form ── */}
        <div className="rounded-3xl border border-white/10 bg-surface2 p-6 shadow-xl card-border mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Add New Product</h2>
            <p className="text-gray-400 text-sm">Upload a photo and fill in the details to add a menu item.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-white/20 rounded-2xl h-48 flex items-center justify-center overflow-hidden hover:border-brand/50 transition-colors"
              >
                {imagePreview
                  ? <img src={imagePreview} alt="preview" className="h-full w-full object-cover rounded-2xl" />
                  : <div className="text-center">
                      <p className="text-3xl mb-2">📷</p>
                      <p className="text-gray-400 text-sm">Click to select an image</p>
                      <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP, AVIF up to 5MB</p>
                    </div>
                }
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imageFile && (
                <p className="text-xs text-gray-400 mt-1">
                  Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-gray-500"
              placeholder="Product name"
            />

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-gray-500"
              placeholder="Description"
            />

            <input
              type="number"
              value={pricePlate}
              onChange={(e) => setPricePlate(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-gray-500"
              placeholder="Plate price (₹)"
            />
            <input
              type="number"
              value={priceHalfKg}
              onChange={(e) => setPriceHalfKg(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-gray-500"
              placeholder="1.5 KG price (₹)"
            />
            <input
              type="number"
              value={priceKg}
              onChange={(e) => setPriceKg(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white placeholder-gray-500"
              placeholder="1 KG price (₹)"
            />
          </div>

          {message && (
            <p className={`mt-4 text-sm ${message.startsWith('❌') ? 'text-red-400' : 'text-brand'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleAdd}
            disabled={productLoading}
            className="btn-primary mt-6 disabled:opacity-50"
          >
            {productLoading ? message || 'Adding...' : 'Add Product'}
          </button>
        </div>

        {/* ── Product List ── */}
        <div className="rounded-3xl border border-white/10 bg-surface2 p-6 shadow-xl card-border">
          <h2 className="text-lg font-bold mb-4">All Products</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-sm">No products yet. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/5 rounded-2xl p-4 hover:bg-white/5 transition-colors"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover bg-white/5 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{p.name}</div>
                      <div className="text-sm text-gray-400 mt-0.5">
                        Plate: ₹{p.prices.plate || 0} &nbsp;·&nbsp;
                        1 KG: ₹{p.prices.kg || 0} &nbsp;·&nbsp;
                        1.5 KG: ₹{p.prices.halfKg || 0}
                      </div>
                    </div>
                  </div>

                  {/* Actions — full width row on mobile, inline on desktop */}
                  <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="btn-secondary flex-1 sm:flex-none text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn-secondary flex-1 sm:flex-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;