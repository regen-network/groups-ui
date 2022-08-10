import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InstallKeplr } from '../InstallKeplr'

export default {
  title: 'Pages/Install Keplr',
  component: InstallKeplr,
} as ComponentMeta<typeof InstallKeplr>

const Template: ComponentStory<typeof InstallKeplr> = () => <InstallKeplr />

export const LoginPage = Template.bind({})
