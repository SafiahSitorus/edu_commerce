/**
 * Landing Page Container - Business Logic
 * Menghandle semua logic untuk landing page
 */

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { images } from "@/assets";
import Image from "next/image";

// Mock data - nanti bisa diganti dengan API call
const BANNERS = [
  {
    id: 1,
    title: 'New chalk art',
    subtitle: 'Creative designs for education',
    bgColor: 'bg-purple-100',
    image: images.carousel,
  },
  {
    id: 2,
    title: '20% points added',
    subtitle: 'Get more rewards',
    bgColor: 'bg-blue-100',
    image: '/banner2.jpg',
  },
];

const INITIAL_CATEGORIES = [
  { id: 'all', label: 'All', active: true },
  { id: 'dvd-template', label: 'DVD template', active: false },
  { id: 'digital-template', label: 'Digital template', active: false },
  { id: 'lnc-back', label: 'LNC back', active: false },
  { id: 'catalog-us', label: 'Catalog us', active: false },
  { id: 'self-workout', label: 'Self workout', active: false },
  { id: 'ride-voucher', label: 'Ride voucher', active: false },
  { id: 'fnb-voucher', label: 'F+B voucher', active: false },
  { id: 'catalog-jock', label: 'Catalog Jock', active: false },
  { id: 'promode-lo', label: 'Promode lo', active: false },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    title: 'Voucher Ride Hailing by Golek Store',
    description: 'Short description regarding content, how to use, etc.',
    price: 5000,
    originalPrice: 10000,
    image: images.carousel,
    badge: '-50%',
    merchant: 'Merchant logo',
  },
  {
    id: '2',
    title: 'Judul konten hingga dua baris',
    description: 'Short description regarding content, how to use, etc.',
    price: 5000,
    originalPrice: 10000,
    image: "",
    merchant: 'Merchant logo',
  },
];

export function useLandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  // Handle login button click
  const handleLoginClick = useCallback(() => {
    router.push('/login');
  }, [router]);

  // Handle category selection
  const handleCategoryClick = useCallback((categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        active: cat.id === categoryId,
      }))
    );
    setSelectedCategory(categoryId);
    
    // TODO: Filter products berdasarkan kategori
    // Atau fetch data baru dari API
  }, []);

  // Handle product click
  const handleProductClick = useCallback((productId: string) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    // Navigate to product detail
    router.push(`/products/${productId}`);
  }, [isAuthenticated, router]);

  // Handle bookmark
  const handleBookmark = useCallback((productId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // TODO: Add bookmark logic
    console.log('Bookmarked:', productId);
  }, [isAuthenticated, router]);

  // Handle view all
  const handleViewAll = useCallback((section: string) => {
    router.push(`/products?section=${section}`);
  }, [router]);

  return {
    banners: BANNERS,
    categories,
    products,
    selectedCategory,
    isAuthenticated,
    handlers: {
      onLoginClick: handleLoginClick,
      onCategoryClick: handleCategoryClick,
      onProductClick: handleProductClick,
      onBookmark: handleBookmark,
      onViewAll: handleViewAll,
    },
  };
}
