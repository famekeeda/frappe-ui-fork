# @frappe-ui/neobrutalism

A React/Next.js component library with neobrutalism design and seamless Frappe backend integration.

## Features

✨ **40+ Components** - Complete UI toolkit with forms, data display, navigation, and overlays
🎨 **Neobrutalism Design** - Bold borders, hard shadows, vibrant colors
🔌 **Frappe Integration** - 7 data fetching hooks for ERPNext/Frappe apps
📦 **Tree-shakeable** - Optimized bundle size with ESM exports
♿ **Accessible** - Built on Radix UI primitives
🎯 **TypeScript** - Full type safety with exported interfaces
⚡ **Next.js 14+ Ready** - Server & Client Components support

## Getting Started

### Option 1: Clone This Repository (For Development)

If you want to customize the components or contribute:

```bash
# Clone the repository
git clone https://github.com/robinransom-fk/frappe-fk-ui.git
cd frappe-fk-ui

# Navigate to the neobrutalism-ui package
cd neobrutalism-ui

# Install dependencies
pnpm install

# Build the package
pnpm run build

# Link for local development
pnpm link --global
```

Then in your Next.js project:
```bash
pnpm link --global @frappe-ui/neobrutalism
```

### Option 2: Install from Source (Recommended for Production)

Install directly from the repository:

```bash
# In your Next.js project
pnpm add https://github.com/robinransom-fk/frappe-fk-ui.git#claude/neobrutalism-ui-components-01DF4rJWEKywnySTotXaeeVP:neobrutalism-ui
```

### Option 3: Install Locally

```bash
# Clone the repository first
git clone https://github.com/robinransom-fk/frappe-fk-ui.git

# In your Next.js project
pnpm add file:../frappe-fk-ui/neobrutalism-ui
```

## Quick Start with Next.js 15+ & Apollo Client

Here's a complete setup guide for a new Next.js 15+ project with Apollo Client and this component library:

### 1. Create Next.js 15 Project

```bash
pnpm create next-app@latest my-app --typescript --tailwind --app
cd my-app
```

### 2. Install Dependencies

```bash
# Install the component library (choose one method from above)
pnpm add file:../frappe-fk-ui/neobrutalism-ui

# Install Apollo Client
pnpm add @apollo/client graphql

# Install additional dependencies
pnpm add class-variance-authority clsx tailwind-merge lucide-react
```

### 3. Configure Tailwind CSS

Update your `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import neobrutalism from '@frappe-ui/neobrutalism/tailwind'

const config: Config = {
  presets: [neobrutalism],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}',
  ],
}

export default config
```

### 4. Setup Apollo Client

Create `lib/apollo-client.ts`:

```tsx
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
  credentials: 'include', // Important for Frappe authentication
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})
```

Create `lib/apollo-provider.tsx` for client-side usage:

```tsx
// lib/apollo-provider.tsx
'use client'

import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo-client'

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
```

### 5. Configure Root Layout

Update `app/layout.tsx`:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@frappe-ui/neobrutalism/dist/index.css'
import { ApolloClientProvider } from '@/lib/apollo-provider'
import { Toaster } from '@frappe-ui/neobrutalism'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Neobrutalism UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientProvider>
          {children}
          <Toaster />
        </ApolloClientProvider>
      </body>
    </html>
  )
}
```

### 6. Create Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_FRAPPE_URL=http://localhost:8000
```

### 7. Example Usage - Components Only

```tsx
// app/page.tsx
import { Button, Input, Card, Badge } from '@frappe-ui/neobrutalism'

export default function Page() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-black mb-4">Welcome</h1>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button color="purple">Get Started</Button>
      <Badge color="red">New</Badge>
    </Card>
  )
}
```

### 8. Example with Apollo Client + GraphQL

Create a GraphQL query and use it with the components:

```tsx
// app/users/page.tsx
'use client'

import { useQuery, gql } from '@apollo/client'
import {
  ListView,
  ListHeader,
  ListHeaderItem,
  ListRows,
  ListRow,
  ListRowItem,
  Spinner,
  Alert,
  Card,
} from '@frappe-ui/neobrutalism'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`

export default function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" title="Error loading users">
        {error.message}
      </Alert>
    )
  }

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-black mb-4">Users</h1>

      <ListView>
        <ListHeader>
          <ListHeaderItem>Name</ListHeaderItem>
          <ListHeaderItem>Email</ListHeaderItem>
          <ListHeaderItem>Role</ListHeaderItem>
        </ListHeader>

        <ListRows>
          {data.users.map((user) => (
            <ListRow key={user.id}>
              <ListRowItem>{user.name}</ListRowItem>
              <ListRowItem>{user.email}</ListRowItem>
              <ListRowItem>{user.role}</ListRowItem>
            </ListRow>
          ))}
        </ListRows>
      </ListView>
    </Card>
  )
}
```

### 9. Example with Frappe Data Hooks

Using the built-in Frappe data fetching hooks:

```tsx
// app/customers/page.tsx
'use client'

