import React from "react";
import { Route, Routes, Navigate } from "react-router";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

export default function AppRouter() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
   );
}