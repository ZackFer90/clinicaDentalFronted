import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import userService from "../_services/userService";

export default function CreateAppointmentPage() {

   const appointment = useSelector((state) => state.appointment.appointment);
   const [doctors, setDoctors] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
        getProfile();
   }, []);
  
   const getProfile = async () => {
        setIsLoading(true);
        try{
            const doctor = await userService.getDoctor();
            setDoctors(doctor);
            console.log(doctor);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
   };

    const handleChange = (event) => {
        // setAge(event.target.value);
        // console.log(event);
    };

   const handleChange1 = (event) => {
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
        {!isLoading && (
           <Container  sm={{ width: 800, mt: 50, mb: 1 }} sx={{mt: 5}}>
              <Typography variant="h6" gutterBottom>
                 Profile User
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
                                value="Pablo"
                                label="Doctor"
                                onChange={handleChange}
                            >
                                {doctors.map((doc, index) => (
                                    <MenuItem value={doc.nombre} key={index}>{doc.nombre}</MenuItem>
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
                 <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/profile" variant="contained">Cancelar</Button>
              </Box>
           </Container>
        )}
        </>
     );
}