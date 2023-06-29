import { MsgSend } from '@regen-network/api/src/codegen/cosmos/bank/v1beta1/tx'
import {
  MemberRequest,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from '@regen-network/api/src/codegen/cosmos/group/v1/types'
import { Any } from '@regen-network/api/src/codegen/google/protobuf/any'
import type {
  MsgCreateGroupWithPolicy,
  MsgCreateGroupWithPolicyAmino,
  MsgSubmitProposal,
  MsgSubmitProposalAmino,
  MsgVote,
  MsgVoteAmino,
} from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
import Long from 'long'

// TODO: fix amino converters
export const groupAminoConverters = {
  '/cosmos.group.v1.MsgCreateGroupWithPolicy': {
    aminoType: 'cosmos-sdk/MsgCreateGroupWithPolicy',
    fromAmino: (object: MsgCreateGroupWithPolicyAmino): MsgCreateGroupWithPolicy => {
      console.log('fromAmino input', object)
      const output = {
        admin: object.admin,
        members: Array.isArray(
          object === null || object === void 0 ? void 0 : object.members,
        )
          ? object.members.map((e) => MemberRequest.fromAmino(e))
          : [],
        groupMetadata: object.group_metadata || '',
        groupPolicyMetadata: object.group_policy_metadata || '',
        groupPolicyAsAdmin: object.group_policy_as_admin || false,
        decisionPolicy:
          object !== null && object !== void 0 && object.decision_policy
            ? object.decision_policy.type === 'cosmos-sdk/PercentageDecisionPolicy'
              ? Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
                  value: PercentageDecisionPolicy.encode(
                    PercentageDecisionPolicy.fromPartial(
                      PercentageDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                })
              : Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
                  value: ThresholdDecisionPolicy.encode(
                    ThresholdDecisionPolicy.fromPartial(
                      ThresholdDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                })
            : undefined,
      }
      console.log('fromAmino output', output)
      return output // TODO: typescript errors
    },
    toAmino: (message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyAmino => {
      console.log('toAmino input', message)
      const output = {
        admin: message.admin,
        members: message.members
          ? message.members.map((e) => (e ? MemberRequest.toAmino(e) : undefined))
          : [],
        group_metadata: message.groupMetadata ? message.groupMetadata : undefined,
        group_policy_metadata: message.groupPolicyMetadata
          ? message.groupPolicyMetadata
          : undefined,
        group_policy_as_admin: message.groupPolicyAsAdmin
          ? message.groupPolicyAsAdmin
          : undefined,
        decision_policy: message.decisionPolicy
          ? message.decisionPolicy.typeUrl === '/cosmos.group.v1.PercentageDecisionPolicy'
            ? {
                type: 'cosmos-sdk/PercentageDecisionPolicy',
                value: PercentageDecisionPolicy.toAmino(
                  PercentageDecisionPolicy.decode(message.decisionPolicy?.value),
                ),
              }
            : {
                type: 'cosmos-sdk/ThresholdDecisionPolicy',
                value: ThresholdDecisionPolicy.toAmino(
                  ThresholdDecisionPolicy.decode(message.decisionPolicy?.value),
                ),
              }
          : undefined,
      }
      console.log('toAmino output', output)
      return output // TODO: typescript errors
    },
  },
  '/cosmos.group.v1.MsgSubmitProposal': {
    aminoType: 'cosmos-sdk/group/MsgSubmitProposal',
    fromAmino: (object: MsgSubmitProposalAmino): MsgSubmitProposal => {
      console.log('fromAmino input', object)
      const output = {
        groupPolicyAddress: object.group_policy_address,
        proposers: Array.isArray(object?.proposers)
          ? object.proposers.map((e: any) => e)
          : [],
        metadata: object.metadata,
        messages: Array.isArray(object?.messages)
          ? object.messages.map((e: any) => Any.fromAmino(e))
          : [],
        exec: object.exec !== null && object.exec !== undefined ? object.exec : 0,
      }
      console.log('fromAmino output', output)
      return output
    },
    toAmino: (message: MsgSubmitProposal): MsgSubmitProposalAmino => {
      console.log('toAmino input', message)
      const output = {
        group_policy_address: message.groupPolicyAddress,
        proposers: message.proposers ? message.proposers.map((e) => e) : [],
        metadata: message.metadata ? message.metadata : undefined,
        // messages: message.messages ? message.messages.map(e => e ? Any.toAmino(e) : undefined) : [],
        messages: message.messages
          ? message.messages.map((msg) => {
              switch (msg.typeUrl) {
                // TODO: unable to resolve type URL cosmos-sdk/MsgSend: tx parse error
                case '/cosmos.bank.v1beta1.MsgSend':
                  return {
                    type_url: 'cosmos-sdk/MsgSend',
                    value: MsgSend.toAmino(MsgSend.decode(msg?.value)),
                  }
                // TODO: unable to resolve type URL not implemented: tx parse error
                default:
                  return {
                    type_url: 'not implemented',
                  }
              }
            })
          : [],
        exec: message.exec,
      }
      console.log('toAmino output', output)
      return output // TODO: typescript errors
    },
  },
  '/cosmos.group.v1.MsgVote': {
    aminoType: 'cosmos-sdk/group/MsgVote',
    fromAmino: (object: MsgVoteAmino): MsgVote => {
      console.log('fromAmino input', object)
      const output = {
        proposalId: Long.fromString(object.proposal_id),
        voter: object.voter,
        option: object.option !== null && object.option !== undefined ? object.option : 0,
        metadata: object.metadata,
      }
      console.log('fromAmino output', output)
      return output
    },
    toAmino: (message: MsgVote): MsgVoteAmino => {
      console.log('toAmino input', message)
      const output = {
        proposal_id: message.proposalId ? message.proposalId.toString() : undefined,
        voter: message.voter,
        option: message.option,
        metadata: message.metadata ? message.metadata : undefined,
      }
      console.log('toAmino output', output)
      return output // TODO: typescript errors
    },
  },
}
