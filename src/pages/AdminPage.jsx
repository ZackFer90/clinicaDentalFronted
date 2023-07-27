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

// ----------------------------------------------------------------------
import adminService from "../_services/adminService";
import { updateUser } from "../features/user/updateUserState";

export default function AdminPage() {
   // hooks
   const [users, setUsers] = useState([]);
   const [doctors, setDoctors] = useState([]);
   const [usersPage, setUsersPage] = useState(1);
   const [doctorsPage, setDoctorsPage] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector((state) => state.auth.token);
   const [countUser, setCountUser] = useState(1);
   const [countDoctor, setCountDoctor] = useState(1);
   const navigate = useNavigate();

   useEffect(() => {
      getUsers();
   }, [usersPage, doctorsPage]);

   const handleChangeUser = (event, value) => {
      setUsersPage(value);
   }

   const handleChangeDoctor = (event, value) => {
      setDoctorsPage(value);
   }

   const clickDeletePatient = async (value) =>{
         const userId = {
            id: value
         }
         await adminService.deletePatient(token, userId);
         const dataUser = await adminService.getAllPatient(token, usersPage);
         setCountUser(dataUser.info.totalPage);
         setUsers(dataUser.results);
   }

   const clickDeleteDoctor = (value) =>{
         console.log(`Borrar ${value}`);
         adminService.deleteDoctor(token, value);
   }

   const changeUser = (value) =>{
      // console.log(value);
      updateUser(value);
      navigate(`/modify`);
   }

   const getUsers = async () => {
      setIsLoading(true);
      try {
         const dataUser = await adminService.getAllPatient(token, usersPage);
         const dataDoc = await adminService.getAllDoctors(token, doctorsPage);
         setCountDoctor(dataDoc.info.totalPage);
         setCountUser(dataUser.info.totalPage);
         setUsers(dataUser.results);
         setDoctors(dataDoc.results);
         console.log(dataUser);
         console.log(dataDoc);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Container>
         <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Datos de pacientes
         </Typography>
         <TableContainer component={Paper} sm={{ width: 870}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellidos</TableCell>
                  <TableCell align="right">Fecha nacimiento</TableCell>
                  <TableCell align="right">Correo</TableCell>
                  <TableCell align="right">Telefono</TableCell>
                  <TableCell align="right">Direccion</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {users.map((user) => (
                  <TableRow
                  key={user.usuario.id}
                  sx={{
                     "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  >
                     <TableCell component="th" scope="row">
                        {user.usuario.id}
                     </TableCell>
                     <TableCell align="right">{user.usuario.nombre}</TableCell>
                     <TableCell align="right">{user.usuario.apellidos}</TableCell>
                     <TableCell align="right">{format( new Date (user.usuario.fecha_nacimiento), "dd/MM/yyyy")}</TableCell>
                     <TableCell align="right">{user.usuario.email}</TableCell>
                     <TableCell align="right">{user.usuario.telefono}</TableCell>  
                     <TableCell align="right">{user.usuario.direccion}</TableCell>
                     <TableCell align="right">
                        <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDeletePatient(user.usuario.id)}/>
                     </TableCell>
                     <TableCell align="right">
                        <CreateIcon onClick={()=> changeUser(user.usuario)}/>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center"}}>
            <Pagination page={usersPage} count={countUser} onChange={handleChangeUser}/>
         </Box>

         <Typography variant="h6" gutterBottom textAlign={'center'} sx={{ marginTop: '30px' }}>
            Datos de doctores
         </Typography>
         <TableContainer component={Paper} sm={{ width: 870}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellidos</TableCell>
                  <TableCell align="right">Fecha nacimiento</TableCell>
                  <TableCell align="right">Correo</TableCell>
                  <TableCell align="right">Telefono</TableCell>
                  <TableCell align="right">Direccion</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {doctors.map((doc) => (
                  <TableRow
                  key={doc.usuario.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {doc.usuario.id}
                     </TableCell>
                     <TableCell align="right">{doc.usuario.nombre}</TableCell>
                     <TableCell align="right">{doc.usuario.apellidos}</TableCell>
                     <TableCell align="right">{format( new Date (doc.usuario.fecha_nacimiento), "dd/MM/yyyy")}</TableCell>
                     <TableCell align="right">{doc.usuario.email}</TableCell>
                     <TableCell align="right">{doc.usuario.telefono}</TableCell>
                     <TableCell align="right">{doc.usuario.direccion}</TableCell>
                     {/* <TableCell align="right">
                        <Button startIcon={<DeleteIcon />} sx={{color: "red"}} onClick={()=> clickDeleteDoctor(doc.usuario.id)}/>
                     </TableCell> */}
                     <TableCell align="right">
                        <CreateIcon onClick={()=> changeUser(doc.usuario)}/>
                     </TableCell>
                  </TableRow>               
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center"}}>
            <Pagination page={doctorsPage} count={countDoctor} onChange={handleChangeDoctor}/>
         </Box>
         </Container>
      </>
   );
}