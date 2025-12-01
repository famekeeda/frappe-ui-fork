// Utilities
export { cn, getColorClasses } from './lib/utils'

// Core Components
export { Button, buttonVariants, type ButtonProps } from './components/Button'
export { Input, inputVariants, type InputProps } from './components/Input'
export { Textarea, textareaVariants, type TextareaProps } from './components/Textarea'
export { Password, type PasswordProps } from './components/Password'
export { Checkbox, type CheckboxProps } from './components/Checkbox'
export { Switch, type SwitchProps } from './components/Switch'
export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/Radio'

// Layout Components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
} from './components/Card'
export { Divider, dividerVariants, type DividerProps } from './components/Divider'

// Feedback Components
export { Badge, badgeVariants, type BadgeProps } from './components/Badge'
export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
  type AlertProps,
} from './components/Alert'
export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  useToast,
  toast,
  type ToastProps,
  type ToastActionElement,
} from './components/Toast'
export { Toaster } from './components/Toaster'
export { Spinner, LoadingIndicator, spinnerVariants, type SpinnerProps } from './components/Spinner'
export { Progress, CircularProgress, progressVariants, type ProgressProps } from './components/Progress'

// Selection Components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/Select'

// Overlay Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/Dialog'
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/Tooltip'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/DropdownMenu'

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from './components/Breadcrumbs'

// Display Components
export { Avatar, AvatarGroup, avatarVariants, type AvatarProps } from './components/Avatar'

// Data Fetching Hooks
export { useResource, type Resource, type ResourceOptions } from './hooks/useResource'
export { useCall, type CallResult, type CallOptions } from './hooks/useCall'
export { useDoc, type Doc, type DocOptions } from './hooks/useDoc'
export { useList, type ListResult, type ListOptions } from './hooks/useList'

// Styles
import './styles/globals.css'
