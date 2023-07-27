import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { Navigate, useNavigate } from "react-router-dom";

import { Container } from "@mui/system";
import { Box, Typography, InputLabel, MenuItem, FormControl, Select, Button, Grid, TextField } from "@mui/material";
import {AlertTitle} from "@mui/material";
import Alert from "@mui/material/Alert";

import userService from "../_services/userService";
import "./GlobalBackground.scss";

export default function ModifyAppointmentPage() {

   const appointment = useSelector((state) => state.appointment.appointment);
   const userRole = useSelector((state) => state.auth.userInfo.role);
   const isDoctor = userRole == "doctor";
   const isUser = userRole == "user";
   const [isLoading, setIsLoading] = useState(true);
   const [doctors, setDoctors] = useState([]);
   const [updatedoctors, setUpdateDoctors] = useState([]);
   const [success, setSuccess] = useState(null);
   const navigate = useNavigate();

   const doctorsObject = [
      {
         id: 2,
         name: "Pablo",
      },
      {
         id: 6,
         name: "Manuel",
      },
      {
         id: 11,
         name: "Isabel",
      },
      {
         id: 19,
         name: "Verónica",
      },
      {
         id: 24,
         name: "Andrés",
      },
      {
         id: 27,
         name: "Lucía",
      }
   ];

   useEffect(() => {
        getProfile();
   }, []);
  
   const getProfile = async () => {
      setIsLoading(true);
        try{
         const doctor = await userService.getDoctor();
         setDoctors(doctor);

         // for (const doctors of doctor) {
         //    const data = {
         //       id: doctors.id,
         //       name: doctors.nombre,
         //    }
         //    doctorsObject.push(data);

         // }

         console.log(appointment);
         // console.log(doctorsObject);
     } catch (error) {
         console.log(error);
     } finally {
      setIsLoading(false);
      }
   };

   const handle = async (event) => {

      setUpdateDoctors(event.target.value);
      // console.log(event.target.value);
      // setUpdateDoctors(doctorsObject);
  };

   const handleChange = (event) => {
         event.preventDefault();
         const data = new FormData(event.currentTarget);
  
         let nombreDoctor = data.get("doctor");

         if(nombreDoctor == ""){
            nombreDoctor = appointment.doctores.usuario.nombre;
         }
         const registerUser = {
            idCita: appointment.id,
            nombreDoctor: nombreDoctor,
            nombrePatient: data.get("patient"),
            fecha: data.get("date_appointment"),
         }
         console.log("entra");
         console.log(registerUser);

         userService.modifyAppointment(registerUser);

         setSuccess("Se ha modificado correctamente");
   
   }

     const handleClick = () => {

     }

     return (
        <div >
         {success && (
               <Alert severity="success">
                  <AlertTitle>success</AlertTitle>
                  {success}
               </Alert>
         )}
         {!isLoading && (
           <Container  sm={{ width: 800, mt: 50, mb: 1 }} sx={{mt: 5}}>
              <Typography variant="h6" gutterBottom>
                 Modificar cita
              </Typography>
              <Box component="form" sx={{ mt: 3 }} onSubmit={handleChange}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                     <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                           {/* {doctors.map((doc, index) => ( */}
                              <Select
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 value={updatedoctors.name}
                                 // value="Pablo"
                                 label="Doctor"
                                 name="doctor"
                                 onChange={handle}
                              >
                                 {doctorsObject.map((doc, index) => (
                                       <MenuItem value={doc.name} key={index}>{doc.name}</MenuItem>
                                 ))}
                                 {/* <MenuItem value={20}>Twenty</MenuItem>
                                 <MenuItem value={30}>Thirty</MenuItem> */}
                              </Select>
                           {/* ))} */}
                     </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                     
                       <TextField
                          id="patient"
                          label="paciente"
                          name="patient"
                          defaultValue={appointment.pacientes.usuario.nombre}
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                       <TextField
                          id="date_appointment"
                          label="fecha cita"
                          name="date_appointment"
                          defaultValue={format( new Date (appointment.fecha), "yyyy/MM/dd")}
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                       <TextField
                          id="email"
                          label="correo"
                          name="email"
                        //   defaultValue={user.email}
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <TextField
                          id="street"
                          label="direccion"
                          name="street"
                        //   defaultValue={user.direccion}
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       />
                    </Grid> */}
                 </Grid>
                 <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">Guardar</Button>
                 {isUser && (
                  <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/profile" variant="contained">Cancelar</Button>
                 )}
                 {isDoctor && (
                  <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/doctor" variant="contained">Cancelar</Button>
                 )}
              </Box>
           </Container>
         )}
        </div>
     );
}
