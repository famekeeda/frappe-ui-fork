# Building Custom Apps with Neobrutalism UI

A comprehensive guide to building Next.js applications with Frappe backend integration using the neobrutalism-ui component library.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Frappe Integration](#frappe-integration)
- [Component Guide](#component-guide)
- [Data Fetching Hooks](#data-fetching-hooks)
- [Advanced Patterns](#advanced-patterns)
- [Theming & Customization](#theming--customization)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Roadmap](#roadmap)

---

## Getting Started

### What is Neobrutalism UI?

Neobrutalism UI is a React/Next.js component library inspired by shadcn/ui with a distinctive neobrutalism design aesthetic. It provides:

- **40+ components** with bold borders, hard shadows, and vibrant colors
- **7 data fetching hooks** for seamless Frappe backend integration
- **Full TypeScript support** with exported types
- **Tree-shakeable** ESM exports for optimal bundle size
- **Accessible** components built on Radix UI primitives

### Design Philosophy

- **Monochrome base** - Black, white, and gray foundations
- **Vibrant accents** - Bold red (#FF0000), purple (#A020F0), blue (#0066FF), yellow (#FFDD00)
- **Bold borders** - 3-4px borders everywhere
- **Hard shadows** - No blur, sharp geometric shadows
- **High contrast** - Maximum readability and visual impact

---

## Installation

### 1. Install the Package

```bash
npm install @frappe-ui/neobrutalism
# or
pnpm add @frappe-ui/neobrutalism
# or
yarn add @frappe-ui/neobrutalism
```

### 2. Configure Tailwind CSS

Add the neobrutalism preset to your `tailwind.config.js`:

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

### 3. Import Global Styles

In your root layout or `_app.tsx`:

```tsx
// app/layout.tsx (Next.js 13+)
import '@frappe-ui/neobrutalism/dist/index.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 4. Configure Frappe Backend (Optional)

If using Frappe data fetching hooks, ensure your Frappe server:

1. Has CORS configured for your Next.js app domain
2. Uses cookies for authentication (credentials: 'include')
3. Provides CSRF tokens via cookies

---

## Basic Usage

### Importing Components

```tsx
import { Button, Input, Card, Badge } from '@frappe-ui/neobrutalism'

export default function MyComponent() {
  return (
    <Card>
      <h1 className="text-2xl font-black mb-4">Hello World</h1>
      <Input placeholder="Enter your name" />
      <Button color="red" className="mt-4">Submit</Button>
      <Badge color="purple">New</Badge>
    </Card>
  )
}
```

### Using Color Variants

All interactive components support color variants:

```tsx
<Button color="black">Default</Button>
<Button color="red">Danger</Button>
<Button color="purple">Primary</Button>
<Button color="blue">Info</Button>
<Button color="yellow">Warning</Button>
```

### Size Variants

Most components support multiple sizes:

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

## Frappe Integration

### Setting Up Authentication

```tsx
// lib/frappe.ts
export const FRAPPE_URL = process.env.NEXT_PUBLIC_FRAPPE_URL || 'http://localhost:8000'

// Login function
export async function login(email: string, password: string) {
  const response = await fetch(`${FRAPPE_URL}/api/method/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      usr: email,
      pwd: password,
    }),
  })

  return response.json()
}

// Logout function
export async function logout() {
  const response = await fetch(`${FRAPPE_URL}/api/method/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  return response.json()
}
```

### Login Form Example

```tsx
'use client'

import { useState } from 'react'
import { Input, Button, Card, FormControl, Alert } from '@frappe-ui/neobrutalism'
import { login } from '@/lib/frappe'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)
      if (result.message === 'Logged In') {
        window.location.href = '/dashboard'
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-black mb-6">Login</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormControl label="Email" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormControl>

          <FormControl label="Password" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FormControl>

          <Button
            type="submit"
            color="purple"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  )
}
```

---

## Component Guide

### Forms

#### Input & Textarea

```tsx
import { Input, Textarea, FormControl } from '@frappe-ui/neobrutalism'

<FormControl label="Name" hint="Enter your full name" required>
  <Input placeholder="John Doe" />
</FormControl>

<FormControl label="Description" error="This field is required">
  <Textarea rows={4} placeholder="Enter description..." />
</FormControl>
```

#### Select & MultiSelect

```tsx
import { Select, MultiSelect } from '@frappe-ui/neobrutalism'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

<Select
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>

<MultiSelect
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple options"
/>
```

#### DatePicker

```tsx
import { DatePicker } from '@frappe-ui/neobrutalism'

<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  placeholder="Select a date"
/>
```

#### FileUploader

```tsx
import { FileUploader } from '@frappe-ui/neobrutalism'

<FileUploader
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  multiple
  onChange={(files) => console.log(files)}
  onError={(error) => console.error(error)}
/>
```

### Feedback

#### Alert & Toast

```tsx
import { Alert, toast, Toaster } from '@frappe-ui/neobrutalism'

// Alert component
<Alert variant="default" title="Info">
  This is an informational alert.
</Alert>

<Alert variant="destructive" title="Error">
  Something went wrong!
</Alert>

// Toast notifications
<Toaster />

// In your component
toast({
  title: "Success!",
  description: "Your changes have been saved.",
})

toast({
  title: "Error",
  description: "Failed to save changes.",
  variant: "destructive",
})
```

#### Dialog & Confirm

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@frappe-ui/neobrutalism'

const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
    </DialogHeader>
    <p>This action cannot be undone.</p>
    <div className="flex gap-2 justify-end mt-4">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button color="red" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

### Data Display

#### ListView (Data Table)

```tsx
import {
  ListView,
  ListHeader,
  ListHeaderItem,
  ListRows,
  ListRow,
  ListRowItem,
  ListFooter,
  ListSelectBanner,
} from '@frappe-ui/neobrutalism'

const data = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
]

const [selectedIds, setSelectedIds] = useState<string[]>([])

<ListView
  selectable
  selectedIds={selectedIds}
  onSelectedChange={setSelectedIds}
  allIds={data.map(d => d.id)}
>
  <ListSelectBanner count={selectedIds.length} onClear={() => setSelectedIds([])} />

  <ListHeader>
    <ListHeaderItem>Name</ListHeaderItem>
    <ListHeaderItem>Email</ListHeaderItem>
    <ListHeaderItem>Role</ListHeaderItem>
  </ListHeader>

  <ListRows>
    {data.map((item) => (
      <ListRow key={item.id} id={item.id} selectable>
        <ListRowItem>{item.name}</ListRowItem>
        <ListRowItem>{item.email}</ListRowItem>
        <ListRowItem>{item.role}</ListRowItem>
      </ListRow>
    ))}
  </ListRows>

  <ListFooter>
    <span>Showing {data.length} items</span>
  </ListFooter>
</ListView>
```

#### Tree View

```tsx
import { Tree, type TreeNode } from '@frappe-ui/neobrutalism'

const treeData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work', children: [] },
      { id: '1-2', label: 'Personal', children: [] },
    ],
  },
  {
    id: '2',
    label: 'Downloads',
    children: [],
  },
]

<Tree
  data={treeData}
  selectable="single"
  value={selectedId}
  onChange={setSelectedId}
  showLines
/>
```

#### Calendar

```tsx
import { Calendar, type CalendarEvent } from '@frappe-ui/neobrutalism'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2024, 0, 15),
    color: 'blue',
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: new Date(2024, 0, 20),
    color: 'red',
  },
]

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  events={events}
  onEventClick={(event) => console.log('Event clicked:', event)}
