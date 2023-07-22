import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import format from "date-fns/format";
import "./ModifyPage.scss";
import userService from "../_services/userService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ModifyPage({value}) {

   const [users, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const user = useSelector((state) => state.user.user);

   useEffect(() => {
      getProfile();
   }, []);

   const getProfile = async () => {
      // console.log(user);
      // user.id
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

      if(user.id_rol){

      }

   }

   return (
      <>
         <Container  sm={{ width: 800, mt: 50, mb: 1 }} sx={{mt: 5}}>
            <Typography variant="h6" gutterBottom>
               Profile User
            </Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleChange}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="name"
                        label="nombre"
                        name="name"
                        defaultValue={user.nombre}
                        fullWidth
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="lastName"
                        label="apellidos"
                        name="lastName"
                        defaultValue={user.apellidos}
                        fullWidth
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="birthday"
                        label="fecha nacimiento"
                        name="birthday"
                        defaultValue={format( new Date (user.fecha_nacimiento), "yyyy/MM/dd")}
                        fullWidth
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="email"
                        label="correo"
                        name="email"
                        defaultValue={user.email}
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
                        defaultValue={user.direccion}
                        fullWidth
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="number"
                        label="telefono"
                        name="number"
                        defaultValue={user.telefono}
                        fullWidth
                        InputProps={{
                           readOnly: false,
                        }}
                     />
                  </Grid>
               </Grid>
               <Button sx={{ mt: 3, mb: 2 }} type="submit" variant="contained">Guardar</Button>
               <Button sx={{ mt: 3, mb: 2, ml: 3 }} href="/admin" variant="contained">Cancelar</Button>
            </Box>
         </Container>
      </>
   );
}