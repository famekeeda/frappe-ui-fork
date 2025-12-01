import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/components/Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'gradient'],
    },
    color: {
      control: 'select',
      options: ['black', 'red', 'purple', 'blue', 'yellow'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click me!',
    variant: 'solid',
    color: 'black',
    size: 'md',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex gap-4 items-center">
        <Button variant="solid" color="black">Solid Black</Button>
        <Button variant="solid" color="red">Solid Red</Button>
        <Button variant="solid" color="purple">Solid Purple</Button>
        <Button variant="solid" color="blue">Solid Blue</Button>
        <Button variant="solid" color="yellow">Solid Yellow</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="outline" color="black">Outline Black</Button>
        <Button variant="outline" color="red">Outline Red</Button>
        <Button variant="outline" color="purple">Outline Purple</Button>
        <Button variant="outline" color="blue">Outline Blue</Button>
        <Button variant="outline" color="yellow">Outline Yellow</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="gradient" color="red">Gradient Red</Button>
        <Button variant="gradient" color="purple">Gradient Purple</Button>
        <Button variant="gradient" color="blue">Gradient Blue</Button>
        <Button variant="gradient" color="yellow">Gradient Yellow</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="ghost" color="black">Ghost Black</Button>
        <Button variant="ghost" color="red">Ghost Red</Button>
        <Button variant="ghost" color="purple">Ghost Purple</Button>
        <Button variant="ghost" color="blue">Ghost Blue</Button>
        <Button variant="ghost" color="yellow">Ghost Yellow</Button>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8">
      <Button loading color="black">Loading...</Button>
      <Button loading color="red">Loading...</Button>
      <Button loading color="purple">Loading...</Button>
      <Button loading color="blue">Loading...</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const IconButton: Story = {
  render: () => (
    <div className="flex gap-4 items-center p-8">
      <Button size="icon" color="black">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
      <Button size="icon" color="red">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
      <Button size="icon" color="blue">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </Button>
    </div>
  ),
}
