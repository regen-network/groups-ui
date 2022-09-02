import { lazy } from 'react'
import { Route, Routes as RRouterRoutes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { AppTemplate } from '@/templates/AppTemplate'

const Groups = lazy(() => import('./pages/Groups'))
const GroupCreate = lazy(() => import('./pages/GroupCreate'))
const NotFound = lazy(() => import('./pages/NotFound'))

export const Routes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <RRouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<AppTemplate />}>
          <Route index element={<Groups />} />
          <Route path="new" element={<GroupCreate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </RRouterRoutes>
    </AnimatePresence>
  )
}
