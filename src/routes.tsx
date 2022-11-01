import { lazy } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { ErrorFallback } from '@/organisms/error-fallback'
import { RootLayout } from '@/templates/root-layout'

const GroupCreate = lazy(() => import('./pages/group-create'))
const GroupEdit = lazy(() => import('./pages/group-edit'))
const GroupDetails = lazy(() => import('./pages/group-details'))
const Groups = lazy(() => import('./pages/groups'))
const NotFound = lazy(() => import('./pages/not-found'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorFallback />}>
      <Route index element={<Groups />} />
      <Route path="new" element={<GroupCreate />} />
      <Route path=":groupId">
        <Route path="details" element={<GroupDetails />} />
        <Route path="edit" element={<GroupEdit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export const Routes = () => <RouterProvider router={router} />
