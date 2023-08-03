import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import {AlertTitle} from "@mui/material";
import Alert from "@mui/material/Alert";

import userService from "../_services/userService";
import doctorService from "../_services/doctorService";
import "./GlobalBackground.scss";

export default function CreateAppointmentPage() {

   const userName = useSelector((state) => state.auth.userInfo.name);
   const [doctors, setDoctors] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [updateUsers, setUpdateUsers] = useState([]);
   const token = useSelector((state) => state.auth.token);
   const userRole = useSelector((state) => state.auth.userInfo.role);
   const isDoctor = userRole == "doctor";
   const isUser = userRole == "user";
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const navigate = useNavigate();

   const doctorsObject = [
      // {
      //    id: 2,
      //    name: "Pablo",
      // },
      // {
      //    id: 6,
      //    name: "Manuel",
      // },
      // {
      //    id: 11,
      //    name: "Isabel",
      // },
      // {
      //    id: 19,
      //    name: "Verónica",
      // },
      // {
      //    id: 24,
      //    name: "Andrés",
      // },
      // {
      //    id: 27,
      //    name: "Lucía",
      // }
   ];

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
      event.preventDefault();
      const data = new FormData(event.currentTarget);
         try {
            if(isDoctor){

               if(data.get("patient") == "" && data.get("date_appointment") == ""){
                  setError("Hay campos vacios");
               }else{

                  const registerUser = {
                     nombrePatient: data.get("patient"),
                     fecha: data.get("date_appointment"),
                  }
                  console.log(registerUser);

                  doctorService.createAppointment(token, registerUser);

                  setSuccess("Se ha creado correctamente");
               }
            }else if(isUser){
               if(data.get("doctor") == "" && data.get("date_appointment") == ""){
                  setError("Hay campos vacios");
               }else{
                  const registerUser = {
                     nombreDoctor: data.get("doctor"),
                     fecha: data.get("date_appointment"),
                  }

                  userService.createAppointment(token, registerUser);

                  setSuccess("Se ha creado correctamente");
               }
            }
   
            
         } catch (error) {
            setError("Hay campos incorrectos");
            console.log(error);
         }
   }

   const handle = async (event) => {

      setUpdateUsers(event.target.value);
  };

     return (
        <div className='back'>
            {error && (
               <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
               </Alert>
            )}
            {success && (
               <Alert severity="success">
                  <AlertTitle>success</AlertTitle>
                  {success}
               </Alert>
            )}
           <Container  sm={{ width: 800, mt: 50, mb: 1 }} sx={{mt: 5}}>
              <Typography variant="h6" gutterBottom>
                 Crear cita
              </Typography>
              <Box component="form" sx={{ mt: 3 }} onSubmit={handleChange}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                    {isUser && (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                        {/* {doctors.map((doc, index) => ( */}
                              <Select
                                 labelId="demo-simple-select-label"
                                 id="demo-simple-select"
                                 value={updateUsers.name}
                                 // value="Pablo"
                                 label="Doctor"
                                 name="doctor"
                                 onChange={handle}
                              >
                                 {doctors.map((doc, index) => (
                                       <MenuItem value={doc.nombre} key={index}>{doc.nombre}</MenuItem>
                                 ))}
                                 {/* <MenuItem value={20}>Twenty</MenuItem>
                                 <MenuItem value={30}>Thirty</MenuItem> */}
                              </Select>
                           {/* ))} */}
                    </FormControl>
                    )}
                    {isDoctor && (
                       <TextField
                          id="doctor"
                          label="doctor"
                          name="doctor"
                          fullWidth
                          InputProps={{
                             readOnly: true,
                          }}
                          value={userName}
                       />
                    )}
                    </Grid>
                 
                    <Grid item xs={12} sm={4}>
                    {isUser && (
                       <TextField
                          id="patient"
                          label="paciente"
                          name="patient"
                          fullWidth
                          InputProps={{
                             readOnly: true,
                          }}
                          value={userName}
                       />
                    )}
                    {isDoctor && (
                       <TextField
                          id="patient"
                          label="paciente"
                          name="patient"
                          fullWidth
                          InputProps={{
                             readOnly: false,
                          }}
                       />
                    )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                       <TextField
                          id="date_appointment"
                          label="fecha cita (año-mes-dia)"
                          name="date_appointment"
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
                  <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/gestion" variant="contained">Cancelar</Button>
                 )}
                 {isDoctor && (
                  <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/doctor" variant="contained">Cancelar</Button>
                 )}
              </Box>
           </Container>
        </div>
     );
}