/>
```

### Navigation

#### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@frappe-ui/neobrutalism'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>

  <TabsContent value="account">
    Account settings content
  </TabsContent>

  <TabsContent value="password">
    Password settings content
  </TabsContent>
</Tabs>
```

#### Sidebar

```tsx
import { Sidebar, type SidebarItem } from '@frappe-ui/neobrutalism'

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
  { id: 'users', label: 'Users', icon: <UsersIcon /> },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
    ],
  },
]

<Sidebar
  items={items}
  value={currentPage}
  onChange={setCurrentPage}
  collapsible
/>
```

---

## Data Fetching Hooks

### useDoc - Fetch & Manage Single Document

```tsx
'use client'

import { useDoc } from '@frappe-ui/neobrutalism'
import { Button, Input, FormControl, Spinner } from '@frappe-ui/neobrutalism'

export default function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, setValue, save, reload } = useDoc('User', userId)

  if (loading) return <Spinner />
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>User not found</div>

  return (
    <div className="space-y-4">
      <FormControl label="Full Name">
        <Input
          value={data.full_name}
          onChange={(e) => setValue('full_name', e.target.value)}
        />
      </FormControl>

      <FormControl label="Email">
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setValue('email', e.target.value)}
        />
      </FormControl>

      <div className="flex gap-2">
        <Button onClick={save} color="purple">
          Save Changes
        </Button>
        <Button variant="outline" onClick={reload}>
          Reset
        </Button>
      </div>
    </div>
  )
}
```

