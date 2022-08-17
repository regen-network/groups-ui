import { PageRequest, PageResponse } from '../../base/query/v1beta1/pagination'
import { Any } from '../../../google/protobuf/any'
import { Params } from './auth'
import { Rpc } from '@osmonauts/helpers'
import * as _m0 from 'protobufjs/minimal'
import {
  QueryAccountsRequest,
  QueryAccountsResponse,
  QueryAccountRequest,
  QueryAccountResponse,
  QueryAccountAddressByIDRequest,
  QueryAccountAddressByIDResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryModuleAccountsRequest,
  QueryModuleAccountsResponse,
  Bech32PrefixRequest,
  Bech32PrefixResponse,
  AddressBytesToStringRequest,
  AddressBytesToStringResponse,
  AddressStringToBytesRequest,
  AddressStringToBytesResponse,
} from './query'

/** Query defines the RPC service */
export interface Query {
  accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse>
  /*Accounts returns all the existing accounts
  
  Since: cosmos-sdk 0.43*/

  account(request: QueryAccountRequest): Promise<QueryAccountResponse>
  /*Account returns account details based on address.*/

  accountAddressByID(
    request: QueryAccountAddressByIDRequest,
  ): Promise<QueryAccountAddressByIDResponse>
  /*AccountAddressByID returns account address based on account id*/

  params(request: QueryParamsRequest): Promise<QueryParamsResponse>
  /*Params queries all parameters.*/

  moduleAccounts(
    request: QueryModuleAccountsRequest,
  ): Promise<QueryModuleAccountsResponse>
  /*ModuleAccounts returns all the existing module accounts.
  
  Since: cosmos-sdk 0.46*/

  bech32Prefix(request: Bech32PrefixRequest): Promise<Bech32PrefixResponse>
  /*Bech32Prefix queries bech32Prefix
  
  Since: cosmos-sdk 0.46*/

  addressBytesToString(
    request: AddressBytesToStringRequest,
  ): Promise<AddressBytesToStringResponse>
  /*AddressBytesToString converts Account Address bytes to string
  
  Since: cosmos-sdk 0.46*/

  addressStringToBytes(
    request: AddressStringToBytesRequest,
  ): Promise<AddressStringToBytesResponse>
  /*AddressStringToBytes converts Address string to bytes
  
  Since: cosmos-sdk 0.46*/
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc

  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.accounts = this.accounts.bind(this)
    this.account = this.account.bind(this)
    this.accountAddressByID = this.accountAddressByID.bind(this)
    this.params = this.params.bind(this)
    this.moduleAccounts = this.moduleAccounts.bind(this)
    this.bech32Prefix = this.bech32Prefix.bind(this)
    this.addressBytesToString = this.addressBytesToString.bind(this)
    this.addressStringToBytes = this.addressStringToBytes.bind(this)
  }

  accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse> {
    const data = QueryAccountsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.auth.v1beta1.Query', 'Accounts', data)
    return promise.then((data) => QueryAccountsResponse.decode(new _m0.Reader(data)))
  }

  account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.auth.v1beta1.Query', 'Account', data)
    return promise.then((data) => QueryAccountResponse.decode(new _m0.Reader(data)))
  }

  accountAddressByID(
    request: QueryAccountAddressByIDRequest,
  ): Promise<QueryAccountAddressByIDResponse> {
    const data = QueryAccountAddressByIDRequest.encode(request).finish()
    const promise = this.rpc.request(
      'cosmos.auth.v1beta1.Query',
      'AccountAddressByID',
      data,
    )
    return promise.then((data) =>
      QueryAccountAddressByIDResponse.decode(new _m0.Reader(data)),
    )
  }

  params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.auth.v1beta1.Query', 'Params', data)
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)))
  }

  moduleAccounts(
    request: QueryModuleAccountsRequest,
  ): Promise<QueryModuleAccountsResponse> {
    const data = QueryModuleAccountsRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.auth.v1beta1.Query', 'ModuleAccounts', data)
    return promise.then((data) =>
      QueryModuleAccountsResponse.decode(new _m0.Reader(data)),
    )
  }

  bech32Prefix(request: Bech32PrefixRequest): Promise<Bech32PrefixResponse> {
    const data = Bech32PrefixRequest.encode(request).finish()
    const promise = this.rpc.request('cosmos.auth.v1beta1.Query', 'Bech32Prefix', data)
    return promise.then((data) => Bech32PrefixResponse.decode(new _m0.Reader(data)))
  }

  addressBytesToString(
    request: AddressBytesToStringRequest,
  ): Promise<AddressBytesToStringResponse> {
    const data = AddressBytesToStringRequest.encode(request).finish()
    const promise = this.rpc.request(
      'cosmos.auth.v1beta1.Query',
      'AddressBytesToString',
      data,
    )
    return promise.then((data) =>
      AddressBytesToStringResponse.decode(new _m0.Reader(data)),
    )
  }

  addressStringToBytes(
    request: AddressStringToBytesRequest,
  ): Promise<AddressStringToBytesResponse> {
    const data = AddressStringToBytesRequest.encode(request).finish()
    const promise = this.rpc.request(
      'cosmos.auth.v1beta1.Query',
      'AddressStringToBytes',
      data,
    )
    return promise.then((data) =>
      AddressStringToBytesResponse.decode(new _m0.Reader(data)),
    )
  }
}
