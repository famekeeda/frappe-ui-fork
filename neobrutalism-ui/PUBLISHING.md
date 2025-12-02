# Publishing & Installation Guide

This guide covers how to publish the neobrutalism-ui library and install it in other projects.

## Quick Install (After Publishing)

```bash
# Install from npm
pnpm add @frappe-ui/neobrutalism

# Or with npm
npm install @frappe-ui/neobrutalism

# Or with yarn
yarn add @frappe-ui/neobrutalism
```

---

## Option 1: Publish to npm Registry

### Prerequisites

1. **Create an npm account** at https://npmjs.com
2. **Login to npm** via CLI:
   ```bash
   npm login
   ```

### Publishing Steps

1. **Build the package**
   ```bash
   cd neobrutalism-ui
   pnpm install
   pnpm run build
   ```

2. **Verify the build**
   ```bash
   # Check that dist/ folder exists and contains:
   # - index.js, index.mjs
   # - index.d.ts, index.d.mts
   # - index.css
   ls -la dist/
   ```

3. **Test the package locally** (optional but recommended)
   ```bash
   # Create a test tarball
   npm pack

   # This creates a .tgz file like: frappe-ui-neobrutalism-0.1.0.tgz
   # Install it in another project to test:
   cd /path/to/test-project
   pnpm add /path/to/neobrutalism-ui/frappe-ui-neobrutalism-0.1.0.tgz
   ```

4. **Publish to npm**
   ```bash
   cd neobrutalism-ui

   # For first-time publish
   npm publish --access public

   # For updates (bump version first)
   npm version patch  # or minor, or major
   npm publish
   ```

### Version Management

```bash
# Patch release (0.1.0 -> 0.1.1) - bug fixes
npm version patch

# Minor release (0.1.0 -> 0.2.0) - new features
npm version minor

# Major release (0.1.0 -> 1.0.0) - breaking changes
npm version major

# Then publish
npm publish
```

---

## Option 2: Use as Local Package (Without Publishing)

### Method A: Using `pnpm link` (Recommended for Development)

1. **Link the package globally**
   ```bash
   cd /home/user/frappe-ui-fork/neobrutalism-ui
   pnpm run build
   pnpm link --global
   ```

2. **Use in your project**
   ```bash
   cd /path/to/your/nextjs-app
   pnpm link --global @frappe-ui/neobrutalism
   ```

3. **Unlink when done**
   ```bash
   # In your project
   pnpm unlink @frappe-ui/neobrutalism

   # Remove global link
   cd /home/user/frappe-ui-fork/neobrutalism-ui
   pnpm unlink --global
   ```

### Method B: Using `file:` Protocol

1. **Install from local path**
   ```bash
   cd /path/to/your/nextjs-app
   pnpm add file:/home/user/frappe-ui-fork/neobrutalism-ui
   ```

   This adds to package.json:
   ```json
   {
     "dependencies": {
       "@frappe-ui/neobrutalism": "file:/home/user/frappe-ui-fork/neobrutalism-ui"
     }
   }
   ```

2. **Update after changes**
   ```bash
   # Rebuild the library
   cd /home/user/frappe-ui-fork/neobrutalism-ui
   pnpm run build

   # Reinstall in your project
   cd /path/to/your/nextjs-app
   pnpm install
   ```

### Method C: Using `pnpm workspace` (For Monorepos)

If you have a monorepo structure:

1. **Create pnpm-workspace.yaml** in root
   ```yaml
   packages:
     - 'apps/*'
     - 'packages/*'
   ```

2. **Structure**
   ```
   my-monorepo/
   ├── pnpm-workspace.yaml
   ├── packages/
   │   └── neobrutalism-ui/    # Your UI library
   └── apps/
       └── my-nextjs-app/       # Your app
   ```

3. **Install in workspace**
   ```bash
   cd apps/my-nextjs-app
   pnpm add @frappe-ui/neobrutalism --workspace
   ```

---

## Option 3: Publish to GitHub Packages

### Setup

1. **Update package.json**
   ```json
   {
     "name": "@your-username/neobrutalism",
     "publishConfig": {
       "registry": "https://npm.pkg.github.com"
     }
   }
   ```

2. **Create .npmrc** in your project
   ```
   @your-username:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

3. **Publish**
   ```bash
   npm publish
   ```

4. **Install in other projects**
   ```bash
   # Create .npmrc in the project
   echo "@your-username:registry=https://npm.pkg.github.com" > .npmrc

   pnpm add @your-username/neobrutalism
   ```

---

## Option 4: Private npm Registry (Verdaccio)

For team/company use without publishing publicly:

1. **Install Verdaccio**
   ```bash
   npm install -g verdaccio
   verdaccio
   ```

2. **Configure npm to use Verdaccio**
   ```bash
   npm set registry http://localhost:4873/
   ```

3. **Publish**
   ```bash
   cd neobrutalism-ui
   npm publish
   ```

4. **Install in projects**
   ```bash
   pnpm add @frappe-ui/neobrutalism
   ```

---

## Using the Package in Your Next.js Project

Once installed (via any method above), set up your project:

### 1. Install the package
```bash
pnpm add @frappe-ui/neobrutalism
```

### 2. Configure Tailwind CSS

```js
// tailwind.config.js
import neobrutalism from '@frappe-ui/neobrutalism/tailwind'

export default {
  presets: [neobrutalism],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}',
  ],
}
```

### 3. Import Styles

```tsx
// app/layout.tsx
import '@frappe-ui/neobrutalism/dist/index.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 4. Use Components

```tsx
import { Button, Input, Card } from '@frappe-ui/neobrutalism'

export default function Page() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-black mb-4">Hello World</h1>
      <Input placeholder="Enter text" />
      <Button color="purple">Submit</Button>
    </Card>
  )
}
```

---

## Troubleshooting

### Issue: "Module not found"

**Solution:**
```bash
# Rebuild the library
cd neobrutalism-ui
pnpm run build

# Reinstall in your project
cd your-project
rm -rf node_modules/.pnpm/@frappe-ui+neobrutalism*
pnpm install
```

### Issue: Styles not loading

**Solution:**
1. Ensure you're importing the CSS:
   ```tsx
   import '@frappe-ui/neobrutalism/dist/index.css'
   ```

2. Add the package path to Tailwind content:
   ```js
   content: [
     './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}'
   ]
   ```

### Issue: TypeScript errors

**Solution:**
```bash
# Ensure types are built
cd neobrutalism-ui
pnpm run build

# Check that .d.ts files exist
ls dist/*.d.ts
```

### Issue: Updates not reflecting

**For npm link:**
```bash
# Rebuild and the changes will reflect automatically
cd neobrutalism-ui
pnpm run build
```

**For file: protocol:**
```bash
# Rebuild and reinstall
cd neobrutalism-ui
pnpm run build

cd your-project
pnpm install --force
```

---

## Development Workflow

### Watch Mode for Development

```bash
# Terminal 1: Watch and rebuild library
cd neobrutalism-ui
pnpm run dev

# Terminal 2: Run your Next.js app
cd your-nextjs-app
pnpm dev
```

This automatically rebuilds the library when you make changes.

### Best Practices

1. **Always build before publishing**
   ```bash
   pnpm run build
   ```

2. **Test locally before publishing**
   ```bash
   npm pack
   # Test the .tgz file in another project
   ```

3. **Version semantically**
   - Patch (0.1.x): Bug fixes
   - Minor (0.x.0): New features (backward compatible)
   - Major (x.0.0): Breaking changes

4. **Use .npmignore or package.json "files"**
   Already configured in package.json:
   ```json
   "files": [
     "dist",
     "tailwind.config.js",
     "README.md"
   ]
   ```

---

## CI/CD Publishing

### GitHub Actions Example

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install
        working-directory: neobrutalism-ui

      - name: Build
        run: pnpm run build
        working-directory: neobrutalism-ui

      - name: Publish
        run: npm publish --access public
        working-directory: neobrutalism-ui
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Quick Reference

| Method | Use Case | Command |
|--------|----------|---------|
| npm publish | Public package | `npm publish --access public` |
| pnpm link | Local development | `pnpm link --global` |
| file: protocol | Testing locally | `pnpm add file:../path` |
| GitHub Packages | Private/team use | `npm publish` (with config) |
| Verdaccio | Company registry | `npm publish` (to Verdaccio) |

---

## Next Steps

1. **Choose your distribution method** (npm, local, private registry)
2. **Build the package**: `pnpm run build`
3. **Test locally** before publishing
4. **Publish** using chosen method
5. **Install in your project**
6. **Configure Tailwind** and import styles
7. **Start building!**

See [README.md](./README.md) for usage documentation and [GUIDE.md](./GUIDE.md) for comprehensive examples.
