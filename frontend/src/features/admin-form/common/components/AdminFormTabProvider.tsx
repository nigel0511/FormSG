import { useCallback, useMemo, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '@chakra-ui/react'

import { ADMIN_FORM_ROUTE } from '~constants/routes'

interface AdminFormTabProviderProps {
  children: React.ReactNode
}

export const AdminFormTabProvider = ({
  children,
}: AdminFormTabProviderProps): JSX.Element => {
  const { formId } = useParams<{ formId: string }>()
  const history = useHistory()
  const { pathname } = useLocation()

  const routes = useMemo(() => {
    const baseRoute = `${ADMIN_FORM_ROUTE}/${formId}`
    return [baseRoute, `${baseRoute}/settings`, `${baseRoute}/responses`]
  }, [formId])

  const defaultIndex = useMemo(() => {
    // Sort routes by descending length so we get the longest match first.
    // Slice is used for immutable sort.
    const sortedRoutes = routes.slice().sort().reverse()

    // Find substring index match
    const sortedIndex = sortedRoutes.findIndex((route) =>
      pathname.includes(route),
    )
    // Find exact match in original array
    const index = routes.findIndex(
      (route) => sortedRoutes[sortedIndex] === route,
    )

    return index
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
      {children}
    </Tabs>
  )
}
