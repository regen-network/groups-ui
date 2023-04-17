import { create as createIpfsClient } from 'ipfs-http-client'

import { throwError } from 'util/errors'
import { isJson } from 'util/validation'

const client = createIpfsClient({
  url: 'https://ipfs.io',
})

export async function fetchIpfsData(cid: string) {
  try {
    const stream = client.cat(cid)
    const decoder = new TextDecoder()
    let data = ''

    for await (const chunk of stream) {
      // chunks of data are returned as a Uint8Array, convert it back to a string
      data += decoder.decode(chunk, { stream: true })
    }
    const dataStr = data.toString()
    return isJson(dataStr) ? JSON.parse(dataStr) : dataStr
  } catch (error) {
    throwError(error)
  }
}
