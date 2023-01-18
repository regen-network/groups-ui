import {
  type InputProps,
  Button,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement,
} from './chakra-components'

export type AmountInputProps = InputProps & {
  onMaxClick: () => void
}

export const AmountInput = forwardRef((props: AmountInputProps, ref) => {
  const { onMaxClick, ...inputProps } = props
  return (
    <InputGroup>
      <Input ref={ref} type="number" {...inputProps} />
      <InputRightElement width="4.5rem">
        <Button size="sm" h="1.75rem" onClick={onMaxClick}>
          max
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})
