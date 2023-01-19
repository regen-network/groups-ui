import { useColorMode, useColorModeValue } from 'hooks/chakra'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
} from '@/atoms/chakra-components'
import { RouteLink } from '@/atoms/route-link'

import { ChainSelect } from './chain-select'

import { BsMoonStarsFill, BsSun, GroupsIcon } from 'assets/tsx'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} borderBottomWidth="2px" py={4}>
      <Container maxW="container.xl">
        <HStack my={2} justify="space-between">
          <IconButton
            size="lg"
            borderRadius={50}
            aria-label="link to home page"
            fontSize="4xl"
            variant="ghost"
            as={RouteLink}
            to="/"
            icon={<GroupsIcon />}
          />
          <Flex flex={1} justifyContent="flex-end">
            <Box maxW={[200, 300]} flex={1} mr={2}>
              <ChainSelect />
            </Box>
            <Button
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              variant="ghost"
              _focus={{ boxShadow: 'none' }}
              w="fit-content"
            >
              {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
          </Flex>
        </HStack>
      </Container>
    </Box>
  )
}
