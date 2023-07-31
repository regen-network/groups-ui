import { z } from 'zod'

import { logError } from 'util/errors'

import { fetchIpfsData } from 'api/ipfs.actions'
import { getIpfsCID, isIpfsProtocol } from 'api/ipfs.utils'

import { isJson } from './validators'
import { valid } from './zod'

const groupMetadataSchema = z.object({
  name: valid.name,
  description: valid.description.optional().or(z.literal('')),
  forumLink: valid.url.optional().or(z.literal('')),
  other: z.string().optional(),
})

const proposalMetadataSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
})

function isGroupMetadata(metadata: unknown): metadata is UIGroupMetadata {
  return groupMetadataSchema.safeParse(metadata).success
}

function isProposalMetadata(metadata: unknown): metadata is UIProposalMetadata {
  return proposalMetadataSchema.safeParse(metadata).success
}

export type UIProposalMetadata = z.infer<typeof proposalMetadataSchema>
export type UIGroupMetadata = z.infer<typeof groupMetadataSchema>

export async function getGroupMetadata(
  metadata: string,
  defaults?: Partial<UIGroupMetadata>,
): Promise<UIGroupMetadata> {
  if (isGroupMetadata(metadata)) return metadata
  // NOTE: double parsing is required when value is stringified
  if (isJson(metadata)) {
    const parsed = JSON.parse(metadata)
    if (isGroupMetadata(parsed)) return parsed
  }
  if (isIpfsProtocol(metadata)) {
    try {
      const ipfsData = await fetchIpfsData(getIpfsCID(metadata))
      // TODO(#126): we aren't handling IPFS metadata that's outside the shape of our
      // expected data - could possibly add to the `other` field, or something
      // similar if we want to support in the future (add else block here)
      if (isGroupMetadata(ipfsData)) return ipfsData
    } catch (error) {
      logError(error)
    }
  }
  return {
    name: '',
    ...defaults,
  }
}

export async function getProposalMetadata(
  metadata: string,
  defaults?: Partial<UIProposalMetadata>,
): Promise<UIProposalMetadata> {
  if (isProposalMetadata(metadata)) return metadata
  // NOTE: double parsing is required when value is stringified
  if (isJson(metadata)) {
    const parsed = JSON.parse(metadata)
    if (isProposalMetadata(parsed)) return parsed
  }
  if (isIpfsProtocol(metadata)) {
    const ipfsData = await fetchIpfsData(metadata)
    if (isProposalMetadata(ipfsData)) return ipfsData
  }
  return {
    title: '',
    ...defaults,
  }
}
