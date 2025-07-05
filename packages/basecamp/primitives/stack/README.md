# Stack

A flexible layout component for arranging elements with consistent spacing.

## Props

| Prop        | Type                                                    | Default    | Description                     |
| ----------- | ------------------------------------------------------- | ---------- | ------------------------------- |
| `direction` | `'row' \| 'column'`                                     | `'column'` | The direction to stack elements |
| `spacing`   | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                  | `'md'`     | The spacing between elements    |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch'`             | `'start'`  | How to align items              |
| `justify`   | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'`  | How to justify content          |
| `className` | `string`                                                | -          | Additional CSS classes          |

## Examples

### Basic Stack

```tsx
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Horizontal Stack

```tsx
<Stack direction="row" spacing="lg">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</Stack>
```

### Spacing Variants

```tsx
<Stack spacing="xs">Tight spacing</Stack>
<Stack spacing="sm">Small spacing</Stack>
<Stack spacing="md">Medium spacing</Stack>
<Stack spacing="lg">Large spacing</Stack>
<Stack spacing="xl">Extra large spacing</Stack>
```

### Alignment

```tsx
<Stack align="center">Centered items</Stack>
<Stack align="end">End-aligned items</Stack>
<Stack justify="between">Space between items</Stack>
```

## Usage

The Stack component is perfect for:

- Layout composition
- Consistent spacing
- Responsive design
- Component organization
