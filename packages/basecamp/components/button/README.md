# Button

A versatile button component with multiple variants and sizes.

## Props

| Prop        | Type                                                                          | Default     | Description                    |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------ |
| `variant`   | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | The visual style of the button |
| `size`      | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | The size of the button         |
| `className` | `string`                                                                      | -           | Additional CSS classes         |

## Examples

### Basic Button

```tsx
<Button>Click me</Button>
```

### Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

## Usage

The Button component is perfect for:

- Form submissions
- Navigation actions
- Interactive elements
- Call-to-action buttons
