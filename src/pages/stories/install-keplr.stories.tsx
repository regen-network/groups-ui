import { Meta, ComponentStoryFn } from '@storybook/react'

import { InstallKeplr } from '../install-keplr'

export default {
  title: 'Pages/Install Keplr',
  component: InstallKeplr,
} as Meta<typeof InstallKeplr>

const Template: ComponentStoryFn<typeof InstallKeplr> = () => <InstallKeplr />

export const LoginPage = Template.bind({})
