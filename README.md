# Patient Care Journey Timeline

Interactive Patient Care Journey Timeline component for a maternal healthcare platform.

## Development Workflow

### Branch Strategy

- **`development`**: Main development branch
- **`main`**: Production branch (protected)
- **Feature branches**: Created from `development` as needed

### PR Process

1. Create feature branch from `development`
2. Make changes and commit (use semantic commit messages)
3. Create PR from feature branch → `development`
4. After review, merge to `development`
5. Create PR from `development` → `main`

### Automatic Checks

When creating a PR to `main`, the following checks run automatically:

- ✅ **Lint Check**: ESLint validation
- ✅ **Build Check**: TypeScript type check + Vite build
- ✅ **Test Check**: Unit tests with 80% coverage requirement
- ✅ **All Checks Passed**: Final validation

**All checks must pass before merge is allowed.**

### Release Process

After successful merge to `main`:

1. ✅ Automatic semantic version calculation
2. ✅ Release notes generation
3. ✅ Git tag creation
4. ✅ GitHub release creation
5. ✅ Package.json version update

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type check
npm run type-check

# Run linter
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run accessibility tests
npm run test:a11y

# Run accessibility audit
npm run a11y:audit

# Build for production
npm run build
```

## Commit Message Format

Use semantic commit messages:

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): code style changes
refactor(scope): refactoring
test(scope): add tests
chore(scope): maintenance tasks
```

## Branch Protection

The `main` branch is protected. See `.github/BRANCH_PROTECTION.md` for configuration details.

## Requirements

See `instructions/requirements/requirements.md` for complete project requirements.

## Development Guidelines

See `instructions/rules/cursor-guidelines/cursor-rules.md` for complete development guidelines.

## Architecture

### Technology Stack

This application is built with modern web technologies:

- **React 18+** - Functional components with hooks
- **TypeScript** - Strict type checking for type safety
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Fast build tool and development server
- **React Query (TanStack Query)** - Server state management
- **MSW (Mock Service Worker)** - API mocking for development
- **React Router** - Client-side routing
- **date-fns** - Date manipulation utilities

### State Management

**Decision: React Query for Server State**

We chose React Query (TanStack Query) for managing server state because:

- **Built-in Caching**: Reduces unnecessary API calls and improves performance
- **Automatic State Handling**: Provides loading, error, and success states out of the box
- **MSW Compatibility**: Works seamlessly with Mock Service Worker for development
- **Optimistic Updates**: Supports optimistic UI updates for better user experience
- **Standard Pattern**: Widely adopted pattern in the React ecosystem

**Client/UI State**: Managed locally with `useState` and `useReducer` hooks. Examples include:
- Drawer open/close state
- Theme preference (dark/light mode)
- Language selection
- Form input states

**Rationale**: Avoids global state abuse by keeping UI state close to where it's used. Simple state doesn't require complex solutions.

### Component Architecture

**Atomic Design Pattern**

The application follows Atomic Design principles for component organization:

- **Atoms**: Basic building blocks (Button, Input, Badge, Avatar)
- **Molecules**: Simple combinations (VisitCard, FormField, StatusBadge)
- **Organisms**: Complex components (TimelineContainer, JourneyStatusHeader, VisitDetailDrawer)
- **Templates**: Page layouts (DashboardLayout, AuthLayout)
- **Pages**: Full page components (Dashboard, CareJourney, LoginPage)

**Benefits**:
- Clear component hierarchy
- Reusability and composability
- Easier maintenance and testing
- Consistent design system

### API Integration

**MSW (Mock Service Worker)**

We use MSW for API mocking because:
- Works in both browser and Node.js environments
- Intercepts network requests at the service worker level
- Allows realistic API simulation with latency and error states
- No code changes needed between development and production

**Service Layer Pattern**

All API calls go through a centralized service layer:
- `src/services/journey.service.ts` - Patient journey data
- Services use a centralized Axios instance with error handling
- Services return typed DTOs for type safety
- Components use custom hooks that call services

### Data Flow

```
Component → Custom Hook → Service → Axios → MSW/API
                ↓
         React Query Cache
```

1. Components call custom hooks (e.g., `usePatientJourney`)
2. Hooks use React Query to fetch data via services
3. Services use centralized Axios instance
4. React Query handles caching, loading, and error states
5. Components receive typed data and state flags

## Tradeoffs and Decisions

### State Management: React Query vs Redux vs Zustand

**Decision**: React Query for server state, local state for UI

**Alternatives Considered**:
- **Redux**: Too heavy for this use case. Would require significant boilerplate for simple data fetching.
- **Zustand**: Good for global client state, but React Query is better suited for server state with caching needs.

**Trade-off**: React Query is perfect for server state but we still need local state for UI. This hybrid approach keeps things simple while leveraging the right tool for each job.

### Component Library: Shadcn UI vs Material-UI vs Custom

**Decision**: Shadcn UI + Tailwind CSS

**Rationale**:
- Shadcn provides accessible, customizable components
- Tailwind CSS allows rapid styling without custom CSS files
- Components are copied into the project (not a dependency), allowing full customization
- Better alignment with modern React patterns

**Trade-off**: Slightly more setup than a full framework, but provides more flexibility and control.

### Testing Strategy: Unit Tests vs Integration Tests

**Decision**: Focus on unit tests for components with 80% coverage target

**Rationale**:
- Unit tests are faster and easier to maintain
- Component-level tests catch most bugs
- Integration tests would require more complex setup (routing, API mocking)
- 80% coverage provides good confidence without over-testing

**Trade-off**: May miss some integration issues, but unit tests provide solid foundation for component reliability.

