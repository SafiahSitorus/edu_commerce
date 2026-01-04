/**
 * Login Form Component
 * Handles user authentication with email and password
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/features/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Clear previous errors
    dispatch(clearError());

    try {
      const result = await dispatch(loginUser(data)).unwrap();
      
      // Login successful - redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      // Error is handled by Redux slice
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex justify-center align-center min-h-screen p-4">
      <Card className="w-full" style={{ maxWidth: '400px' }}>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Masuk ke akun EduBO Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-4">
            {/* Email Field */}
            <div className="form-group">
              <Label htmlFor="email" className="form-label form-label-required">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                {...register('email')}
                disabled={isLoading}
                className={errors.email ? 'form-input-error' : 'form-input'}
              />
              {errors.email && (
                <span className="form-error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <Label htmlFor="password" className="form-label form-label-required">Password</Label>
              <div className="position-relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  disabled={isLoading}
                  className={errors.password ? 'form-input-error' : 'form-input'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute"
                  style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="form-error-message">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Error Message from API */}
            {error && (
              <div className="d-flex align-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <AlertCircle className="w-5 h-5 text-error" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <a href="#" className="text-primary text-sm hover:underline">
              Lupa password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
