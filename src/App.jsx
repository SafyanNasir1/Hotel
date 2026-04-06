import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthPage from "./Pages/Auth";
import Review from "./Components/Review";
import Rooms from "./Pages/Rooms";
import Bookings from "./Pages/Bookings";
import RoomData from "./Pages/RoomData";
import ScrollToTop from "./Components/ScroolToTop";
import Dashboard from "./Pages/Owner/Dashboard";
import OwnerProtectedRoute from "./Components/OwnerProtectedRoute";
import AddRoom from "./Pages/Owner/AddRoom";
import ListRoom from "./Pages/Owner/ListRooms";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <RoomData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <OwnerProtectedRoute>
              <Dashboard />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/addRoom"
          element={
            <OwnerProtectedRoute>
              <AddRoom />
            </OwnerProtectedRoute>
          }
        />
        <Route
          path="/listRooms"
          element={
            <OwnerProtectedRoute>
              <ListRoom/>
            </OwnerProtectedRoute>
          }
        />
      
      </Routes>
    </>
  );
}

export default App;
