import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress size="150px" />
      </Stack>
    );
  }


export default Loading