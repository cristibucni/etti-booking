import React, { useEffect, useState } from "react";
import {
  FormGroup,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Service from "../../service/Service";
import { useNavigate } from "react-router";

export const Register = () => {
  // Se salvează funcția useNavigate într-o constantă numită navigate
  const navigate = useNavigate();
  // Se inițializează rolurile posibile printr-o listă goală
  const [roles, setRoles] = useState([]);
  // Se inițializează datele din formular și structura acestora
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
  });

  // La încărcarea componentei, se apelează metoda getRoles() pentru a obține rolurile posibile ale unui utilizator
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      // Se extrage cheia "data" din răspunsul primit în urma apelului către Back End
      const { data } = await Service.getRoles();
      // Se setează lista de roluri
      setRoles(data);
    } catch (err) {
      // Se loghează erorile în caz că apar
      console.log(err);
    }
  };

  // Tratează modificarea oricărui câmp din formularul de înregistrare
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Apelează Back End-ul cu datele completate de utilizator
  const handleSubmit = async () => {
    try {
      await Service.registerUser(formData);
      // Redirectează utilizatorul către pagina de login
      navigate("/login");
    } catch (err) {
      // Se loghează erorile în caz că apar
      console.log(err);
    }
  };

  return (
    // Structurează formularul într-un element de tip Grid
    <Grid container sx={{ justifyContent: "center", marginTop: "40px" }}>
      <Grid item xs={12} sm={8} md={4}>
        {/* Inițializează elementele vizuale ale formularului */}
        <FormGroup>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Fiecare element de tip TextField se leagă de o informație din structura datelor utilizatorului */}
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
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
            <TextField
              name="passwordConfirmation"
              label="Password confirmation"
              type="password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Register
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={() => navigate("/login")}
            >
              Already registered? Login instead
            </Button>
          </form>
        </FormGroup>
      </Grid>
    </Grid>
  );
};
