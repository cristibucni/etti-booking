import axios from "axios";

class Service {
  constructor() {
    // Se salvează axios pe instața serviciului
    this.axios = axios;
  }

  // Setează jetonul atribuit în urma autentificării pe cererile HTTP viitoare
  setAuthToken = (token) => {
    // Dacă jetonul este prezent în apelul funcției
    if (token) {
      // Aplică jetonul pe fiecare request
      this.axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Șterge jetonul
      delete this.axios.defaults.headers.common["Authorization"];
    }
  };

  // Aduce toate rolruile posibile
  getRoles = () => {
    return axios.get("http://localhost:5000/api/roles");
  };

  // Cerere HTTP pentru creearea unui utilizator
  registerUser = (payload) => {
    return axios.post("http://localhost:5000/api/users/register", payload);
  };

  // Cerere HTTP pentru autentificarea unui utilizator
  loginUser = (payload) => {
    return axios.post("http://localhost:5000/api/users/login", payload);
  };

  // Cerere HTTP pentru obținerea tuturor clădirilor din DB
  getBuildings = () => {
    return axios.get("http://localhost:5000/api/buildings");
  };

  // Cerere HTTP pentru obținerea tuturor camerelor din DB
  getRooms = () => {
    return axios.get("http://localhost:5000/api/rooms");
  };

  // Cerere HTTP pentru obținerea tuturor etajelor din DB
  getFloors = (buildingId) => {
    return axios.get("http://localhost:5000/api/floors", {
      params: { buildingId },
    });
  };

  // Cerere HTTP pentru creearea unei rezervări
  createBooking = (payload) => {
    return axios.post("http://localhost:5000/api/bookings", payload);
  };

  // Cerere HTTP pentru obținerea tuturor rezervărilor din DB
  getBookings = () => {
    return axios.get("http://localhost:5000/api/bookings");
  };

  // Cerere HTTP pentru creearea unei camere
  createRooms = (payload) => {
    return axios.post("http://localhost:5000/api/rooms", payload);
  };
  // Cerere HTTP pentru creearea unei clădiri
  createBuilding = (payload) => {
    return axios.post("http://localhost:5000/api/buildings", payload);
  };
  // Cerere HTTP pentru creearea unui etaj
  createFloors = (payload) => {
    return axios.post("http://localhost:5000/api/floors", payload);
  };
}

export default new Service();
