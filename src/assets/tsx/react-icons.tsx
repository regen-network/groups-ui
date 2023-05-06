import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsMoonStarsFill, BsSlashCircle, BsSun } from 'react-icons/bs'
import { CgListTree } from 'react-icons/cg'
import { FaUndoAlt } from 'react-icons/fa'
import { GoThumbsdown } from 'react-icons/go'
import { ImFileText2 } from 'react-icons/im'
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbCubeSend } from 'react-icons/tb'

import { Icon, type IconProps } from '@/atoms'

export const BackIcon = (props: IconProps) => <Icon as={IoMdArrowBack} {...props} />
export const DeleteIcon = (props: IconProps) => <Icon as={RiDeleteBin6Line} {...props} />
export const FileTextIcon = (props: IconProps) => <Icon as={ImFileText2} {...props} />
export const ForwardIcon = (props: IconProps) => <Icon as={IoMdArrowForward} {...props} />
export const ListTreeIcon = (props: IconProps) => <Icon as={CgListTree} {...props} />
export const MinusIcon = (props: IconProps) => <Icon as={AiOutlineMinus} {...props} />
export const MoonIcon = (props: IconProps) => <Icon as={BsMoonStarsFill} {...props} />
export const PlusIcon = (props: IconProps) => <Icon as={AiOutlinePlus} {...props} />
export const SendIcon = (props: IconProps) => <Icon as={TbCubeSend} {...props} />
export const SlashCircleIcon = (props: IconProps) => (
  <Icon as={BsSlashCircle} {...props} />
)
export const SunIcon = (props: IconProps) => <Icon as={BsSun} {...props} />
export const ThumbsDownIcon = (props: IconProps) => <Icon as={GoThumbsdown} {...props} />
export const UndoIcon = (props: IconProps) => <Icon as={FaUndoAlt} {...props} />
