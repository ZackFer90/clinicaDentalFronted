import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

// @MUI
import {
   Avatar,
   Box,
   Button,
   Chip,
   Container,
   CssBaseline,
   Grid,
   IconButton,
   InputAdornment,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   ThemeProvider,
   Typography,
   createTheme,
} from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import AttributionIcon from '@mui/icons-material/Attribution';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import FmdGoodTwoToneIcon from "@mui/icons-material/FmdGoodTwoTone";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { grey } from "@mui/material/colors";

//
import userService from "../_services/userService";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

const initialFormValues = {
   firstName: "",
   lastName: "",
   email: "",
};

export default function ProfilePage() {
   // hooks
//    const [showPassword, setShowPassword] = useState(false);
    const [appointment, setappointment] = useState(false);
    const [users, setUser] = useState({});
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isLoading, setIsLoading] = useState(true);

    // glogal state hooks
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
      getProfile();
    }, []);

    const getProfile = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getUser(token);
         const appoint = await userService.getAppointment(token);
         setappointment(appoint);
         setUser(data);
         console.log(data);
         console.log(appoint);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
    };

//    const saveProfile = async () => {
//       setIsLoading(true);
//       try {
//          const data = await userService.getProfile(token);
//          setUser(data);
//          console.log(data);
//          console.log(data.nombre);
//       } catch (error) {
//          console.log(error);
//       } finally {
//          setIsLoading(false);
//       }
//    };

   const StudentCourses = ({ appointment }) => {
    //   function createData(name, category) {
    //      return { name, category };
    //   }

    //   const rows = appointment.map((appoint) =>
    //      createData(appoint.name, appoint.category)
    //   );

      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Category</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {appointment.map((appoint) => (
                     <TableRow
                        key={row.name}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell component="th" scope="row">
                           {row.name}
                        </TableCell>
                        <TableCell align="right">
                           {" "}
                           <Chip size="small" label={row.category} />{" "}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   };

   // ----------------------------------------------------------------------

   return (
      <>
         {!isLoading && (
            <ThemeProvider theme={defaultTheme}>
                {users.map((user) => (
               <Container key={user.id} component="main" maxWidth="md" sx={{ pb: 5 }}>
                  <Box
                     sx={{
                        marginTop: 8,
                        alignItems: "flex-start",
                     }}
                  >
                     <Box sx={{ mt: 1, mb: 4 }}>
                        <AccountCircleRoundedIcon
                           sx={{ fontSize: 90, color: "secondary.light" }}
                        />
                        <Typography component="h1" variant="h4">
                           Perfil usuario
                        </Typography>
                     </Box>

                     <List dense={true}>
                        <ListItem>
                           <ListItemIcon>
                              <AttributionIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={`${user.nombre} ${user.apellidos}`}
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon>
                              <EmailTwoToneIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={user.email}
                           />
                        </ListItem>
                        <ListItem>
                           <ListItemIcon>
                              <CallIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={user.telefono}
                           />
                        </ListItem>

                        <ListItem>
                           <ListItemIcon>
                              <DateRangeTwoToneIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={format(
                                 new Date(user.fecha_nacimiento),
                                 "dd/MM/yyyy"
                              )}
                           />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FmdGoodTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.direccion}
                                //secondary="Secondary text"
                            />
                        </ListItem>
                        
                     </List>
                  </Box>

                     {/* {user.courses && ( */}
                        <>
                            <Box sx={{ mt: 5 }}>
                            <Typography component="h3" variant="h5" gutterBottom>
                                Citas
                            </Typography>
                            {/* <StudentCourses courses={appointment} /> */}
                            </Box>

                            <Box sx={{ mt: 5 }}>
                            {/* <Typography component="h3" variant="h5" gutterBottom>
                                Courses
                            </Typography> */}
                            {/* {user.courses.map((c) => ( */}
                                {/* <Chip
                                    key={user.name}
                                    label={`${user.nombre}/${user.apellidos}`}
                                /> */}
                            {/* ))} */}
                            </Box>
                        </>
                    {/* )} */}
                 
               </Container>
               ))}
            </ThemeProvider>
         )}
      </>
   );
}