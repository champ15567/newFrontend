//Mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { AlertProps } from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//React and Ohter
import * as React from "react";
import axios from "axios";
import { ResLoginAndRegisterUsers } from "../interfaces/ApiData";
import AlertComponent from "../components/AlertComponent";
import { apiUsers } from "../apis/users";
import CardPicture from "../assets/card-head.png";
import { Container } from "@mui/material";

export default function Login() {
  //Alert
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string[]>([]);
  const [alertSeverity, setAlertSeverity] =
    React.useState<AlertProps["severity"]>("success");
  const handleAlertClose = () => {
    setOpen(false);
  };

  //Password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const isFormValid = formData.email && formData.password;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      //Validate Emply
      if (!formData.email || !formData.password) {
        setAlertSeverity("error");
        setAlertMessage(["Please fill in all required fields."]);
        setOpen(true);
        return;
      }

      const jsonData = {
        email: formData.email,
        password: formData.password,
      };
      const response = await axios({
        method: apiUsers.login.method,
        url: apiUsers.login.url,
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonData,
      });

      const responseData: ResLoginAndRegisterUsers = response.data;
      if (responseData.status === "ok") {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("profile", JSON.stringify(responseData.profile));

        //Alert
        setAlertSeverity("success");
        setAlertMessage([responseData.message]);
        setOpen(true);

        setTimeout(() => {
          window.location.href = "/home";
        }, 500);
      } else {
        setAlertSeverity("error");
        setAlertMessage([responseData.message]);
        setOpen(true);
      }
    } catch (error: any) {
      setAlertSeverity("error");
      setAlertMessage([error.message]);
      setOpen(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 480,
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardMedia
          sx={{ height: 240, width: 480 }}
          image={CardPicture}
          title="green iguana"
        >
          <Container
            sx={{
              display: "grid",
              alignItems: "center",
              height: "100%",
              mr: "auto",
            }}
          >
            <Container>
              <p
                style={{
                  fontWeight: "500",
                  color: "white",
                  fontSize: 32,
                  margin: 0,
                }}
              >
                ยินดีต้อนรับ
              </p>
              <p
                style={{
                  fontWeight: "300",
                  color: "white",
                  fontSize: 14,
                  margin: 0,
                }}
              >
                เข้าสู่ระบบเพื่อใช้งาน
              </p>
            </Container>
          </Container>
        </CardMedia>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ padding: 5, mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                id="email"
                name="email"
                label="อีเมล"
                autoComplete="email"
                required
                fullWidth
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="outlined-adornment-password">
                  รหัสผ่าน
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="รหัสผ่าน"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2.5,
                  }}
                >
                  <Link
                    variant="body2"
                    href="#"
                    sx={{
                      color: "#E21B23",
                      textDecoration: "none",
                      fontSize: "14 px",
                      fontWeight: "300",
                    }}
                  >
                    ลืมรหัสผ่าน
                  </Link>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            color="error"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, height: "48px", borderRadius: "50px" }}
            disabled={!isFormValid}
          >
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Card>

      <AlertComponent
        open={open}
        onClose={handleAlertClose}
        severity={alertSeverity}
        messages={alertMessage}
      />
    </>
  );
}
