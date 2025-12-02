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

## Quick Start

### Installation

```bash
npm install @frappe-ui/neobrutalism
# or
pnpm add @frappe-ui/neobrutalism
```

### Setup

1. **Configure Tailwind CSS**

```js
// tailwind.config.js
import neobrutalism from '@frappe-ui/neobrutalism/tailwind'

export default {
  presets: [neobrutalism],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}',
  ],
}
```

2. **Import Styles**

```tsx
// app/layout.tsx
import '@frappe-ui/neobrutalism/dist/index.css'
```

3. **Use Components**

```tsx
import { Button, Input, Card, Badge } from '@frappe-ui/neobrutalism'

export default function App() {
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
