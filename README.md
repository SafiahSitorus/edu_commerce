# EduBO - Education Commerce Platform

A modern, scalable Next.js e-commerce platform for educational content with authentication, landing page, and dashboard.

## 🚀 Quick Start

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

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 📚 Documentation

All documentation files are in the `/docs` folder:

- **[QUICK-START.md](./docs/QUICK-START.md)** - Quick start guide
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture & diagrams
- **[STRUCTURE.md](./docs/STRUCTURE.md)** - Folder structure guide
- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Development workflow & examples
- **[PROJECT-SUMMARY.md](./docs/PROJECT-SUMMARY.md)** - Complete project summary
- **[FILE-LIST.md](./docs/FILE-LIST.md)** - Complete file list

## ✨ Features

### 🏠 Landing Page
- Beautiful hero banner with carousel
- Category filtering
- Product grid display
- Responsive design
- Accessible for non-authenticated users

### 🔐 Authentication System
- Email & password login
- Form validation with Zod
- Redux state management
- Token storage in localStorage
- Protected routes
- Auto-logout on 401

### 📊 Dashboard
- User profile information
- Quick action cards
- Stats overview
- Protected route (requires login)

### 🎯 Route Protection
- Middleware for server-side checks
- RouteGuard component for client-side protection
- Automatic redirects based on auth status
- Validation before and after login

## 🏗️ Architecture

### Component Organization

```
components/
├── auth/           # Authentication components
├── common/         # Shared components (Header, RouteGuard)
├── landing/        # Landing page components
└── ui/             # shadcn/ui base components
```

### Container Pattern

Business logic separated in `containers/`:
- `LandingPageContainer.tsx` - Handles landing page logic

### State Management

Redux Toolkit for global state:
- Auth slice with reducers
- Async thunks for API calls
- Typed hooks (useAppDispatch, useAppSelector)

## 🔧 Tech Stack

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
├── app/                    # Next.js pages
│   ├── dashboard/         # Protected dashboard
│   ├── login/            # Login page
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── auth/            # Auth components
│   ├── common/          # Shared components
│   ├── landing/         # Landing components
│   └── ui/              # Base UI components
├── containers/           # Business logic containers
├── services/            # API services
├── store/               # Redux store
├── types/               # TypeScript types
├── utils/               # Utility functions
├── config/              # Configuration
└── docs/                # Documentation
```

## 🌍 Environment Variables

See `.env.example` for required environment variables.

```bash
NEXT_PUBLIC_API_URL=https://api.edusav.com/api
NEXT_PUBLIC_APP_NAME=EduBO
# ... more variables
```

## 🎨 Design Pattern

### Separation of Concerns

1. **Presentational Components** (`/components`)
   - Pure UI components
   - Receive data via props
   - Emit events via callbacks

2. **Container Components** (`/containers`)
   - Business logic
   - State management
   - API calls
   - Event handlers

3. **Services** (`/services`)
   - API communication
   - Data transformation

4. **Store** (`/store`)
   - Global state
   - Redux slices
   - Async thunks

## 🔐 Route Protection

### Before Login
- `/` → Shows landing page
- `/login` → Shows login form
- `/dashboard` → Redirects to login

### After Login
- `/` → Redirects to dashboard
- `/login` → Redirects to dashboard
- `/dashboard` → Shows dashboard

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure environment**: Copy `.env.example` to `.env.local`
4. **Run development server**: `npm run dev`
5. **Open browser**: http://localhost:3000

## 📖 Documentation

For detailed documentation, see the `/docs` folder:

- Architecture overview
- Development guide
- Component structure
- API integration
- Best practices

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain component separation
3. Add TypeScript types
4. Update documentation
5. Test before committing

## 📄 License

Private - EduBO Education System

---

**Built with ❤️ using Next.js, Redux Toolkit, and shadcn/ui**
