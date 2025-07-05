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
        href: "/introduction",
        description: "Welcome to BaseCamp",
      },
      {
        title: "Installation",
        href: "/installation",
        description: "How to install and set up",
      },
      {
        title: "Theming",
        href: "/theming",
        description: "Customize colors and styles",
      },
    ],
  },
  {
    title: "Primitives",
    items: [
      {
        title: "Stack",
        href: "/primitives/stack",
        description: "Flexbox container with spacing",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/components/button",
        description: "Interactive button component",
      },
      {
        title: "John",
        href: "/components/john",
        description: "A simple test component",
      },
    ],
  },
]
