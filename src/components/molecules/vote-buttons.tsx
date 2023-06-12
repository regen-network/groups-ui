import type { VoteOptionType } from 'types'
import { VoteOption } from 'util/enums'

import { useToastBottom } from 'hooks/use-toasts'

import { Button } from '@/atoms'

import { CheckIcon, CloseIcon, SlashCircleIcon, ThumbsDownIcon } from 'assets/tsx'

export const VoteButtons = ({
  onVote,
  userVote,
}: {
  onVote: (vote: VoteOptionType) => void
  userVote?: VoteOptionType
}) => {
  const { toastWarning } = useToastBottom()
  function handleVote(vote: VoteOptionType) {
    if (userVote) {
      toastWarning('Vote has already been cast!')
    } else {
      onVote(vote)
    }
  }

  const isDisabled = (vote: VoteOptionType) => !!userVote && vote !== userVote
  return (
    <>
      <Button
        colorScheme="green"
        isDisabled={isDisabled(VoteOption.VOTE_OPTION_YES)}
        leftIcon={<CheckIcon />}
        onClick={() => handleVote(VoteOption.VOTE_OPTION_YES)}
        variant="outline"
      >
        Vote Yes
      </Button>
      <Button
        colorScheme="red"
        isDisabled={isDisabled(VoteOption.VOTE_OPTION_NO)}
        leftIcon={<CloseIcon />}
        onClick={() => handleVote(VoteOption.VOTE_OPTION_NO)}
        variant="outline"
      >
        Vote No
      </Button>
      <Button
        colorScheme="yellow"
        isDisabled={isDisabled(VoteOption.VOTE_OPTION_ABSTAIN)}
        leftIcon={<SlashCircleIcon />}
        onClick={() => handleVote(VoteOption.VOTE_OPTION_ABSTAIN)}
        variant="outline"
      >
        Abstain
      </Button>
      <Button
        colorScheme="orange"
        isDisabled={isDisabled(VoteOption.VOTE_OPTION_NO_WITH_VETO)}
        leftIcon={<ThumbsDownIcon />}
        onClick={() => handleVote(VoteOption.VOTE_OPTION_NO_WITH_VETO)}
        variant="outline"
      >
        Veto
      </Button>
    </>
  )
}
