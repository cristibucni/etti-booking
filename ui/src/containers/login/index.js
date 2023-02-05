import React, { useEffect, useState } from "react";
import { FormGroup, TextField, Grid, Button } from "@mui/material";
import Service from "../../service/Service";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/auth";
import { useNavigate } from "react-router";

export const Login = () => {
  // Se salvează funcția useDispatch într-o constantă numită dispatch
  const dispatch = useDispatch();
  // Se salvează funcția useNavigate într-o constantă numită navigate
  const navigate = useNavigate();
  // Se inițializează datele din formular și structura acestora
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Tratează modificarea oricărui câmp din formularul de autentificare
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Apelează Back End-ul cu datele completate de utilizator
  const handleSubmit = async () => {
    try {
      await dispatch(loginUser(formData));
      // Redirectează utilizatorul către pagina Home
      navigate("/home");
    } catch (err) {
      // Se loghează erorile în caz că apar
      console.log(err);
    }
  };

  return (
    // Structurează formularul într-un element de tip Grid
    <Grid container sx={{ justifyContent: "center", marginTop: "40px" }}>
      <Grid item xs={12} sm={8} md={4}>
        <FormGroup>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={() => navigate("/register")}
            >
              No account? Register instead
            </Button>
          </form>
        </FormGroup>
      </Grid>
    </Grid>
  );
};
