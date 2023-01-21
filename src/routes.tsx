import { lazy } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { ErrorFallback } from '@/organisms/error-fallback'
import { RootLayout } from '@/templates/root-layout'

const GroupCreate = lazy(() => import('./pages/group-create-page'))
const GroupDetails = lazy(() => import('./pages/group-details-page'))
const GroupEdit = lazy(() => import('./pages/group-edit-page'))
const Groups = lazy(() => import('./pages/groups-page'))
const Group = lazy(() => import('./pages/group-page'))
const NotFound = lazy(() => import('./pages/not-found-page'))
const ProposalCreate = lazy(() => import('./pages/proposal-create-page'))
const ProposalDetails = lazy(() => import('./pages/proposal-details-page'))

export const ROUTE_PATH = {
  home: '/',
  group: (id: string) => `/${id}`,
  groups: '/',
  groupCreate: '/new',
  groupDetails: (id: string) => `/${id}/details`,
  groupEdit: (id: string) => `/${id}/edit`,
  proposalCreate: (groupId: string) => `/${groupId}/proposals/new`,
  proposal: (groupId: string, proposalId: string) =>
    `/${groupId}/proposals/${proposalId}`,
} as const

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorFallback />}>
      <Route index element={<Groups />} />
      <Route path="new" element={<GroupCreate />} />
      <Route path=":groupId">
        <Route index element={<Group />} />
        <Route path="details" element={<GroupDetails />} />
        <Route path="edit" element={<GroupEdit />} />
        <Route path="proposals">
          <Route path="new" element={<ProposalCreate />} />
          <Route path=":proposalId" element={<ProposalDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

export const Routes = () => <RouterProvider router={router} />
