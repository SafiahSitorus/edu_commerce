/**
 * Dashboard Page
 * Protected dashboard page - requires authentication
 */

'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/features/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RouteGuard from '@/components/layouts/RouteGuard';
import { LogOut, User, ShoppingBag, Heart, Settings } from 'lucide-react';

function DashboardContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <header className="">
        <div className="">
          <div className="">
            <div className="">
              <span className="">E</span>
            </div>
            <span className="">edusav</span>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoading}
            className=""
          >
            <LogOut className="" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        {/* Welcome Section */}
        <div className="">
          <h1 className="">
            Welcome back, {user?.name || user?.email || 'User'}! 👋
          </h1>
          <p className="">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No orders yet
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No saved items
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Points</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Start earning
              </p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Profile</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                Profile complete
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <div className="">
          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Account Information</CardTitle>
              <CardDescription className="">Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user?.email || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{user?.name || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="text-gray-900 font-mono text-sm">{user?.id || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Role</label>
                <p className="text-gray-900">{user?.role || 'User'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="">Quick Actions</CardTitle>
              <CardDescription className="">Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/')}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled
              >
                <Heart className="mr-2 h-4 w-4" />
                View Wishlist
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                disabled
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth={true}>
      <DashboardContent />
    </RouteGuard>
  );
}
