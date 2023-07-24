import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    appointment: {},
};

export const appointmentSlice = createSlice({
   name: "appointment",
   initialState,
   reducers: {
      setAppointment: (state, action) => {
        state.appointment = action.payload;
      },
   },
});

export const { setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;