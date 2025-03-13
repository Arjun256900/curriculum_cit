import DashBoard from "./components/DashBoard.jsx";
import NotificationsSignInPageError from "./components/NotificationsSignInPageError.jsx";
import CreditsPieChart from "./components/CreditsPieChart.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import DepartmentSelect from "./components/DepartmentSelect.jsx";
import PreviewTable from "./components/PreviewTable.jsx";
import { DepartmentProvider } from "./components/DepartmentContext";
import { RegulationProvider } from "./components/RegulationContext";
import FacultyDashboard from "./components/FacultyDashboard.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <DepartmentProvider>
      <RegulationProvider>
        <Router>
          <Routes>
            {/* Login route */}
            <Route
              path="/"
              element={
                <NotificationsSignInPageError setIsLoggedIn={setIsLoggedIn} />
              }
            />

            <Route
              path="/select-department"
              element={
                isLoggedIn ? <DepartmentSelect /> : <Navigate to="/" replace />
              }
            />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/chart" element={<CreditsPieChart />} />
            <Route path="/preview" element={<PreviewTable />} />
            {/* <Route path="/success" element={<h2>Submission Successful!</h2>} /> */}
          </Routes>
        </Router>
      </RegulationProvider>
    </DepartmentProvider>
  );
}

export default App;
