import { Center, forwardRef, IconButton } from './chakra-components'

import { AiOutlinePlus } from 'assets/tsx'

/** Icon button   */
export const AddActionButton = forwardRef(({ onClick }: { onClick: () => void }, ref) => {
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
        ref={ref}
        aria-label="new action"
        onClick={onClick}
        rounded="full"
        my={5}
        icon={<AiOutlinePlus />}
        zIndex={2}
        _before={{
          content: '""',
          position: 'absolute',
          top: -7,
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: 'BlackAlpha.700',
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
        }}
      />
    </Center>
  )
})
