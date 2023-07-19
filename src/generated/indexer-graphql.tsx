import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Block = Node & {
  __typename?: 'Block';
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  chainNum: Scalars['Int']['output'];
  data: Scalars['JSON']['output'];
  height: Scalars['BigInt']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  time: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `Tx`. */
  txesByChainNumAndBlockHeight: TxesConnection;
};


export type BlockTxesByChainNumAndBlockHeightArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TxCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TxesOrderBy>>;
};

/** A condition to be used against `Block` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BlockCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `Block` */
export type BlockInput = {
  chainNum: Scalars['Int']['input'];
  data: Scalars['JSON']['input'];
  height: Scalars['BigInt']['input'];
  time: Scalars['Datetime']['input'];
};

/** Represents an update to a `Block`. Fields that are set will be updated. */
export type BlockPatch = {
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  height?: InputMaybe<Scalars['BigInt']['input']>;
  time?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Block` values. */
export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  /** A list of edges which contains the `Block` and cursor to aid in pagination. */
  edges: Array<BlocksEdge>;
  /** A list of `Block` objects. */
  nodes: Array<Maybe<Block>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Block` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Block` edge in the connection. */
export type BlocksEdge = {
  __typename?: 'BlocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Block` at the end of the edge. */
  node?: Maybe<Block>;
};

/** Methods to use when ordering `Block`. */
export enum BlocksOrderBy {
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type Chain = Node & {
  __typename?: 'Chain';
  /** Reads and enables pagination through a set of `Block`. */
  blocksByChainNum: BlocksConnection;
  chainId: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  num: Scalars['Int']['output'];
};


export type ChainBlocksByChainNumArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BlockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlocksOrderBy>>;
};

/** A condition to be used against `Chain` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChainCondition = {
  /** Checks for equality with the object’s `chainId` field. */
  chainId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `num` field. */
  num?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Chain` */
export type ChainInput = {
  chainId: Scalars['String']['input'];
  num?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents an update to a `Chain`. Fields that are set will be updated. */
export type ChainPatch = {
  chainId?: InputMaybe<Scalars['String']['input']>;
  num?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Chain` values. */
export type ChainsConnection = {
  __typename?: 'ChainsConnection';
  /** A list of edges which contains the `Chain` and cursor to aid in pagination. */
  edges: Array<ChainsEdge>;
  /** A list of `Chain` objects. */
  nodes: Array<Maybe<Chain>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Chain` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Chain` edge in the connection. */
export type ChainsEdge = {
  __typename?: 'ChainsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Chain` at the end of the edge. */
  node?: Maybe<Chain>;
};

/** Methods to use when ordering `Chain`. */
export enum ChainsOrderBy {
  ChainIdAsc = 'CHAIN_ID_ASC',
  ChainIdDesc = 'CHAIN_ID_DESC',
  Natural = 'NATURAL',
  NumAsc = 'NUM_ASC',
  NumDesc = 'NUM_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Block` mutation. */
export type CreateBlockInput = {
  /** The `Block` to be created by this mutation. */
  block: BlockInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Block` mutation. */
export type CreateBlockPayload = {
  __typename?: 'CreateBlockPayload';
  /** The `Block` that was created by this mutation. */
  block?: Maybe<Block>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Block` mutation. */
export type CreateBlockPayloadBlockEdgeArgs = {
  orderBy?: InputMaybe<Array<BlocksOrderBy>>;
};

/** All input for the create `Chain` mutation. */
export type CreateChainInput = {
  /** The `Chain` to be created by this mutation. */
  chain: ChainInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Chain` mutation. */
export type CreateChainPayload = {
  __typename?: 'CreateChainPayload';
  /** The `Chain` that was created by this mutation. */
  chain?: Maybe<Chain>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Chain` mutation. */
export type CreateChainPayloadChainEdgeArgs = {
  orderBy?: InputMaybe<Array<ChainsOrderBy>>;
};

/** All input for the create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `MsgEventAttr` to be created by this mutation. */
  msgEventAttr: MsgEventAttrInput;
};

/** The output of our create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrPayload = {
  __typename?: 'CreateMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEventAttr` that was created by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the create `MsgEvent` mutation. */
export type CreateMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `MsgEvent` to be created by this mutation. */
  msgEvent: MsgEventInput;
};

/** The output of our create `MsgEvent` mutation. */
export type CreateMsgEventPayload = {
  __typename?: 'CreateMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEvent` that was created by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `MsgEvent` mutation. */
export type CreateMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventsOrderBy>>;
};

/** All input for the create `Msg` mutation. */
export type CreateMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Msg` to be created by this mutation. */
  msg: MsgInput;
};

/** The output of our create `Msg` mutation. */
export type CreateMsgPayload = {
  __typename?: 'CreateMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Msg` that was created by this mutation. */
  msg?: Maybe<Msg>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
};


/** The output of our create `Msg` mutation. */
export type CreateMsgPayloadMsgEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgsOrderBy>>;
};

/** All input for the create `Proposal` mutation. */
export type CreateProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Proposal` to be created by this mutation. */
  proposal: ProposalInput;
};

/** The output of our create `Proposal` mutation. */
export type CreateProposalPayload = {
  __typename?: 'CreateProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** The `Proposal` that was created by this mutation. */
  proposal?: Maybe<Proposal>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Proposal` mutation. */
export type CreateProposalPayloadProposalEdgeArgs = {
  orderBy?: InputMaybe<Array<ProposalsOrderBy>>;
};

