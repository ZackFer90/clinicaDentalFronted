import axios from "axios";

import { global } from "../_config/global";

const adminService = {};

adminService.getAllPatient = async (token, page = 1) => {
   const options = {
      method: "GET",
      url: `${global.BASE_API_URL}/admin/getAll-patient`,
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

adminService.getAllDoctors = async (token, page = 1) => {
    const options = {
       method: "GET",
       url: `${global.BASE_API_URL}/admin/getAll-doctor`,
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

adminService.deletePatient = async (token, data) => {
    const options = {
       method: "DELETE",
       url: `${global.BASE_API_URL}/admin/delete-patient`,
       data: data,
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
 
    // await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

adminService.deleteDoctor = async (token, data) => {
    const options = {
       method: "DELETE",
       url: `${global.BASE_API_URL}/admin/delete-doctor`,
       data: data,
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
 
    // await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

adminService.registerDoctor = async (token, data) => {
    const options = {
       method: "POST",
       url: `${global.BASE_API_URL}/admin/register-doctor`,
       data: data,
       headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
       },
    };
 
    // await sleep(2000); // TODO
    const response = await axios.request(options);
    return response.data;
};

export default adminService;