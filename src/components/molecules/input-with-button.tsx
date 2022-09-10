import {
  type ButtonProps,
  type InputProps,
  Button,
  Flex,
  forwardRef,
  Input,
} from '@/atoms'

/** functions as an `Input`, but `onClick` passed to Button */
/** `children` show as the button's text */
export const InputWithButton = forwardRef<
  InputProps & { onBtnClick: ButtonProps['onClick'] },
  'input'
>(({ onBtnClick, children, ...inputProps }, ref) => {
  return (
    <Flex flexDir="row">
      <Input {...inputProps} ref={ref} />
      <Button ml={2} variant="outline" colorScheme="blue" onClick={onBtnClick}>
        {children}
      </Button>
    </Flex>
  )
})