/** All input for the create `Retirement` mutation. */
export type CreateRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Retirement` to be created by this mutation. */
  retirement: RetirementInput;
};

/** The output of our create `Retirement` mutation. */
export type CreateRetirementPayload = {
  __typename?: 'CreateRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Retirement` that was created by this mutation. */
  retirement?: Maybe<Retirement>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our create `Retirement` mutation. */
export type CreateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: InputMaybe<Array<RetirementsOrderBy>>;
};

/** All input for the create `Tx` mutation. */
export type CreateTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Tx` to be created by this mutation. */
  tx: TxInput;
};

/** The output of our create `Tx` mutation. */
export type CreateTxPayload = {
  __typename?: 'CreateTxPayload';
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tx` that was created by this mutation. */
  tx?: Maybe<Tx>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our create `Tx` mutation. */
export type CreateTxPayloadTxEdgeArgs = {
  orderBy?: InputMaybe<Array<TxesOrderBy>>;
};

/** All input for the `deleteBlockByChainNumAndHeight` mutation. */
export type DeleteBlockByChainNumAndHeightInput = {
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['BigInt']['input'];
};

/** All input for the `deleteBlock` mutation. */
export type DeleteBlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Block` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Block` mutation. */
export type DeleteBlockPayload = {
  __typename?: 'DeleteBlockPayload';
  /** The `Block` that was deleted by this mutation. */
  block?: Maybe<Block>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedBlockId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Block` mutation. */
export type DeleteBlockPayloadBlockEdgeArgs = {
  orderBy?: InputMaybe<Array<BlocksOrderBy>>;
};

/** All input for the `deleteChainByChainId` mutation. */
export type DeleteChainByChainIdInput = {
  chainId: Scalars['String']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `deleteChainByNum` mutation. */
export type DeleteChainByNumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  num: Scalars['Int']['input'];
};

/** All input for the `deleteChain` mutation. */
export type DeleteChainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Chain` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Chain` mutation. */
export type DeleteChainPayload = {
  __typename?: 'DeleteChainPayload';
  /** The `Chain` that was deleted by this mutation. */
  chain?: Maybe<Chain>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedChainId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Chain` mutation. */
export type DeleteChainPayloadChainEdgeArgs = {
  orderBy?: InputMaybe<Array<ChainsOrderBy>>;
};

/** All input for the `deleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};

/** All input for the `deleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash` mutation. */
export type DeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  valueHash: Scalars['String']['input'];
};

/** All input for the `deleteMsgEventAttr` mutation. */
export type DeleteMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `MsgEventAttr` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `MsgEventAttr` mutation. */
export type DeleteMsgEventAttrPayload = {
  __typename?: 'DeleteMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMsgEventAttrId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEventAttr` that was deleted by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `MsgEventAttr` mutation. */
export type DeleteMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the `deleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType` mutation. */
export type DeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** All input for the `deleteMsgEvent` mutation. */
export type DeleteMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `MsgEvent` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `MsgEvent` mutation. */
export type DeleteMsgEventPayload = {
  __typename?: 'DeleteMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMsgEventId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEvent` that was deleted by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `MsgEvent` mutation. */
export type DeleteMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventsOrderBy>>;
};

/** All input for the `deleteMsg` mutation. */
export type DeleteMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Msg` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Msg` mutation. */
export type DeleteMsgPayload = {
  __typename?: 'DeleteMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMsgId?: Maybe<Scalars['ID']['output']>;
  /** The `Msg` that was deleted by this mutation. */
  msg?: Maybe<Msg>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
};


/** The output of our delete `Msg` mutation. */
export type DeleteMsgPayloadMsgEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgsOrderBy>>;
};

/** All input for the `deleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};

/** All input for the `deleteProposal` mutation. */
export type DeleteProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Proposal` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Proposal` mutation. */
export type DeleteProposalPayload = {
  __typename?: 'DeleteProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedProposalId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** The `Proposal` that was deleted by this mutation. */
  proposal?: Maybe<Proposal>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Proposal` mutation. */
export type DeleteProposalPayloadProposalEdgeArgs = {
  orderBy?: InputMaybe<Array<ProposalsOrderBy>>;
};

/** All input for the `deleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};

/** All input for the `deleteRetirement` mutation. */
export type DeleteRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Retirement` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Retirement` mutation. */
export type DeleteRetirementPayload = {
  __typename?: 'DeleteRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRetirementId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Retirement` that was deleted by this mutation. */
  retirement?: Maybe<Retirement>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our delete `Retirement` mutation. */
export type DeleteRetirementPayloadRetirementEdgeArgs = {
  orderBy?: InputMaybe<Array<RetirementsOrderBy>>;
};

/** All input for the `deleteTxByChainNumAndBlockHeightAndTxIdx` mutation. */
export type DeleteTxByChainNumAndBlockHeightAndTxIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  txIdx: Scalars['Int']['input'];
};

/** All input for the `deleteTxByHash` mutation. */
export type DeleteTxByHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
};

/** All input for the `deleteTx` mutation. */
export type DeleteTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tx` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our delete `Tx` mutation. */
export type DeleteTxPayload = {
  __typename?: 'DeleteTxPayload';
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTxId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tx` that was deleted by this mutation. */
  tx?: Maybe<Tx>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our delete `Tx` mutation. */
export type DeleteTxPayloadTxEdgeArgs = {
  orderBy?: InputMaybe<Array<TxesOrderBy>>;
};

