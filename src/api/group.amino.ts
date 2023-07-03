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
import { AnyAmino } from '@regen-network/api/types/codegen/google/protobuf/any'
import Long from 'long'
import {MemberRequestAmino} from "@regen-network/api/types/codegen/cosmos/group/v1/types";

// TODO: fix amino converters in regen-js
export const MemberRequestToAmino = (message: MemberRequest): MemberRequestAmino => {
  console.log('toAmino input', message)
  const output = {
    address: message.address,
    weight: message.weight,
    metadata: message.metadata || undefined, // NOTE: added else undefined
  }
  console.log('toAmino output', output)
  return output
}

// TODO: fix amino converters in regen-js
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
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any
              : Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
                  value: ThresholdDecisionPolicy.encode(
                    ThresholdDecisionPolicy.fromPartial(
                      ThresholdDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any
            : Any.fromAmino(object.decision_policy as AnyAmino) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any,
      }
      console.log('fromAmino output', output)
      return output
    },
    toAmino: (message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyAmino => {
      console.log('toAmino input', message)
      const output = {
        admin: message.admin,
        members: message.members
          ? message.members.map((e) => MemberRequestToAmino(e))
          : [],
        group_metadata: message.groupMetadata || undefined, // NOTE: added else undefined
        group_policy_metadata: message.groupPolicyMetadata || undefined, // NOTE: added else undefined
        group_policy_as_admin: message.groupPolicyAsAdmin || undefined, // NOTE: added else undefined
        decision_policy: message.decisionPolicy
          ? message.decisionPolicy.typeUrl === '/cosmos.group.v1.PercentageDecisionPolicy'
            ? {
                type: 'cosmos-sdk/PercentageDecisionPolicy',
                value: PercentageDecisionPolicy.toAmino(
                  PercentageDecisionPolicy.decode(message.decisionPolicy.value),
                ),
              }
            : {
                type: 'cosmos-sdk/ThresholdDecisionPolicy',
                value: ThresholdDecisionPolicy.toAmino(
                  ThresholdDecisionPolicy.decode(message.decisionPolicy.value),
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
        proposers: message.proposers || undefined, // NOTE: added else undefined
        metadata: message.metadata || undefined, // NOTE: added else undefined
        messages: message.messages.length > 0
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
          : undefined,
        exec: message.exec || undefined, // NOTE: added else undefined
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
        metadata: object.metadata || '',
        exec: object.exec !== null && object.exec !== undefined ? object.exec : 0,
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
        metadata: message.metadata || undefined, // NOTE: added else undefined
        exec: message.exec || undefined, // NOTE: added else undefined
      }
      console.log('toAmino output', output)
      return output // TODO: typescript errors
    },
  },
}
