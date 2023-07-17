import { useState } from 'react'

import type { UICoin } from 'types'

import { Box, Heading, HStack } from '@/atoms'

import { SelectDropdown } from './select-dropdown'

export const CoinBalanceTotalInfo = ({ coins }: { coins?: UICoin[] }) => {
  const [active, setActive] = useState<UICoin | undefined>(coins?.[0])
  return (
    <HStack spacing={4} pt={4}>
      <HStack align="baseline" spacing={2}>
        <Heading size="lg">{active?.amount || '0'}</Heading>
        <Heading variant="label" size="sm">
          {active?.denom || '-'}
        </Heading>
      </HStack>
      {coins && coins.length > 0 && (
        <Box flex={1} maxW="15rem">
          <SelectDropdown
            onChange={(selected) => {
              const coin = coins.find((c) => c.denom === selected?.label)
              if (coin) setActive(coin)
            }}
            value={active?.denom}
            label={`${Math.max(coins.length - 1, 0)} other tokens`}
            items={coins.map((c) => ({ label: c.denom, value: c.denom }))}
          />
        </Box>
      )}
    </HStack>
  )
}
