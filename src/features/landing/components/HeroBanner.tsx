/**
 * Hero Banner Component - Presentational
 * Banner carousel untuk promosi
 */

'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  image: string;
}

interface HeroBannerProps {
  banners: Banner[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="position-relative overflow-hidden rounded-lg" style={{ height: '240px' }}>
      <div className="d-flex" style={{ transition: 'transform 0.5s ease-in-out' }}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              flex: '0 0 100%',
              width: '100%'
            }}
          >
            <div
              className={`position-relative overflow-hidden rounded-lg p-8 ${banner.bgColor}`}
              style={{ minHeight: '200px' }}
            >
              <div className="position-relative" style={{ zIndex: 10 }}>
                <h2 className="font-bold mb-2" style={{ fontSize: '32px', color: 'white' }}>
                  {banner.title}
                </h2>
                <p className="text-white" style={{ fontSize: '16px' }}>{banner.subtitle}</p>
              </div>
              <div className="position-absolute" style={{ top: 0, right: 0, bottom: 0, left: 0, opacity: 0.1 }}>
                {/* Background illustration placeholder */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="position-absolute" style={{ top: '50%', left: '16px', transform: 'translateY(-50%)', zIndex: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        onClick={prevSlide}
      >
        <ChevronLeft style={{ width: '24px', height: '24px' }} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="position-absolute" style={{ top: '50%', right: '16px', transform: 'translateY(-50%)', zIndex: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        onClick={nextSlide}
      >
        <ChevronRight style={{ width: '24px', height: '24px' }} />
      </Button>

      {/* Dots Indicator */}
      <div className="position-absolute d-flex gap-2 justify-center" style={{ bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`rounded-lg ${index === currentSlide ? 'opacity-100' : 'opacity-50'}`}
            style={{ width: index === currentSlide ? '24px' : '8px', height: '8px', backgroundColor: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
