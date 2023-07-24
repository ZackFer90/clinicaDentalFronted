import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from "@mui/material";

import userService from "../_services/userService";

export default function ModifyAppointmentPage() {

   const appointment = useSelector((state) => state.appointment.appointment);

   useEffect(() => {
        getProfile();
   }, []);
  
   const getProfile = async () => {
        console.log(appointment);
        // const appoint = await userService.getDoctor(appointent.doctores.usuario.nombre);
   };

   const handleChange = (event) => {
         event.preventDefault();
         const data = new FormData(event.currentTarget);
  
         const registerUser = {
            nombre: data.get("nombre"),
            apellidos: data.get("lastName"),
            email: data.get("email"),
            birthday: data.get("birthday"),
            street: data.get("street"),
            number: data.get("number"),
         }
         console.log("entra");
         console.log(registerUser);
         console.log(user.id_rol);

         if(user.id_rol == 2){
            console.log("user");
         }else if(user.id_rol == 3){
            console.log("doctor");
         }
   
   }

     const handleClick = () => {

     }

     return (
        <>
           <Container  sm={{ width: 800, mt: 50, mb: 1 }} sx={{mt: 5}}>
              <Typography variant="h6" gutterBottom>
                 Profile User
              </Typography>
              <Box component="form" sx={{ mt: 3 }} onSubmit={handleChange}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                       {/* <TextField
                          id="doctor"
                          label="doctor"
                          name="doctor"
                          defaultValue={appointment.doctores.usuario.nombre}
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       /> */}
                     <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >
                        Dashboard
                     </Button>
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
                 <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/profile" variant="contained">Cancelar</Button>
              </Box>
           </Container>
        </>
     );
}
