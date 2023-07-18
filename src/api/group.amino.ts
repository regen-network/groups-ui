import { MsgSend } from '@regen-network/api/src/codegen/cosmos/bank/v1beta1/tx'
import { MsgWithdrawDelegatorReward } from '@regen-network/api/src/codegen/cosmos/distribution/v1beta1/tx'
import {
  MsgUpdateGroupMembers,
  MsgUpdateGroupMetadata,
  MsgUpdateGroupPolicyDecisionPolicy,
} from '@regen-network/api/src/codegen/cosmos/group/v1/tx'
import {
  MemberRequest,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from '@regen-network/api/src/codegen/cosmos/group/v1/types'
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '@regen-network/api/src/codegen/cosmos/staking/v1beta1/tx'
import { Any } from '@regen-network/api/src/codegen/google/protobuf/any'
import type {
  MsgCreateGroupPolicy,
  MsgCreateGroupPolicyAmino,
  MsgCreateGroupWithPolicy,
  MsgCreateGroupWithPolicyAmino,
  MsgSubmitProposal,
  MsgSubmitProposalAmino,
  MsgUpdateGroupMembers as MsgUpdateGroupMembersType,
  MsgUpdateGroupMembersAmino,
  MsgUpdateGroupMetadata as MsgUpdateGroupMetadataType,
  MsgUpdateGroupMetadataAmino,
  MsgUpdateGroupPolicyDecisionPolicy as MsgUpdateGroupPolicyDecisionPolicyType,
  MsgUpdateGroupPolicyDecisionPolicyAmino,
  MsgVote,
  MsgVoteAmino,
} from '@regen-network/api/types/codegen/cosmos/group/v1/tx'
import { MemberRequestAmino } from '@regen-network/api/types/codegen/cosmos/group/v1/types'
import { AnyAmino } from '@regen-network/api/types/codegen/google/protobuf/any'
import Long from 'long'

// TODO: remove amino converter workaround #105
export const MemberRequestToAmino = (message: MemberRequest): MemberRequestAmino => {
  const output = {
    address: message.address,
    weight: message.weight,
    metadata: message.metadata || undefined, // NOTE: added else undefined
  }
  return output
}

// TODO: remove amino converter workaround #105
export const groupAminoConverters = {
  '/cosmos.group.v1.MsgCreateGroupPolicy': {
    aminoType: 'cosmos-sdk/MsgCreateGroupPolicy',
    fromAmino: (object: MsgCreateGroupPolicyAmino): MsgCreateGroupPolicy => {
      const output = {
        admin: object.admin,
        groupId: Long.fromString(object.group_id),
        metadata: object.metadata || '',
        decisionPolicy:
          object !== null && object !== void 0 && object.decision_policy
            ? object.decision_policy.type === 'cosmos-sdk/PercentageDecisionPolicy'
              ? (Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
                  value: PercentageDecisionPolicy.encode(
                    PercentageDecisionPolicy.fromPartial(
                      PercentageDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any)
              : (Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
                  value: ThresholdDecisionPolicy.encode(
                    ThresholdDecisionPolicy.fromPartial(
                      ThresholdDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any)
            : (Any.fromAmino(
                object.decision_policy as AnyAmino,
              ) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any),
      }
      return output
    },
    toAmino: (message: MsgCreateGroupPolicy): MsgCreateGroupPolicyAmino => {
      const output = {
        admin: message.admin,
        group_id: message.groupId ? message.groupId.toString() : undefined,
        metadata: message.metadata || undefined, // NOTE: added else undefined
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
      return output
    },
  },
  '/cosmos.group.v1.MsgCreateGroupWithPolicy': {
    aminoType: 'cosmos-sdk/MsgCreateGroupWithPolicy',
    fromAmino: (object: MsgCreateGroupWithPolicyAmino): MsgCreateGroupWithPolicy => {
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
              ? (Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
                  value: PercentageDecisionPolicy.encode(
                    PercentageDecisionPolicy.fromPartial(
                      PercentageDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any)
              : (Any.fromPartial({
                  typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
                  value: ThresholdDecisionPolicy.encode(
                    ThresholdDecisionPolicy.fromPartial(
                      ThresholdDecisionPolicy.fromAmino(object.decision_policy?.value),
                    ),
                  ).finish(),
                }) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any)
            : (Any.fromAmino(
                object.decision_policy as AnyAmino,
              ) as ThresholdDecisionPolicy & PercentageDecisionPolicy & Any),
      }
      return output
    },
    toAmino: (message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyAmino => {
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
      return output
    },
  },
  '/cosmos.group.v1.MsgSubmitProposal': {
    aminoType: 'cosmos-sdk/group/MsgSubmitProposal',
    fromAmino: (object: MsgSubmitProposalAmino): MsgSubmitProposal => {
      const output = {
        groupPolicyAddress: object.group_policy_address,
        proposers: Array.isArray(object?.proposers) ? object.proposers.map((e) => e) : [],
        metadata: object.metadata || '',
        messages: Array.isArray(object?.messages)
          ? object.messages.map((msg) => {
              switch (msg.type) {
                case 'cosmos-sdk/MsgSend':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.bank.v1beta1.MsgSend',
                    value: MsgSend.encode(
                      MsgSend.fromPartial(MsgSend.fromAmino(msg.value)),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgDelegate':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
                    value: MsgDelegate.encode(
                      MsgDelegate.fromPartial(MsgDelegate.fromAmino(msg.value)),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgBeginRedelegate':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
                    value: MsgBeginRedelegate.encode(
                      MsgBeginRedelegate.fromPartial(
                        MsgBeginRedelegate.fromAmino(msg.value),
                      ),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgUndelegate':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
                    value: MsgUndelegate.encode(
                      MsgUndelegate.fromPartial(MsgUndelegate.fromAmino(msg.value)),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgWithdrawDelegationReward':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
                    value: MsgWithdrawDelegatorReward.encode(
                      MsgWithdrawDelegatorReward.fromPartial(
                        MsgWithdrawDelegatorReward.fromAmino(msg.value),
                      ),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgUpdateGroupMembers':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.group.v1.MsgUpdateGroupMembers',
                    value: MsgUpdateGroupMembers.encode(
                      MsgUpdateGroupMembers.fromPartial(
                        MsgUpdateGroupMembers.fromAmino(msg.value),
                      ),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgUpdateGroupMetadata':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.group.v1.MsgUpdateGroupMetadata',
                    value: MsgUpdateGroupMetadata.encode(
                      MsgUpdateGroupMetadata.fromPartial(
                        MsgUpdateGroupMetadata.fromAmino(msg.value),
                      ),
                    ).finish(),
                  })
                case 'cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicy':
                  return Any.fromPartial({
                    typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy',
                    value: MsgUpdateGroupPolicyDecisionPolicy.encode(
                      MsgUpdateGroupPolicyDecisionPolicy.fromPartial(
                        MsgUpdateGroupPolicyDecisionPolicy.fromAmino(msg.value),
                      ),
                    ).finish(),
                  })
                default:
                  return Any.fromPartial({
                    typeUrl: 'not implemented',
                    value: new Uint8Array([]),
                  })
              }
            })
          : [],
        exec: object.exec !== null && object.exec !== undefined ? object.exec : 0,
      }
      return output
    },
    toAmino: (message: MsgSubmitProposal): MsgSubmitProposalAmino => {
      const output = {
        group_policy_address: message.groupPolicyAddress,
        proposers: message.proposers || undefined, // NOTE: added else undefined
        metadata: message.metadata || undefined, // NOTE: added else undefined
        messages:
          message.messages.length > 0
            ? message.messages.map((msg) => {
                switch (msg.typeUrl) {
                  case '/cosmos.bank.v1beta1.MsgSend':
                    return {
                      type: 'cosmos-sdk/MsgSend',
                      value: MsgSend.toAmino(MsgSend.decode(msg.value)),
                    }
                  case '/cosmos.staking.v1beta1.MsgDelegate':
                    return {
                      type: 'cosmos-sdk/MsgDelegate',
                      value: MsgDelegate.toAmino(MsgDelegate.decode(msg.value)),
                    }
                  case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
                    return {
                      type: 'cosmos-sdk/MsgBeginRedelegate',
                      value: MsgBeginRedelegate.toAmino(
                        MsgBeginRedelegate.decode(msg.value),
                      ),
                    }
                  case '/cosmos.staking.v1beta1.MsgUndelegate':
                    return {
                      type: 'cosmos-sdk/MsgUndelegate',
                      value: MsgUndelegate.toAmino(MsgUndelegate.decode(msg.value)),
                    }
                  case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
                    return {
                      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
                      value: MsgWithdrawDelegatorReward.toAmino(
                        MsgWithdrawDelegatorReward.decode(msg.value),
                      ),
                    }
                  case '/cosmos.group.v1.MsgUpdateGroupMembers':
                    return {
                      type: 'cosmos-sdk/MsgUpdateGroupMembers',
                      value: MsgUpdateGroupMembers.toAmino(
                        MsgUpdateGroupMembers.decode(msg.value),
                      ),
                    }
                  case '/cosmos.group.v1.MsgUpdateGroupMetadata':
                    return {
                      type: 'cosmos-sdk/MsgUpdateGroupMetadata',
                      value: MsgUpdateGroupMetadata.toAmino(
                        MsgUpdateGroupMetadata.decode(msg.value),
                      ),
                    }
                  case '/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy':
                    return {
                      type: 'cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicy',
                      value: MsgUpdateGroupPolicyDecisionPolicy.toAmino(
                        MsgUpdateGroupPolicyDecisionPolicy.decode(msg.value),
                      ),
                    }
                  default:
                    return {
                      type: 'not implemented',
                      value: undefined,
                    }
                }
              })
            : undefined,
        exec: message.exec || undefined, // NOTE: added else undefined
      }
      return output
    },
  },
  '/cosmos.group.v1.MsgUpdateGroupMembers': {
    aminoType: 'cosmos-sdk/MsgUpdateGroupMembers',
    fromAmino: (object: MsgUpdateGroupMembersAmino): MsgUpdateGroupMembersType => {
      const output = {
        admin: object.admin,
        groupId: Long.fromString(object.group_id),
        memberUpdates: Array.isArray(
          object === null || object === void 0 ? void 0 : object.member_updates,
        )
          ? object.member_updates.map((e) => MemberRequest.fromAmino(e))
          : [],
      }
      return output
    },
    toAmino: (message: MsgUpdateGroupMembersType): MsgUpdateGroupMembersAmino => {
      const output = {
        admin: message.admin,
        group_id: message.groupId ? message.groupId.toString() : undefined,
        member_updates: message.memberUpdates
          ? message.memberUpdates.map((e) => MemberRequestToAmino(e))
          : [],
      }
      return output
    },
  },
  '/cosmos.group.v1.MsgUpdateGroupMetadata': {
    aminoType: 'cosmos-sdk/MsgUpdateGroupMetadata',
    fromAmino: (object: MsgUpdateGroupMetadataAmino): MsgUpdateGroupMetadataType => {
      const output = {
        admin: object.admin,
        groupId: Long.fromString(object.group_id),
        metadata: object.metadata || '',
      }
      return output
    },
    toAmino: (message: MsgUpdateGroupMetadataType): MsgUpdateGroupMetadataAmino => {
      const output = {
        admin: message.admin,
        group_id: message.groupId ? message.groupId.toString() : undefined,
        metadata: message.metadata || undefined, // NOTE: added else undefined
      }
      return output
    },
  },
  '/cosmos.group.v1.MsgVote': {
    aminoType: 'cosmos-sdk/group/MsgVote',
    fromAmino: (object: MsgVoteAmino): MsgVote => {
      const output = {
        proposalId: Long.fromString(object.proposal_id),
        voter: object.voter,
        option: object.option !== null && object.option !== undefined ? object.option : 0,
        metadata: object.metadata || '',
        exec: object.exec !== null && object.exec !== undefined ? object.exec : 0,
      }
      return output
    },
    toAmino: (message: MsgVote): MsgVoteAmino => {
      const output = {
        proposal_id: message.proposalId ? message.proposalId.toString() : undefined,
        voter: message.voter,
        option: message.option,
        metadata: message.metadata || undefined, // NOTE: added else undefined
        exec: message.exec || undefined, // NOTE: added else undefined
      }
      return output
    },
  },
}
