import { useQuery } from '@tanstack/react-query'
import { getFragmentData } from 'gql'
import {
  ProposalItemFragmentDoc,
  ProposalsByGroupPolicyAddressDocument,
  ProposalsByProposalIdDocument,
} from 'gql/graphql'
import { useGraphQLClient } from 'graphqlRequestContext'

import { UIProposal, UIProposalMetadata } from 'types'
import { ProposalStatus } from 'util/enums'

import { fetchAllBalances } from 'api/bank.actions'
import {
  fetchGroupById,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'api/group.actions'
import { fetchGroupMembers } from 'api/member.actions'
import { fetchGroupPolicies } from 'api/policy.actions'
import {
  fetchProposalbyId,
  fetchProposalsByGroupPolicy,
  fetchVotesByAddress,
  fetchVotesByProposal,
} from 'api/proposal.actions'
import { fetchValidators } from 'api/staking.actions'
import { Chain } from 'store/chain.store'
import { Wallet } from 'store/wallet.store'

export function useGroup(groupId?: string) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => fetchGroupById(groupId),
    enabled: !!groupId,
  })
}

export function useGroupMembers(groupId?: string) {
  return useQuery({
    queryKey: ['groupMembers', groupId],
    queryFn: () => fetchGroupMembers(groupId),
    enabled: !!groupId,
  })
}

export function useMemberGroups(address?: string) {
  return useQuery({
    queryKey: ['groups', { type: 'member' }],
    queryFn: () => fetchGroupsWithMembersByMember(address),
    enabled: !!address,
  })
}

export function useAdminGroups(address?: string) {
  return useQuery({
    queryKey: ['groups', { type: 'admin' }],
    queryFn: () => fetchGroupsWithMembersByAdmin(address),
    enabled: !!address,
  })
}

export function useGroupPolicies(groupId?: string) {
  return useQuery({
    queryKey: ['groupPolicies', groupId],
    queryFn: () => fetchGroupPolicies(groupId),
    enabled: !!groupId,
  })
}

export function useValidators() {
  const { chainId } = Chain.active
  return useQuery({
    queryKey: ['validators', chainId],
    queryFn: () => fetchValidators(),
    enabled: !!chainId,
  })
}

export function useProposal(proposalId?: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['proposal', proposalId],
    queryFn: async () => await fetchProposalbyId(proposalId),
    enabled: !!proposalId && !!enabled,
  })
}

export function useHistoricalProposal(proposalId?: string) {
  const { client } = useGraphQLClient()
  return useQuery({
    queryKey: ['historicalProposal', proposalId],
    queryFn: async () => {
      const res = await client?.request(ProposalsByProposalIdDocument, {
        proposalId: proposalId,
      })
      const node = res?.allProposals?.nodes[0]
      const proposal = getFragmentData(ProposalItemFragmentDoc, node)
      if (!proposal) {
        return null
      }
      const executorResult =
        {
          PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: 0,
          PROPOSAL_EXECUTOR_RESULT_NOT_RUN: 1,
          PROPOSAL_EXECUTOR_RESULT_SUCCESS: 2,
          PROPOSAL_EXECUTOR_RESULT_FAILURE: 3,
          UNRECOGNIZED: -1,
        }[proposal.executorResult] || -1
      const uiProposal: UIProposal = {
        metadata: JSON.parse(proposal.metadata) as UIProposalMetadata,
        executorResult,
        id: proposal.id,
        groupPolicyAddress: proposal.groupPolicyAddress,
        proposers: proposal.proposers as string[],
        groupVersion: proposal.groupVersion,
        groupPolicyVersion: proposal.groupPolicyVersion,
        status: ProposalStatus[proposal.status as keyof typeof ProposalStatus],
        finalTallyResult: proposal.finalTallyResult,
        messages: proposal.messages,
        submitTime: proposal.submitTime,
        votingPeriodEnd: proposal.votingPeriodEnd,
        historical: true,
      }
      return uiProposal
    },
    enabled: !!proposalId,
  })
}

export function useGroupProposals(groupId?: string) {
  const { data: policies, isLoading } = useGroupPolicies(groupId)
  const policyIds = policies?.map((p) => p.address) || []
  return useQuery({
    queryKey: ['proposals', groupId],
    queryFn: async () => {
      const proposals = await Promise.all(
        policyIds.map(async (address) => await fetchProposalsByGroupPolicy(address)),
      )
      return proposals.flat()
    },
    enabled: !isLoading,
  })
}

export function useGroupHistoricalProposals(groupId?: string) {
  const { data: policies, isLoading } = useGroupPolicies(groupId)
  const policyIds = policies?.map((p) => p.address) || []
  const { client } = useGraphQLClient()
  return useQuery({
    queryKey: ['historicalProposals', groupId],
    queryFn: async () => {
      if (!client) {
        throw Error('graphql client not initialized')
      }
      const result = []
      for (const address of policyIds) {
        const res = await client.request(ProposalsByGroupPolicyAddressDocument, {
          groupPolicyAddress: address,
        })
        if (!!res.allProposals && !!res.allProposals.nodes) {
          const { nodes } = res.allProposals
          for (const node of nodes) {
            const proposal = getFragmentData(ProposalItemFragmentDoc, node)
            if (proposal) {
              const executorResult =
                {
                  PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED: 0,
                  PROPOSAL_EXECUTOR_RESULT_NOT_RUN: 1,
                  PROPOSAL_EXECUTOR_RESULT_SUCCESS: 2,
                  PROPOSAL_EXECUTOR_RESULT_FAILURE: 3,
                  UNRECOGNIZED: -1,
                }[proposal.executorResult] || -1
              const uiProposal: UIProposal = {
                metadata: JSON.parse(proposal.metadata) as UIProposalMetadata,
                executorResult,
                id: proposal.id,
                groupPolicyAddress: proposal.groupPolicyAddress,
                proposers: proposal.proposers as string[],
                groupVersion: proposal.groupVersion,
                groupPolicyVersion: proposal.groupPolicyVersion,
                status: ProposalStatus[proposal.status as keyof typeof ProposalStatus],
                finalTallyResult: proposal.finalTallyResult,
                messages: proposal.messages,
                submitTime: proposal.submitTime,
                votingPeriodEnd: proposal.votingPeriodEnd,
                historical: true,
              }
              result.push(uiProposal)
            }
          }
        }
      }
      return result
    },
    enabled: !isLoading,
  })
}

export function useBalances(address?: string) {
  return useQuery({
    queryKey: ['balances', address],
    queryFn: () => fetchAllBalances(address),
    enabled: !!address,
  })
}

export function useProposalVotes(proposalId?: string) {
  return useQuery({
    queryKey: ['proposalVotes', proposalId],
    queryFn: () => fetchVotesByProposal(proposalId),
    enabled: !!proposalId,
  })
}

export function useUserVotes() {
  const userAddress = Wallet.account?.address
  return useQuery({
    queryKey: ['addressVotes', userAddress],
    queryFn: () => fetchVotesByAddress(userAddress),
    enabled: !!userAddress,
  })
}
