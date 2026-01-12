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
