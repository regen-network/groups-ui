import { useCallback, useEffect, useState } from 'react'
import { omit } from 'remeda'

import type { ProposalAction, ProposalStakeFormValues } from 'types'
import { defaultStakeFormValues } from 'util/form.defaults'
import { uuid } from 'util/helpers'

import { useDisclosure } from 'hooks/chakra-hooks'

import { AnimatePresence, FadeIn, motion } from '@/animations'
import { AddActionButton, Flex, Heading, Stack, Text } from '@/atoms'
import { EditableDescription, EditableHeading } from '@/molecules/editable'
import { FormSubmitHiddenButton } from '@/molecules/form-footer'
import { WithRemoveButton } from '@/molecules/with-remove-button'
import { ProposalActionDrawer } from '@/organisms/proposal-action-drawer'
import { ProposalStakeForm } from '@/organisms/proposal-stake-form'

export type ProposalFormValues = {
  title: string
  summary: string
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
  const { defaultValues, onSubmit } = props
  const [actions, setActions] = useState<ProposalAction[]>(defaultValues.actions)
  const [validForms, setValidForms] = useState<{ [id: string]: boolean }>({})
  const [title, setTitle] = useState(defaultValues.title)
  const [summary, setSummary] = useState(defaultValues.summary)

  const valid = Object.values(validForms)
  const allFormsValid = valid.length > 0 && valid.every(Boolean)

  const submit = useCallback(() => {
    onSubmit({ title, summary, actions })
  }, [actions, summary, onSubmit, title])

  useEffect(() => {
    // watch for new actions and make sure their ID is referenced
    if (actions) {
      actions.forEach((action) => {
        if (!(action.id in validForms)) {
          setValidForms({ ...validForms, [action.id]: false })
        }
      })
    }
  }, [actions, validForms])

  useEffect(() => {
    // see: comment in `handleSubmitAllForms`
    if (allFormsValid) submit()
  }, [allFormsValid, submit])

  function handleNewAction(actionType: ProposalAction['type']) {
    const id = uuid()
    // the top level 'form' here isn't really a form, as there can be several
    // actions in a single proposal. IDs are passed to the downstream `<form>`
    // elements so they can be manually submitted (see: `handleSubmitAllForms`)
    switch (actionType) {
      case 'stake':
        setActions([...actions, { id, type: 'stake', values: defaultStakeFormValues }])
        break
      // TODO add other actions here
      default:
        break
    }
    onClose()
  }

  function triggerSubmitAllForms() {
    // if there are no actions, submit title & description
    if (actions.length === 0) submit()
    // A bit hacky - programmatically grabbing all forms based on the ID we
    // create and calling `requestSubmit` to trigger their respective `onSubmit`
    // and `onError` handlers - which then trigger `updateActionValues` or
    // `handleFormError` on each form. When all forms are valid, the root
    // `onSubmit` is called through `useEffect`
    const formElements: HTMLFormElement[] = actions.map(
      (a) => document.getElementById(a.id) as HTMLFormElement,
    )
    formElements.forEach((formEl) => {
      formEl.requestSubmit() // trigger `onSubmit` / `onError`
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
    setValidForms((prev) => ({ ...prev, [id]: true }))
    setActions(newActions)
  }

  function handleRemoveAction(action: ProposalAction) {
    setActions(actions.filter((a) => action.id !== a.id))
    setValidForms(omit(validForms, [action.id]))
  }

  function handleFormError(id: string) {
    setValidForms((prev) => ({ ...prev, [id]: false }))
  }

  function renderAction(action: ProposalAction) {
    switch (action.type) {
      case 'stake':
        return (
          <ProposalStakeForm
            defaultValues={action.values as ProposalStakeFormValues}
            formId={action.id}
            onSubmit={(data) => updateActionValues(action.id, data)}
            onError={() => handleFormError(action.id)}
          />
        )
      // TODO add other message types
      default:
        return null
    }
  }

  function renderActions(actions: ProposalAction[]) {
    if (actions.length === 0) {
      return (
        <FadeIn key={`action-form-no-actions`} layout>
          <Text fontSize="sm" align="center" color="gray.500">
            Add an action to your proposal
          </Text>
          <AddActionButton aria-label="New action" onClick={onOpen} />
        </FadeIn>
      )
    }
    return actions.map((action) => (
      <FadeIn key={`action-form-${action.id}`} layout>
        <WithRemoveButton
          label="remove action"
          onClick={() => handleRemoveAction(action)}
        >
          {renderAction(action)}
        </WithRemoveButton>
        <AddActionButton aria-label="New action" onClick={onOpen} />
      </FadeIn>
    ))
  }

  return (
    <>
      <Stack spacing={3}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            triggerSubmitAllForms()
          }}
        >
          <EditableHeading value={title} onSave={(title) => setTitle(title.trim())} />
          <EditableDescription
            value={summary}
            onSave={(description) => setSummary(description.trim())}
          />
          <FormSubmitHiddenButton id="submit-all-forms" />
        </form>

        <Flex align="baseline" pb={3}>
          <Heading variant="label" size="xs">
            Group:
          </Heading>
          <Text ml={2}>{props.groupName}</Text>
        </Flex>
        <motion.div layout style={{ overflow: 'visible' }}>
          <AnimatePresence mode="popLayout">
            <Stack spacing={4}>{renderActions(actions)}</Stack>
          </AnimatePresence>
        </motion.div>
      </Stack>
      <ProposalActionDrawer
        isOpen={isOpen}
        onClose={onClose}
        onActionSelect={handleNewAction}
      />
    </>
  )
}
