import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Employees from './Pages/Employees';
import Attendance from './Pages/Attendance';
import './App.css'
import NavBar from './components/NavBar';
import AddEmployee from './Pages/AddEmployee';
import MarkAttendance from './Pages/MarkAttendance';

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
