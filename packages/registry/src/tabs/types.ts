import type {
  TabsProps as AriaTabsProps,
  TabListProps as AriaTabListProps,
  TabProps as AriaTabProps,
  TabPanelProps as AriaTabPanelProps,
} from "react-aria-components"

export interface TabsProps extends AriaTabsProps {
  className?: string
}

export interface TabListProps extends AriaTabListProps<object> {
  className?: string
}

export interface TabProps extends AriaTabProps {
  className?: string
}

export interface TabPanelProps extends AriaTabPanelProps {
  className?: string
}
