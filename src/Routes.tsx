import { lazy } from 'react'
import { Route, Routes as RRouterRoutes, useLocation } from 'react-router-dom'

import { AnimatePresence } from '@/animations'
import { AppLayout } from '@/templates/app-layout'

const GroupCreate = lazy(() => import('./pages/group-create'))
const GroupEdit = lazy(() => import('./pages/group-edit'))
const GroupDetails = lazy(() => import('./pages/group-details'))
const Groups = lazy(() => import('./pages/groups'))
const NotFound = lazy(() => import('./pages/not-found'))

export const Routes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <RRouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Groups />} />
          <Route path="new" element={<GroupCreate />} />
          <Route path=":groupId">
            <Route path="details" element={<GroupDetails />} />
            <Route path="edit" element={<GroupEdit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </RRouterRoutes>
    </AnimatePresence>
  )
}
