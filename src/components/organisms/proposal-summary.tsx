import type { UIGroup, UIProposal } from 'types'

import { useColorModeValue } from 'hooks/chakra-hooks'

import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@/atoms'

import { VotesGraph } from './votes-graph'

export const ProposalSummary = ({
  group,
  proposal,
}: {
  proposal: UIProposal
  group: UIGroup
}) => {
  const cardBgDark = useColorModeValue('gray.100', 'gray.700')
  return (
    <Card>
      <Flex>
        <CardBody>
          <Stack>
            <Heading>{proposal.metadata.title}</Heading>
            <Text>{proposal.metadata.description || '-'}</Text>
          </Stack>
        </CardBody>
        <CardBody bg={cardBgDark} borderRightRadius="lg">
          <Stack spacing={8}>
            <Flex align="baseline">
              <Heading size="md">Voting Group:</Heading>
              <Text ml={2}>{group.metadata.name}</Text>
            </Flex>
            <Center>
              <Box maxW={220}>
                <VotesGraph />
              </Box>
            </Center>
            <SimpleGrid columns={2} gap={3} columnGap={4}>
              <Button colorScheme="green" variant="outline">
                Yes
              </Button>
              <Button colorScheme="red" variant="outline">
                No
              </Button>
              <Button colorScheme="yellow" variant="outline">
                Abstain
              </Button>
              <Button colorScheme="orange" variant="outline">
                Veto
              </Button>
            </SimpleGrid>
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  )
}
