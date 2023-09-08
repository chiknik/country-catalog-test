import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CountryModal = ({ country, closeModal }) => {
  if (!country) return null;

  return (
    <Dialog open={true} onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={closeModal}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {country.name.official}
      </DialogTitle>
      <DialogContent>
        {Object.keys(country).map((key) => (
          <DialogContentText key={key}>
            <strong>{key}:</strong> {JSON.stringify(country[key])}
          </DialogContentText>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