import { useList } from '@frappe-ui/neobrutalism'
import {
  ListView,
  ListHeader,
  ListHeaderItem,
  ListRows,
  ListRow,
  ListRowItem,
  ListFooter,
  Button,
  Spinner,
  Alert,
  Card,
} from '@frappe-ui/neobrutalism'

export default function CustomersPage() {
  const {
    data,
    loading,
    error,
    reload,
    loadMore,
    hasMore,
  } = useList('Customer', {
    fields: ['name', 'customer_name', 'customer_type', 'territory'],
    filters: { disabled: 0 },
    orderBy: 'creation desc',
    pageLength: 20,
  })

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center p-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" title="Error loading customers">
        {error}
      </Alert>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-black">Customers</h1>
        <Button onClick={reload} variant="outline">
          Refresh
        </Button>
      </div>

      <ListView>
        <ListHeader>
          <ListHeaderItem>ID</ListHeaderItem>
          <ListHeaderItem>Name</ListHeaderItem>
          <ListHeaderItem>Type</ListHeaderItem>
          <ListHeaderItem>Territory</ListHeaderItem>
        </ListHeader>

        <ListRows>
          {data.map((customer) => (
            <ListRow key={customer.name}>
              <ListRowItem>{customer.name}</ListRowItem>
              <ListRowItem>{customer.customer_name}</ListRowItem>
              <ListRowItem>{customer.customer_type}</ListRowItem>
              <ListRowItem>{customer.territory}</ListRowItem>
            </ListRow>
          ))}
        </ListRows>

        <ListFooter>
          <span>Showing {data.length} customers</span>
          {hasMore && (
            <Button onClick={loadMore} variant="outline" loading={loading}>
              Load More
            </Button>
          )}
        </ListFooter>
      </ListView>
    </Card>
  )
}
```

### 10. Combining Apollo Client & Frappe Hooks

You can use both approaches in the same app:

```tsx
// Use Apollo Client for GraphQL APIs
import { useQuery } from '@apollo/client'

// Use Frappe hooks for Frappe REST APIs
import { useDoc, useList, useCall } from '@frappe-ui/neobrutalism'
```

## Design System

### Colors

The library uses a monochrome base with vibrant accent colors:

- **Base**: Black, White, Gray
- **Accents**: Red (#FF0000), Purple (#A020F0), Blue (#0066FF), Yellow (#FFDD00)

```tsx
<Button color="black">Default</Button>
<Button color="red">Danger</Button>
<Button color="purple">Primary</Button>
<Button color="blue">Info</Button>
<Button color="yellow">Warning</Button>
```

### Shadows

All components use hard, geometric shadows (no blur):

- `shadow-brutal-sm` - 2px offset
- `shadow-brutal` - 4px offset (default)
- `shadow-brutal-lg` - 8px offset
- `shadow-brutal-xl` - 12px offset

Colored shadows available for all accent colors: `shadow-brutal-red`, `shadow-brutal-purple`, etc.

### Borders

Consistent 3-4px borders throughout:

- `border-3` - Standard border width
- `border-4` - Emphasized elements

## Components

### Forms

- **Button** - Primary interactive element with variants
- **Input** - Text input with validation support
- **Textarea** - Multi-line text input
- **Password** - Password input with visibility toggle
- **Select** - Dropdown selection
- **MultiSelect** - Multiple option selection
- **Autocomplete** - Auto-completing input
- **Combobox** - Searchable select with groups
- **Checkbox** - Boolean input
- **Radio** - Radio button group
- **Switch** - Toggle switch
- **DatePicker** - Date selection with calendar
- **FileUploader** - File upload with drag & drop
- **FormControl** - Form field wrapper with label/error/hint
- **Rating** - Star rating input

### Feedback

- **Alert** - Contextual feedback messages
- **Toast** - Notification system
- **Dialog** - Modal dialogs
- **Tooltip** - Hover tooltips
- **Progress** - Progress indicator
- **Spinner** - Loading spinner
- **Badge** - Status badges

### Data Display

- **Card** - Content container
- **Avatar** - User profile pictures with group support
- **Divider** - Visual separator
- **Tree** - Hierarchical data display
- **Calendar** - Full calendar with events
- **ListView** - Data table with 12 sub-components:
  - ListHeader, ListHeaderItem
  - ListRows, ListRow, ListRowItem
  - ListGroups, ListGroupHeader, ListGroupRows
  - ListEmptyState, ListFooter, ListSelectBanner

### Navigation

- **Tabs** - Tab navigation
- **TabButtons** - Button-style tabs
- **Breadcrumbs** - Navigation breadcrumbs
- **Sidebar** - Collapsible navigation sidebar
- **DropdownMenu** - Dropdown menus with sub-menus

### Editor

- **TextEditor** - Rich text editor with formatting toolbar

## Frappe Integration

### Data Fetching Hooks

#### useDoc - Manage Single Documents

```tsx
import { useDoc } from '@frappe-ui/neobrutalism'

const { data, loading, error, setValue, save, reload } = useDoc('User', userId)
```

#### useList - Fetch Document Lists

```tsx
import { useList } from '@frappe-ui/neobrutalism'

