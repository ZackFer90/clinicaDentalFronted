import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./GlobalBackground.scss";

export default function GestionPages() {

    const userRole = useSelector((state) => state.auth.userInfo.role);
    const isAdmin = userRole == "admin";
    const isDoctor = userRole == "doctor";
    const isUser = userRole == "user";


  return (
    <div className='back'>        
        <Sidebar className='backSide'>
            
            {isAdmin && (
                <Menu sx={{color: "primary"}}>
                    <MenuItem component={<Link to="/admin" />} sx={{color: "primary"}}> Admin</MenuItem>
                    <MenuItem component={<Link to="/registerDoctor" />}>Registrar</MenuItem>
                </Menu>
            )}
            {isDoctor && (
                <Menu sx={{color: "primary"}}>
                    {/* <MenuItem component={<Link to="/admin" />} sx={{color: "primary"}}> Admin</MenuItem> */}
                    <MenuItem component={<Link to="/createAppointment" />}>Crear cita</MenuItem>
                    <MenuItem component={<Link to="/doctor" />}>Citas</MenuItem>
                </Menu>
            )}
            {isUser && (
                <Menu sx={{color: "primary"}}>
                    <MenuItem component={<Link to="/search" />} sx={{color: "primary"}}> Buscar cita</MenuItem>
                    <MenuItem component={<Link to="/createAppointment" />}>Crear cita</MenuItem>
                </Menu>
            )}
            
        </Sidebar>
    </div>
  )
}
