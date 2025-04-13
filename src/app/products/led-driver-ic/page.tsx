import { getLEDDriverICs } from '@/lib/supabase-client';
import { ProductList } from './components/ProductList';
import { Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function LEDDriverICPage() {
  const { products, filterOptions } = await getLEDDriverICs();

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400">
            Failed to load LED Driver IC products. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-16 md:py-24">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-8">
              <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <span className="text-gray-600">/</span>
              <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
              <span className="text-gray-600">/</span>
              <span className="text-blue-400">LED Driver ICs</span>
            </div>
            
            {/* Title and badges */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-blue-400" />
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    LED Driver IC Products
                  </h1>
                </div>
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-0">High Performance</Badge>
                  <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 border-0">Advanced Control</Badge>
                </div>
                <p className="max-w-2xl text-gray-400 md:text-lg">
                  Browse our comprehensive collection of LED Driver ICs with detailed specifications and immediate datasheet access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-start space-y-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium">PRODUCT CATALOG</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Browse All Products</h2>
          <p className="text-gray-400 max-w-2xl">
            Filter and search through our extensive selection of LED Driver ICs from leading manufacturers.
          </p>
        </div>

        <ProductList products={products} filterOptions={filterOptions} />
      </div>
    </div>
  );
} 