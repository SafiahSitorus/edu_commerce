/**
 * Product Card Component - Presentational
 * Card untuk menampilkan produk/voucher
 */

'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  merchant?: string;
  onBookmark?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  badge,
  merchant,
  onBookmark,
  onClick,
}: ProductCardProps) {
  return (
    <Card 
      className="card card-hover overflow-hidden" style={{ cursor: 'pointer' }}
      onClick={() => onClick?.(id)}
    >
      <CardContent className="p-0">
        {/* Image */}
        <div
          className="position-relative overflow-hidden"
          style={{
            width: '100%',
            height: '200px',
            maxWidth: '100%',
            overflow: 'hidden',
            borderRadius: 12,
          }}
        >
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              sizes="(max-width: 600px) 100vw, 280px"
              priority
            />
          )}
          {badge && (
            <div className="position-absolute" style={{ top: '8px', left: '8px' }}>
              <Badge variant="destructive">{badge}</Badge>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(id);
            }}
            className="position-absolute btn-icon" style={{ top: '8px', right: '8px', backgroundColor: 'white' }}
          >
            <Bookmark style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold mb-2" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            {title}
          </h3>
          <p className="mb-3" style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
            {description}
          </p>
          
          {/* Price */}
          <div className="mb-2">
            <div>
              <span className="font-bold text-primary" style={{ fontSize: '18px' }}>
                Rp{price.toLocaleString('id-ID')}
              </span>
              {originalPrice && (
                <span className="ml-2" style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
                  Rp{originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>
          </div>

          {/* Merchant */}
          {merchant && (
            <div className="d-flex align-center gap-2" style={{ fontSize: '14px', color: '#6b7280' }}>
              <span className="rounded-lg" style={{ width: '6px', height: '6px', backgroundColor: '#10b981' }} />
              {merchant}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
