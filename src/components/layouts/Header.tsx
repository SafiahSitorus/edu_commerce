/**
 * Header Component - Presentational
 * Navigation bar untuk landing page
 */

'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { images } from "@/assets";
import Image from "next/image";

interface HeaderProps {
  onLoginClick: () => void;
  isAuthenticated?: boolean;
}

export default function Header({ onLoginClick, isAuthenticated = false }: HeaderProps) {
  return (
    <header className="bg-white border-b position-sticky" style={{ top: 0, zIndex: 999, position: 'sticky' }}>
      <div
        className="d-flex align-center justify-between"
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.5rem', minHeight: 72 }}
      >
        {/* Logo */}
        <div className="d-flex align-center" style={{ minWidth: 120 }}>
          <Image
            src={images.heroEdusav}
            alt="Edusav Logo"
            width={40}
            height={40}
            style={{ objectFit: 'contain' }}
          />
          <span style={{ fontWeight: 700, fontSize: 24, marginLeft: 8, color: '#0080A8', letterSpacing: 1 }}>edusav</span>
        </div>

        {/* Search Bar */}
        <div className="d-flex align-center" style={{ flex: 1, maxWidth: 500, margin: '0 2rem' }}>
          <div className="position-relative w-full">
            <Search className="position-absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: '#9ca3af' }} />
            <Input
              type="search"
              placeholder="coba cari: video tutorial"
              style={{ paddingLeft: 44, height: 40, width: '100%', background: '#f5f6fa', border: '1px solid #e5e7eb', borderRadius: 8 }}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="d-flex align-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart style={{ width: 22, height: 22 }} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell style={{ width: 22, height: 22 }} />
          </Button>
          {!isAuthenticated ? (
            <Button onClick={onLoginClick} className="btn btn-primary" style={{ minWidth: 80 }}>
              Log in
            </Button>
          ) : (
            <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', minWidth: 80 }}>
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
