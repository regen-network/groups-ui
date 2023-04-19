import type { Meta, StoryFn } from '@storybook/react'
import { createStore, Provider } from 'jotai'

import { FormFooter, FormFooterAtom } from '../form-footer'

const store = createStore()
store.set(FormFooterAtom, {})

const voidFunc = () => void null

const storeWithBackBtns = createStore()
storeWithBackBtns.set(FormFooterAtom, { onPrev: voidFunc })

const storeWithBothBtns = createStore()
storeWithBothBtns.set(FormFooterAtom, { onPrev: voidFunc, onNext: voidFunc })

export default {
  title: 'Molecules/FormFooter',
  component: FormFooter,
  argTypes: {
    onBtnClick: {
      control: false,
    },
  },
} as Meta<typeof FormFooter>

const Template: StoryFn<typeof FormFooter> = () => <FormFooter />

export const Component = Template.bind({})
Component.decorators = [(Story) => <Provider store={store}>{<Story />}</Provider>]

export const WithBackBtn = Template.bind({})
WithBackBtn.decorators = [
  (Story) => <Provider store={storeWithBackBtns}>{<Story />}</Provider>,
]

export const WithBothBtns = Template.bind({})
WithBothBtns.decorators = [
  (Story) => <Provider store={storeWithBothBtns}>{<Story />}</Provider>,
]
