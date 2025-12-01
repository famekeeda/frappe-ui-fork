# 🎨 Frappe Neobrutalism UI

A bold, vibrant component library for Next.js apps with neobrutalism design principles. Inspired by shadcn/ui and built on the foundation of Frappe UI.

## ✨ Features

- 🎯 **Neobrutalism Design**: Bold borders, hard shadows, and high contrast
- 🌈 **Vibrant Colors**: Monochrome base with poppy red, purple, blue, and yellow accents
- ⚡ **Next.js Ready**: Optimized for Next.js 14+ applications
- 🎨 **Tailwind CSS**: Built with Tailwind for easy customization
- 📦 **Tree-shakeable**: Import only what you need
- ♿ **Accessible**: Built with Radix UI primitives
- 📖 **Storybook**: Comprehensive component documentation
- 🔧 **TypeScript**: Full type safety

## 🚀 Installation

```bash
pnpm add @frappe-ui/neobrutalism
```

### Required Dependencies

```bash
pnpm add react react-dom next tailwindcss
```

## 📦 Setup

### 1. Tailwind Configuration

Add the neobrutalism preset to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@frappe-ui/neobrutalism/tailwind')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@frappe-ui/neobrutalism/dist/**/*.{js,mjs}',
  ],
}
```

### 2. Import Styles

In your root layout or `_app.tsx`:

```tsx
import '@frappe-ui/neobrutalism/styles'
```

## 🎨 Components

### Button

```tsx
import { Button } from '@frappe-ui/neobrutalism'

export default function MyComponent() {
  return (
    <div className="flex gap-4">
      <Button color="black">Click me</Button>
      <Button color="red" variant="outline">Red Button</Button>
      <Button color="purple" variant="gradient">Gradient</Button>
      <Button color="blue" loading>Loading...</Button>
    </div>
  )
}
```

**Props:**
- `variant`: `'solid' | 'outline' | 'ghost' | 'gradient'`
- `color`: `'black' | 'red' | 'purple' | 'blue' | 'yellow'`
- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'icon'`
- `loading`: boolean
- `disabled`: boolean

### Input & Textarea

```tsx
import { Input, Textarea } from '@frappe-ui/neobrutalism'

export default function Form() {
  return (
    <div className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        hint="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        error="Password is too short"
      />
      <Textarea
        label="Message"
        placeholder="Tell us what you think..."
        rows={4}
      />
    </div>
  )
}
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@frappe-ui/neobrutalism'

export default function ProductCard() {
  return (
    <Card shadow="lg" hover>
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>A brief description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here...</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Buy Now</Button>
      </CardFooter>
    </Card>
  )
}
```

**Props:**
- `shadow`: `'none' | 'sm' | 'md' | 'lg' | 'xl'`
- `padding`: `'none' | 'sm' | 'md' | 'lg'`
- `hover`: boolean

### Badge

```tsx
import { Badge } from '@frappe-ui/neobrutalism'

export default function Status() {
  return (
    <div className="flex gap-2">
      <Badge color="red">Urgent</Badge>
      <Badge color="blue" variant="outline">Info</Badge>
      <Badge color="yellow" dot>Warning</Badge>
    </div>
  )
}
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from '@frappe-ui/neobrutalism'

export default function Notification() {
  return (
    <Alert variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved.
      </AlertDescription>
    </Alert>
  )
}
```

**Variants:** `'default' | 'info' | 'success' | 'warning' | 'error'`

### Checkbox & Switch

```tsx
import { Checkbox, Switch } from '@frappe-ui/neobrutalism'

export default function Settings() {
  return (
    <div className="space-y-4">
      <Checkbox
        label="Accept terms and conditions"
        description="You agree to our Terms of Service"
        color="purple"
      />
      <Switch
        label="Enable notifications"
        description="Receive email notifications"
        color="blue"
      />
    </div>
  )
}
```

### Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frappe-ui/neobrutalism'

export default function Dropdown() {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple 🍎</SelectItem>
        <SelectItem value="banana">Banana 🍌</SelectItem>
        <SelectItem value="orange">Orange 🍊</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## 🎨 Design System

### Colors

The library uses a monochrome base with vibrant accent colors:

**Base:**
- Black (`#000000`)
- White (`#FFFFFF`)
- Gray scale (50-900)

**Accents:**
- **Red**: `#FF0000` - For errors, urgent actions
- **Purple**: `#A020F0` - For premium, creative features
- **Blue**: `#0066FF` - For info, primary actions
- **Yellow**: `#FFDD00` - For warnings, highlights

### Shadows

All shadows are hard (no blur) for the neobrutalism aesthetic:

```css
shadow-brutal-sm: 2px 2px 0px 0px #000000
shadow-brutal: 4px 4px 0px 0px #000000
shadow-brutal-lg: 8px 8px 0px 0px #000000
shadow-brutal-xl: 12px 12px 0px 0px #000000
```

### Borders

- Default border width: `3px`
- Thick borders: `4px`
- All borders are solid black by default

### Typography

- Font family: Inter (variable font)
- Font weights: Bold (700) and Black (900) for headings
- Medium (500) for body text

## 🛠️ Customization

### Custom Colors

You can extend the color palette in your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@frappe-ui/neobrutalism/tailwind')],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        brand: '#FF00FF',
      },
    },
  },
}
```

### Custom Shadows

Add custom brutal shadows:

```js
boxShadow: {
  'brutal-custom': '6px 6px 0px 0px #FF0000',
}
```

## 📚 Storybook

Run the component documentation locally:

```bash
cd neobrutalism-ui
pnpm storybook
```

Visit `http://localhost:6006` to browse all components.

## 🏗️ Building

```bash
pnpm build
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- Inspired by [shadcn/ui](https://ui.shadcn.com)
- Built on [Frappe UI](https://github.com/frappe/frappe-ui)
- Uses [Radix UI](https://www.radix-ui.com) primitives
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 🔗 Links

- [Documentation](https://github.com/frappe/frappe-ui)
- [Storybook](https://storybook.frappe-ui.com)
- [GitHub](https://github.com/frappe/frappe-ui)
- [NPM](https://www.npmjs.com/package/@frappe-ui/neobrutalism)

---

Made with 💜 by the Frappe team
