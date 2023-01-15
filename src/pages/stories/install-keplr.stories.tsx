import { Meta, StoryFn } from '@storybook/react'

import { InstallKeplr } from '../install-keplr-page'

export default {
  title: 'Pages/Install Keplr',
  component: InstallKeplr,
} as Meta<typeof InstallKeplr>

const Template: StoryFn<typeof InstallKeplr> = () => <InstallKeplr />

export const InstallKeplrPage = Template.bind({})
