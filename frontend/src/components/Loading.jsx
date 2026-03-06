import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message="Loading..." }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} p={2}>
      <CircularProgress size={24} />
      <Typography>{message}</Typography>
    </Box>
  )
}

export default Loading