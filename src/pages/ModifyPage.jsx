import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { positions } from '@mui/system';

import format from "date-fns/format";
import "./ModifyPage.scss";
import userService from "../_services/userService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ModifyPage({User}) {

   const [users, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      getProfile();
   }, []);

   const getProfile = async () => {
      setIsLoading(true);
      try {
        //  const data = await userService.getProfile(token);
        //  setUser(data);
        //  console.log(data);
        console.log(User);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         {!isLoading ? (
            <Container sx={{ mx: 'auto', width: 800, mt: 1, mb: 1 }}>
               <Typography variant="h6" gutterBottom>
                  Profile User
               </Typography>
               <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="name"
                        label="name"
                        // defaultValue={users.name}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="lastName"
                        label="last name"
                        // defaultValue={users.last_name}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="birthday"
                        label="birthday"
                        // defaultValue={users.birthday}
                        // defaultValue={format( new Date (users.birthday), "dd/MM/yyyy")}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="email"
                        label="email"
                        // defaultValue={users.email}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="street"
                        label="street"
                        // defaultValue={users.address.street}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        id="number"
                        label="number street"
                        // defaultValue={users.address.number}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        id="nationality"
                        label="nationality"
                        // defaultValue={users.nationality}
                        fullWidth
                        InputProps={{
                           readOnly: true,
                        }}
                     />
                  </Grid>
                  {users?.active == 'yes' && (
                     <Grid container spacing={3} sx={{ mx: 'auto', mt: 1}}>
                     {users.courses.map ((user) => (
                        <Grid item xs={12} sm={6}>
                           <TextField
                              id={user.name}
                              label={user.category}
                              defaultValue={user.name}
                              fullWidth
                              InputProps={{
                                 readOnly: true,
                              }}
                           />
                        </Grid>
                     ))}
                     </Grid>
                  )}
                  <Grid item xs={12}>
                     <Button sx={{ ml: 80 }} variant="contained">Contained</Button>
                  </Grid>
               </Grid>
            </Container>) : ( (<p></p>)
            )}
      </>
   );
}