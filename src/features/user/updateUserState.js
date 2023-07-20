import { store } from "../../app/store";
import { setUser } from "./userSlice";

export const updateUser = (user) => {
    // store.dispatch(
    //     setUser(
    //         {
    //             id: user.id,
    //             name: user.nombre,
    //             last_name: user.apellidos,
    //             birthdate: user.fecha,
    //             email: user.email,
    //             phone: user.telefono,
    //             address: user.direccion,
    //         }
    //    )
    // );
    store.dispatch(setUser(user));
 };