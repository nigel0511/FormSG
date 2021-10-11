import { useCallback, useMemo, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { ADMIN_FORM_ROUTE } from '~constants/routes'
import { TabList } from '~components/Tabs'
import { Tab } from '~components/Tabs/Tab'

import { FeedbackResultPage } from './FeedbackResultPage'
import { ResponsesResultPage } from './ResponsesResultPage'

export const ResponsesPage = (): JSX.Element => {
  const { formId } = useParams<{ formId: string }>()
  const history = useHistory()
  const { pathname } = useLocation()

  const routes = useMemo(() => {
    const baseRoute = `${ADMIN_FORM_ROUTE}/${formId}/responses`
    return [baseRoute, `${baseRoute}/feedback`]
  }, [formId])

  const defaultIndex = useMemo(() => {
    const index = routes.findIndex((r) => r === pathname)
    return index === -1 ? 0 : index
  }, [pathname, routes])

  const [tabIndex, setTabIndex] = useState(defaultIndex)

  const handleTabsChange = useCallback(
    (index: number) => {
      setTabIndex(index)
      history.push(routes[index])
    },
    [history, routes],
  )

  return (
    <Tabs
      isLazy
      defaultIndex={defaultIndex}
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList mt="-1.125rem" mb="-0.25rem" borderBottom="none">
        <Tab>Responses</Tab>
        <Tab>Feedback</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <ResponsesResultPage />
        </TabPanel>
        <TabPanel p={0}>
          <FeedbackResultPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
