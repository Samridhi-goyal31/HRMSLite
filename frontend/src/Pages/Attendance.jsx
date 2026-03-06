import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Select,
  MenuItem
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Loading from "../components/Loading";

import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Attendance() {

  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    employee: "",
    date: null
  });

  useEffect(() => {

    fetchAttendance();
    fetchEmployees();

  }, []);

  const fetchAttendance = async () => {

    setLoading(true);

    try {

      const res = await api.get("/attendance/");

      if (res.data) {

        setAttendance(res.data);
        setFilteredData(res.data);

      } else {

        setError("Failed to load attendance");

      }

    } catch {

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  const fetchEmployees = async () => {

    try {

      const res = await api.get("/employees/");

      if (res.data) {

        setEmployees(res.data);

      }

    } catch (err) {

      console.log(err);

    }

  };

  const applyFilter = () => {

    let data = [...attendance];

    if (filters.employee) {

      data = data.filter(
        (item) => item.employeeName === filters.employee
      );

    }

    if (filters.date) {

      const selectedDate = filters.date.format("YYYY-MM-DD");

      data = data.filter(
        (item) => item.date === selectedDate
      );

    }

    setFilteredData(data);

  };

  const resetFilter = () => {

    setFilters({
      employee: "",
      date: null
    });

    setFilteredData(attendance);

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
          Attendance
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/attendance/mark")}
        >
          Mark Attendance
        </Button>

      </Box>

      {/* Filters */}

      <Paper sx={{ p: 2, mb: 2 }}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >

            {/* Employee Filter */}

            <Select
              value={filters.employee}
              displayEmpty
              onChange={(e) =>
                setFilters({ ...filters, employee: e.target.value })
              }
            >

              <MenuItem value="">
                All Employees
              </MenuItem>

              {employees.map((emp) => (

                <MenuItem key={emp.id} value={emp.fullName}>
                  {emp.fullName}
                </MenuItem>

              ))}

            </Select>

            {/* Date Filter */}

            <DatePicker
              label="Filter by Date"
              value={filters.date}
              onChange={(newValue) =>
                setFilters({ ...filters, date: newValue })
              }
            />

            {/* Filter Button */}

            <Button
              variant="contained"
              onClick={applyFilter}
            >
              Filter
            </Button>

            {/* Reset Button */}

            <Button
              variant="outlined"
              onClick={resetFilter}
            >
              Reset
            </Button>

          </Box>

        </LocalizationProvider>

      </Paper>

      {/* Attendance Table */}

      <Paper sx={{ p: 2 }}>

        {loading ? (

          <Loading />

        ) : error ? (

          <Typography color="error">
            {error}
          </Typography>

        ) : filteredData.length === 0 ? (

          <Typography>
            No attendance records found
          </Typography>

        ) : (

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>#</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredData.map((att, index) => (

                <TableRow key={att.id}>

                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    {att.employeeName}
                  </TableCell>

                  <TableCell>
                    {att.date}
                  </TableCell>

                  <TableCell>
                    {att.status}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        )}

      </Paper>

    </Container>

  );

}