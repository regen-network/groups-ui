import { lazy } from 'react'
import { Route, Routes as RRouterRoutes } from 'react-router-dom'

import { AppTemplate } from '@/templates/AppTemplate'

import { GroupCreateSteps } from './pages/GroupCreate'

const Groups = lazy(() => import('./pages/Groups'))
const GroupCreate = lazy(() => import('./pages/GroupCreate'))
const NotFound = lazy(() => import('./pages/NotFound'))

export const Routes = () => (
  <RRouterRoutes>
    <Route path="/" element={<AppTemplate />}>
      <Route index element={<Groups />} />
      <Route path="new" element={<GroupCreateSteps />}>
        <Route index element={<GroupCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </RRouterRoutes>
)
