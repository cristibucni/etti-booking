import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Service from "../../service/Service";
import _ from "lodash";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const steps = [
  {
    label: "Select building",
    optional: false,
  },
  {
    label: "Select rooms",
    optional: false,
  },
  {
    label: "Select date",
    optional: false,
  },
];

export default function AddBooking({ refresh }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [buildings, setBuildings] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const [selectedRoom, setSelectedRoom] = React.useState("");
  const [date, setDate] = React.useState(new Date(Date.now()));
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  React.useEffect(() => {
    getBuildings();
  }, []);

  const getBuildings = async () => {
    try {
      const { data } = await Service.getBuildings();
      setBuildings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const { data } = await Service.getFloors(selectedBuilding);
      const rooms = _.flattenDeep(
        data.map((floor) =>
          floor.rooms.map((room) => ({ ...room, floor: floor.name }))
        )
      );
      setRooms(rooms);
    }
    if (activeStep === 1) {
      console.log("get available dates");
    }
    if (activeStep === 2) {
      await addBooking();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const addBooking = async () => {
    const payload = {
      user: user.id,
      room: selectedRoom,
      startTs: new Date(date).addHours(3),
      endTs: new Date(date).addHours(5),
    };
    try {
      await Service.createBooking(payload);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedBuilding("");
    setSelectedRoom("");
    setDate(new Date(Date.now()));
  };

  const onSelectBuilding = (e) => {
    setSelectedBuilding(e.target.value);
  };
  const onSelectRoom = (e) => {
    setSelectedRoom(e.target.value);
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
            Please choose a building in which you want to book a room.
            <br />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Building</InputLabel>
              <Select
                name="building"
                value={selectedBuilding}
                label="Building"
                onChange={onSelectBuilding}
              >
                {buildings.map((building) => (
                  <MenuItem key={building._id} value={building._id}>
                    {building.name} - {building.campus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
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
            Please choose the room you want to book.
            <br />
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
              <Select
                name="room"
                value={selectedRoom}
                label="Room"
                onChange={onSelectRoom}
              >
                {rooms.map((room) => (
                  <MenuItem key={room._id} value={room._id}>
                    {room.name} - {room.floor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
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
            Please choose date and time. The booking will last 2 hours.
            <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                sx={{ marginTop: "10px" }}
                renderInput={(props) => <TextField {...props} />}
                label="Date"
                value={date}
                minDate={new Date(Date.now())}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
            <br />
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
