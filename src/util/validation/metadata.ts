import { z } from 'zod'

import { valid } from './zod'

const groupMetadataSchema = z.object({
  name: valid.name,
  description: valid.description.optional().or(z.literal('')),
  updatedAt: z.string().optional(),
  forumLink: valid.url.optional().or(z.literal('')),
  other: z.string().optional(),
})
export type UIGroupMetadata = z.infer<typeof groupMetadataSchema>

function isGroupMetadata(metadata: unknown): metadata is UIGroupMetadata {
  return groupMetadataSchema.safeParse(metadata).success
}

export function getGroupMetadata(
  metadata: unknown,
  defaults?: UIGroupMetadata,
): UIGroupMetadata {
  if (isGroupMetadata(metadata)) return metadata
  // NOTE: double parsing is required when value is stringified
  const parsed = JSON.parse(JSON.parse(JSON.stringify(metadata)))
  if (isGroupMetadata(parsed)) return parsed
  return {
    name: '',
    updatedAt: '',
    ...defaults,
  }
}

const proposalMetadataSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
})
export type UIProposalMetadata = z.infer<typeof proposalMetadataSchema>

function isProposalMetadata(metadata: unknown): metadata is UIProposalMetadata {
  return proposalMetadataSchema.safeParse(metadata).success
}

export function getProposalMetadata(
  metadata: unknown,
  defaults?: Partial<UIProposalMetadata>,
): UIProposalMetadata {
  if (isProposalMetadata(metadata)) return metadata
  // NOTE: double parsing is required when value is stringified
  const parsed = JSON.parse(JSON.parse(JSON.stringify(metadata)))
  if (isProposalMetadata(parsed)) return parsed
  return {
    title: '',
    ...defaults,
  }
}
