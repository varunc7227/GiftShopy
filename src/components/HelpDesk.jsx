import { Close, Send } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  TextareaAutosize,
  Typography,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import emailjs from "emailjs-com";
import { enqueueSnackbar } from "notistack";

function HelpDesk({ showForm, onFormChange }) {
  const theme = useTheme({
    breakpoints: {
      values: {
        xs: 500,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const breakPoint = useMediaQuery("(max-width:760px)");
  const [helpDeskForm, setHelpDeskForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    description: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    firstName: false,
    lastName: false,
    subject: false,
    description: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !(value.includes("@") && value.includes("."));
      case "firstName":
      case "lastName":
      case "subject":
      case "description":
        return value.trim() === "";
      default:
        return false;
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...helpDeskForm, [name]: value };
    const updatedErrors = { ...formError, [name]: validateField(name, value) };

    setHelpDeskForm(updatedForm);
    setFormError(updatedErrors);
  };

  const handleValidation = () => {
    const { email, firstName, lastName, subject, description } = helpDeskForm;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isNameValid = firstName.trim() !== "" && lastName.trim() !== "";
    const isSubjectValid = subject.trim() !== "";
    const isDescriptionValid = description.trim() !== "";

    return isEmailValid && isNameValid && isSubjectValid && isDescriptionValid;
  };

  const handleCloseEvent = () => {
    setHelpDeskForm({
      email: "",
      firstName: "",
      lastName: "",
      subject: "",
      description: "",
    });
    onFormChange();
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    const templateParams = {
      to_name: `${helpDeskForm.firstName} ${helpDeskForm.lastName}`,
      message: helpDeskForm.description,
      reply_to: helpDeskForm.email,
      subject: helpDeskForm.subject,
    };

    emailjs
      .send(
        "service_uu9usen",
        "template_8s9yn0v",
        templateParams,
        "Smp2SW6N3DxhJagsm"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          enqueueSnackbar("Help Desk Request Send Successfully");
          handleCloseEvent();
        },
        (error) => {
          console.log("FAILED...", error);
          enqueueSnackbar(
            "Some error occurred while sending Help Desk Request"
          );
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog
      open={showForm}
      disableEscapeKeyDown={false}
      scroll={"paper"}
      fullWidth={true}
    >
      <DialogTitle
        sx={{
          fontSize: breakPoint ? "1.4rem" : "2rem",
          fontFamily: "Satoshi, sans-serif",
          color: "darkslategrey",
          fontWeight: 300,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem", // smaller font size on small screens
          },
        }}
      >
        Help Desk Request Form
        <IconButton
          onClick={handleCloseEvent}
          style={{ color: "rgba(0, 0, 0, 0.87)" }}
        >
          <Close sx={{ width: "1.5rem", height: "1.5rem", fontWeight: 200 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: breakPoint ? "0.9rem" : "1.1rem",
                fontWeight: 600,
              }}
            >
              Name
            </Typography>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="text"
                variant="outlined"
                name="firstName"
                placeholder="First"
                value={helpDeskForm.firstName}
                onChange={handleFormChange}
                style={{ flex: "1 1 0" }}
                error={formError.firstName}
              />
              <TextField
                margin="dense"
                type="text"
                variant="outlined"
                name="lastName"
                placeholder="Last"
                value={helpDeskForm.lastName}
                onChange={handleFormChange}
                style={{ flex: "1 1 0" }}
                error={formError.lastName}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: breakPoint ? "0.9rem" : "1.1rem",
                fontWeight: 600,
              }}
            >
              Email
            </Typography>
            <TextField
              margin="dense"
              placeholder="Email Address"
              name="email"
              type="email"
              variant="outlined"
              value={helpDeskForm.email}
              onChange={handleFormChange}
              error={formError.email}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: breakPoint ? "0.9rem" : "1.1rem",
                fontWeight: 600,
              }}
              gutterBottom
            >
              Subject
            </Typography>
            <Select
              defaultValue={helpDeskForm.subject}
              name="subject"
              onChange={handleFormChange}
              error={formError.subject}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Orders">Orders</MenuItem>
              <MenuItem value="Booking">Booking</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
            </Select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              verticalAlign: "top",
              marginTop: "8px",
              marginBottom: "4px",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontSize: breakPoint ? "0.9rem" : "1.1rem",
                fontWeight: 600,
              }}
              gutterBottom
            >
              Description
            </Typography>
            <TextareaAutosize
              minRows={3}
              placeholder="Description"
              name="description"
              value={helpDeskForm.description}
              onChange={handleFormChange}
              error={formError.description}
              style={{
                padding: "16.5px 14px",
                alignItems: "center",
                position: "relative",
                borderRadius: "4px",
                fontWeight: 400,
                fontSize: "0.7857142857142857rem",
                lineHeight: "1.4375em",
                color: "rgba(0, 0, 0, 0.87)",
                border: !formError.description
                  ? "1px solid rgba(0, 0, 0, 0.23)"
                  : "1px solid #f44336",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!handleValidation() || isLoading}
          startIcon={isLoading && <CircularProgress />}
          variant="contained"
          size="large"
          fullWidth={true}
          sx={{
            fontSize: "1.1rem",
            background: "#2196f3",
            borderRadius: "2rem",
          }}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HelpDesk;
