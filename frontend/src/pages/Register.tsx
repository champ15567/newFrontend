//Mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//React and Ohter
import * as React from "react";
import axios from "axios";
import { ResLoginAndRegisterUsers } from "../interfaces/ApiData";
import AlertComponent from "../components/AlertComponent";
import { apiUsers } from "../apis/users";
import CardPicture from "../assets/card-head.png";
import { Container, Link, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

export default function Register() {
  //Alert
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string[]>([]);
  const [alertSeverity, setAlertSeverity] =
    React.useState<AlertProps["severity"]>("success");
  const handleAlertClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = React.useState({
    email: "",
    f_name: "",
    l_name: "",
    tel: "",
    password: "",
    gender: "ไม่ระบุ",
    b_date: "",
  });

  //Password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //Tel
  const handleInputTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const numericValue = value.replace(/\D/g, "");

    setFormData((prevData) => ({
      ...prevData,
      [name]: numericValue,
    }));
  };

  //CheckBox
  const [checked, setChecked] = React.useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  //Date
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString();
      const dayjsFormattedDate = dayjs(formattedDate).format("YYYY-MM-DD");
      setFormData((prevData) => ({
        ...prevData,
        b_date: dayjsFormattedDate,
      }));
    }
  };

  //Validate to unlock button submit
  const isFormValid =
    formData.email &&
    formData.f_name &&
    formData.l_name &&
    formData.tel &&
    formData.password &&
    formData.gender &&
    formData.b_date &&
    checked;

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
      if (
        !formData.email ||
        !formData.f_name ||
        !formData.l_name ||
        !formData.tel ||
        !formData.password ||
        !formData.gender ||
        !formData.b_date
      ) {
        setAlertSeverity("error");
        setAlertMessage(["Please fill in all required fields."]);
        setOpen(true);
        return;
      }

      const jsonData = {
        email: formData.email,
        f_name: formData.f_name,
        l_name: formData.l_name,
        tel: formData.tel,
        password: formData.password,
        gender: formData.gender,
        b_date: formData.b_date,
      };
      const response = await axios({
        method: apiUsers.createUsers.method,
        url: apiUsers.createUsers.url,
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
                สร้างบัญชี
              </p>
              <p
                style={{
                  fontWeight: "300",
                  color: "white",
                  fontSize: 14,
                  margin: 0,
                }}
              >
                สมัครสมาชิกและเริ่มใช้งาน
              </p>
            </Container>
          </Container>
        </CardMedia>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ padding: 5, mt: 1 }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} sx={{ mb: 4 }}>
              <TextField
                autoComplete="given-name"
                name="f_name"
                required
                fullWidth
                id="f_name"
                label="ชื่อ"
                autoFocus
                value={formData.f_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 4 }}>
              <TextField
                required
                fullWidth
                id="l_name"
                label="นามสกุล"
                name="l_name"
                autoComplete="family-name"
                value={formData.l_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                id="tel"
                name="tel"
                label="เบอร์โทร"
                autoComplete="tel"
                required
                fullWidth
                value={formData.tel}
                onChange={handleInputTelChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                id="email"
                name="email"
                label="อีเมล"
                autoComplete="email"
                required
                fullWidth
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <p style={{ fontSize: 14, fontWeight: 300 }}>
                  เพศ (ไม่ระบุได้)
                </p>
                <Stack spacing={2} direction="row">
                  <Button
                    color="error"
                    variant={
                      formData.gender === "ชาย" ? "contained" : "outlined"
                    }
                    fullWidth
                    sx={{ borderRadius: "50px" }}
                    size="large"
                    onClick={() => setFormData({ ...formData, gender: "ชาย" })}
                  >
                    ชาย
                  </Button>
                  <Button
                    color="error"
                    variant={
                      formData.gender === "หญิง" ? "contained" : "outlined"
                    }
                    fullWidth
                    sx={{ borderRadius: "50px" }}
                    size="large"
                    onClick={() => setFormData({ ...formData, gender: "หญิง" })}
                  >
                    หญิง
                  </Button>
                  <Button
                    color="error"
                    variant={
                      formData.gender === "ไม่ระบุ" ? "contained" : "outlined"
                    }
                    fullWidth
                    sx={{ borderRadius: "50px", height: 50 }}
                    onClick={() =>
                      setFormData({ ...formData, gender: "ไม่ระบุ" })
                    }
                  >
                    ไม่ระบุ
                  </Button>
                </Stack>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <p style={{ fontSize: 14, fontWeight: 300, marginBottom: 4 }}>
                  วันเกิด
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={
                      formData.b_date ? dayjs(formData.b_date).toDate() : null
                    }
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Toolbar style={{ padding: 0, alignItems: "flex-start" }}>
                <Checkbox
                  {...label}
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CheckCircleIcon color="error" />}
                  onChange={handleCheckChange}
                />
                <p style={{ margin: 0, fontWeight: "300", fontSize: "14px" }}>
                  ฉันได้อ่านและยอมรับ{" "}
                  <Link
                    href="#"
                    color="error"
                    style={{ textDecoration: "none" }}
                  >
                    ข้อกำหนดการใช้งาน
                  </Link>{" "}
                  และ{" "}
                  <Link
                    href="#"
                    color="error"
                    style={{ textDecoration: "none" }}
                  >
                    นโยบายความเป็นส่วนตัว
                  </Link>{" "}
                  ของสเวนเซ่นส์
                </p>
              </Toolbar>
            </Grid>
            <Grid item xs={12}>
              <Toolbar style={{ padding: 0, alignItems: "flex-start" }}>
                <Checkbox
                  {...label}
                  icon={<CircleOutlinedIcon />}
                  checkedIcon={<CheckCircleIcon color="error" />}
                />

                <p style={{ margin: 0, fontWeight: "300", fontSize: "14px" }}>
                  ฉันยินยอมรับข้อมูลข่าวสาร กิจกรรมส่งเสริมการขายต่างๆ
                  จากสเวนเซ่นส์และ
                  <Link
                    href="#"
                    color="error"
                    style={{ textDecoration: "none" }}
                  >
                    บริษัทในเครือ
                  </Link>{" "}
                  โดยเราจะเก็บข้อมูลของท่านไว้เป็นความลับ
                  สามารถศึกษาเงื่อนไขหรือข้อตกลง{" "}
                  <Link
                    href="#"
                    color="error"
                    style={{ textDecoration: "none" }}
                  >
                    นโยบายความเป็นส่วนตัว
                  </Link>
                  เพิ่มเติมได้ที่เว็บไซต์ของบริษัทฯ
                </p>
              </Toolbar>
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
            สมัครสมาชิก
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
