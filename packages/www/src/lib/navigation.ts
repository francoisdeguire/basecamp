export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Get Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        description: "Welcome to BaseCamp",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "How to install and set up",
      },
      {
        title: "Theming",
        href: "/docs/theming",
        description: "Customize colors and styles",
      },
    ],
  },
  {
    title: "Primitives",
    items: [
      {
        title: "Stack",
        href: "/docs/primitives/stack",
        description: "Flexbox container with spacing",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/docs/components/button",
        description: "Interactive button component",
      },
      {
        title: "John",
        href: "/docs/components/john",
        description: "A simple test component",
      },
    ],
  },
]
