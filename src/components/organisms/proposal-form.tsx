import { Fragment, useEffect, useState } from 'react'

import type {
  ProposalAction,
  ProposalStakeFormValues,
  ProposalTextFormValues,
} from 'types'
import { defaultStakeFormValues, defaultTextFormValues } from 'util/form.constants'
import { uuid } from 'util/helpers'

import { useDisclosure } from 'hooks/chakra'

import { AddActionButton, Flex, Heading, Stack, Text } from '@/atoms'
import { EditableDescription, EditableHeading, WithRemoveButton } from '@/molecules'
import { useFormFooter } from '@/molecules/form-footer'
import { ProposalActionDrawer } from '@/organisms/proposal-action-drawer'
import { ProposalStakeForm } from '@/organisms/proposal-stake-form'
import { ProposalTextForm } from '@/organisms/proposal-text-form'

export type ProposalFormValues = {
  title: string
  description?: string
  actions: ProposalAction[]
}

export const ProposalForm = (props: {
  defaultValues: ProposalFormValues
  groupName: string
  onSubmit: (values: ProposalFormValues) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // it's normally an antipattern to set initial state based on props, but
  // should be fine here as the values passed shouldn't change within the
  // lifecycle of this component. Probably a better way to handle this though -
  // possible refactor
  const { defaultValues } = props
  const [actions, setActions] = useState<ProposalAction[]>(defaultValues.actions)
  const [validForms, setValidForms] = useState<Record<string, boolean>>({})
  const [title, setTitle] = useState(defaultValues.title)
  const [description, setDescription] = useState(defaultValues.description)

  useEffect(() => {
    // watch for new actions and make sure their ID is referenced
    actions.forEach((action) => {
      if (!(action.id in validForms)) {
        setValidForms({ ...validForms, [action.id]: false })
      }
    })
  }, [actions, validForms])

  useEffect(() => {
    const valid = Object.values(validForms)
    const allReady = valid.every((v) => !!v)
    if (valid.length > 0 && allReady) {
      props.onSubmit({ title, description, actions })
    }
  }, [actions, description, props, title, validForms])

  function handleNewAction(actionType: ProposalAction['type']) {
    const id = uuid()
    // the top level 'form' here isn't really a form, as there can be several
    // actions in a single proposal. IDs are passed to the downstream `<form>`
    // elements so they can be manually submitted (see: `handleSubmitAllForms`)
    switch (actionType) {
      case 'stake':
        setActions([...actions, { id, type: 'stake', values: defaultStakeFormValues }])
        break
      case 'text':
        setActions([...actions, { id, type: 'text', values: defaultTextFormValues }])
        break
      default:
        break
    }
    onClose()
  }

  function handleRemoveAction(action: ProposalAction) {
    setActions(actions.filter((a) => action.id !== a.id))
  }

  function handleSubmitAllForms() {
    // e.preventDefault()
    // A bit hacky - programmatically grabbing all forms based on the ID we
    // create and calling `requestSubmit` to trigger their respective `onSubmit`
    // handlers - which then triggers `updateActionValues` so the updated
    // `actions` can be passed to the parent `onSubmit` handler
    // Possible refactor, but would require a good bit of reworking
    const formElements: HTMLFormElement[] = actions.map(
      (a) => document.getElementById(a.id) as HTMLFormElement,
    )
    formElements.forEach((formEl) => {
      formEl.requestSubmit()
    })
  }

  function updateActionValues(id: string, values: ProposalAction['values']) {
    const newActions = actions.map((action) => {
      if (action.id === id) {
        // ideally wouldn't mutate but doesn't always properly update otherwise
        action.values = values
      }
      return action
    })
    setActions(newActions)
    setValidForms({ ...validForms, [id]: true })
  }

  function handleFormError(id: string) {
    setValidForms({ ...validForms, [id]: false })
  }

  useFormFooter({
    onSubmit: handleSubmitAllForms,
    btnText: 'Save & next',
  })

  function renderAction(action: ProposalAction) {
    switch (action.type) {
      case 'stake':
        return (
          <ProposalStakeForm
            defaultValues={action.values as ProposalStakeFormValues}
            formId={action.id}
            onError={() => handleFormError(action.id)}
            onSubmit={(data) => updateActionValues(action.id, data)}
          />
        )
      case 'text':
        return (
          <ProposalTextForm
            defaultValues={action.values as ProposalTextFormValues}
            formId={action.id}
            onSubmit={(data) => updateActionValues(action.id, data)}
            onError={() => handleFormError(action.id)}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <EditableHeading value={title} onSave={setTitle} />
        <EditableDescription value={description} onSave={setDescription} />

        <Flex align="baseline" pb={3}>
          <Heading variant="label" size="xs">
            Group:
          </Heading>
          <Text ml={2}>{props.groupName}</Text>
        </Flex>
        {actions.map((action, i) => {
          return (
            <Fragment key={`action-form-${action.id}`}>
              <WithRemoveButton
                hideBtn={i === 0}
                label="remove action"
                onClick={() => handleRemoveAction(action)}
              >
                {renderAction(action)}
              </WithRemoveButton>
              <AddActionButton onClick={onOpen} />
            </Fragment>
          )
        })}
      </Stack>
      <ProposalActionDrawer
        isOpen={isOpen}
        onClose={onClose}
        onActionSelect={handleNewAction}
      />
    </>
  )
}
