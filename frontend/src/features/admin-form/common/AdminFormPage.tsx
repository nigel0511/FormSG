import { TabPanel, TabPanels } from '@chakra-ui/react'

import { ResponsesPage } from '../responses/ResponsesPage'
import { SettingsPage } from '../settings/SettingsPage'

import AdminFormNavbar from './components/AdminFormNavbar'
import { AdminFormTabProvider } from './components/AdminFormTabProvider'

export const AdminFormPage = (): JSX.Element => {
  return (
    <AdminFormTabProvider>
      <AdminFormNavbar />
      <TabPanels>
        <TabPanel p={0}>
          <p>Insert builder page here!</p>
        </TabPanel>
        <TabPanel p={0}>
          <SettingsPage />
        </TabPanel>
        <TabPanel p={0}>
          <ResponsesPage />
        </TabPanel>
      </TabPanels>
    </AdminFormTabProvider>
  )
}
