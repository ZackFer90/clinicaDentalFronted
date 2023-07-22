import React from "react";
import { Route, Routes, Navigate } from "react-router";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ModifyPage from "./pages/ModifyPage";
import RegisterPage from "./pages/RegisterPage";
import GestionPages from "./pages/GestionPages";
import RegisterDoctorPage from "./pages/RegisterDoctorPage";
import ProfilePage from "./pages/ProfilePage";

export default function AppRouter() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/modify" element={<ModifyPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/gestion" element={<GestionPages />} />
            <Route path="/registerDoctor" element={<RegisterDoctorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
   );
}