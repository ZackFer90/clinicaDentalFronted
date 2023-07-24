import { store } from "../../app/store";
import { setAppointment } from "./appointmentSlice";

export const updateAppointment = (appointment) => {
    store.dispatch(setAppointment(appointment));
 };