### useList - Fetch Document Lists

```tsx
'use client'

import { useList } from '@frappe-ui/neobrutalism'
import { ListView, ListHeader, ListHeaderItem, ListRows, ListRow, ListRowItem } from '@frappe-ui/neobrutalism'

export default function CustomerList() {
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

  if (loading) return <Spinner />
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <ListView>
        <ListHeader>
          <ListHeaderItem>Customer ID</ListHeaderItem>
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
          {hasMore && (
            <Button onClick={loadMore} variant="outline">
              Load More
            </Button>
          )}
        </ListFooter>
      </ListView>
    </div>
  )
}
```

### useCall - Call Server Methods

```tsx
'use client'

import { useCall } from '@frappe-ui/neobrutalism'
import { Button, toast } from '@frappe-ui/neobrutalism'

export default function SendEmail() {
  const { call, loading, error } = useCall('frappe.core.doctype.communication.email.make')

  const handleSendEmail = async () => {
    const result = await call({
      recipients: 'user@example.com',
      subject: 'Hello',
      message: 'This is a test email',
    })

    if (result) {
      toast({ title: 'Email sent successfully!' })
    }
  }

  return (
    <Button onClick={handleSendEmail} loading={loading}>
      Send Email
    </Button>
  )
}
```

### useNewDoc - Create Documents

```tsx
'use client'

import { useState } from 'react'
import { useNewDoc } from '@frappe-ui/neobrutalism'
import { Input, Button, FormControl, toast } from '@frappe-ui/neobrutalism'

export default function CreateCustomer() {
  const [customerName, setCustomerName] = useState('')
  const { create, loading } = useNewDoc('Customer')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const doc = await create({
      customer_name: customerName,
      customer_type: 'Company',
    })

    if (doc) {
      toast({ title: 'Customer created successfully!' })
      setCustomerName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormControl label="Customer Name" required>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
        />
      </FormControl>

      <Button type="submit" loading={loading} color="purple">
        Create Customer
      </Button>
    </form>
  )
}
```

### useDoctype - Fetch Doctype Metadata

```tsx
'use client'

import { useDoctype } from '@frappe-ui/neobrutalism'

export default function DoctypeInfo({ doctypeName }: { doctypeName: string }) {
  const { data: doctype, loading, getField } = useDoctype(doctypeName)

  if (loading) return <Spinner />

  const nameField = getField('name')
  const emailField = getField('email')

  return (
    <div>
      <h2>Doctype: {doctype?.name}</h2>
      <h3>Fields:</h3>
      <ul>
        {doctype?.fields.map((field) => (
          <li key={field.fieldname}>
            {field.label} ({field.fieldtype})
            {field.reqd ? ' *' : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Advanced Patterns

### Form with Validation

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input, Button, FormControl } from '@frappe-ui/neobrutalism'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl label="Name" error={errors.name?.message} required>
        <Input {...register('name')} placeholder="John Doe" />
      </FormControl>

      <FormControl label="Email" error={errors.email?.message} required>
        <Input {...register('email')} type="email" placeholder="john@example.com" />
      </FormControl>

      <FormControl label="Phone" error={errors.phone?.message}>
        <Input {...register('phone')} placeholder="1234567890" />
      </FormControl>

      <Button type="submit" color="purple">
        Submit
      </Button>
    </form>
  )
}
```

### Data Table with Filtering & Sorting

