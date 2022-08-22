import { Button, Flex, RouteLink, Text } from '@/atoms'
import { PageTemplate } from '@/templates'

const Groups = () => {
  return (
    <PageTemplate>
      <Flex justifyContent="space-between">
        <Text variant="h4">Groups</Text>
        <div>
          <Button size="large" variant="contained" component={RouteLink} to="/groups/new">
            Create Group
          </Button>
        </div>
      </Flex>
    </PageTemplate>
  )
}

export default Groups
