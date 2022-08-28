import { Button, Center, FlexBetween, Link, Paper, Stack, Text } from '@/atoms'
import { PageTemplate } from '@/templates/PageTemplate'

export default function Groups() {
  return (
    <PageTemplate>
      <Stack width="100%" spacing={4}>
        <FlexBetween wFull>
          <Text variant="h4">Groups</Text>
          <div>
            <Button size="large" variant="contained" component={Link} to="/groups/new">
              Create Group
            </Button>
          </div>
        </FlexBetween>
        <Paper sx={{ height: 350 }}>
          <Center hFull>
            <Text variant="h3">No groups</Text>
          </Center>
        </Paper>
      </Stack>
    </PageTemplate>
  )
}
