import axios from "axios";

import { global } from "../_config/global";

const userService = {};

// userService.getAllPatient = async (token, page = 1) => {
//    const options = {
//       method: "GET",
//       url: `${global.BASE_API_URL}/admin/getAll-patient`,
//       params: { page: page },
//       headers: {
//          accept: "application/json",
//          Authorization: `Bearer ${token}`,
//       },
//    };
//    //await sleep(2000); // TODO
//    const response = await axios.request(options);
//    return response.data;
// };

userService.getUser = async (token) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/user`,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.getDoctor = async () => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/user/getDoctor`,
      headers: {
         accept: "application/json",
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.modifyUser = async (token, user) => {
   const options = {
      method: "PUT",
      url: `${global.BASE_API_URL}/user/update-user`,
      data: user,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.createAppointment = async (token, user) => {
   const options = {
      method: "POST",
      url: `${global.BASE_API_URL}/user/create-Appointment`,
      data: user,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.getAppointment = async (token, page=1) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/user/get-Appointment`,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.searchAppointment = async (token, idCitas) => {
   const options = {
      method: "PUT",
      url: `${global.BASE_API_URL}/user/searchAppointment`,
      data: idCitas,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.modifyAppointment = async (appoint) => {
   const options = {
      method: "PUT",
      url: `${global.BASE_API_URL}/user/update-Appointment`,
      data: appoint,
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

userService.deleteAppointment = async (token, user) => {
   const options = {
      method: "DELETE",
      url: `${global.BASE_API_URL}/user/delete-appoint`,
      data: user,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};


export default userService;
