import type {
  GroupFormValues,
  MemberFormValues,
  UIGroupDecisionPolicy,
  UIGroupMetadata,
} from 'types'

import { GroupPolicyFormValues } from '@/organisms/group-policy-form'

export const defaultMemberFormValues: MemberFormValues = {
  address: '',
  weight: 1,
}

export const defaultGroupFormValues: GroupFormValues = {
  admin: '',
  name: '',
  members: [],
  policyAsAdmin: 'true',
  description: '',
  forumLink: '',
  otherMetadata: '',
}

export const defaultGroupPolicyFormValues: GroupPolicyFormValues = {
  votingWindow: '0',
  threshold: undefined,
  quorum: undefined,
}

// type ObjKeys = {
//   members: (keyof MemberFormValues)[]
//   groupMetadata: (keyof UIGroupMetadata)[]
//   decisionPolicy: (keyof UIGroupDecisionPolicy)[]
// }

// /** string form of the keys on various group objects, used for checking msg updates etc
//  * @see `src/pages/group-edit.tsx` for example usage
//  */
// export const GROUP_OBJ_KEYS: ObjKeys = {
//   members: ['address', 'metadata', 'weight'],
//   groupMetadata: ['description', 'forumLink', 'name', 'other', 'updatedAt'],
//   decisionPolicy: ['percentage', 'threshold', 'windows'],
// }
