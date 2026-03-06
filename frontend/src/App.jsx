import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import './App.css'
import NavBar from './components/NavBar';
import AddEmployee from './pages/AddEmployee';
import MarkAttendance from './pages/MarkAttendance';

function App() {
  return (
  <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/mark" element={<MarkAttendance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
