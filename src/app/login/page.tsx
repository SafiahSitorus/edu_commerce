/**
 * Login Page
 * Main login page that renders the login form
 * Protected: Only accessible when NOT authenticated
 */


"use client";

import { images } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          display: "flex",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
          maxWidth: 720,
          width: "100%",
        }}
      >
        {/* Left Illustration */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#f5f6fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Image
            src={images.carousel}
            alt="Login Illustration"
            width={340}
            height={340}
            style={{ objectFit: "contain", borderRadius: 12 }}
            priority
          />
        </div>
        {/* Right Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <Image
              src={images.heroEdusav}
              alt="Edusav Logo"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          </div>
          {/* Welcome Text */}
          <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, textAlign: "center", color: "#222" }}>
            Welcome to a place where<br />
            <span style={{ color: "#1db5a6" }}>learning and rewards come together</span>
          </h2>
          {/* Google Login Button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #d1d5db",
              borderRadius: 8,
              padding: "10px 24px",
              fontWeight: 500,
              fontSize: 16,
              background: "#fff",
              cursor: "pointer",
              marginBottom: 24,
              width: "100%",
              justifyContent: "center",
            }}
            // onClick={handleGoogleLogin}
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            Log in with Google
          </button>
          <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center" }}>
            By logging in, you agree to our{' '}
            <Link href="/terms" style={{ color: "#1db5a6", textDecoration: "underline" }}>Terms of use</Link> and{' '}
            <Link href="/privacy" style={{ color: "#1db5a6", textDecoration: "underline" }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

