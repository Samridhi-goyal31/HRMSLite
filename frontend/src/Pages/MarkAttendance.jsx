import React, { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../services/api";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MarkAttendance() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    date: dayjs(),
    status: "present"
  });

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {
      
      const res = await api.get("/employees/");

      if (res.ok) {
        setEmployees(res.data);
      }

    } catch (err) {
      console.log(err);
    }

  };

  const handleSubmit = async () => {

    if (!form.employee) {

      setSeverity("error");
      setMessage("Please select an employee");
      return;

    }

    const payload = {
      employee: form.employee,
      date: form.date.format("YYYY-MM-DD"),
      status: form.status
    };

    try {
      setIsLoading(true);
      const res = await api.post("/attendance/", payload);

      if (res.ok) {
        setIsLoading(false);
        setSeverity("success");
        setMessage(res.message);

        setTimeout(() => {
          navigate("/attendance");
        }, 1200);

      } else {
        setIsLoading(false);
        setSeverity("error");
        setMessage(res.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

    } catch {

      setIsLoading(false);
      setSeverity("error");
      setMessage("Something went wrong");

    }

  };

  return (

    <Container maxWidth="sm" sx={{ mt: 4 }}>

      <Paper sx={{ p: 3 }}>

        <Typography variant="h5" gutterBottom>
          Mark Attendance
        </Typography>

        {message && (
          <Alert severity={severity} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}


        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >

          {/* Employee Dropdown */}

          <Select
            value={form.employee}
            displayEmpty
            onChange={(e) =>
              setForm({ ...form, employee: e.target.value })
            }
          >

            <MenuItem value="">
              Select Employee
            </MenuItem>

            {employees.map((emp) => (

              <MenuItem key={emp.id} value={emp.id}>
                {emp.fullName}
              </MenuItem>

            ))}

          </Select>

          {/* Material Date Picker */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker
              label="Attendance Date"
              value={form.date}
              onChange={(newValue) =>
                setForm({ ...form, date: newValue })
              }
            />

          </LocalizationProvider>

          {/* Status Dropdown */}

          <Select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >

            <MenuItem value="present">
              Present
            </MenuItem>

            <MenuItem value="absent">
              Absent
            </MenuItem>

          </Select>

          {/* Buttons */}

          <Box sx={{ display: "flex", gap: 2 }}>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
            {isLoading ? "Marking Attendance..." : "Mark Attendance"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/attendance")}
              disabled={isLoading}
            >
              Cancel
            </Button>

          </Box>

        </Box>
          
      </Paper>

    </Container>

  );
}