```tsx
'use client'

import { useState, useMemo } from 'react'
import { useList } from '@frappe-ui/neobrutalism'
import {
  ListView,
  ListHeader,
  ListHeaderItem,
  ListRows,
  ListRow,
  ListRowItem,
  Input,
  Select,
} from '@frappe-ui/neobrutalism'

export default function ProductTable() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc')

  const { data, loading } = useList('Item', {
    fields: ['name', 'item_name', 'item_group', 'standard_rate'],
    filters: search ? { item_name: ['like', `%${search}%`] } : {},
    orderBy: `item_name ${sortBy}`,
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: 'asc', label: 'A-Z' },
            { value: 'desc', label: 'Z-A' },
          ]}
        />
      </div>

      <ListView>
        <ListHeader>
          <ListHeaderItem>Item Code</ListHeaderItem>
          <ListHeaderItem>Item Name</ListHeaderItem>
          <ListHeaderItem>Group</ListHeaderItem>
          <ListHeaderItem>Rate</ListHeaderItem>
        </ListHeader>

        <ListRows>
          {data.map((item) => (
            <ListRow key={item.name}>
              <ListRowItem>{item.name}</ListRowItem>
              <ListRowItem>{item.item_name}</ListRowItem>
              <ListRowItem>{item.item_group}</ListRowItem>
              <ListRowItem>${item.standard_rate}</ListRowItem>
            </ListRow>
          ))}
        </ListRows>
      </ListView>
    </div>
  )
}
```

### Master-Detail View

```tsx
'use client'

import { useState } from 'react'
import { useList, useDoc } from '@frappe-ui/neobrutalism'
import { ListView, ListRow, ListRowItem, Card, Spinner } from '@frappe-ui/neobrutalism'

export default function OrdersView() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const { data: orders, loading: ordersLoading } = useList('Sales Order', {
    fields: ['name', 'customer', 'grand_total'],
    pageLength: 50,
  })

  const { data: orderDetail, loading: detailLoading } = useDoc(
    'Sales Order',
    selectedOrder || '',
    { enabled: !!selectedOrder }
  )

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Master List */}
      <ListView>
        <ListRows>
          {orders.map((order) => (
            <ListRow
              key={order.name}
              onClick={() => setSelectedOrder(order.name)}
              className="cursor-pointer"
            >
              <ListRowItem>{order.name}</ListRowItem>
              <ListRowItem>{order.customer}</ListRowItem>
              <ListRowItem>${order.grand_total}</ListRowItem>
            </ListRow>
          ))}
        </ListRows>
      </ListView>

      {/* Detail View */}
      <Card className="p-6">
        {detailLoading ? (
          <Spinner />
        ) : orderDetail ? (
          <div>
            <h2 className="text-2xl font-black mb-4">{orderDetail.name}</h2>
            <dl className="space-y-2">
              <div>
                <dt className="font-bold">Customer:</dt>
                <dd>{orderDetail.customer}</dd>
              </div>
              <div>
                <dt className="font-bold">Date:</dt>
                <dd>{orderDetail.transaction_date}</dd>
              </div>
              <div>
                <dt className="font-bold">Total:</dt>
                <dd>${orderDetail.grand_total}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="text-gray-500">Select an order to view details</p>
        )}
      </Card>
    </div>
  )
}
```

---

## Theming & Customization

### Custom Colors

You can extend the color palette in your `tailwind.config.js`:

```js
export default {
  presets: [neobrutalism],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          // ... other shades
        },
      },
      boxShadow: {
        'brutal-brand': '4px 4px 0px 0px #FF6B35',
      },
    },
  },
}
```

### Component Customization

All components accept `className` for customization:

```tsx
<Button
  color="purple"
  className="rounded-none shadow-brutal-xl hover:scale-105 transition-transform"
>
  Custom Button
</Button>

<Card className="bg-gradient-to-br from-purple-50 to-blue-50">
  Gradient background card
</Card>
```

### Creating Custom Components

Build on top of existing components:

```tsx
import { Button, type ButtonProps } from '@frappe-ui/neobrutalism'
import { cn } from '@frappe-ui/neobrutalism/utils'

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
}

export function IconButton({ icon, children, className, ...props }: IconButtonProps) {
  return (
    <Button className={cn('inline-flex items-center gap-2', className)} {...props}>
      <span className="flex-shrink-0">{icon}</span>
      {children}
    </Button>
  )
}
```

---

## Best Practices

### 1. Use Server Components When Possible

```tsx
// app/products/page.tsx (Server Component)
import { ProductList } from '@/components/ProductList'

export default async function ProductsPage() {
  // Fetch data on server
  const products = await fetchProducts()

  return <ProductList initialData={products} />
}

// components/ProductList.tsx (Client Component)
'use client'

export function ProductList({ initialData }) {
  const [products, setProducts] = useState(initialData)
  // Client-side interactivity
}
```

### 2. Handle Loading & Error States

