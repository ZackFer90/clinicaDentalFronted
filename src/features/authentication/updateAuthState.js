import { decodeToken } from "react-jwt";
import { store } from "../../app/store";
import { setIsLoggedIn, setUserInfo, setToken } from "./authSlice";

export const updateAuthStateLogin = (token) => {
   const myDecodedToken = decodeToken(token);

   store.dispatch(setIsLoggedIn(true));
   store.dispatch(
      setUserInfo({
         id: myDecodedToken.userId,
         idPatient: myDecodedToken.patientId,
         idDoctor: myDecodedToken.doctorId,
         name: myDecodedToken.userNom,
         role: myDecodedToken.userRole,
      })
   );
   store.dispatch(setToken(token));
};

export const updateAuthStateLogout = () => {
   store.dispatch(setIsLoggedIn(false));
   store.dispatch(
      setUserInfo({
         id: null,
         idPatient: null,
         idDoctor: null,
         name: null,
         role: null,
      })
   );
   store.dispatch(setToken(null));
};