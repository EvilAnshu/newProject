import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "protected-route-react";
import Read from "../src/components/Read.js";
import Home from "../src/components/Home.js";
import Update from "../src/components/Update.js";
import Create from "../src/components/Create.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../src/components/auth/Login.js";
import Register from "../src/components/auth/Register.js";
import { useEffect, useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
              <Create />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
              <Update />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/read/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/login">
              <Read />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
