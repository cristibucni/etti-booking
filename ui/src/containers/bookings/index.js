import React, { useEffect, useState } from "react";
import Service from "../../service/Service";
import { Typography, Divider, Box, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddBooking from "./add";
import { LoadingIndicator } from "../loading-indicator";

export const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 250 },
    { field: "user", headerName: "User", width: 250 },
    { field: "room", headerName: "Room", width: 250 },
    { field: "start", headerName: "Start", width: 250 },
    { field: "end", headerName: "End", width: 250 },
  ]);

  useEffect(() => {
    getBookings();
  }, []);

  const handleRefresh = async () => {
    await getBookings();
  };

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await Service.getBookings();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <LoadingIndicator />
  ) : (
    <Box
      sx={{
        display: "flex",
        padding: "30px",
        width: "calc(100% - 60px)",
        justifyContent: "space-between",
      }}
    >
      <Paper elevation={1} sx={{ width: "calc(35% - 15px)" }}>
        <AddBooking refresh={handleRefresh} />
      </Paper>
      <Paper elevation={1} sx={{ width: "calc(65% - 15px)", padding: "10px" }}>
        <Typography variant="h6">View bookings</Typography>
        <Divider sx={{ marginBottom: "10px" }} />
        <DataGrid
          sx={{ height: "500px" }}
          rows={data.map((item) => ({
            id: item._id,
            user: item.user.name,
            room: item.room?.name,
            start: new Date(item.startTs).toLocaleString("ro-RO"),
            end: new Date(item.endTs).toLocaleString("ro-RO"),
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};
