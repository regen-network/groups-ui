import {
  type InputProps,
  Button,
  forwardRef,
  Input,
  InputGroup,
  InputRightElement,
} from './chakra'

export type AmountInputProps = InputProps & {
  onMaxClick: () => void
}

export const AmountInput = forwardRef((props: AmountInputProps, ref) => {
  const { onMaxClick, ...inputProps } = props
  return (
    <InputGroup>
      <Input ref={ref} type="number" {...inputProps} />
      <InputRightElement w={14}>
        <Button fontSize="xs" borderLeftRadius={0} onClick={onMaxClick}>
          max
        </Button>
      </InputRightElement>
    </InputGroup>
  )
})
