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
} from '@regen-network/api/types/codegen/cosmos/group/v1/tx'

// TODO: fix amino converters
export const groupAminoConverters = {
  '/cosmos.group.v1.MsgCreateGroupWithPolicy': {
    aminoType: 'cosmos-sdk/MsgCreateGroupWithPolicy',
    fromAmino: (object: MsgCreateGroupWithPolicyAmino): MsgCreateGroupWithPolicy => {
      return {
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
    },
    toAmino: (message: MsgCreateGroupWithPolicy): MsgCreateGroupWithPolicyAmino => {
      console.log('toAmino message', message)
      return {
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
    },
  },
  '/cosmos.group.v1.MsgSubmitProposal': {
    aminoType: 'cosmos-sdk/MsgSubmitProposal',
    fromAmino: (object: MsgSubmitProposalAmino): MsgSubmitProposal => {
      return
    },
    toAmino: (message: MsgSubmitProposal): MsgSubmitProposalAmino => {
      return
    },
  },
}
