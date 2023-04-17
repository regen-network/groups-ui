import { throwError } from 'util/errors'

const isIpfsCid = (addr: string) => /^(Qm[a-zA-Z0-9]{44})/.test(addr)

export const isIpfsProtocol = (addr: string) => /^ipfs:\/\/(.*)$/.test(addr)

/** takes a string, checks if it's IPFS protocol i.e `ipfs://[cid]` and returns cid */
export const getIpfsCID = (addr: string): string => {
  if (!isIpfsProtocol(addr)) throwError('Invalid IPFS protocol')
  const cid = addr.split('//')[1]
  if (!isIpfsCid(cid)) throwError('Invalid IPFS CID')
  return cid
}
