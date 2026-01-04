/**
 * Landing Page - Main Page
 * Homepage untuk user yang belum login
 */

'use client';

import Header from '@/components/layouts/Header';
import { useLandingPage,SectionHeader,ProductCard,CategoryFilter,HeroBanner } from '@/features/landing';

export default function LandingPage() {
  const {
    banners,
    categories,
    products, 
    isAuthenticated,
    handlers,
  } = useLandingPage();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <Header 
        onLoginClick={handlers.onLoginClick} 
        isAuthenticated={isAuthenticated}
      />

      {/* Main Content */}
      <main className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Hero Banner */}
        <section style={{ marginBottom: '3rem' }}>
          <HeroBanner banners={banners} />
        </section>

        {/* Top 10 Content Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="Top 10 content"
            onViewAll={() => handlers.onViewAll('top-10')}
          />
          
          {/* Category Filter */}
          <div style={{ marginBottom: '2rem' }}>
            <CategoryFilter
              categories={categories}
              onCategoryClick={handlers.onCategoryClick}
            />
          </div>

          {/* Product Grid */}
          <div className="d-grid a" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>

        {/* Limited Time Offer Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="Limited time offer"
            subtitle="Enjoy up to 50% off on selected picks"
            onViewAll={() => handlers.onViewAll('limited-offer')}
          />
          
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>

        {/* Popular Picks Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="Popular picks"
            subtitle="What's trending on Edusav now"
            onViewAll={() => handlers.onViewAll('popular')}
          />
          
          <div className="d-grid b" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>

        {/* E-voucher Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="E-voucher"
            subtitle="All special voucher collected"
            onViewAll={() => handlers.onViewAll('e-voucher')}
          />
          
          <div className="d-grid c" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="Video"
            subtitle="Short lessons that make learning easy"
            onViewAll={() => handlers.onViewAll('video')}
          />
          
          <div className="d-grid 6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>

        {/* Digital Templates Section */}
        <section style={{ marginBottom: '3rem' }}>
          <SectionHeader
            title="Digital templates"
            subtitle="Ready to use templates for your productivity"
            onViewAll={() => handlers.onViewAll('templates')}
          />
          
          <div className="d-grid g  " style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handlers.onProductClick}
                onBookmark={handlers.onBookmark}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Kantor Pusat - Menara Prima</h3>
              <p className="text-sm text-gray-600">
                Jl. Dr. Ide Anak Agung Gde Agung Blok 6.2<br />
                Kawasan Mega Kuningan, Jakarta Selatan 12950
              </p>
              <p className="text-sm text-gray-600 mt-2">
                WhatsApp: +6281 1188 1122<br />
                Email: info@edusav.com
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Discover</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>E-voucher</li>
                <li>Digital template</li>
                <li>Video</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Program</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Referral</li>
                <li>Reward points</li>
                <li>Edusav rewards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Edusav</li>
                <li>Privacy policy</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © Copyright 2025 - PT Drivosav Edusav Proaktif
          </div>
        </div>
      </footer>
    </div>
  );
}
