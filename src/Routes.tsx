import { lazy } from 'react'
import { Route, Routes as RRouterRoutes } from 'react-router-dom'

import { AppTemplate } from '@/templates/AppTemplate'

const Home = lazy(() => import('./pages/Home'))
const Groups = lazy(() => import('./pages/Groups'))
const CreateGroup = lazy(() => import('./pages/CreateGroup'))

export const Routes = () => (
  <RRouterRoutes>
    <Route path="/" element={<AppTemplate />}>
      <Route index element={<Home />} />
      <Route path="groups">
        <Route index element={<Groups />} />
        <Route path="new" element={<CreateGroup />} />
      </Route>
    </Route>
  </RRouterRoutes>
)
