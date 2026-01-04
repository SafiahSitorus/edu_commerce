# EduBO - Education Back Office

A modern, scalable, and maintainable Next.js application for education management system.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 📁 Project Structure

```
edu-commerce/
├── app/                          # Next.js app directory
│   ├── dashboard/                # Dashboard page (protected)
│   ├── login/                    # Login page
│   ├── layout.tsx               # Root layout with Redux Provider
│   └── page.tsx                 # Home page (redirects)
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   │   └── LoginForm.tsx       # Login form component
│   └── ui/                      # shadcn/ui components
├── config/                       # Configuration files
│   └── env.ts                   # Environment validation
├── services/                     # API services
│   ├── api-client.ts           # Axios instance with interceptors
│   └── auth.service.ts         # Authentication API calls
├── store/                        # Redux store
│   ├── features/                # Redux slices
│   │   └── authSlice.ts        # Authentication slice
│   ├── hooks.ts                # Typed Redux hooks
│   ├── index.ts                # Store configuration
│   └── provider.tsx            # Redux Provider component
├── types/                        # TypeScript types
│   └── auth.ts                  # Authentication types
├── utils/                        # Utility functions
│   └── storage.ts              # LocalStorage utilities
├── .env.local                   # Development environment
├── .env.staging                 # Staging environment
├── .env.production              # Production environment
└── .env.example                 # Environment template
```

## 🏗️ Architecture & Design Patterns

### Separation of Concerns

1. **Components** (`/components`)
   - Focused, reusable UI components
   - Separated by feature (auth, ui, etc.)

2. **Services** (`/services`)
   - API communication layer
   - Axios instance with interceptors
   - Separated by domain (auth, etc.)

3. **Store** (`/store`)
   - Redux Toolkit for state management
   - Slices organized by feature
   - Typed hooks for type safety

4. **Utils** (`/utils`)
   - Reusable utility functions
   - localStorage wrapper
   - Type-safe implementations

### State Management

- **Redux Toolkit** for global state
- **Async thunks** for API calls
- **Reducers** for state updates
- **Selectors** via typed hooks

### API Layer

- Centralized **Axios instance**
- Request/Response **interceptors**
- Automatic token injection
- Global error handling

## 🔧 Environment Variables

### Required Variables

```bash
NEXT_PUBLIC_API_URL=https://api.edusav.com/api
NEXT_PUBLIC_APP_NAME=EduBO
NEXT_PUBLIC_LOYALTY_API_URL=https://apigolang.edusav.com
NEXT_PUBLIC_DOKU_MERCHANT_ID=BRN-0215-1720652623637
NEXT_PUBLIC_DOKU_CALLBACK_URL=https://loyalty.edusav.com/dashboard
NEXT_PUBLIC_DOKU_RETURN_URL=https://loyalty.edusav.com/dashboard
NEXT_PUBLIC_ENV=development # or staging, production
```

### Environment Files

- `.env.local` - Development
- `.env.staging` - Staging
- `.env.production` - Production
- `.env.example` - Template

### Environment Validation

The application validates all required environment variables at runtime using `config/env.ts`. Missing variables will throw an error with clear messages.

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Authentication Flow

1. User enters credentials in login form
2. Form validates input using Zod schema
3. Redux thunk dispatches login action
4. API service makes POST request to `/auth/loginUser`
5. On success:
   - Token saved to localStorage
   - User data saved to localStorage
   - Redux state updated
   - Redirect to dashboard
6. On error:
   - Error displayed in UI
   - State remains unauthenticated

### Token Management

- Tokens stored in localStorage via `storageService`
- Automatically injected in API requests via Axios interceptor
- Cleared on logout or 401 responses

## 🎯 Key Features

### Login Page (`/login`)

- Email & password authentication
- Form validation with Zod
- Password visibility toggle
- Loading states
- Error handling
- Responsive design

### Dashboard Page (`/dashboard`)

- Protected route (requires authentication)
- User information display
- Logout functionality
- Auto-redirect if not authenticated

### Redux Store

**Auth Slice** (`store/features/authSlice.ts`)
- State: user, token, isLoading, isAuthenticated, error
- Actions: setAuthFromStorage, clearAuth, clearError, updateUser
- Async Thunks: loginUser, logoutUser

**Store Configuration** (`store/index.ts`)
- Configured with Redux Toolkit
- Type-safe RootState and AppDispatch

**Custom Hooks** (`store/hooks.ts`)
- useAppDispatch - Typed dispatch hook
- useAppSelector - Typed selector hook

### API Services

**Axios Client** (`services/api-client.ts`)
- Base URL from environment
- Request interceptor: Adds Bearer token
- Response interceptor: Handles 401, errors

**Auth Service** (`services/auth.service.ts`)
- loginUser(credentials)
- logout()
- getCurrentUser()
- refreshToken()

### Storage Utilities

**localStorage Service** (`utils/storage.ts`)
- setToken / getToken / removeToken
- setUser / getUser / removeUser
- clearAuth
- isAuthenticated

## 🎨 UI Components (shadcn/ui)

Pre-installed components:
- Button
- Input
- Label
- Card
- Form

All components are customizable and follow Tailwind CSS patterns.

## 📝 API Endpoints

### Authentication

**POST** `/auth/loginUser`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## 🔒 Security Features

1. **Environment Validation**: All env vars validated at runtime
2. **Token Storage**: Secure localStorage implementation
3. **Auto Logout**: On 401 responses
4. **Error Handling**: Global error interceptor
5. **Type Safety**: Full TypeScript coverage

## 🚢 Deployment

### Development
```bash
npm run dev
```

### Staging
```bash
cp .env.staging .env.local
npm run build
npm start
```

### Production
```bash
cp .env.production .env.local
npm run build
npm start
```

## 🔄 Adding New Features

### Add New Redux Slice

1. Create slice in `store/features/yourFeature.ts`
2. Add reducer to `store/index.ts`
3. Use via `useAppSelector` and `useAppDispatch`

### Add New API Service

1. Create service in `services/yourService.ts`
2. Use `apiClient` for HTTP calls
3. Define types in `types/yourTypes.ts`

### Add New Component

1. Create in `components/yourFeature/YourComponent.tsx`
2. Use shadcn/ui components
3. Connect to Redux if needed

## 📖 Best Practices

1. **Type Everything**: Use TypeScript for all files
2. **Separate Concerns**: Keep components, services, and state separate
3. **Use Hooks**: Leverage custom Redux hooks
4. **Error Handling**: Handle errors at service and component level
5. **Validation**: Validate forms with Zod schemas
6. **Environment**: Never hardcode API URLs or secrets
7. **Comments**: Document complex logic

---

**Built with ❤️ using Next.js & Redux Toolkit**


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
