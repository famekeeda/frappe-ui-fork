import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../src/components/Card'
import { Button } from '../src/components/Button'
import { Badge } from '../src/components/Badge'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hover: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Neobrutalism Card</CardTitle>
        <CardDescription>
          A card component with bold borders and hard shadows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium">
          This is the card content area. You can put any content here including
          text, images, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithColoredElements: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle>Product Launch 🚀</CardTitle>
            <CardDescription>New feature announcement</CardDescription>
          </div>
          <Badge color="red" variant="solid">New</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="font-medium">
            We're excited to announce our new neobrutalism UI component library!
          </p>
          <div className="flex gap-2">
            <Badge color="blue" variant="outline">React</Badge>
            <Badge color="purple" variant="outline">Next.js</Badge>
            <Badge color="yellow" variant="outline">Tailwind</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button color="purple" className="flex-1">Learn More</Button>
        <Button variant="outline" className="flex-1">Dismiss</Button>
      </CardFooter>
    </Card>
  ),
}

export const Shadows: Story = {
  render: () => (
    <div className="flex gap-8 p-8 flex-wrap">
      <Card shadow="none" className="w-64">
        <CardContent>
          <p className="font-bold">No Shadow</p>
        </CardContent>
      </Card>
      <Card shadow="sm" className="w-64">
        <CardContent>
          <p className="font-bold">Small Shadow</p>
        </CardContent>
      </Card>
      <Card shadow="md" className="w-64">
        <CardContent>
          <p className="font-bold">Medium Shadow</p>
        </CardContent>
      </Card>
      <Card shadow="lg" className="w-64">
        <CardContent>
          <p className="font-bold">Large Shadow</p>
        </CardContent>
      </Card>
      <Card shadow="xl" className="w-64">
        <CardContent>
          <p className="font-bold">Extra Large Shadow</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      <Card hover className="w-64 cursor-pointer">
        <CardHeader>
          <CardTitle>Hover Me!</CardTitle>
          <CardDescription>This card has hover effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-medium">
            The card will lift up and show a larger shadow on hover.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-4xl">
      {['Red', 'Purple', 'Blue', 'Yellow', 'Black', 'Gray'].map((color) => (
        <Card key={color} hover>
          <CardHeader>
            <CardTitle className="text-lg">{color}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              color={color.toLowerCase() as any}
              variant="solid"
              className="w-full justify-center"
            >
              {color} Badge
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