export type Msg = Node & {
  __typename?: 'Msg';
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  data: Scalars['JSON']['output'];
  /** Reads and enables pagination through a set of `MsgEventAttr`. */
  msgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventAttrsConnection;
  /** Reads and enables pagination through a set of `MsgEvent`. */
  msgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventsConnection;
  msgIdx: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  txIdx: Scalars['Int']['output'];
};


export type MsgMsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgEventAttrCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgEventAttrsOrderBy>>;
};


export type MsgMsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgEventCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgEventsOrderBy>>;
};

/** A condition to be used against `Msg` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MsgCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
};

export type MsgEvent = Node & {
  __typename?: 'MsgEvent';
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  msgIdx: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Proposal`. */
  proposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: ProposalsConnection;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: RetirementsConnection;
  txIdx: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};


export type MsgEventProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProposalCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProposalsOrderBy>>;
};


export type MsgEventRetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RetirementCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RetirementsOrderBy>>;
};

export type MsgEventAttr = Node & {
  __typename?: 'MsgEventAttr';
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  msgIdx: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  txIdx: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
  valueHash: Scalars['String']['output'];
};

/**
 * A condition to be used against `MsgEventAttr` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MsgEventAttrCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `key` field. */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `valueHash` field. */
  valueHash?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `MsgEventAttr` */
export type MsgEventAttrInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  key: Scalars['String']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
  valueHash: Scalars['String']['input'];
};

