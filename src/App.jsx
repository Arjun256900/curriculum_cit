import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashBoard from "./components/DashBoard.jsx";
import CreditsPieChart from "./components/CreditsPieChart.jsx";
import DepartmentSelect from "./components/DepartmentSelect.jsx";
import PreviewTable from "./components/PreviewTable.jsx";
import { DepartmentProvider } from "./components/DepartmentContext";
import { RegulationProvider } from "./components/RegulationContext";
import FacultyDashboard from "./components/FacultyDashboard.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <AuthProvider>
      <DepartmentProvider>
        <RegulationProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  token ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/login"
                element={token ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route path="/select-department" element={<DepartmentSelect />} />
              <Route
                path="/dashboard"
                element={token ? <DashBoard /> : <Navigate to="/login" />}
              />
              <Route path="/chart" element={<CreditsPieChart />} />
              <Route path="/preview" element={<PreviewTable />} />
            </Routes>
          </Router>
        </RegulationProvider>
      </DepartmentProvider>
    </AuthProvider>
  );
}

export default App;
