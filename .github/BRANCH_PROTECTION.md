# Branch Protection Rules

This document describes the required branch protection rules for this repository.

## Required GitHub Settings

To enforce the PR checks, you need to configure branch protection rules in GitHub:

### Steps to Configure:

1. Go to **Settings** → **Branches** in your GitHub repository
2. Click **Add rule** or edit the existing rule for `main` branch
3. Configure the following settings:

### Branch Protection Settings for `main`:

#### ✅ Required Settings:

- **Require a pull request before merging**
  - ✅ Require approvals: `1` (optional, but recommended)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (if you have CODEOWNERS file)

- **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - ✅ **Required status checks:**
    - `lint` (Lint Check)
    - `build` (Build Check)
    - `test` (Unit Tests & Coverage)
    - `all-checks` (All Checks Passed)

- **Require conversation resolution before merging**
  - ✅ All comments must be resolved

- **Do not allow bypassing the above settings**
  - ✅ Even administrators cannot bypass (recommended)

#### Optional but Recommended:

- **Require linear history**
- **Include administrators**
- **Restrict who can push to matching branches**

## Workflow Summary

### Development Flow:

1. **Development Branch**: All development happens in `development` branch
2. **Feature Branches**: Create feature branches from `development` when needed
3. **PR to Main**: Create Pull Request from `development` → `main`

### PR Checks (Automatic):

When a PR is created from `development` to `main`, the following checks run:

1. ✅ **Lint Check** - ESLint validation
2. ✅ **Build Check** - TypeScript type check + Vite build
3. ✅ **Test Check** - Unit tests with 80% coverage requirement
4. ✅ **All Checks Passed** - Final validation

**All checks must pass before merge is allowed.**

### Release Process (Automatic):

After successful merge to `main`:

1. ✅ **Version Calculation** - Determines semantic version based on commit types
2. ✅ **Release Notes** - Generates release notes from commits
3. ✅ **Git Tag** - Creates semantic version tag (e.g., `v1.2.3`)
4. ✅ **GitHub Release** - Creates release with notes
5. ✅ **Version Update** - Updates `package.json` version

## Commit Message Format

Use semantic commit messages for automatic versioning:

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
```

- `feat` → Minor version bump (1.0.0 → 1.1.0)
- `fix` → Patch version bump (1.0.0 → 1.0.1)
- `BREAKING CHANGE` → Major version bump (1.0.0 → 2.0.0)

## Manual Configuration

If you prefer to set up branch protection via GitHub CLI:

```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint","build","test","all-checks"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```
