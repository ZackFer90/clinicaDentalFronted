import axios from "axios";

import { global } from "../_config/global";

const doctorService = {};

doctorService.getAllPatient = async (token, page = 1) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/doctor`,
      params: { page: page },
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };
   //await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

doctorService.createAppointment = async (token, data) => {
    const options = {
       method: "POST",
       url: `${global.BASE_API_URL}/doctor/create-Appointment`,
       data: data,
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
    //await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

doctorService.getAllAppointment = async (token, page) => {
    const options = {
       method: "GET",
       url: `${global.BASE_API_URL}/doctor/get-Appointment`,
       params: { page: page },
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
    //await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

doctorService.getMyAppointment = async (token, page) => {
    const options = {
       method: "GET",
       url: `${global.BASE_API_URL}/doctor/getMy-Appointment`,
       params: { page: page },
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
    //await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

doctorService.deleteAppointment = async (token, appoint) => {
   const options = {
      method: "DELETE",
      url: `${global.BASE_API_URL}/doctor/delete-appoint`,
      data: appoint,
      headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   // await sleep(2000); // TODO
   const response = await axios.request(options);
   return response.data;
};

export default doctorService;