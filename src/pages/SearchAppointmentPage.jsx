import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import {
    TextField, Box, Typography, Button, TableContainer, Table,
    TableHead, TableBody, TableRow, TableCell, Paper
} from '@mui/material';

import userService from "../_services/userService";
import "./GlobalBackground.scss";

export default function SearchAppointmentPage() {

    const token = useSelector((state) => state.auth.token);
    const [appointments, setappointments] = useState(false);



    const handleChange = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
 
        let idAppoint = data.get("name_appoint");

        // if(idCita == ""){
        //     idCita = appointment.doctores.usuario.nombre;
        // }
        if (!isNaN(idAppoint) && idAppoint != "") {
            console.log('Es un número');

            const idAppointment = {
                idCitas: idAppoint
            }

            const appointSearch = await userService.searchAppointment(token, idAppointment);
            setappointments(appointSearch)
            console.log(appointSearch);
        }

        // console.log(idCita);

        // setSuccess("Se ha modificado correctamente");
  
    }

    /////////////////////////////////////////////////////////////////

    const AppointmentsView = ({ appointment }) => {

    // console.log("En citas");
    // console.log(appointment);
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Numero cita</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointment.map((appoint) => (
                            <TableRow key={appoint.pacientes.id}>
                                <TableCell>
                                    {appoint.id}
                                </TableCell>
                                <TableCell>
                                    {appoint.pacientes.usuario.nombre}
                                </TableCell>
                                <TableCell>
                                    {appoint.doctores.usuario.nombre}
                                </TableCell>
                                <TableCell>
                                    {format( new Date (appoint.fecha), "dd/MM/yyyy")}
                                </TableCell>
                                {/* <TableCell>
                                    <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDelete(appoint)}/>
                                </TableCell>
                                <TableCell>
                                    <Button startIcon={<CreateIcon />} onClick={()=> changeAppointment(appoint)}/>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    /////////////////////////////////////////////////////////////////

  return (
    <div className='back'>
        <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Buscador de citas por id
         </Typography>
        <Box component="form" sx={{display: 'flex', justifyContent: 'center', mt: 3}} onSubmit={handleChange}>
            <TextField name='name_appoint' label="Buscador" variant="filled" />
            <Button sx={{ ml: 3}} type="submit" variant="contained">Buscar</Button>
        </Box>
        {appointments && (
            <Box sx={{ mt: 5 }}>
                <Typography component="h3" variant="h5" gutterBottom>
                    Citas
                </Typography>
                <AppointmentsView appointment={appointments} />
            </Box>
        )}
    </div>
  )
}
