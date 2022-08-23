import { Button, FlexBetween, RouteLink, Text } from '@/atoms'
import { PageTemplate } from '@/templates'

const Groups = () => {
  return (
    <PageTemplate>
      <FlexBetween>
        <Text variant="h4">Groups</Text>
        <div>
          <Button size="large" variant="contained" component={RouteLink} to="/groups/new">
            Create Group
          </Button>
        </div>
      </FlexBetween>
    </PageTemplate>
  )
}

export default Groups
