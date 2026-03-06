import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Loading from "../components/Loading";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {

    setLoading(true);

    try {

      const res = await api.get("/employees/");

      if (res.ok) {

        setEmployees(res.data);

      } else {

        setError(res.message);

      }

    } catch (err) {

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteClick = (emp) => {

    setSelectedEmployee(emp);
    setOpenDialog(true);

  };

  const handleDeleteConfirm = async () => {

    if (!selectedEmployee) return;

    try {

      const res = await api.delete(`/employees/${selectedEmployee.id}/`);

      if (res.ok) {

        fetchEmployees();

      } else {

        alert(res.message);

      }

    } catch (err) {

      alert("Delete failed");

    }

  };

  return (

    <Container sx={{ mt: 4 }}>

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >

        <Typography variant="h5">
          Employees
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </Button>

      </Box>

      <Paper sx={{ p: 2 }}>

        {loading ? (

          <Loading />

        ) : error ? (

          <Typography color="error">{"No Employees Found" ?? error}</Typography>

        ) : employees.length === 0 ? (

          <Typography>No employees found</Typography>

        ) : (

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>#</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell align="center">Actions</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {employees.map((emp, index) => (

                <TableRow key={emp.id}>

                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{emp.employeeId}</TableCell>
                  <TableCell>{emp.fullName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(emp)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        )}

      </Paper>

      {/* Confirm Delete Dialog */}

      <ConfirmDialog
        open={openDialog}
        title="Delete Employee?"
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
      />

    </Container>
  );
}