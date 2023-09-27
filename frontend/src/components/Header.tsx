// MUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

// React and other
import React from "react";
import { useLocation } from "react-router-dom";
import RedSwensens from "../assets/icon-red-swensens.png";
import IconLocation from "../assets/icon-search.svg";

function Header() {
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const location = useLocation();

  const [lang, setLang] = React.useState("TH");
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 15px rgba(0,0,0,.05)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: (theme) => ({
              xs: `${theme.spacing(0.5)} ${theme.spacing(0)}`,
            }),
          }}
        >
          <Toolbar>
            <IconButton component="a">
              <img src={RedSwensens} alt="RedSwensens" />
            </IconButton>
          </Toolbar>

          <Toolbar>
            <FormControl sx={{ width: 300, mr: 3 }}>
              <Select
                value="กรุณาเลือกที่อยู่จัดส่ง"
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: 56 }}
              >
                <MenuItem value="กรุณาเลือกที่อยู่จัดส่ง">
                  <IconButton component="a">
                    <img src={IconLocation} alt="location" />
                  </IconButton>
                  กรุณาเลือกที่อยู่จัดส่ง
                </MenuItem>
              </Select>
            </FormControl>
            {location.pathname === "/register" ||
            location.pathname === "/login" ? (
              <>
                <Button
                  href="/register"
                  variant="outlined"
                  sx={{
                    fontWeight: 300,
                    fontSize: 14,
                    height: 48,
                    width: 140,
                    borderRadius: 50,
                  }}
                  color="error"
                >
                  สมัครสมาชิก
                </Button>
                <Button
                  href="/login"
                  variant="contained"
                  sx={{
                    fontWeight: 300,
                    fontSize: 14,
                    height: 48,
                    width: 140,
                    borderRadius: 50,
                    mr: 3,
                    ml: 3,
                  }}
                  color="error"
                >
                  เข้าสู่ระบบ
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                href="/login"
                variant="contained"
                sx={{
                  fontWeight: 300,
                  fontSize: 14,
                  height: 48,
                  width: 140,
                  borderRadius: 50,
                  mr: 3,
                }}
                color="error"
              >
                ออกจากระบบ
              </Button>
            )}
            <FormControl sx={{ minWidth: 100 }}>
              <Select
                value={lang}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="TH">TH</MenuItem>
                <MenuItem value="EN">EN</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
