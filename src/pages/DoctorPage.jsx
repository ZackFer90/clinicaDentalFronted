import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { Navigate, useNavigate } from "react-router-dom";

import { Box, Container, Pagination, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Button from "@mui/material/Button";

import doctorService from "../_services/doctorService";
import { updateAppointment } from "../features/citas/updateAppointmentState";
import "./GlobalBackground.scss";

export default function DoctorPage() {

    const [appointment, setAppointment] = useState([]);
    const [myAppointment, setMyAppointment] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [myAppointPage, setMyAppointPage] = useState(1);
    const [countMyAppoint, setCountMyAppoint] = useState(1);
    const [AppointPage, setAppointPage] = useState(1);
    const [countAppoint, setCountAppoint] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
     }, [myAppointPage, AppointPage]);

   const handleChangeAppoint = (event, value) => {
      console.log("Handle change appoint");
      console.log({value});
      setAppointPage(value);
   }

   const handleChangeMyAppoint = (event, value) => {
      setMyAppointPage(value);
   }

     const clickDelete = async (value) => {

        const citaModify = {
         idCita: value.id
        };

        console.log(value);

        await doctorService.deleteAppointment(token, citaModify);

         const dataMyAppoint = await doctorService.getMyAppointment(token, myAppointPage);
         setMyAppointment(dataMyAppoint.results);
         setCountMyAppoint(dataMyAppoint.info.totalPage);
     }

     const changeAppointment = (value) =>{
      console.log(value);
      updateAppointment(value);
      navigate(`/modifyCitas`);
   }


     const getUsers = async () => {
        try {
           const dataAppoint = await doctorService.getAllAppointment(token, AppointPage);
           const dataMyAppoint = await doctorService.getMyAppointment(token, myAppointPage);
           setAppointment(dataAppoint.results);
           setMyAppointment(dataMyAppoint.results);
           setCountMyAppoint(dataMyAppoint.info.totalPage);
           setCountAppoint(dataAppoint.info.totalPage);
         //   console.log(dataAppoint);
         //   console.log(dataMyAppoint);
        } catch (error) {
           console.log(error);
        }
     };

  return (
    <div className="back">
        <Container>
         <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Todas las citas
         </Typography>
         <TableContainer component={Paper} sm={{ width: 870}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Id cita</TableCell>
                  <TableCell align="right">Nombre doctor</TableCell>
                  <TableCell align="right">Nombre paciente</TableCell>
                  <TableCell align="right">Fecha cita</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {appointment.map((appoin, index) => (
                  <TableRow
                  key={index}
                  sx={{
                     "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  >
                     <TableCell component="th" scope="row">
                        {index+1}
                     </TableCell>
                     <TableCell align="right">{appoin.doctores.usuario.nombre}</TableCell>
                     <TableCell align="right">{appoin.pacientes.usuario.nombre}</TableCell>
                     <TableCell align="right">{format( new Date (appoin.fecha), "dd/MM/yyyy")}</TableCell>
                     {/* <TableCell align="right">
                        <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDeletePatient(appoin.usuario.id)}/>
                     </TableCell> */}
                     {/* <TableCell align="right">
                        <CreateIcon onClick={()=> changeUser(appoin.usuario)}/>
                     </TableCell> */}
                  </TableRow>
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center"}}>
            <Pagination page={AppointPage} count={countAppoint} onChange={handleChangeAppoint}/>
         </Box>

         <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Mis citas
         </Typography>
         <TableContainer component={Paper} sm={{ width: 870}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Id cita</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellidos</TableCell>
                  <TableCell align="right">Fecha cita</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {myAppointment?.map((myAppoin, index) => (
                  <TableRow
                     key={index}
                     sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                     }}
                  >
                     <TableCell component="th" scope="row">
                        {index+1}
                     </TableCell>
                     <TableCell align="right">{myAppoin.pacientes.usuario.nombre}</TableCell>
                     <TableCell align="right">{myAppoin.pacientes.usuario.apellidos}</TableCell>
                     <TableCell align="right">{format( new Date (myAppoin.fecha), "dd/MM/yyyy")}</TableCell>
                     <TableCell align="right">
                        <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDelete(myAppoin)}/>
                     </TableCell>
                     <TableCell align="right">
                        <CreateIcon onClick={()=> changeAppointment(myAppoin)}/>
                     </TableCell>
                  </TableRow>               
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center"}}>
            <Pagination page={myAppointPage} count={countMyAppoint} onChange={handleChangeMyAppoint}/>
         </Box>
         </Container>
      </div>
  )
}
