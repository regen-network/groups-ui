import { StoryFn, Meta } from '@storybook/react'

import { InstallKeplr } from '../install-keplr'

export default {
  title: 'Pages/Install Keplr',
  component: InstallKeplr,
} as Meta<typeof InstallKeplr>

const Template: StoryFn<typeof InstallKeplr> = () => <InstallKeplr />

export const LoginPage = Template.bind({})
