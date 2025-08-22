import { Tabs, TabList, Tab, TabPanel } from "@basecamp/registry"

export default function BasicExample() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultSelectedKey="tab1">
        <TabList aria-label="Example tabs">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
        </TabList>

        <TabPanel id="tab1">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Panel 1 Content</h3>
            <p>This is the content for the first tab panel.</p>
          </div>
        </TabPanel>

        <TabPanel id="tab2">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Panel 2 Content</h3>
            <p>This is the content for the second tab panel.</p>
          </div>
        </TabPanel>

        <TabPanel id="tab3">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Panel 3 Content</h3>
            <p>This is the content for the third tab panel.</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
