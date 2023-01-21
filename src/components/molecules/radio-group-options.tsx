import { type RadioProps, RadioBox, VStack } from '@/atoms'

export type RadioGroupOption = {
  label: string
  value: RadioProps['value']
}

type Props = {
  options: RadioGroupOption[]
  selected: string
}

export const RadioGroupOptions = ({ options, selected }: Props) => {
  return (
    <VStack align="start" w="full">
      {options.map(({ value, label }, i) => (
        <RadioBox
          key={label + i}
          selected={selected === value}
          value={value}
          label={label}
        />
      ))}
    </VStack>
  )
}
