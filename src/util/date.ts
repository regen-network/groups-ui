// import { /* Long, */ toDuration } from '@osmonauts/helpers'
import dayjs from 'dayjs'
import Long from 'long'

export function formatDate(date: Date | string) {
  return dayjs(date).format('MMM D, YYYY')
}

export function daysToSeconds(days: number) {
  return days * 24 * 60 * 60
}

export function secondsToDuration(seconds: number) {
  // return toDuration(seconds.toString()) // TODO pretty sure this is wrong - check later
  return {
    seconds: Long.fromNumber(seconds),
    nanos: 0,
  }
}

export function daysToDuration(days: number) {
  // return toDuration(daysToSeconds(days).toString())
  return {
    seconds: Long.fromNumber(daysToSeconds(days)),
    nanos: 0,
  }
}
