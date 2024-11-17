
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TruckDetails from "./pages/TruckDetails";
import DriverDetails from "./pages/DriverDetails";
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/truckdetails" element={<TruckDetails />} />
          <Route path="/driverdetails" element={<DriverDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
