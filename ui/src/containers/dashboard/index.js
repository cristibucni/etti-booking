import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return <div>Dashboard</div>;
};
