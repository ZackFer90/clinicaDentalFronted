import * as React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// @MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider } from "@mui/material";
import BuildTwoToneIcon from "@mui/icons-material/BuildTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import Chip from '@mui/material/Chip';
import VaccinesIcon from '@mui/icons-material/Vaccines';

//
import "./ResponsiveAppBar.scss";
import { updateAuthStateLogout } from "../../features/authentication/updateAuthState";

// ----------------------------------------------------------------------

const handleLogout = () => {
   console.log("logout");
   updateAuthStateLogout();
};

const pages = [
   { title: "Inicio", path: "/" },
//    { title: "About", path: "/about" },
];

const settings = [
//    { title: "Profile", path: "/profile", handle: null },
//    { title: "Profile2", path: "/profile2", handle: null },
   { title: "Profile", path: "/profile", handle: null },
   { title: "Logout", path: "/", handle: handleLogout },
];

// ----------------------------------------------------------------------

function ResponsiveAppBar() {
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const userName = useSelector((state) => state.auth.userInfo.name);
   const userRole = useSelector((state) => state.auth.userInfo.role);
   const isAdmin = userRole == "admin";
   const isDoctor = userRole == "doctor";
   const isUser = userRole == "user";

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <AppBar
         position="static"
         className="ResponsiveAppBar"
         color={isAdmin ? "error" : "primary"}
      >
         <Container>
            <Toolbar disableGutters>
               <MedicalServicesOutlinedIcon
                  sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
               />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: "none", md: "flex" },
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               >
                  Clinica Dental
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: "block", md: "none" },
                     }}
                  >
                     {pages.map((page) => (
                        
                        <NavLink
                           style={{ textDecoration: "none" }}
                           to={page.path}
                           key={page.title}
                        >
                           <MenuItem onClick={handleCloseNavMenu}>
                              <Typography textAlign="center">
                                 {page.title}
                              </Typography>
                           </MenuItem>
                        </NavLink>
                     ))}
                     {isLoggedIn && (
                     <NavLink style={{ textDecoration: "none" }} to="/gestion">
                        <MenuItem onClick={handleCloseNavMenu}>
                           <Typography textAlign="center">
                              Gestiones
                           </Typography>
                        </MenuItem>
                     </NavLink>
                     )}
                  </Menu>
               </Box>
               <MedicalServicesOutlinedIcon
                  sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
               />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: "flex", md: "none" },
                     flexGrow: 1,
                     fontFamily: "monospace",
                     fontWeight: 700,
                     letterSpacing: ".3rem",
                     color: "inherit",
                     textDecoration: "none",
                  }}
               ></Typography>
               <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                     <NavLink style={{ textDecoration: "none" }} to={page.path} key={page.title}>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                           {page.title}
                        </Button>
                     </NavLink>
                  ))}
                  {isLoggedIn && (
                     <NavLink style={{ textDecoration: "none" }} to="/gestion">
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                           Gestiones
                        </Button>
                     </NavLink>
                  )}
               </Box>

               {!isLoggedIn && (
                  <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
                     <NavLink style={{ textDecoration: "none" }} to="/login">
                        <Button
                           variant="contained"
                           startIcon={<LoginTwoToneIcon />}
                           sx={{
                              my: 2,
                              mr: 1,
                              color: "white",

                              backgroundColor: "#3F51B5",
                           }}
                        >
                           Login
                        </Button>
                     </NavLink>

                     <NavLink style={{ textDecoration: "none" }} to="/register">
                        <Button
                           variant="contained"
                           startIcon={<AppRegistrationTwoToneIcon />}
                           sx={{
                              my: 2,
                              color: "white",
                              backgroundColor: "#3F51B5",
                           }}
                        >
                           Register
                        </Button>
                     </NavLink>
                  </Box>
               )}

               {isAdmin && (
                  <Box sx={{ flexGrow: 0, display: { xs: "flex" }, mr: 4 }}>
                     <NavLink style={{ textDecoration: "none" }}>
                        <Chip
                           variant="contained"
                           icon={<BuildTwoToneIcon />}
                           color="warning"
                           sx={{
                              boxShadow: 3,
                              color: "white",
                           }}
                           label="Admin panel"
                        />
                     </NavLink>
                  </Box>
               )}
               {isDoctor && (
                  <Box sx={{ flexGrow: 0, display: { xs: "flex" }, mr: 4 }}>
                     <NavLink style={{ textDecoration: "none" }}>
                        <Chip
                           variant="contained"
                           sx={{
                              boxShadow: 3,
                              color: "white",
                              backgroundColor: "#757ce8",
                           }}
                           icon={<VaccinesIcon sx={{ color: "white" }}/>}
                           label="Doctor panel"
                        />
                     </NavLink>
                  </Box>
               )}

               {/* user settings */}
               {isLoggedIn && (
                  <Box sx={{ flexGrow: 0 }}>
                     <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           {/* <Avatar
                           alt="Remy Sharp"
                           src="/static/images/avatar/2.jpg"
                        /> */}
                           <AccountCircleIcon
                              sx={{
                                 display: { xs: "flex" },
                                 mr: 1,
                                 color: "white",
                              }}
                           />
                        </IconButton>
                     </Tooltip>
                     <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                     >
                        <MenuItem
                           sx={{ cursor: "default", pointerEvents: "none" }}
                        >
                           <Typography textAlign="center" fontWeight={500}>
                              Hi, {userName}
                           </Typography>
                        </MenuItem>
                        <Divider />
                        {settings.map((setting) => (
                           <NavLink
                              style={{ textDecoration: "none" }}
                              to={setting.path}
                              key={setting.title}
                              onClick={setting.handle}
                           >
                              <MenuItem onClick={handleCloseUserMenu}>
                                 <Typography textAlign="center">
                                    {setting.title}
                                 </Typography>
                              </MenuItem>
                           </NavLink>
                        ))}
                     </Menu>
                  </Box>
               )}
            </Toolbar>
         </Container>
      </AppBar>
   );
}
export default ResponsiveAppBar;