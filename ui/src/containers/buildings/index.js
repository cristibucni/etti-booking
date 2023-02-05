import React, { useEffect, useState } from "react";
import Service from "../../service/Service";
import { Divider, Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddBuilding from "./add";
import { LoadingIndicator } from "../loading-indicator";

export const Buildings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "campus", headerName: "Campus", width: 300 },
  ]);
  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = () => {
    getData();
  };

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await Service.getBuildings();
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
        <AddBuilding refresh={handleRefresh} />
      </Paper>
      <Paper elevation={1} sx={{ width: "calc(65% - 15px)", padding: "10px" }}>
        <Typography variant="h6">View buildings</Typography>
        <Divider sx={{ marginBottom: "10px" }} />
        <DataGrid
          sx={{ height: "500px" }}
          rows={data.map((item) => ({
            id: item._id,
            name: item.name,
            campus: item.campus,
          }))}
          columns={columns}
          pageSize={20}
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};
