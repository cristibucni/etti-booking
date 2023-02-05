import React, { useEffect, useState } from "react";
import Service from "../../service/Service";
import { Divider, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 300 },
  ]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await Service.getRooms();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      style={{
        padding: "30px",
        display: "flex",
        height: "600px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">View rooms</Typography>
      <Divider sx={{ marginBottom: "10px" }} />
      <DataGrid
        sx={{ height: "500px" }}
        rows={data.map((item) => ({
          id: item._id,
          name: item.name,
        }))}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5, 10, 20, 50]}
        disableSelectionOnClick
      />
    </div>
  );
};
