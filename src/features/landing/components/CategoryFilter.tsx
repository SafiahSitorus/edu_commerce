/**
 * Category Filter Component - Presentational
 * Filter untuk kategori konten
 */

'use client';

interface Category {
  id: string;
  label: string;
  active?: boolean;
}

interface CategoryFilterProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

export default function CategoryFilter({ categories, onCategoryClick }: CategoryFilterProps) {
  return (
    <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          className={category.active ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
