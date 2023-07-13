import React, { useEffect, useState } from "react";

// @MUI
import { Box, Container, Pagination, Typography } from "@mui/material";
import userService from "../_services/userService";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AdminPage() {
   // hooks
   const [users, setUsers] = useState([]);
   const [usersPage, setUsersPage] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector((state) => state.auth.token);
   const [count, setCount] = useState(1);

   useEffect(() => {
      getUsers();
   }, [usersPage]);

   const handleChange = (event, value) => {
      setUsersPage(value);
   }

   const getUsers = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getAllPatient(token, usersPage);
         setUsers(data);
         console.log(data);
         console.log(data.usuarios);
         // setCount(data.info.pages);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Container>
         <Typography variant="h6" gutterBottom>
            Admin Panel
         </Typography>
         <TableContainer component={Paper} sx={{ mx: 'auto', width: 800}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Apellidos</TableCell>
                  <TableCell align="right">Correo</TableCell>
                  <TableCell align="right">rol</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {users.map((user) => (
                  <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="row">
                     {user.id}
                  </TableCell>
                  <TableCell align="right">{user.usuarios.nombre}</TableCell>
                  <TableCell align="right">{user.usuarios.apellidos}</TableCell>
                  <TableCell align="right">{user.usuarios.email}</TableCell>
                  <TableCell align="right">"Pacientes"</TableCell>
                  </TableRow>
               ))}
            </TableBody>
            </Table>
         </TableContainer>
         <Box sx={{ mt: 3, mb: 3, display: "flex", justifyContent: "center"}}>
            <Pagination page={usersPage} count={count} onChange={handleChange}/>
         </Box>
         </Container>
      </>
   );
}