import { Center, forwardRef, IconButton, type IconButtonProps } from './chakra-components'

import { PlusIcon } from 'assets/tsx'

/** Icon button   */
export const AddActionButton = forwardRef((props: IconButtonProps, ref) => {
  return (
    <Center
      position="relative"
      _before={{
        content: '"▼"',
        position: 'absolute',
        bgColor: 'BlackAlpha.700',
        bottom: -4,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <IconButton
        {...props}
        ref={ref}
        aria-label="new action"
        rounded="full"
        my={5}
        icon={<PlusIcon />}
        zIndex={2}
        _before={{
          content: '""',
          position: 'absolute',
          top: -4,
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: 'BlackAlpha.700',
          zIndex: 1,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          top: 10,
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: 'BlackAlpha.700',
          zIndex: 1,
        }}
      />
    </Center>
  )
})
