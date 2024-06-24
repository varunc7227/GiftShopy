import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import Checkout from './Checkout';

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  const approve = (data, actions) => {};

  return (
    <Box m="30px 0" textAlign={'left'}>
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          // fullWidth

          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: 'span 4', marginBottom: '15px', width: '80%' }}
        />
        <br />
        <TextField
          //fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: 'span 4', width: '80%' }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
