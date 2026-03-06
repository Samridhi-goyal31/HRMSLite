import React, { useState, useEffect } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddEmployee() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const validate = () => {

    let newErrors = {};

    if (!form.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!form.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = async () => {

    if (!validate()) return;

    try {
      setIsLoading(true);
      const res = await api.post("/employees/", form);
    
      if (res.ok === true) {
        setIsLoading(false);
        setSeverity("success");
        setMessage(res.message);

        setTimeout(() => {
        setForm({
          employeeId: "",
          fullName: "",
          email: "",
          department: ""
        });
          navigate("/employees");
        }, 1200);

      } else {
        setIsLoading(false);
        setSeverity("error");
        setMessage(res.message);

      }

    } catch (err) {
      setIsLoading(false);
      setSeverity("error");
      setMessage("Something went wrong");

    }

  };

  useEffect(() => {

    if (message) {

      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);

    }

  }, [message]);

  return (

    <Container maxWidth="sm" sx={{ mt: 4 }}>

      <Paper sx={{ p: 3 }}>

        <Typography variant="h5" gutterBottom>
          Add Employee
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

          <TextField
            label="Employee ID"
            value={form.employeeId}
            error={!!errors.employeeId}
            helperText={errors.employeeId}
            onChange={(e) =>
              setForm({ ...form, employeeId: e.target.value })
            }
          />

          <TextField
            label="Full Name"
            value={form.fullName}
            error={!!errors.fullName}
            helperText={errors.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          <TextField
            label="Email"
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            label="Department"
            value={form.department}
            error={!!errors.department}
            helperText={errors.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <Box sx={{ display: "flex", gap: 2 }}>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/employees")}
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