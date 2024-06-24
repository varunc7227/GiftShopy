import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import AddressForm from './AddressForm';

const Shipping = ({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => {
  return (
    // <Box m="30px auto">
    <Box m="">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: '15px' }} fontSize="18px" textAlign={'left'}>
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px" mt="13px" textAlign={'left'}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() => setFieldValue('shippingAddress.isSameAddress', !values.shippingAddress.isSameAddress)}
            />
          }
          label={<span style={{ fontSize: 'medium' }}> Same for Shipping Address </span>}
        />
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography sx={{ mb: '15px' }} fontSize="18px" textAlign={'left'}>
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
