# Features Directory

This directory contains feature modules organized by business domain.

## Structure

Each feature follows the same structure:

```
features/
├── feature-name/
│   ├── components/     # Feature-specific UI components
│   ├── hooks/          # Feature-specific React hooks
│   ├── services/       # API calls and external services
│   ├── store/          # Redux slices and state management
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Feature-specific utilities (optional)
│   └── index.ts        # Public API - exports what's needed outside
```

## Current Features

### 1. Auth (`features/auth/`)
Authentication and user management
- Login/Logout
- Registration
- Session management
- Protected routes

### 2. Landing (`features/landing/`)
Landing page and public-facing content
- Hero banners
- Product showcase
- Category filters
- Marketing content

### 3. Courses (`features/courses/`)
Course management (to be implemented)
- Course listing
- Course details
- Enrollment
- Progress tracking

## Usage Guidelines

### Importing from Features

Always import from the feature's index.ts (public API):

```typescript
// ✅ Good - Import from public API
import { LoginForm } from '@/features/auth';
import { LandingPage } from '@/features/landing';

// ❌ Bad - Don't import internal files directly
import LoginForm from '@/features/auth/components/LoginForm';
```

### Feature Independence

Features should be independent:

```typescript
// ❌ Bad - Feature depends on another feature
import { useAuth } from '@/features/auth';  // in courses feature

// ✅ Good - Use shared hooks
import { useCurrentUser } from '@/hooks';
```

### Adding a New Feature

1. Create feature folder:
```bash
mkdir -p features/new-feature/{components,hooks,services,store,types}
```

2. Create index.ts:
```typescript
// features/new-feature/index.ts
export { ComponentName } from './components/ComponentName';
export { useFeatureHook } from './hooks/useFeatureHook';
```

3. Implement components, hooks, etc.

4. Import in your app pages:
```typescript
import { ComponentName } from '@/features/new-feature';
```

## Feature Checklist

When creating a new feature, consider:

- [ ] Components - UI elements
- [ ] Hooks - Business logic
- [ ] Services - API calls
- [ ] Store - State management (if needed)
- [ ] Types - TypeScript definitions
- [ ] Tests - Unit & integration tests
- [ ] Documentation - Feature README

## Best Practices

1. **Keep features independent** - Avoid cross-feature dependencies
2. **Use public API pattern** - Only export what's needed
3. **Shared code goes to `/components` or `/hooks`** - Not in features
4. **One feature = one business domain** - Don't mix concerns
5. **Test features in isolation** - Each feature should be testable alone

## Future Features

Planned features based on roadmap:

- [ ] `video/` - Video player and streaming
- [ ] `payment/` - Payment processing
- [ ] `live-stream/` - Live streaming functionality
- [ ] `analytics/` - Usage analytics
- [ ] `search/` - Search and discovery
- [ ] `notifications/` - User notifications
