import { Button, FlexBetween, Link, Text } from '@/atoms'
import { PageTemplate } from '@/templates'

const Groups = () => {
  return (
    <PageTemplate>
      <FlexBetween>
        <Text variant="h4">Groups</Text>
        <div>
          <Button size="large" variant="contained" component={Link} to="/groups/new">
            Create Group
          </Button>
        </div>
      </FlexBetween>
    </PageTemplate>
  )
}

export default Groups
