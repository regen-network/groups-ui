// import { toDuration } from '@osmonauts/helpers'
import type { Duration } from '@haveanicedavid/cosmos-groups-ts/types/codegen/google/protobuf/duration'
import dayjs from 'dayjs'
import Long from 'long'

const dayInSeconds = 24 * 60 * 60

export function formatDate(date: Date | string) {
  return dayjs(date).format('MMM D, YYYY')
}

export function daysToSeconds(days: number): number {
  return days * dayInSeconds
}

export function secondsToDays(seconds: number): number {
  return seconds / dayInSeconds
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
export function mistypedDurationToDays(duration: Duration): number {
  return secondsToDays(parseInt(duration as unknown as string))
}