```tsx
function DataComponent() {
  const { data, loading, error } = useList('Customer')

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" title="Error">
        {error}
      </Alert>
    )
  }

  if (!data.length) {
    return (
      <ListEmptyState
        title="No customers found"
        description="Get started by creating your first customer."
        action={<Button>Create Customer</Button>}
      />
    )
  }

  return <ListView>{/* ... */}</ListView>
}
```

### 3. Optimize Performance

```tsx
import { memo, useMemo } from 'react'

// Memoize expensive components
const ExpensiveRow = memo(({ item }: { item: any }) => {
  return <ListRow>{/* ... */}</ListRow>
})

// Use useMemo for derived data
function FilteredList({ data, filter }) {
  const filteredData = useMemo(
    () => data.filter(item => item.status === filter),
    [data, filter]
  )

  return <ListView>{/* ... */}</ListView>
}
```

### 4. Type Safety

```tsx
import type { TreeNode, CalendarEvent } from '@frappe-ui/neobrutalism'

interface Product {
  name: string
  item_name: string
  standard_rate: number
}

const { data } = useList<Product>('Item', {
  fields: ['name', 'item_name', 'standard_rate'],
})

// data is now typed as Product[]
```

---

## Examples

### Complete CRUD Application

```tsx
'use client'

import { useState } from 'react'
import { useList, useDoc, useNewDoc } from '@frappe-ui/neobrutalism'
import {
  ListView,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  FormControl,
  toast,
} from '@frappe-ui/neobrutalism'

export default function TaskManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const { data: tasks, reload } = useList('Task', {
    fields: ['name', 'subject', 'status'],
    orderBy: 'creation desc',
  })

  const { create } = useNewDoc('Task')
  const { data: task, setValue, save, delete: deleteTask } = useDoc(
    'Task',
    editingTask || '',
    { enabled: !!editingTask }
  )

  const handleCreate = async () => {
    const newTask = await create({ subject: newTaskTitle })
    if (newTask) {
      toast({ title: 'Task created!' })
      setNewTaskTitle('')
      setIsCreateOpen(false)
      reload()
    }
  }

  const handleUpdate = async () => {
    await save()
    toast({ title: 'Task updated!' })
    setEditingTask(null)
    reload()
  }

  const handleDelete = async (taskName: string) => {
    // Implementation
    toast({ title: 'Task deleted!' })
    reload()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-black">Tasks</h1>
        <Button onClick={() => setIsCreateOpen(true)} color="purple">
          New Task
        </Button>
      </div>

      <ListView>
        {/* ... */}
      </ListView>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <FormControl label="Title" required>
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </FormControl>
          <Button onClick={handleCreate} color="purple">
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

---

## Roadmap

### Currently Missing from Original Frappe UI

Based on comparison with the original Frappe UI library, the following features are planned for future releases:

#### High Priority Components
- **CommandPalette** - Command/search interface
- **ConfirmDialog** - Confirmation utility
- **Popover** - Generic popover component
- **ListFilter** - Advanced filtering UI
- **ErrorMessage** - Error display component
- **LoadingIndicator** - Loading states

#### Chart Components
- **AxisChart** - Bar/line charts
- **DonutChart** - Pie/donut charts
- **FunnelChart** - Funnel visualizations
- **NumberChart** - Metric displays

#### Advanced Features
- **Real-time updates** - Socket.io integration
- **Resource caching** - Optimized data fetching
- **Offline support** - IndexedDB storage
- **Advanced TextEditor** - Extended rich text features
- **Image navigation** - Zoom/pan/gallery
- **Theme utilities** - Dark mode support

#### Utilities
- `debounce` - Debounce helper
- `fileToBase64` - File encoding
- `confirmDialog` - Dialog utility
- `dayjs` integration - Date/time utilities

### Contributing

Contributions are welcome! If you'd like to add missing features or improve existing components, please:

1. Check the [GitHub repository](https://github.com/frappe/frappe-ui)
2. Open an issue to discuss the feature
3. Submit a pull request with your changes

---

## Support

For issues, questions, or feature requests:

- **GitHub Issues**: [frappe-ui/issues](https://github.com/frappe/frappe-ui/issues)
- **Documentation**: [Frappe UI Docs](https://frappeui.com)
- **Community**: [Frappe Forum](https://discuss.frappe.io)

---

## License

This library is open source and available under the MIT License.
