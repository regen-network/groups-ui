import {
  type InputProps,
  Button,
  forwardRef,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from './chakra'

export type AmountInputProps = InputProps & {
  onMaxClick: () => void
}

export const AmountInput = forwardRef((props: AmountInputProps, ref) => {
  const { onMaxClick, ...inputProps } = props
  return (
    <InputGroup>
      <Input ref={ref} type="number" {...inputProps} />
      <InputRightAddon as={Button} onClick={onMaxClick}>
        <Text fontSize="sm">max</Text>
      </InputRightAddon>
    </InputGroup>
  )
})
