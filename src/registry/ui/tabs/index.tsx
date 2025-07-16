"use client"

import React from "react"
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from "react-aria-components"
import { cn } from "@/lib/utils"

import type { TabsProps, TabListProps, TabProps, TabPanelProps } from "./types"
import {
  tabsVariants,
  tabListVariants,
  tabVariants,
  tabPanelVariants,
  type TabsVariants,
  type TabListVariants,
  type TabVariants,
  type TabPanelVariants,
} from "./variants"

/**
 * Tabs component using React Aria for accessible tab navigation
 */
export const Tabs = React.forwardRef<
  React.ElementRef<typeof AriaTabs>,
  TabsProps & TabsVariants
>(({ className, orientation, ...props }, ref) => (
  <AriaTabs
    ref={ref}
    className={cn(tabsVariants({ orientation }), className)}
    {...props}
  />
))
Tabs.displayName = "Tabs"

/**
 * TabList component that contains all Tab components
 */
export const TabList = React.forwardRef<
  React.ElementRef<typeof AriaTabList>,
  TabListProps & TabListVariants
>(({ className, orientation, ...props }, ref) => (
  <AriaTabList
    ref={ref}
    className={cn(tabListVariants({ orientation }), className)}
    {...props}
  />
))
TabList.displayName = "TabList"

/**
 * Individual Tab component
 */
export const Tab = React.forwardRef<
  React.ElementRef<typeof AriaTab>,
  TabProps & TabVariants
>(({ className, variant, size, ...props }, ref) => (
  <AriaTab
    ref={ref}
    className={cn(tabVariants({ variant, size }), className)}
    {...props}
  />
))
Tab.displayName = "Tab"

/**
 * TabPanel component that contains the content for each tab
 */
export const TabPanel = React.forwardRef<
  React.ElementRef<typeof AriaTabPanel>,
  TabPanelProps & TabPanelVariants
>(({ className, ...props }, ref) => (
  <AriaTabPanel
    ref={ref}
    className={cn(tabPanelVariants(), className)}
    {...props}
  />
))
TabPanel.displayName = "TabPanel"

export { type TabsProps, type TabListProps, type TabProps, type TabPanelProps }