/** Represents an update to a `MsgEventAttr`. Fields that are set will be updated. */
export type MsgEventAttrPatch = {
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  valueHash?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `MsgEventAttr` values. */
export type MsgEventAttrsConnection = {
  __typename?: 'MsgEventAttrsConnection';
  /** A list of edges which contains the `MsgEventAttr` and cursor to aid in pagination. */
  edges: Array<MsgEventAttrsEdge>;
  /** A list of `MsgEventAttr` objects. */
  nodes: Array<Maybe<MsgEventAttr>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgEventAttr` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `MsgEventAttr` edge in the connection. */
export type MsgEventAttrsEdge = {
  __typename?: 'MsgEventAttrsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `MsgEventAttr` at the end of the edge. */
  node?: Maybe<MsgEventAttr>;
};

/** Methods to use when ordering `MsgEventAttr`. */
export enum MsgEventAttrsOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC',
  ValueHashAsc = 'VALUE_HASH_ASC',
  ValueHashDesc = 'VALUE_HASH_DESC'
}

/**
 * A condition to be used against `MsgEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MsgEventCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `MsgEvent` */
export type MsgEventInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** Represents an update to a `MsgEvent`. Fields that are set will be updated. */
export type MsgEventPatch = {
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `MsgEvent` values. */
export type MsgEventsConnection = {
  __typename?: 'MsgEventsConnection';
  /** A list of edges which contains the `MsgEvent` and cursor to aid in pagination. */
  edges: Array<MsgEventsEdge>;
  /** A list of `MsgEvent` objects. */
  nodes: Array<Maybe<MsgEvent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgEvent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `MsgEvent` edge in the connection. */
export type MsgEventsEdge = {
  __typename?: 'MsgEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `MsgEvent` at the end of the edge. */
  node?: Maybe<MsgEvent>;
};

/** Methods to use when ordering `MsgEvent`. */
export enum MsgEventsOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

/** An input for mutations affecting `Msg` */
export type MsgInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  data: Scalars['JSON']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};

/** Represents an update to a `Msg`. Fields that are set will be updated. */
export type MsgPatch = {
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Msg` values. */
export type MsgsConnection = {
  __typename?: 'MsgsConnection';
  /** A list of edges which contains the `Msg` and cursor to aid in pagination. */
  edges: Array<MsgsEdge>;
  /** A list of `Msg` objects. */
  nodes: Array<Maybe<Msg>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Msg` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Msg` edge in the connection. */
export type MsgsEdge = {
  __typename?: 'MsgsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Msg` at the end of the edge. */
  node?: Maybe<Msg>;
};

/** Methods to use when ordering `Msg`. */
export enum MsgsOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Block`. */
  createBlock?: Maybe<CreateBlockPayload>;
  /** Creates a single `Chain`. */
  createChain?: Maybe<CreateChainPayload>;
  /** Creates a single `Msg`. */
  createMsg?: Maybe<CreateMsgPayload>;
  /** Creates a single `MsgEvent`. */
  createMsgEvent?: Maybe<CreateMsgEventPayload>;
  /** Creates a single `MsgEventAttr`. */
  createMsgEventAttr?: Maybe<CreateMsgEventAttrPayload>;
  /** Creates a single `Proposal`. */
  createProposal?: Maybe<CreateProposalPayload>;
  /** Creates a single `Retirement`. */
  createRetirement?: Maybe<CreateRetirementPayload>;
  /** Creates a single `Tx`. */
  createTx?: Maybe<CreateTxPayload>;
  /** Deletes a single `Block` using its globally unique id. */
  deleteBlock?: Maybe<DeleteBlockPayload>;
  /** Deletes a single `Block` using a unique key. */
  deleteBlockByChainNumAndHeight?: Maybe<DeleteBlockPayload>;
  /** Deletes a single `Chain` using its globally unique id. */
  deleteChain?: Maybe<DeleteChainPayload>;
  /** Deletes a single `Chain` using a unique key. */
  deleteChainByChainId?: Maybe<DeleteChainPayload>;
  /** Deletes a single `Chain` using a unique key. */
  deleteChainByNum?: Maybe<DeleteChainPayload>;
  /** Deletes a single `Msg` using its globally unique id. */
  deleteMsg?: Maybe<DeleteMsgPayload>;
  /** Deletes a single `Msg` using a unique key. */
  deleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteMsgPayload>;
  /** Deletes a single `MsgEvent` using its globally unique id. */
  deleteMsgEvent?: Maybe<DeleteMsgEventPayload>;
  /** Deletes a single `MsgEventAttr` using its globally unique id. */
  deleteMsgEventAttr?: Maybe<DeleteMsgEventAttrPayload>;
  /** Deletes a single `MsgEventAttr` using a unique key. */
  deleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<DeleteMsgEventAttrPayload>;
  /** Deletes a single `MsgEvent` using a unique key. */
  deleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<DeleteMsgEventPayload>;
  /** Deletes a single `Proposal` using its globally unique id. */
  deleteProposal?: Maybe<DeleteProposalPayload>;
  /** Deletes a single `Proposal` using a unique key. */
  deleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteProposalPayload>;
  /** Deletes a single `Retirement` using its globally unique id. */
  deleteRetirement?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Retirement` using a unique key. */
  deleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Tx` using its globally unique id. */
  deleteTx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByChainNumAndBlockHeightAndTxIdx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByHash?: Maybe<DeleteTxPayload>;
  /** Updates a single `Block` using its globally unique id and a patch. */
  updateBlock?: Maybe<UpdateBlockPayload>;
  /** Updates a single `Block` using a unique key and a patch. */
  updateBlockByChainNumAndHeight?: Maybe<UpdateBlockPayload>;
  /** Updates a single `Chain` using its globally unique id and a patch. */
  updateChain?: Maybe<UpdateChainPayload>;
  /** Updates a single `Chain` using a unique key and a patch. */
  updateChainByChainId?: Maybe<UpdateChainPayload>;
  /** Updates a single `Chain` using a unique key and a patch. */
  updateChainByNum?: Maybe<UpdateChainPayload>;
  /** Updates a single `Msg` using its globally unique id and a patch. */
  updateMsg?: Maybe<UpdateMsgPayload>;
  /** Updates a single `Msg` using a unique key and a patch. */
  updateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateMsgPayload>;
  /** Updates a single `MsgEvent` using its globally unique id and a patch. */
  updateMsgEvent?: Maybe<UpdateMsgEventPayload>;
  /** Updates a single `MsgEventAttr` using its globally unique id and a patch. */
  updateMsgEventAttr?: Maybe<UpdateMsgEventAttrPayload>;
  /** Updates a single `MsgEventAttr` using a unique key and a patch. */
  updateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<UpdateMsgEventAttrPayload>;
  /** Updates a single `MsgEvent` using a unique key and a patch. */
  updateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<UpdateMsgEventPayload>;
  /** Updates a single `Proposal` using its globally unique id and a patch. */
  updateProposal?: Maybe<UpdateProposalPayload>;
  /** Updates a single `Proposal` using a unique key and a patch. */
  updateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateProposalPayload>;
  /** Updates a single `Retirement` using its globally unique id and a patch. */
  updateRetirement?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Retirement` using a unique key and a patch. */
  updateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Tx` using its globally unique id and a patch. */
  updateTx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByChainNumAndBlockHeightAndTxIdx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByHash?: Maybe<UpdateTxPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBlockArgs = {
  input: CreateBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChainArgs = {
  input: CreateChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgArgs = {
  input: CreateMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgEventArgs = {
  input: CreateMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgEventAttrArgs = {
  input: CreateMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRetirementArgs = {
  input: CreateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTxArgs = {
  input: CreateTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBlockArgs = {
  input: DeleteBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBlockByChainNumAndHeightArgs = {
  input: DeleteBlockByChainNumAndHeightInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainArgs = {
  input: DeleteChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainByChainIdArgs = {
  input: DeleteChainByChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainByNumArgs = {
  input: DeleteChainByNumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgArgs = {
  input: DeleteMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventArgs = {
  input: DeleteMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventAttrArgs = {
  input: DeleteMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  input: DeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  input: DeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProposalArgs = {
  input: DeleteProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementArgs = {
  input: DeleteRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxArgs = {
  input: DeleteTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxByChainNumAndBlockHeightAndTxIdxArgs = {
  input: DeleteTxByChainNumAndBlockHeightAndTxIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxByHashArgs = {
  input: DeleteTxByHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBlockArgs = {
  input: UpdateBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBlockByChainNumAndHeightArgs = {
  input: UpdateBlockByChainNumAndHeightInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainArgs = {
  input: UpdateChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainByChainIdArgs = {
  input: UpdateChainByChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainByNumArgs = {
  input: UpdateChainByNumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgArgs = {
  input: UpdateMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventArgs = {
  input: UpdateMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventAttrArgs = {
  input: UpdateMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  input: UpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  input: UpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProposalArgs = {
  input: UpdateProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementArgs = {
  input: UpdateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxArgs = {
  input: UpdateTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxByChainNumAndBlockHeightAndTxIdxArgs = {
  input: UpdateTxByChainNumAndBlockHeightAndTxIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxByHashArgs = {
  input: UpdateTxByHashInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Proposal = Node & {
  __typename?: 'Proposal';
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  executorResult: Scalars['String']['output'];
  finalTallyResult: Scalars['JSON']['output'];
  groupPolicyAddress: Scalars['String']['output'];
  groupPolicyVersion: Scalars['BigInt']['output'];
  groupVersion: Scalars['BigInt']['output'];
  messages: Scalars['JSON']['output'];
  metadata: Scalars['String']['output'];
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  msgIdx: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  proposalId: Scalars['BigInt']['output'];
  proposers: Array<Maybe<Scalars['String']['output']>>;
  status: Scalars['String']['output'];
  submitTime?: Maybe<Scalars['Datetime']['output']>;
  timestamp?: Maybe<Scalars['Datetime']['output']>;
  txHash: Scalars['String']['output'];
  txIdx: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  votingPeriodEnd: Scalars['Datetime']['output'];
};

/**
 * A condition to be used against `Proposal` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProposalCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `executorResult` field. */
  executorResult?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `finalTallyResult` field. */
  finalTallyResult?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `groupPolicyAddress` field. */
  groupPolicyAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `groupPolicyVersion` field. */
  groupPolicyVersion?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `groupVersion` field. */
  groupVersion?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `messages` field. */
  messages?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `proposalId` field. */
  proposalId?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `proposers` field. */
  proposers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `submitTime` field. */
  submitTime?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `votingPeriodEnd` field. */
  votingPeriodEnd?: InputMaybe<Scalars['Datetime']['input']>;
};

/** An input for mutations affecting `Proposal` */
export type ProposalInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  executorResult: Scalars['String']['input'];
  finalTallyResult: Scalars['JSON']['input'];
  groupPolicyAddress: Scalars['String']['input'];
  groupPolicyVersion: Scalars['BigInt']['input'];
  groupVersion: Scalars['BigInt']['input'];
  messages: Scalars['JSON']['input'];
  metadata: Scalars['String']['input'];
  msgIdx: Scalars['Int']['input'];
  proposalId: Scalars['BigInt']['input'];
  proposers: Array<InputMaybe<Scalars['String']['input']>>;
  status: Scalars['String']['input'];
  submitTime?: InputMaybe<Scalars['Datetime']['input']>;
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  txHash: Scalars['String']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  votingPeriodEnd: Scalars['Datetime']['input'];
};

/** Represents an update to a `Proposal`. Fields that are set will be updated. */
export type ProposalPatch = {
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  executorResult?: InputMaybe<Scalars['String']['input']>;
  finalTallyResult?: InputMaybe<Scalars['JSON']['input']>;
  groupPolicyAddress?: InputMaybe<Scalars['String']['input']>;
  groupPolicyVersion?: InputMaybe<Scalars['BigInt']['input']>;
  groupVersion?: InputMaybe<Scalars['BigInt']['input']>;
  messages?: InputMaybe<Scalars['JSON']['input']>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  proposalId?: InputMaybe<Scalars['BigInt']['input']>;
  proposers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  submitTime?: InputMaybe<Scalars['Datetime']['input']>;
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  votingPeriodEnd?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Proposal` values. */
export type ProposalsConnection = {
  __typename?: 'ProposalsConnection';
  /** A list of edges which contains the `Proposal` and cursor to aid in pagination. */
  edges: Array<ProposalsEdge>;
  /** A list of `Proposal` objects. */
  nodes: Array<Maybe<Proposal>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Proposal` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Proposal` edge in the connection. */
export type ProposalsEdge = {
  __typename?: 'ProposalsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Proposal` at the end of the edge. */
  node?: Maybe<Proposal>;
};

/** Methods to use when ordering `Proposal`. */
export enum ProposalsOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  ExecutorResultAsc = 'EXECUTOR_RESULT_ASC',
  ExecutorResultDesc = 'EXECUTOR_RESULT_DESC',
  FinalTallyResultAsc = 'FINAL_TALLY_RESULT_ASC',
  FinalTallyResultDesc = 'FINAL_TALLY_RESULT_DESC',
  GroupPolicyAddressAsc = 'GROUP_POLICY_ADDRESS_ASC',
  GroupPolicyAddressDesc = 'GROUP_POLICY_ADDRESS_DESC',
  GroupPolicyVersionAsc = 'GROUP_POLICY_VERSION_ASC',
  GroupPolicyVersionDesc = 'GROUP_POLICY_VERSION_DESC',
  GroupVersionAsc = 'GROUP_VERSION_ASC',
  GroupVersionDesc = 'GROUP_VERSION_DESC',
  MessagesAsc = 'MESSAGES_ASC',
  MessagesDesc = 'MESSAGES_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProposalIdAsc = 'PROPOSAL_ID_ASC',
  ProposalIdDesc = 'PROPOSAL_ID_DESC',
  ProposersAsc = 'PROPOSERS_ASC',
  ProposersDesc = 'PROPOSERS_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  SubmitTimeAsc = 'SUBMIT_TIME_ASC',
  SubmitTimeDesc = 'SUBMIT_TIME_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  VotingPeriodEndAsc = 'VOTING_PERIOD_END_ASC',
  VotingPeriodEndDesc = 'VOTING_PERIOD_END_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Block`. */
  allBlocks?: Maybe<BlocksConnection>;
  /** Reads and enables pagination through a set of `Chain`. */
  allChains?: Maybe<ChainsConnection>;
  /** Reads and enables pagination through a set of `MsgEventAttr`. */
  allMsgEventAttrs?: Maybe<MsgEventAttrsConnection>;
  /** Reads and enables pagination through a set of `MsgEvent`. */
  allMsgEvents?: Maybe<MsgEventsConnection>;
  /** Reads and enables pagination through a set of `Msg`. */
  allMsgs?: Maybe<MsgsConnection>;
  /** Reads and enables pagination through a set of `Proposal`. */
  allProposals?: Maybe<ProposalsConnection>;
  /** Reads and enables pagination through a set of `Retirement`. */
  allRetirements?: Maybe<RetirementsConnection>;
  /** Reads and enables pagination through a set of `Tx`. */
  allTxes?: Maybe<TxesConnection>;
  /** Reads a single `Block` using its globally unique `ID`. */
  block?: Maybe<Block>;
  blockByChainNumAndHeight?: Maybe<Block>;
  /** Reads a single `Chain` using its globally unique `ID`. */
  chain?: Maybe<Chain>;
  chainByChainId?: Maybe<Chain>;
  chainByNum?: Maybe<Chain>;
  /** Reads a single `Msg` using its globally unique `ID`. */
  msg?: Maybe<Msg>;
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** Reads a single `MsgEvent` using its globally unique `ID`. */
  msgEvent?: Maybe<MsgEvent>;
  /** Reads a single `MsgEventAttr` using its globally unique `ID`. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  msgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<MsgEventAttr>;
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `Proposal` using its globally unique `ID`. */
  proposal?: Maybe<Proposal>;
  proposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Proposal>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `Retirement` using its globally unique `ID`. */
  retirement?: Maybe<Retirement>;
  retirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Retirement>;
  /** Reads a single `Tx` using its globally unique `ID`. */
  tx?: Maybe<Tx>;
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  txByHash?: Maybe<Tx>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBlocksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<BlockCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlocksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChainsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ChainCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChainsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMsgEventAttrsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgEventAttrCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgEventAttrsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMsgEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgEventCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMsgsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllProposalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProposalCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProposalsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllRetirementsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RetirementCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RetirementsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllTxesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TxCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TxesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockByChainNumAndHeightArgs = {
  chainNum: Scalars['Int']['input'];
  height: Scalars['BigInt']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainByChainIdArgs = {
  chainId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainByNumArgs = {
  num: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventAttrArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  key: Scalars['String']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  valueHash: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProposalArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxByChainNumAndBlockHeightAndTxIdxArgs = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxByHashArgs = {
  hash: Scalars['String']['input'];
};

export type Retirement = Node & {
  __typename?: 'Retirement';
  amount: Scalars['String']['output'];
  batchDenom: Scalars['String']['output'];
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  jurisdiction: Scalars['String']['output'];
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  msgIdx: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['Datetime']['output']>;
  txHash: Scalars['String']['output'];
  txIdx: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/**
 * A condition to be used against `Retirement` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RetirementCondition = {
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `jurisdiction` field. */
  jurisdiction?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `Retirement` */
export type RetirementInput = {
  amount: Scalars['String']['input'];
  batchDenom: Scalars['String']['input'];
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  jurisdiction: Scalars['String']['input'];
  msgIdx: Scalars['Int']['input'];
  owner: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  txHash: Scalars['String']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** Represents an update to a `Retirement`. Fields that are set will be updated. */
export type RetirementPatch = {
  amount?: InputMaybe<Scalars['String']['input']>;
  batchDenom?: InputMaybe<Scalars['String']['input']>;
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  jurisdiction?: InputMaybe<Scalars['String']['input']>;
  msgIdx?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Datetime']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Retirement` values. */
export type RetirementsConnection = {
  __typename?: 'RetirementsConnection';
  /** A list of edges which contains the `Retirement` and cursor to aid in pagination. */
  edges: Array<RetirementsEdge>;
  /** A list of `Retirement` objects. */
  nodes: Array<Maybe<Retirement>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Retirement` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Retirement` edge in the connection. */
export type RetirementsEdge = {
  __typename?: 'RetirementsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Retirement` at the end of the edge. */
  node?: Maybe<Retirement>;
};

/** Methods to use when ordering `Retirement`. */
export enum RetirementsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  JurisdictionAsc = 'JURISDICTION_ASC',
  JurisdictionDesc = 'JURISDICTION_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  Natural = 'NATURAL',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

export type Tx = Node & {
  __typename?: 'Tx';
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  blockHeight: Scalars['BigInt']['output'];
  chainNum: Scalars['Int']['output'];
  data: Scalars['JSON']['output'];
  hash: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Msg`. */
  msgsByChainNumAndBlockHeightAndTxIdx: MsgsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  txIdx: Scalars['Int']['output'];
};


export type TxMsgsByChainNumAndBlockHeightAndTxIdxArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MsgCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MsgsOrderBy>>;
};

/** A condition to be used against `Tx` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TxCondition = {
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `data` field. */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: InputMaybe<Scalars['Int']['input']>;
};

/** An input for mutations affecting `Tx` */
export type TxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  data: Scalars['JSON']['input'];
  hash: Scalars['String']['input'];
  txIdx: Scalars['Int']['input'];
};

/** Represents an update to a `Tx`. Fields that are set will be updated. */
export type TxPatch = {
  blockHeight?: InputMaybe<Scalars['BigInt']['input']>;
  chainNum?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  txIdx?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Tx` values. */
export type TxesConnection = {
  __typename?: 'TxesConnection';
  /** A list of edges which contains the `Tx` and cursor to aid in pagination. */
  edges: Array<TxesEdge>;
  /** A list of `Tx` objects. */
  nodes: Array<Maybe<Tx>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tx` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tx` edge in the connection. */
export type TxesEdge = {
  __typename?: 'TxesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tx` at the end of the edge. */
  node?: Maybe<Tx>;
};

/** Methods to use when ordering `Tx`. */
export enum TxesOrderBy {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC'
}

/** All input for the `updateBlockByChainNumAndHeight` mutation. */
export type UpdateBlockByChainNumAndHeightInput = {
  /** An object where the defined keys will be set on the `Block` being updated. */
  blockPatch: BlockPatch;
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  height: Scalars['BigInt']['input'];
};

/** All input for the `updateBlock` mutation. */
export type UpdateBlockInput = {
  /** An object where the defined keys will be set on the `Block` being updated. */
  blockPatch: BlockPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Block` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `Block` mutation. */
export type UpdateBlockPayload = {
  __typename?: 'UpdateBlockPayload';
  /** The `Block` that was updated by this mutation. */
  block?: Maybe<Block>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Block` mutation. */
export type UpdateBlockPayloadBlockEdgeArgs = {
  orderBy?: InputMaybe<Array<BlocksOrderBy>>;
};

/** All input for the `updateChainByChainId` mutation. */
export type UpdateChainByChainIdInput = {
  chainId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** All input for the `updateChainByNum` mutation. */
export type UpdateChainByNumInput = {
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  num: Scalars['Int']['input'];
};

/** All input for the `updateChain` mutation. */
export type UpdateChainInput = {
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Chain` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `Chain` mutation. */
export type UpdateChainPayload = {
  __typename?: 'UpdateChainPayload';
  /** The `Chain` that was updated by this mutation. */
  chain?: Maybe<Chain>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Chain` mutation. */
export type UpdateChainPayloadChainEdgeArgs = {
  orderBy?: InputMaybe<Array<ChainsOrderBy>>;
};

/** All input for the `updateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Msg` being updated. */
  msgPatch: MsgPatch;
  txIdx: Scalars['Int']['input'];
};

/** All input for the `updateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash` mutation. */
export type UpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `MsgEventAttr` being updated. */
  msgEventAttrPatch: MsgEventAttrPatch;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  valueHash: Scalars['String']['input'];
};

/** All input for the `updateMsgEventAttr` mutation. */
export type UpdateMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `MsgEventAttr` being updated. */
  msgEventAttrPatch: MsgEventAttrPatch;
  /** The globally unique `ID` which will identify a single `MsgEventAttr` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `MsgEventAttr` mutation. */
export type UpdateMsgEventAttrPayload = {
  __typename?: 'UpdateMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEventAttr` that was updated by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `MsgEventAttr` mutation. */
export type UpdateMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the `updateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType` mutation. */
export type UpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `MsgEvent` being updated. */
  msgEventPatch: MsgEventPatch;
  msgIdx: Scalars['Int']['input'];
  txIdx: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** All input for the `updateMsgEvent` mutation. */
export type UpdateMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `MsgEvent` being updated. */
  msgEventPatch: MsgEventPatch;
  /** The globally unique `ID` which will identify a single `MsgEvent` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `MsgEvent` mutation. */
export type UpdateMsgEventPayload = {
  __typename?: 'UpdateMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** The `MsgEvent` that was updated by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `MsgEvent` mutation. */
export type UpdateMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgEventsOrderBy>>;
};

/** All input for the `updateMsg` mutation. */
export type UpdateMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Msg` being updated. */
  msgPatch: MsgPatch;
  /** The globally unique `ID` which will identify a single `Msg` to be updated. */
  nodeId: Scalars['ID']['input'];
};

/** The output of our update `Msg` mutation. */
export type UpdateMsgPayload = {
  __typename?: 'UpdateMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Msg` that was updated by this mutation. */
  msg?: Maybe<Msg>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
};


/** The output of our update `Msg` mutation. */
export type UpdateMsgPayloadMsgEdgeArgs = {
  orderBy?: InputMaybe<Array<MsgsOrderBy>>;
};

/** All input for the `updateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Proposal` being updated. */
  proposalPatch: ProposalPatch;
  txIdx: Scalars['Int']['input'];
};

/** All input for the `updateProposal` mutation. */
export type UpdateProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Proposal` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Proposal` being updated. */
  proposalPatch: ProposalPatch;
};

/** The output of our update `Proposal` mutation. */
export type UpdateProposalPayload = {
  __typename?: 'UpdateProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** The `Proposal` that was updated by this mutation. */
  proposal?: Maybe<Proposal>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Proposal` mutation. */
export type UpdateProposalPayloadProposalEdgeArgs = {
  orderBy?: InputMaybe<Array<ProposalsOrderBy>>;
};

/** All input for the `updateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  msgIdx: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
  txIdx: Scalars['Int']['input'];
};

/** All input for the `updateRetirement` mutation. */
export type UpdateRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Retirement` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
};

/** The output of our update `Retirement` mutation. */
export type UpdateRetirementPayload = {
  __typename?: 'UpdateRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Retirement` that was updated by this mutation. */
  retirement?: Maybe<Retirement>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our update `Retirement` mutation. */
export type UpdateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: InputMaybe<Array<RetirementsOrderBy>>;
};

/** All input for the `updateTxByChainNumAndBlockHeightAndTxIdx` mutation. */
export type UpdateTxByChainNumAndBlockHeightAndTxIdxInput = {
  blockHeight: Scalars['BigInt']['input'];
  chainNum: Scalars['Int']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  txIdx: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
};

/** All input for the `updateTxByHash` mutation. */
export type UpdateTxByHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
};

/** All input for the `updateTx` mutation. */
export type UpdateTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tx` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
};

/** The output of our update `Tx` mutation. */
export type UpdateTxPayload = {
  __typename?: 'UpdateTxPayload';
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tx` that was updated by this mutation. */
  tx?: Maybe<Tx>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our update `Tx` mutation. */
export type UpdateTxPayloadTxEdgeArgs = {
  orderBy?: InputMaybe<Array<TxesOrderBy>>;
};

export type AllProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProposalsQuery = { __typename?: 'Query', allProposals?: { __typename?: 'ProposalsConnection', nodes: Array<{ __typename?: 'Proposal', type: string, blockHeight: any, txIdx: number, msgIdx: number, chainNum: number, timestamp?: any | null, txHash: string, status: string, groupPolicyAddress: string, groupPolicyVersion: any, metadata: string, proposers: Array<string | null>, submitTime?: any | null, groupVersion: any, finalTallyResult: any, votingPeriodEnd: any, executorResult: string, messages: any, id: any } | null> } | null };

export type ProposalItemFragment = { __typename?: 'Proposal', type: string, blockHeight: any, txIdx: number, msgIdx: number, chainNum: number, timestamp?: any | null, txHash: string, status: string, groupPolicyAddress: string, groupPolicyVersion: any, metadata: string, proposers: Array<string | null>, submitTime?: any | null, groupVersion: any, finalTallyResult: any, votingPeriodEnd: any, executorResult: string, messages: any, id: any };

export type ProposalsByGroupPolicyAddressQueryVariables = Exact<{
  groupPolicyAddress: Scalars['String']['input'];
}>;


export type ProposalsByGroupPolicyAddressQuery = { __typename?: 'Query', allProposals?: { __typename?: 'ProposalsConnection', nodes: Array<{ __typename?: 'Proposal', type: string, blockHeight: any, txIdx: number, msgIdx: number, chainNum: number, timestamp?: any | null, txHash: string, status: string, groupPolicyAddress: string, groupPolicyVersion: any, metadata: string, proposers: Array<string | null>, submitTime?: any | null, groupVersion: any, finalTallyResult: any, votingPeriodEnd: any, executorResult: string, messages: any, id: any } | null> } | null };

export const ProposalItemFragmentDoc = gql`
    fragment ProposalItem on Proposal {
  type
  blockHeight
  txIdx
  msgIdx
  chainNum
  timestamp
  txHash
  id: proposalId
  status
  groupPolicyAddress
  groupPolicyVersion
  metadata
  proposers
  submitTime
  groupVersion
  groupPolicyAddress
  finalTallyResult
  votingPeriodEnd
  executorResult
  messages
}
    `;
export const AllProposalsDocument = gql`
    query AllProposals {
  allProposals {
    nodes {
      ...ProposalItem
    }
  }
}
    ${ProposalItemFragmentDoc}`;

/**
 * __useAllProposalsQuery__
 *
 * To run a query within a React component, call `useAllProposalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProposalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProposalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProposalsQuery(baseOptions?: Apollo.QueryHookOptions<AllProposalsQuery, AllProposalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProposalsQuery, AllProposalsQueryVariables>(AllProposalsDocument, options);
      }
export function useAllProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProposalsQuery, AllProposalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProposalsQuery, AllProposalsQueryVariables>(AllProposalsDocument, options);
        }
export type AllProposalsQueryHookResult = ReturnType<typeof useAllProposalsQuery>;
export type AllProposalsLazyQueryHookResult = ReturnType<typeof useAllProposalsLazyQuery>;
export type AllProposalsQueryResult = Apollo.QueryResult<AllProposalsQuery, AllProposalsQueryVariables>;
export const ProposalsByGroupPolicyAddressDocument = gql`
    query ProposalsByGroupPolicyAddress($groupPolicyAddress: String!) {
  allProposals(condition: {groupPolicyAddress: $groupPolicyAddress}) {
    nodes {
      ...ProposalItem
    }
  }
}
    ${ProposalItemFragmentDoc}`;

/**
 * __useProposalsByGroupPolicyAddressQuery__
 *
 * To run a query within a React component, call `useProposalsByGroupPolicyAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalsByGroupPolicyAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalsByGroupPolicyAddressQuery({
 *   variables: {
 *      groupPolicyAddress: // value for 'groupPolicyAddress'
 *   },
 * });
 */
export function useProposalsByGroupPolicyAddressQuery(baseOptions: Apollo.QueryHookOptions<ProposalsByGroupPolicyAddressQuery, ProposalsByGroupPolicyAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProposalsByGroupPolicyAddressQuery, ProposalsByGroupPolicyAddressQueryVariables>(ProposalsByGroupPolicyAddressDocument, options);
      }
export function useProposalsByGroupPolicyAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProposalsByGroupPolicyAddressQuery, ProposalsByGroupPolicyAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProposalsByGroupPolicyAddressQuery, ProposalsByGroupPolicyAddressQueryVariables>(ProposalsByGroupPolicyAddressDocument, options);
        }
export type ProposalsByGroupPolicyAddressQueryHookResult = ReturnType<typeof useProposalsByGroupPolicyAddressQuery>;
export type ProposalsByGroupPolicyAddressLazyQueryHookResult = ReturnType<typeof useProposalsByGroupPolicyAddressLazyQuery>;
export type ProposalsByGroupPolicyAddressQueryResult = Apollo.QueryResult<ProposalsByGroupPolicyAddressQuery, ProposalsByGroupPolicyAddressQueryVariables>;