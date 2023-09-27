//Mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AlertProps } from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "@mui/material";

//React and Ohter
import * as React from "react";
import axios from "axios";
import AlertComponent from "../components/AlertComponent";
import { apiP_Type } from "../apis/p_type";
import CardPicture from "../assets/card-head.png";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function EditProdType() {
  interface ResCreateProduct {
    status: string;
    message: string;
    product: {
      code: string;
      name: string;
      description: string;
      price: number;
      type: string;
    };
  }
  //Alert
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string[]>([]);
  const [alertSeverity, setAlertSeverity] =
    React.useState<AlertProps["severity"]>("success");
  const handleAlertClose = () => {
    setOpen(false);
  };

  const { code } = useParams();
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    description: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: apiP_Type.getOneP_Type.method,
          url: apiP_Type.getOneP_Type.url + code,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          code: response.data.p_type.code,
          name: response.data.p_type.name,
          description: response.data.p_type.description,
        });
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          alert("Authentication failed");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setAlertSeverity("error");
          setAlertMessage([error.message]);
          setOpen(true);
        }
      }
    };

    fetchData();
  }, [code]);

  //Validate to unlock button submit
  const isFormValid = formData.code && formData.name;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  //Submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      //Validate Emply
      if (!formData.name) {
        setAlertSeverity("error");
        setAlertMessage(["Please fill in all required fields."]);
        setOpen(true);
        return;
      }

      const jsonData = {
        name: formData.name,
        description: formData.description,
      };
      const response = await axios({
        method: apiP_Type.editP_Type.method,
        url: apiP_Type.editP_Type.url + code,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: jsonData,
      });

      const responseData: ResCreateProduct = response.data;
      if (responseData.status === "ok") {
        //Alert
        setAlertSeverity("success");
        setAlertMessage([responseData.message]);
        setOpen(true);

        setTimeout(() => {
          window.location.href = "/prodtype";
        }, 500);
      } else {
        setAlertSeverity("error");
        setAlertMessage([responseData.message]);
        setOpen(true);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Authentication failed");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setAlertSeverity("error");
        setAlertMessage([error.message]);
        setOpen(true);
      }
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
                แก้ไขชนิดสินค้า
              </p>
              <p
                style={{
                  fontWeight: "300",
                  color: "white",
                  fontSize: 14,
                  margin: 0,
                }}
              >
                แก้ไขชนิดสินค้าเพื่อใช้งาน
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
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                name="code"
                required
                fullWidth
                id="code"
                label="รหัสสินค้า"
                value={formData.code}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                autoFocus
                id="name"
                name="name"
                label="ชื่อ"
                autoComplete="name"
                required
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <TextField
                required
                fullWidth
                id="description"
                label="คำอธิบาย"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
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
              href="/prodtype"
              sx={{
                color: "#E21B23",
                textDecoration: "none",
                fontSize: "16 px",
                fontWeight: "400",
              }}
            >
              กลับสู่หน้าหลัก
            </Link>
          </Grid>
          <Button
            type="submit"
            color="error"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, height: "48px", borderRadius: "50px" }}
            disabled={!isFormValid}
          >
            บันทึก
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