const { data, loading, error, reload, loadMore, hasMore } = useList('Customer', {
  fields: ['name', 'customer_name'],
  filters: { disabled: 0 },
  orderBy: 'creation desc',
  pageLength: 20,
})
```

#### useCall - Call Server Methods

```tsx
import { useCall } from '@frappe-ui/neobrutalism'

const { call, loading, error } = useCall('frappe.client.get_value')

const result = await call({
  doctype: 'User',
  filters: { name: 'Administrator' },
  fieldname: 'email',
})
```

#### useNewDoc - Create Documents

```tsx
import { useNewDoc } from '@frappe-ui/neobrutalism'

const { create, loading } = useNewDoc('Customer')

const newCustomer = await create({
  customer_name: 'John Doe',
  customer_type: 'Individual',
})
```

#### useDoctype - Fetch Doctype Metadata

```tsx
import { useDoctype } from '@frappe-ui/neobrutalism'

const { data: doctype, loading, getField } = useDoctype('User')

const emailField = getField('email')
```

#### useFrappeFetch - Generic Frappe API

```tsx
import { useFrappeFetch } from '@frappe-ui/neobrutalism'

const { fetch, loading, error } = useFrappeFetch()

const data = await fetch('/api/method/custom.method', {
  method: 'POST',
  body: { param: 'value' },
})
```

#### useResource - Generic Resource Fetching

```tsx
import { useResource } from '@frappe-ui/neobrutalism'

const { data, loading, error, reload } = useResource('/api/resource/Item', {
  params: { fields: ['name', 'item_name'] },
  transform: (data) => data.data,
})
```

## Examples

### Login Form

```tsx
'use client'

import { useState } from 'react'
import { Input, Button, Card, FormControl, Alert } from '@frappe-ui/neobrutalism'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic
  }

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="text-3xl font-black mb-6">Login</h1>

      {error && <Alert variant="destructive">{error}</Alert>}

      <form onSubmit={handleLogin} className="space-y-4">
        <FormControl label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl label="Password" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button type="submit" color="purple" className="w-full">
          Sign In
        </Button>
      </form>
    </Card>
  )
}
```

### Data Table with useList

```tsx
'use client'

import { useList } from '@frappe-ui/neobrutalism'
import {
  ListView,
  ListHeader,
  ListHeaderItem,
  ListRows,
  ListRow,
  ListRowItem,
  Spinner,
} from '@frappe-ui/neobrutalism'

export default function CustomerList() {
  const { data, loading } = useList('Customer', {
    fields: ['name', 'customer_name', 'customer_type'],
    orderBy: 'creation desc',
  })

  if (loading) return <Spinner />

  return (
    <ListView>
      <ListHeader>
        <ListHeaderItem>ID</ListHeaderItem>
        <ListHeaderItem>Name</ListHeaderItem>
        <ListHeaderItem>Type</ListHeaderItem>
      </ListHeader>

      <ListRows>
        {data.map((customer) => (
          <ListRow key={customer.name}>
            <ListRowItem>{customer.name}</ListRowItem>
            <ListRowItem>{customer.customer_name}</ListRowItem>
            <ListRowItem>{customer.customer_type}</ListRowItem>
          </ListRow>
        ))}
      </ListRows>
    </ListView>
  )
}
```

## Documentation

For complete documentation, examples, and guides:

**[📖 Read the Full Guide](./GUIDE.md)**

Topics covered:
- Installation & Setup
- Component Reference
- Frappe Integration
- Advanced Patterns
- Theming & Customization
- Best Practices
- Complete Examples

## Comparison with Original Frappe UI

This library reimplements the Frappe UI component library for React/Next.js with:

- ✅ **40+ core components** from original Frappe UI
- ✅ **7 data fetching hooks** with full Frappe integration
- ✅ **Neobrutalism design** - bold, modern aesthetic
- ✅ **TypeScript first** - complete type safety
- ✅ **Next.js optimized** - Server & Client Components

### Missing from Original (Planned)

- CommandPalette component
- Chart components (5 types)
- Advanced TextEditor extensions
- Real-time updates via Socket.io
- Resource caching & offline support

See [GUIDE.md#roadmap](./GUIDE.md#roadmap) for details.

## TypeScript

All components are fully typed with exported interfaces:

```tsx
import type {
  ButtonProps,
  InputProps,
  TreeNode,
  CalendarEvent,
  ListViewProps,
} from '@frappe-ui/neobrutalism'

const treeData: TreeNode[] = [
  { id: '1', label: 'Root', children: [] },
]

const events: CalendarEvent[] = [
  { id: '1', title: 'Meeting', date: new Date(), color: 'blue' },
]
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please check the [GitHub repository](https://github.com/frappe/frappe-ui) for:

- Bug reports
- Feature requests
- Pull requests
- Documentation improvements

## License

MIT License - see LICENSE file for details

## Credits

- Design inspiration: [shadcn/ui](https://ui.shadcn.com)
- Original library: [Frappe UI](https://github.com/frappe/frappe-ui)
- Icons: [Radix Icons](https://icons.radix-ui.com), [Lucide](https://lucide.dev)
- Backend: [Frappe Framework](https://frappeframework.com)

---

**Built with ❤️ for the Frappe ecosystem**
