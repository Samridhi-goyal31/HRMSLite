import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

const ConfirmDialog = ({ open, title, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button color="error" onClick={() => { onConfirm(); onClose(false); }}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog