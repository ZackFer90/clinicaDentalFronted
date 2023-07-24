import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

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
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

//
import userService from "../_services/userService";
import doctorService from "../_services/doctorService";
import { updateAppointment } from "../features/citas/updateAppointmentState";
import { updateUser } from "../features/user/updateUserState";


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
   const [appointments, setappointments] = useState(false);
   const [users, setUser] = useState({});
   const [formValues, setFormValues] = useState(initialFormValues);
   const [isLoading, setIsLoading] = useState(true);
   const userRole = useSelector((state) => state.auth.userInfo.role);
   const isAdmin = userRole == "admin";
   const isDoctor = userRole == "doctor";

    // glogal state hooks
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
      getProfile();
    }, []);

    const getProfile = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getUser(token);
         if(!isAdmin && !isDoctor){
            const appoint = await userService.getAppointment(token);
            setappointments(appoint);
         }
         // else if(isDoctor){
         //    const appoint = await doctorService.getMyAppointment(token);
         //    setappointments(appoint);
         // }
         setUser(data);
         console.log(data);
         // console.log(appoint);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
    };

      const clickDelete = (value) =>{
         const apointment = {
            nombreDoctor: value.doctores.id,
            fecha: value.fecha,
         };
         console.log(apointment);
         // userService.deleteAppointment(token, apointment);
      }

      const changeAppointment = (value) =>{
         console.log(value);
         updateAppointment(value);
         navigate(`/modifyCitas`);
      }

      const changeUser = (value) =>{
         // console.log(value);
         updateUser(value);
         navigate(`/modifyProfile`);
      }

   const StudentCourses = ({ appointment }) => {

      console.log("En citas");
      console.log(appointment);
      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Usuario</TableCell>
                     <TableCell>Doctor</TableCell>
                     <TableCell>Fecha</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {appointment.map((appoint) => (
                     <TableRow
                        key={appoint.pacientes.id}
                     >
                        <TableCell>
                           {appoint.pacientes.usuario.nombre}
                        </TableCell>
                        <TableCell>
                           {appoint.doctores.usuario.nombre}
                        </TableCell>
                        <TableCell>
                           {format( new Date (appoint.fecha), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                           <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDelete(appoint)}/>
                        </TableCell>
                        <TableCell>
                           <Button startIcon={<CreateIcon />} onClick={()=> changeAppointment(appoint)}/>
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
                     <Button variant="contained" onClick={()=> changeUser(user)}>Modificar</Button>
                  </Box>
                  {appointments && (
                     <Box sx={{ mt: 5 }}>
                        <Typography component="h3" variant="h5" gutterBottom>
                           Citas
                        </Typography>
                        <StudentCourses appointment={appointments} />
                     </Box>
                  )}
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
                 
               </Container>
               ))}
            </ThemeProvider>
         )}
      </>
   );
}