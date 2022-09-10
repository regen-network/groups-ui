import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InstallKeplr } from '../install-keplr'

export default {
  title: 'Pages/Install Keplr',
  component: InstallKeplr,
} as ComponentMeta<typeof InstallKeplr>

const Template: ComponentStory<typeof InstallKeplr> = () => <InstallKeplr />

export const LoginPage = Template.bind({})
