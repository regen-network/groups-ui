import {
  Timestamp,
  TimestampSDKType,
} from '@regen-network/api/types/codegen/google/protobuf/timestamp'
import dayjs from 'dayjs'
import Long from 'long'

import type { Duration } from 'types'

const dayInSeconds = 24 * 60 * 60

export const DATE_FORMATS = {
  /** ex: `Oct 30, 2022` */
  default: 'MMM D, YYYY',
  /** ex: `Oct 30 2022, 6:59:11 pm` */
  long: 'MMM D YYYY, h:mm:ss a',
} as const

export function isTimestamp(value: unknown): value is Timestamp {
  return (
    (value as Timestamp)?.seconds !== undefined &&
    (value as Timestamp)?.nanos !== undefined
  )
}

export function toDate(date: Timestamp | TimestampSDKType | Date | string): Date {
  if (isTimestamp(date)) {
    return new Date(date.seconds.toNumber() * 1000)
  }
  return new Date(date)
}

export function formatDate(
  date: Date | Timestamp | string | undefined,
  format: keyof typeof DATE_FORMATS = 'default',
) {
  if (!date) return '-'
  const _date = isTimestamp(date) ? date.seconds.toString() : date
  return dayjs(_date).format(DATE_FORMATS[format])
}

export function daysToSeconds(days: number): number {
  return days * dayInSeconds
}

export function secondsToDays(seconds: number): string {
  return String(seconds / dayInSeconds)
}

export function secondsToDuration(seconds: number): Duration {
  return {
    seconds: Long.fromNumber(seconds),
    nanos: seconds % 1_000_000_000,
  }
}

export function daysToDuration(days: number): Duration {
  const seconds = daysToSeconds(days)
  return secondsToDuration(seconds)
}

// the types generated from proto list `Duration` types in several API returns
// where its' actually a string in seconds, ie `86400s` representing 1 day. This
// is a helper function to work around that, but a it's not an ideal solution.
export function mistypedDurationToDays(duration?: Duration): string {
  if (!duration) return ''
  return secondsToDays(parseInt(duration as unknown as string))
}
