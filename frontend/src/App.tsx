//MUI
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

//Page
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import CreateProduct from "./pages/CreateProduct.tsx";
import HomeProdType from "./pages/HomeProdType.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import EditProduct from "./pages/EditProduct.tsx";
import EditProdType from "./pages/EditProdType.tsx";
import CreateProdType from "./pages/CreateProdType.tsx";

//React and Other
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

const token = localStorage?.getItem("token");
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#F4F4F4",
        }}
      >
        <CssBaseline />
        <Header />
        <Container
          component="main"
          sx={{
            mt: 5,
            mb: 6,
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                token ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/home" /> : <Register />}
            />
            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/createproduct"
              element={token ? <CreateProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="/editproduct/:code"
              element={token ? <EditProduct /> : <Navigate to="/login" />}
            />
            <Route
              path="/prodtype"
              element={token ? <HomeProdType /> : <Navigate to="/login" />}
            />
            <Route
              path="/editptype/:code"
              element={token ? <EditProdType /> : <Navigate to="/login" />}
            />
            <Route
              path="/createptype"
              element={token ? <CreateProdType /> : <Navigate to="/login" />}
            />

            <Route
              path="*"
              element={token ? <PageNotFound /> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
        <Box
          component="footer"
          sx={{
            mt: "auto",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
