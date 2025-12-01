import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../src/components/Input'
import { Textarea } from '../src/components/Textarea'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Input placeholder="Enter your text..." />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-96">
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
      />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Input
        label="Username"
        placeholder="Enter username"
        error="Username is already taken"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        error="Password must be at least 8 characters"
      />
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div className="w-96">
      <Input
        label="API Key"
        placeholder="sk-..."
        hint="Your API key can be found in the dashboard"
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Input variant="default" placeholder="Default" label="Default" />
      <Input variant="error" placeholder="Error" label="Error State" />
      <Input variant="success" placeholder="Success" label="Success State" />
      <Input variant="warning" placeholder="Warning" label="Warning State" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <Input
        label="Disabled Input"
        placeholder="You can't type here"
        disabled
        value="Disabled value"
      />
    </div>
  ),
}

export const TextareaExample: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Textarea
        label="Description"
        placeholder="Enter a description..."
        hint="Maximum 500 characters"
      />
      <Textarea
        label="Feedback"
        placeholder="Tell us what you think..."
        error="Feedback is required"
      />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-8 bg-white">
      <h2 className="text-2xl font-black">Contact Form</h2>
      <Input
        label="Name"
        placeholder="John Doe"
        hint="Your full name"
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
      />
      <Input
        label="Subject"
        placeholder="What's this about?"
      />
      <Textarea
        label="Message"
        placeholder="Your message here..."
        rows={4}
      />
    </div>
  ),
}
