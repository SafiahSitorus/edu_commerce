/**
 * Section Header Component - Presentational
 * Header untuk setiap section dengan tombol "View all"
 */

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  showViewAll?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  onViewAll,
  showViewAll = true,
}: SectionHeaderProps) {
  return (
    <div className="d-flex align-center justify-between" style={{ marginBottom: '1.5rem' }}>
      <div>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        {subtitle && (
          <p className="text-gray-600" style={{ fontSize: '14px' }}>{subtitle}</p>
        )}
      </div>
      {showViewAll && (
        <Button
          variant="outline"
          onClick={onViewAll}
          className="d-flex align-center gap-2"
        >
          View all
          <ArrowRight style={{ width: '16px', height: '16px' }} />
        </Button>
      )}
    </div>
  );
}
