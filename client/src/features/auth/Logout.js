import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { logoutSuccess } from "./authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(logoutSuccess());
    navigate("/login");
  };
  return (
    <div className="container">
      <Button size="small" variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
