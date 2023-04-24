import Ajv from 'ajv'

import type { UIGroupMetadata, UIProposalMetadata } from 'types'
import { throwError } from 'util/errors'

const groupMetadataSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['name', 'updatedAt'],
  additionalProperties: false,
}

export function validateGroupMetadata(metadata: UIGroupMetadata) {
  const ajv = new Ajv()
  const valid = ajv.validate(groupMetadataSchema, metadata)
  if (!valid) throwError(ajv.errors)
}

const groupProposalMetadataSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' },
  },
  required: ['title', 'summary'],
  additionalProperties: false,
}

export function validateGroupProposalMetadata(metadata: UIProposalMetadata) {
  const ajv = new Ajv()
  const valid = ajv.validate(groupProposalMetadataSchema, metadata)
  if (!valid) throwError(ajv.errors)
}