### Responsive Design: Mobile-First vs Desktop-First

**Decision**: Mobile-first approach

**Rationale**:
- Healthcare apps are frequently accessed on mobile devices
- Mobile-first ensures core functionality works on all devices
- Progressive enhancement for larger screens is easier than mobile retrofitting
- Better performance on mobile devices

**Trade-off**: Desktop experience may be less optimized initially, but mobile experience is prioritized (which is appropriate for healthcare).

### Accessibility: WCAG AA vs AAA

**Decision**: WCAG 2.1 Level AA compliance

**Rationale**:
- AA level provides good accessibility without excessive complexity
- Meets most legal and practical requirements
- AAA would require more time and may not be necessary for this use case
- Focus on practical improvements (keyboard navigation, screen readers, contrast)

**Trade-off**: Not the highest level of accessibility, but provides excellent usability for most users with disabilities.

## What I'd Improve with More Time

### 1. Testing Coverage

- **Current**: ~40% coverage for timeline components
- **Improvement**: Increase to 90%+ coverage with comprehensive integration tests
- **Benefits**: Higher confidence in code quality, easier refactoring

### 2. Performance Optimization

- **Current**: Basic React Query caching
- **Improvements**:
  - Implement virtual scrolling for long timelines
  - Add image lazy loading for doula photos
  - Code splitting for route-based chunks
  - Memoization optimization for expensive calculations

### 3. Internationalization (i18n)

- **Current**: UI ready but not fully functional
- **Improvement**: Complete Spanish translations and language switcher functionality
- **Benefits**: Better accessibility for Spanish-speaking patients

### 4. Animation and Transitions

- **Current**: Basic transitions
- **Improvements**:
  - Smooth timeline item animations
  - Drawer slide-in animations
  - Loading skeleton animations
  - Respect `prefers-reduced-motion` for accessibility

### 5. Error Handling

- **Current**: Basic error states
- **Improvements**:
  - Retry mechanisms with exponential backoff
  - Offline support with service workers
  - Better error messages with actionable steps
  - Error boundary components

### 6. Data Validation

- **Current**: TypeScript types provide compile-time safety
- **Improvements**:
  - Runtime validation with Zod or Yup
  - API response validation
  - Form input validation with better UX

### 7. Accessibility Enhancements

- **Current**: WCAG 2.1 AA compliant
- **Improvements**:
  - Screen reader testing with real users
  - Keyboard navigation improvements (arrow keys for timeline)
  - High contrast mode support
  - Focus management refinements

### 8. Developer Experience

- **Improvements**:
  - Pre-commit hooks for linting and testing
  - Automated accessibility checks in CI/CD
  - Better error messages in development
  - Component prop documentation with JSDoc

## How I'd Approach Add-On Services Feature

### Current State

The add-on services are currently display-only with "Coming Soon" or "Optional Add-On" labels. They're non-blocking to the core journey timeline.

### Implementation Approach

#### 1. Data Model Extension

```typescript
interface AddOnService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: 'acupuncture' | 'chiropractic' | 'massage' | 'therapy' | 'overnight';
  status: 'available' | 'coming_soon';
  imageUrl: string;
}

interface PatientJourney {
  // ... existing fields
  addOnServices?: AddOnService[];
  purchasedServices?: string[]; // Array of service IDs
}
```

#### 2. Component Architecture

- **Organism**: `AddOnServicesSection` - Main container for services
- **Molecule**: `AddOnServiceCard` - Individual service card (already exists)
- **Molecule**: `ServiceBookingModal` - Modal for booking/purchasing services
- **Atom**: `ServiceBadge` - Status badge (available/coming soon)

#### 3. State Management

- **Server State**: Available services fetched via React Query
- **Client State**: Selected service, booking modal open/close
- **Optimistic Updates**: When booking a service, show immediate feedback

#### 4. User Flow

1. User views add-on services section
2. Clicks on available service
3. Modal opens with service details and booking options
4. User can schedule or purchase service
5. Service appears in timeline or separate "My Services" section
6. Confirmation and payment flow (if applicable)

#### 5. Integration with Timeline

- **Option A**: Add purchased services as timeline items (non-visit items)
- **Option B**: Separate "Services" tab/section
- **Recommendation**: Option B to keep timeline focused on care journey

#### 6. API Endpoints

```
GET /api/add-on-services - List available services
POST /api/add-on-services/:id/book - Book a service
GET /api/patient/:id/services - Get patient's purchased services
```

#### 7. Considerations

- **Payment Integration**: Would need payment gateway (Stripe, PayPal)
- **Scheduling**: Integration with calendar system
- **Notifications**: Email/SMS confirmations
- **Cancellation**: Allow service cancellation with refund policy
- **Availability**: Real-time availability checking

#### 8. Technical Implementation

- Use React Query for service data fetching
- Implement optimistic updates for better UX
- Add form validation for booking
- Create reusable booking modal component
- Add loading and error states
- Implement proper TypeScript types

This approach maintains separation of concerns while providing a seamless user experience for optional services.

## Accessibility

This application is designed to meet WCAG 2.1 Level AA compliance standards. Key accessibility features include:

- **Keyboard Navigation**: All functionality is accessible via keyboard
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus indicators and proper focus traps
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Skip Links**: Quick navigation to main content

For detailed accessibility information, see:
- `docs/ACCESSIBILITY.md` - Accessibility guidelines and practices
- `docs/ACCESSIBILITY_AUDIT_REPORT.md` - Audit findings and fixes

### Testing Accessibility

```bash
# Run accessibility-specific tests
npm run test:a11y

# Run automated accessibility audit
npm run a11y:audit
```
