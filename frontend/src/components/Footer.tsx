// MUI
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

// React and other
import FacebookIcon from "../assets/icon-facebook.svg";
import InstagramIcon from "../assets/icon-instagram.svg";
import YoutubeIcon from "../assets/icon-youtube.svg";
import WriteSwensens from "../assets/icon-write-swensens.png";

function Footer() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          height: "100%",
          backgroundColor: "#E21B23",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: (theme) => ({
              xs: `${theme.spacing(1.5)} ${theme.spacing(0)}`,
            }),
          }}
        >
          <Toolbar>
            <IconButton component="a">
              <img src={WriteSwensens} alt="WriteSwensens" />
            </IconButton>
          </Toolbar>

          <Toolbar>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              ไอศกรีมของเรา
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              สิทธิพิเศษ
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              รีวอร์ด
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              คูปองของฉัน
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              บัตรของขวัญ
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              บัตรสเวนเซ่นส์การ์ด
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 500, fontSize: 20 }}
            >
              ข้อมูลของฉัน
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: "#CC191F",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: { xs: 0 },
          }}
        >
          <Toolbar>
            <IconButton component="a">
              <img src={FacebookIcon} alt="Facebook" />
            </IconButton>
            <IconButton component="a">
              <img src={InstagramIcon} alt="Instagram" />
            </IconButton>
            <IconButton component="a">
              <img src={YoutubeIcon} alt="Youtube" />
            </IconButton>
          </Toolbar>

          <Toolbar>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 300, fontSize: 16 }}
            >
              คำถามที่พบบ่อย
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 300, fontSize: 16 }}
            >
              ข้อกำหนดการใช้งาน
            </Button>
            <Button
              variant="text"
              sx={{ color: "white", fontWeight: 300, fontSize: 16 }}
            >
              นโยบายความเป็นส่วนตัว
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
