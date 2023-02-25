import React, { useEffect, useState } from "react";
import Service from "../../service/Service";
import { Divider, Paper, Typography, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LoadingIndicator } from "../loading-indicator";

export const Users = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 300 },
    { field: "isValidated", headerName: "Validated", width: 300 },
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
      const { data } = await Service.getUsers();
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

      <Paper elevation={1} sx={{ width: "100%", padding: "10px" }}>
        <Typography variant="h6">View users</Typography>
        <Divider sx={{ marginBottom: "10px" }} />
        <DataGrid
          sx={{ height: "500px" }}
          rows={data.map((item) => ({
            id: item._id,
            name: item.name,
            role: item.role.name,
            email: item.email,
            isValidated: item.isValidated
          }))}
          columns={columns}
          onRowClick={(e) => {
            setSelected(e.id)
          }}
          pageSize={20}
        />
        <br/>
        <Button variant="contained" disabled={selected === '' || data.find(user => user._id === selected).isValidated} onClick={() => {
          Service.patchUsers(selected, {
            _id: selected,
            isValidated: true
          })
          handleRefresh();
        }}>Validate</Button>
      </Paper>
    </Box>
  );
};
