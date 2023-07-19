import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";

// const userRole = useSelector((state) => state.auth.userInfo.role);
// const isAdmin = userRole == "admin";

export default function HomePage() {
   return (
      <>        
         <Sidebar>
            <Menu>
            {/* {isAdmin && ( */}
               <MenuItem component={<Link to="/admin" />}> Admin</MenuItem>
            {/* )} */}
            </Menu>
         </Sidebar>;
      </>
   );
}