import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Service from "../../service/Service";
import _ from "lodash";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

const steps = [
  {
    label: "Add rooms",
    optional: false,
  },
  {
    label: "Add floors",
    optional: false,
  },
  {
    label: "Add building",
    optional: false,
  },
];

class Room {
  constructor() {
    this.name = "";
  }
}

class Floor {
  constructor() {
    this.name = "";
    this.rooms = [];
  }
}
export default function AddBuilding({ refresh }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [rooms, setRooms] = useState([]);
  const [floors, setFloors] = useState([]);
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [buildingId, setBuildingId] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [unassignedRooms, setUnassignedRooms] = useState([]);

  const handleNext = async () => {
    if (activeStep === 0) {
      await createRooms();
    }
    if (activeStep === 1) {
    }
    if (activeStep === 2) {
      await createBuilding();
      refresh();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const createRooms = async () => {
    try {
      const payload = rooms.map((room) => ({
        name: room.name,
      }));
      const { data } = await Service.createRooms(payload);
      setRooms(data);
      setUnassignedRooms(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createFloors = async (buildingId) => {
    try {
      const payload = floors.map((floor) => ({
        name: floor.name,
        rooms: floor.rooms,
        building: buildingId,
      }));
      await Service.createFloors(payload);
    } catch (err) {
      console.log(err);
    }
  };

  const createBuilding = async () => {
    const payload = {
      name: name,
      campus: campus,
    };
    try {
      const { data } = await Service.createBuilding(payload);
      console.log(data);
      createFloors(data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectRoom = (floorIndex, roomId) => {
    setUnassignedRooms(unassignedRooms.filter((room) => room._id !== roomId));
    const newFloors = [...floors];
    newFloors[floorIndex].rooms = [...newFloors[floorIndex].rooms, roomId];
    setFloors([...newFloors]);
  };

  const addNewRoom = () => {
    setRooms([...rooms, new Room()]);
  };

  const addNewFloor = () => {
    setFloors([...floors, new Floor()]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setRooms([]);
    setFloors([]);
    setName("");
  };

  const handleRoomChange = (index, e) => {
    const newRooms = [...rooms];
    newRooms[index][e.target.name] = e.target.value;
    setRooms([...newRooms]);
  };
  const handleFloorChange = (index, e) => {
    const newFloors = [...floors];
    newFloors[index][e.target.name] = e.target.value;
    setFloors([...newFloors]);
  };

  return (
    <Box
      sx={{
        width: "calc(90% - 30px)",
        padding: "30px",
        justifyContent: "center",
      }}
    >
      <Stepper activeStep={activeStep} sx={{ margin: "auto" }}>
        {steps.map(({ label }, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 0 && (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
            Please add building rooms
            <br />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(rooms);
              }}
            >
              {rooms.map((room, index) => (
                <TextField
                  sx={{ margin: "10px 0" }}
                  fullWidth
                  label={`Room ${index + 1}`}
                  name={"name"}
                  key={index}
                  value={rooms[index].name || ""}
                  onChange={(e) => handleRoomChange(index, e)}
                ></TextField>
              ))}
            </form>
            <br />
            <Button
              onClick={addNewRoom}
              variant="contained"
              color="secondary"
              sx={{ marginBottom: "15px" }}
            >
              Add another room
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 1 && (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
            Floors details
            <br />
            {floors.map((floor, index) => (
              <div key={index}>
                <TextField
                  sx={{ margin: "10px 0" }}
                  fullWidth
                  label={`Floor ${index + 1}`}
                  name={"name"}
                  key={index}
                  value={floors[index].name || ""}
                  onChange={(e) => handleFloorChange(index, e)}
                ></TextField>
                Selected rooms:
                {floor.rooms.map((room) => (
                  <div key={room}>{rooms.find((r) => r._id === room).name}</div>
                ))}
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <InputLabel id="demo-simple-select-label">Rooms</InputLabel>
                  <Select
                    name="room"
                    value={""}
                    label="Room"
                    onChange={(e) => handleSelectRoom(index, e.target.value)}
                  >
                    {unassignedRooms.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Divider />
              </div>
            ))}
            <Button
              onClick={addNewFloor}
              variant="contained"
              color="secondary"
              sx={{ marginBottom: "15px" }}
            >
              Add another floor
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 2 && (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 2,
              gap: "15px",
            }}
          >
            Building details
            <br />
            <TextField
              sx={{ margin: "10px 0" }}
              fullWidth
              label={`Building name`}
              name={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <TextField
              sx={{ margin: "10px 0" }}
              fullWidth
              label={`Campus name`}
              name={"campus"}
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
            ></TextField>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
