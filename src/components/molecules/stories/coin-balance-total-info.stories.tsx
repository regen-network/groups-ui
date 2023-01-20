import type { Meta, StoryFn } from '@storybook/react'

import { UICoin } from 'types'

import { CoinBalanceTotalInfo } from '../coin-balance-total-info'

export default {
  title: 'Molecules/CoinBalanceTotalInfo',
  component: CoinBalanceTotalInfo,
} as Meta<typeof CoinBalanceTotalInfo>

const Template: StoryFn<typeof CoinBalanceTotalInfo> = (args) => (
  <CoinBalanceTotalInfo {...args} />
)

const fakeCoins: UICoin[] = [
  { denom: 'fakecoin', amount: '1000000' },
  { denom: 'fakecoin2', amount: '2000000' },
  { denom: 'fakecoin3', amount: '4000000' },
]

export const Component = Template.bind({})
Component.args = {
  coins: fakeCoins,
}
