import React from 'react'
import "./GlobalBackground.scss";
import {TextField, Box, Typography, Button} from '@mui/material';

import userService from "../_services/userService";

export default function SearchAppointmentPage() {


    const handleChange = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
 
        let idAppoint = data.get("name_appoint");

        // if(idCita == ""){
        //     idCita = appointment.doctores.usuario.nombre;
        // }
        if (!isNaN(idAppoint) && idAppoint != "") {
            console.log('Es un número');

            const idAppointment = {
                idCita: idAppoint
            }

            userService.searchAppointment(idAppointment);
        }

        // console.log(idCita);

        // setSuccess("Se ha modificado correctamente");
  
  }

  return (
    <div className='back'>
        <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Buscador de citas por id
         </Typography>
        <Box component="form" sx={{display: 'flex', justifyContent: 'center', mt: 3}} onSubmit={handleChange}>
            <TextField name='name_appoint' label="Buscador" variant="filled" />
            <Button sx={{ ml: 3}} type="submit" variant="contained">Buscar</Button>
        </Box>
    </div>
  )
}
