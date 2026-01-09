# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD.

## Workflows

### 1. PR Checks (`.github/workflows/pr-checks.yml`)

**Triggers:** Pull requests to `main` branch

**Checks:**
- ✅ **Lint Check**: Runs ESLint validation
- ✅ **Build Check**: TypeScript type check + Vite build
- ✅ **Test Check**: Unit tests with 80% coverage requirement
- ✅ **All Checks Passed**: Final validation

**Requirements:**
- All checks must pass before PR can be merged
- 80% code coverage required for tests

### 2. Release (`.github/workflows/release.yml`)

**Triggers:** Push to `main` branch

**Actions:**
1. Calculates semantic version based on commit types
2. Generates release notes from commits
3. Creates Git tag with semantic version
4. Creates GitHub release with notes
5. Updates `package.json` version

**Version Bumping:**
- `feat:` commits → Minor version bump (1.0.0 → 1.1.0)
- `fix:` commits → Patch version bump (1.0.0 → 1.0.1)
- `BREAKING CHANGE` → Major version bump (1.0.0 → 2.0.0)

## Setup Instructions

### 1. Configure Branch Protection

See `.github/BRANCH_PROTECTION.md` for detailed instructions on setting up branch protection rules in GitHub.

### 2. Required Status Checks

In GitHub repository settings, add these required status checks:
- `lint`
- `build`
- `test`
- `all-checks`

### 3. Optional: Codecov Token

For coverage reporting, add `CODECOV_TOKEN` to repository secrets (optional).

## Workflow Status

You can view workflow runs in the **Actions** tab of your GitHub repository.
