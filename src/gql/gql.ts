/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment ProposalItem on Proposal {\n  type\n  blockHeight\n  txIdx\n  msgIdx\n  chainNum\n  timestamp\n  txHash\n  id: proposalId\n  status\n  groupPolicyAddress\n  groupPolicyVersion\n  metadata\n  proposers\n  submitTime\n  groupVersion\n  groupPolicyAddress\n  finalTallyResult\n  votingPeriodEnd\n  executorResult\n  messages\n}": types.ProposalItemFragmentDoc,
    "query ProposalsByGroupPolicyAddress($groupPolicyAddress: String!) {\n  allProposals(condition: {groupPolicyAddress: $groupPolicyAddress}) {\n    nodes {\n      ...ProposalItem\n    }\n  }\n}": types.ProposalsByGroupPolicyAddressDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProposalItem on Proposal {\n  type\n  blockHeight\n  txIdx\n  msgIdx\n  chainNum\n  timestamp\n  txHash\n  id: proposalId\n  status\n  groupPolicyAddress\n  groupPolicyVersion\n  metadata\n  proposers\n  submitTime\n  groupVersion\n  groupPolicyAddress\n  finalTallyResult\n  votingPeriodEnd\n  executorResult\n  messages\n}"): (typeof documents)["fragment ProposalItem on Proposal {\n  type\n  blockHeight\n  txIdx\n  msgIdx\n  chainNum\n  timestamp\n  txHash\n  id: proposalId\n  status\n  groupPolicyAddress\n  groupPolicyVersion\n  metadata\n  proposers\n  submitTime\n  groupVersion\n  groupPolicyAddress\n  finalTallyResult\n  votingPeriodEnd\n  executorResult\n  messages\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProposalsByGroupPolicyAddress($groupPolicyAddress: String!) {\n  allProposals(condition: {groupPolicyAddress: $groupPolicyAddress}) {\n    nodes {\n      ...ProposalItem\n    }\n  }\n}"): (typeof documents)["query ProposalsByGroupPolicyAddress($groupPolicyAddress: String!) {\n  allProposals(condition: {groupPolicyAddress: $groupPolicyAddress}) {\n    nodes {\n      ...ProposalItem\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;