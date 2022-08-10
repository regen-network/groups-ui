import { Alert, AlertTitle, Button, Center, GroupsIcon, Paper } from '@/atoms'

export const InstallKeplr = () => {
  return (
    <Center sx={{ alignItems: 'flex-start', mb: 10 }}>
      <Paper sx={{ px: 10, py: 10, mt: 10, alignItems: 'center' }}>
        <GroupsIcon sx={{ height: 150, width: 150, mb: 4 }} />
        <Alert
          severity="error"
          action={
            <Button component="a" href="https://www.keplr.app/#starters" target="_blank">
              Install
            </Button>
          }
        >
          <AlertTitle>Please install Keplr</AlertTitle>
          You need Keplr to run this app
        </Alert>
      </Paper>
    </Center>
  )
}
